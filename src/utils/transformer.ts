// Copyright © 2026 Roselinemaria Ekwe.
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

//This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Contact me at roselineekwe30@gmail.com for any questions or contributions!


import {
  igboDictionary,
  dictionaryWordSet,
  commonBigrams,
  commonMisspellings,
} from "../data/igboDictionary";

// ============================================================
// Transformer-Based Igbo Spell Checker Engine
// ============================================================

export interface SpellError {
  word: string;
  index: number;        // position in original text
  startPos: number;     // character start position
  endPos: number;       // character end position
  suggestions: Suggestion[];
  errorType: "misspelling" | "diacritics" | "context" | "unknown";
  confidence: number;   // 0-1
}

export interface Suggestion {
  word: string;
  meaning: string;
  score: number;        // 0-1 confidence
  method: string;       // which method found this suggestion
}

export interface CheckResult {
  errors: SpellError[];
  tokens: TokenInfo[];
  stats: {
    totalWords: number;
    correctWords: number;
    errorCount: number;
    accuracy: number;
    processingTimeMs: number;
    attentionLayers: number;
  };
  attentionWeights: number[][]; // simulated attention matrix
}

export interface TokenInfo {
  token: string;
  isCorrect: boolean;
  isPunctuation: boolean;
  embedding: number[];  // simulated embedding vector
  position: number;
}

// ============================================================
// Simulated Transformer Components
// ============================================================

// Generate a pseudo-embedding for a word (simulating word2vec/BERT style)
function generateEmbedding(word: string, dim: number = 8): number[] {
  const embedding: number[] = [];
  for (let i = 0; i < dim; i++) {
    let val = 0;
    for (let j = 0; j < word.length; j++) {
      val += Math.sin((word.charCodeAt(j) * (i + 1)) / 10) * Math.cos((j * (i + 2)) / 7);
    }
    embedding.push(parseFloat((val / word.length).toFixed(4)));
  }
  return embedding;
}

// Positional encoding (sinusoidal, like in "Attention Is All You Need")
function positionalEncoding(position: number, dim: number = 8): number[] {
  const encoding: number[] = [];
  for (let i = 0; i < dim; i++) {
    if (i % 2 === 0) {
      encoding.push(parseFloat(Math.sin(position / Math.pow(10000, i / dim)).toFixed(4)));
    } else {
      encoding.push(parseFloat(Math.cos(position / Math.pow(10000, (i - 1) / dim)).toFixed(4)));
    }
  }
  return encoding;
}

// Compute attention weights between tokens (simulated self-attention)
function computeAttentionWeights(tokens: TokenInfo[]): number[][] {
  const n = tokens.length;
  const weights: number[][] = [];

  for (let i = 0; i < n; i++) {
    const row: number[] = [];
    for (let j = 0; j < n; j++) {
      // Dot product of embeddings (simplified)
      let dotProduct = 0;
      for (let k = 0; k < tokens[i].embedding.length; k++) {
        dotProduct += tokens[i].embedding[k] * tokens[j].embedding[k];
      }
      row.push(dotProduct);
    }
    // Softmax
    const maxVal = Math.max(...row);
    const expRow = row.map(v => Math.exp(v - maxVal));
    const sumExp = expRow.reduce((a, b) => a + b, 0);
    weights.push(expRow.map(v => parseFloat((v / sumExp).toFixed(4))));
  }

  return weights;
}

// ============================================================
// Edit Distance & Similarity Functions
// ============================================================

// Damerau-Levenshtein (includes transpositions)
function damerauLevenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + cost);
      }
    }
  }

  return dp[m][n];
}

// Normalize a word by stripping Igbo diacritics for comparison
function stripDiacritics(word: string): string {
  return word
    .replace(/[ọọ]/g, "o")
    .replace(/[ụụ]/g, "u")
    .replace(/[ịị]/g, "i")
    .replace(/[ṅṅ]/g, "n")
    .replace(/[ạạ]/g, "a")
    .replace(/[ẹẹ]/g, "e")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\u0323/g, "")  // combining dot below
    .toLowerCase();
}

// ============================================================
// Suggestion Generation (Multi-method approach)
// ============================================================

function findSuggestions(
  word: string,
  contextWords: string[],
  wordIndex: number
): Suggestion[] {
  const suggestions: Map<string, Suggestion> = new Map();
  const lowerWord = word.toLowerCase();

  // Method 1: Direct misspelling lookup
  const directFix = commonMisspellings[lowerWord];
  if (directFix) {
    const entry = igboDictionary.find(e => e.word.toLowerCase() === directFix.toLowerCase());
    suggestions.set(directFix, {
      word: directFix,
      meaning: entry?.meaning || "",
      score: 0.95,
      method: "Known Pattern",
    });
  }

  // Method 2: Diacritics-aware matching
  const strippedInput = stripDiacritics(lowerWord);
  for (const entry of igboDictionary) {
    if (stripDiacritics(entry.word) === strippedInput && entry.word.toLowerCase() !== lowerWord) {
      const existing = suggestions.get(entry.word);
      const score = 0.9;
      if (!existing || existing.score < score) {
        suggestions.set(entry.word, {
          word: entry.word,
          meaning: entry.meaning,
          score,
          method: "Diacritics Fix",
        });
      }
    }
  }

  // Method 3: Edit distance based suggestions
  for (const entry of igboDictionary) {
    const dist = damerauLevenshtein(lowerWord, entry.word.toLowerCase());
    const maxLen = Math.max(lowerWord.length, entry.word.length);
    const similarity = 1 - dist / maxLen;

    if (dist <= 3 && similarity > 0.4) {
      const freqBonus = entry.frequency / 100;
      const score = similarity * 0.7 + freqBonus * 0.3;

      const existing = suggestions.get(entry.word);
      if (!existing || existing.score < score) {
        suggestions.set(entry.word, {
          word: entry.word,
          meaning: entry.meaning,
          score: parseFloat(score.toFixed(4)),
          method: dist === 1 ? "Single Edit" : `Edit Distance (${dist})`,
        });
      }
    }
  }

  // Method 4: Context-aware scoring (simulating transformer attention)
  const prevWord = wordIndex > 0 ? contextWords[wordIndex - 1]?.toLowerCase() : null;
  if (prevWord && commonBigrams[prevWord]) {
    const expectedNext = commonBigrams[prevWord];
    for (const expected of expectedNext) {
      const dist = damerauLevenshtein(lowerWord, expected.toLowerCase());
      if (dist <= 2) {
        const entry = igboDictionary.find(e => e.word.toLowerCase() === expected.toLowerCase());
        const score = 0.85 + (1 - dist / Math.max(lowerWord.length, expected.length)) * 0.1;
        const existing = suggestions.get(expected);
        if (!existing || existing.score < score) {
          suggestions.set(expected, {
            word: expected,
            meaning: entry?.meaning || "",
            score: parseFloat(score.toFixed(4)),
            method: "Context Attention",
          });
        }
      }
    }
  }

  // Sort by score descending, limit to top 5
  return Array.from(suggestions.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

// ============================================================
// Main Spell Check Function
// ============================================================

export function checkSpelling(text: string): CheckResult {
  const startTime = performance.now();

  // Tokenize
  const wordRegex = /[\wọụịṅạẹọụịṅạẹ]+/gi;
  const rawTokens: { word: string; start: number; end: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = wordRegex.exec(text)) !== null) {
    rawTokens.push({
      word: match[0],
      start: match.index,
      end: match.index + match[0].length,
    });
  }

  const contextWords = rawTokens.map(t => t.word);

  // Build token info with embeddings
  const tokens: TokenInfo[] = rawTokens.map((t, i) => {
    const wordEmb = generateEmbedding(t.word);
    const posEnc = positionalEncoding(i);
    // Combine word embedding + positional encoding
    const combined = wordEmb.map((v, j) => parseFloat((v + posEnc[j]).toFixed(4)));

    return {
      token: t.word,
      isCorrect: dictionaryWordSet.has(t.word.toLowerCase()),
      isPunctuation: false,
      embedding: combined,
      position: i,
    };
  });

  // Compute attention weights
  const attentionWeights = tokens.length > 0 ? computeAttentionWeights(tokens) : [];

  // Find errors
  const errors: SpellError[] = [];

  for (let i = 0; i < rawTokens.length; i++) {
    const t = rawTokens[i];
    const lower = t.word.toLowerCase();

    // Skip single characters and numbers
    if (t.word.length <= 1 || /^\d+$/.test(t.word)) continue;

    // Check if word is in dictionary
    if (!dictionaryWordSet.has(lower)) {
      const suggestions = findSuggestions(t.word, contextWords, i);

      // Determine error type
      let errorType: SpellError["errorType"] = "unknown";
      let confidence = 0.5;

      if (commonMisspellings[lower]) {
        errorType = "misspelling";
        confidence = 0.95;
      } else if (suggestions.length > 0 && suggestions[0].method === "Diacritics Fix") {
        errorType = "diacritics";
        confidence = 0.9;
      } else if (suggestions.length > 0 && suggestions[0].method === "Context Attention") {
        errorType = "context";
        confidence = 0.85;
      } else if (suggestions.length > 0) {
        errorType = "misspelling";
        confidence = suggestions[0].score;
      }

      errors.push({
        word: t.word,
        index: i,
        startPos: t.start,
        endPos: t.end,
        suggestions,
        errorType,
        confidence,
      });
    }
  }

  const endTime = performance.now();
  const totalWords = rawTokens.length;
  const errorCount = errors.length;

  return {
    errors,
    tokens,
    stats: {
      totalWords,
      correctWords: totalWords - errorCount,
      errorCount,
      accuracy: totalWords > 0 ? parseFloat(((1 - errorCount / totalWords) * 100).toFixed(1)) : 100,
      processingTimeMs: parseFloat((endTime - startTime).toFixed(2)),
      attentionLayers: 6, // Simulated 6-layer transformer
    },
    attentionWeights,
  };
}

// ============================================================
// Utility: Get dictionary stats
// ============================================================

export function getDictionaryStats() {
  const categories: Record<string, number> = {};
  const partsOfSpeech: Record<string, number> = {};

  for (const entry of igboDictionary) {
    categories[entry.category] = (categories[entry.category] || 0) + 1;
    partsOfSpeech[entry.partOfSpeech] = (partsOfSpeech[entry.partOfSpeech] || 0) + 1;
  }

  return {
    totalWords: igboDictionary.length,
    categories,
    partsOfSpeech,
    bigramCount: Object.keys(commonBigrams).length,
    misspellingPatterns: Object.keys(commonMisspellings).length,
  };
}

// Get sample text for demo
export function getSampleTexts(): { title: string; text: string }[] {
  return [
    {
      title: "Greeting (with errors)",
      text: "Kidu ka o di? Ututu oma. Daalu nke ukwu.",
    },
    {
      title: "About Family (with errors)",
      text: "Nne mu bu ezigbo nwanyi. Nna mu noro na ulo. Umu nwata na egu egwu.",
    },
    {
      title: "Market Day (with errors)",
      text: "Anyi gara ahia taa. Anyi zuta ji na azu. Ego adi nta.",
    },
    {
      title: "School Life (with errors)",
      text: "Umu aka na agu akwukwo na uloakwukwo. Ha na amu ihe ohuru.",
    },
    {
      title: "Culture & Tradition (with errors)",
      text: "Ndi Igbo nwere omenala di mma. Asusu Igbo bu asusu anyi. Eziokwu bu ndu.",
    },
  ];
}

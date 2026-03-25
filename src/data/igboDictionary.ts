// Copyright © 2026 Roselinemaria Ekwe.
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

//This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Contact me at roselineekwe30@gmail.com for any questions or contributions!

// Comprehensive Igbo Dictionary for Spellchecker
// Words organized by category with meanings and frequency scores

export interface DictionaryEntry {
  word: string;
  meaning: string;
  category: string;
  frequency: number; // 1-10, higher = more common
  partOfSpeech: string;
}

export const igboDictionary: DictionaryEntry[] = [
  // Greetings & Common Phrases
  { word: "nnọọ", meaning: "welcome", category: "greeting", frequency: 10, partOfSpeech: "interjection" },
  { word: "kedu", meaning: "how are you / hello", category: "greeting", frequency: 10, partOfSpeech: "interjection" },
  { word: "daalụ", meaning: "thank you", category: "greeting", frequency: 10, partOfSpeech: "interjection" },
  { word: "biko", meaning: "please", category: "greeting", frequency: 10, partOfSpeech: "adverb" },
  { word: "ndewo", meaning: "hello / greetings", category: "greeting", frequency: 9, partOfSpeech: "interjection" },
  { word: "ụtụtụ", meaning: "morning", category: "time", frequency: 9, partOfSpeech: "noun" },
  { word: "ọma", meaning: "good / beautiful", category: "adjective", frequency: 10, partOfSpeech: "adjective" },
  { word: "ehihie", meaning: "afternoon", category: "time", frequency: 8, partOfSpeech: "noun" },
  { word: "anyasị", meaning: "evening", category: "time", frequency: 8, partOfSpeech: "noun" },
  { word: "ka ọ dị", meaning: "goodbye", category: "greeting", frequency: 9, partOfSpeech: "interjection" },

  // Pronouns
  { word: "mụ", meaning: "I / me", category: "pronoun", frequency: 10, partOfSpeech: "pronoun" },
  { word: "gị", meaning: "you (singular)", category: "pronoun", frequency: 10, partOfSpeech: "pronoun" },
  { word: "ya", meaning: "he / she / it", category: "pronoun", frequency: 10, partOfSpeech: "pronoun" },
  { word: "anyị", meaning: "we / us", category: "pronoun", frequency: 9, partOfSpeech: "pronoun" },
  { word: "unu", meaning: "you (plural)", category: "pronoun", frequency: 9, partOfSpeech: "pronoun" },
  { word: "ha", meaning: "they / them", category: "pronoun", frequency: 9, partOfSpeech: "pronoun" },
  { word: "onye", meaning: "who / person", category: "pronoun", frequency: 9, partOfSpeech: "pronoun" },
  { word: "gịnị", meaning: "what", category: "pronoun", frequency: 8, partOfSpeech: "pronoun" },

  // Common Verbs
  { word: "bịa", meaning: "to come", category: "verb", frequency: 10, partOfSpeech: "verb" },
  { word: "gaa", meaning: "to go", category: "verb", frequency: 10, partOfSpeech: "verb" },
  { word: "rie", meaning: "to eat", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "ṅụọ", meaning: "to drink", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "hụ", meaning: "to see", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "nụ", meaning: "to hear", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "kwuo", meaning: "to say / speak", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "mara", meaning: "to know", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "chọrọ", meaning: "to want / desire", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "nwere", meaning: "to have", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "mere", meaning: "to do / did", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "gụọ", meaning: "to read / count", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "dee", meaning: "to write", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "zụta", meaning: "to buy", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "rere", meaning: "to sell", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "nọ", meaning: "to be / stay", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "sị", meaning: "to say / from", category: "verb", frequency: 9, partOfSpeech: "verb" },
  { word: "nye", meaning: "to give", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "were", meaning: "to take / use", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "kpọ", meaning: "to call", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "malite", meaning: "to begin / start", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "kwụsị", meaning: "to stop", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "raara", meaning: "to love / dedicate", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "hụrụ", meaning: "to love / see (past)", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "gbaa", meaning: "to run", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "zaa", meaning: "to answer", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "jụọ", meaning: "to ask", category: "verb", frequency: 7, partOfSpeech: "verb" },

  // Nouns - People & Family
  { word: "mmadụ", meaning: "person / human being", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "nwoke", meaning: "man", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "nwanyị", meaning: "woman", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "nwa", meaning: "child", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "nne", meaning: "mother", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "nna", meaning: "father", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "nwanne", meaning: "sibling / brother / sister", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "enyi", meaning: "friend / elephant", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ezigbo", meaning: "good / genuine", category: "adjective", frequency: 8, partOfSpeech: "adjective" },
  { word: "ọgọ", meaning: "in-law", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "nwata", meaning: "small child", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "agadi", meaning: "old person", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "eze", meaning: "king / chief / teeth", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "dibia", meaning: "doctor / medicine man", category: "noun", frequency: 7, partOfSpeech: "noun" },

  // Nouns - Nature & Environment
  { word: "ala", meaning: "land / earth", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "mmiri", meaning: "water / rain", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "anyanwụ", meaning: "sun", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ọnwa", meaning: "moon / month", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "kpakpando", meaning: "star", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "osisi", meaning: "tree / wood", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ahịhịa", meaning: "grass", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ọhịa", meaning: "forest / bush", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ugwu", meaning: "hill / mountain / respect", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "osimiri", meaning: "river / ocean", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ikuku", meaning: "wind / air", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ọkụ", meaning: "fire / light", category: "noun", frequency: 8, partOfSpeech: "noun" },

  // Nouns - Body Parts
  { word: "isi", meaning: "head", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "anya", meaning: "eye", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "ntị", meaning: "ear", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "imi", meaning: "nose", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ọnụ", meaning: "mouth", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "aka", meaning: "hand / arm", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "ụkwụ", meaning: "foot / leg", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ahụ", meaning: "body", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "obi", meaning: "heart / compound", category: "noun", frequency: 8, partOfSpeech: "noun" },

  // Nouns - Food & Animals
  { word: "nri", meaning: "food", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "ji", meaning: "yam", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ọka", meaning: "corn / maize", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "akwụkwọ", meaning: "leaf / book / paper", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "anụ", meaning: "meat / animal", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "azụ", meaning: "fish / back", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ọkụkọ", meaning: "chicken / fowl", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ewu", meaning: "goat", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ehi", meaning: "cow", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "nkịta", meaning: "dog", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "pusi", meaning: "cat", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "nnụnụ", meaning: "bird", category: "noun", frequency: 7, partOfSpeech: "noun" },

  // Nouns - Objects & Places
  { word: "ụlọ", meaning: "house / home", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "ụzọ", meaning: "road / way / door", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ahịa", meaning: "market", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ụka", meaning: "church", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ụlọakwụkwọ", meaning: "school", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "obodo", meaning: "town / country", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ọrụ", meaning: "work / job", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ego", meaning: "money", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "akwa", meaning: "cloth / egg / bed / cry", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ihe", meaning: "thing / something", category: "noun", frequency: 10, partOfSpeech: "noun" },
  { word: "oge", meaning: "time", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ebe", meaning: "place / where", category: "noun", frequency: 9, partOfSpeech: "noun" },

  // Numbers
  { word: "otu", meaning: "one", category: "number", frequency: 8, partOfSpeech: "numeral" },
  { word: "abụọ", meaning: "two", category: "number", frequency: 8, partOfSpeech: "numeral" },
  { word: "atọ", meaning: "three", category: "number", frequency: 8, partOfSpeech: "numeral" },
  { word: "anọ", meaning: "four", category: "number", frequency: 8, partOfSpeech: "numeral" },
  { word: "ise", meaning: "five", category: "number", frequency: 8, partOfSpeech: "numeral" },
  { word: "isii", meaning: "six", category: "number", frequency: 7, partOfSpeech: "numeral" },
  { word: "asaa", meaning: "seven", category: "number", frequency: 7, partOfSpeech: "numeral" },
  { word: "asatọ", meaning: "eight", category: "number", frequency: 7, partOfSpeech: "numeral" },
  { word: "iteghete", meaning: "nine", category: "number", frequency: 7, partOfSpeech: "numeral" },
  { word: "iri", meaning: "ten", category: "number", frequency: 7, partOfSpeech: "numeral" },

  // Adjectives & Descriptors
  { word: "ukwu", meaning: "big / large", category: "adjective", frequency: 8, partOfSpeech: "adjective" },
  { word: "nta", meaning: "small / little", category: "adjective", frequency: 8, partOfSpeech: "adjective" },
  { word: "ọhụrụ", meaning: "new", category: "adjective", frequency: 7, partOfSpeech: "adjective" },
  { word: "ochie", meaning: "old / ancient", category: "adjective", frequency: 7, partOfSpeech: "adjective" },
  { word: "ọcha", meaning: "white / clean", category: "adjective", frequency: 7, partOfSpeech: "adjective" },
  { word: "ojii", meaning: "black / dark", category: "adjective", frequency: 7, partOfSpeech: "adjective" },
  { word: "ọjọọ", meaning: "bad / ugly", category: "adjective", frequency: 7, partOfSpeech: "adjective" },
  { word: "mma", meaning: "beauty / good / knife", category: "adjective", frequency: 8, partOfSpeech: "adjective" },
  { word: "ike", meaning: "strength / power", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ụtọ", meaning: "sweetness / pleasant", category: "adjective", frequency: 7, partOfSpeech: "adjective" },

  // Conjunctions & Prepositions
  { word: "na", meaning: "and / in / at", category: "conjunction", frequency: 10, partOfSpeech: "conjunction" },
  { word: "ma", meaning: "but / if / or", category: "conjunction", frequency: 9, partOfSpeech: "conjunction" },
  { word: "ọ", meaning: "he / she / it", category: "pronoun", frequency: 10, partOfSpeech: "pronoun" },
  { word: "ka", meaning: "that / let / than", category: "conjunction", frequency: 9, partOfSpeech: "conjunction" },
  { word: "mgbe", meaning: "when / time", category: "conjunction", frequency: 8, partOfSpeech: "conjunction" },
  { word: "maka", meaning: "because / about", category: "conjunction", frequency: 8, partOfSpeech: "conjunction" },
  { word: "site", meaning: "from / through", category: "preposition", frequency: 7, partOfSpeech: "preposition" },

  // Adverbs
  { word: "ugbu", meaning: "now", category: "adverb", frequency: 8, partOfSpeech: "adverb" },
  { word: "taa", meaning: "today", category: "adverb", frequency: 8, partOfSpeech: "adverb" },
  { word: "echi", meaning: "tomorrow", category: "adverb", frequency: 8, partOfSpeech: "adverb" },
  { word: "ụnyahụ", meaning: "yesterday", category: "adverb", frequency: 7, partOfSpeech: "adverb" },
  { word: "nke", meaning: "which / that / of", category: "adverb", frequency: 9, partOfSpeech: "adverb" },
  { word: "ọzọ", meaning: "again / another", category: "adverb", frequency: 8, partOfSpeech: "adverb" },
  { word: "niile", meaning: "all", category: "adverb", frequency: 8, partOfSpeech: "adverb" },

  // Abstract Nouns
  { word: "udo", meaning: "peace", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ịhụnanya", meaning: "love", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "eziokwu", meaning: "truth", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "amamihe", meaning: "wisdom", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ndụ", meaning: "life", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ọnwụ", meaning: "death", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "ụjọ", meaning: "fear", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "aṅụrị", meaning: "joy / happiness", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "nsogbu", meaning: "problem / trouble", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "nkwurịta", meaning: "conversation", category: "noun", frequency: 6, partOfSpeech: "noun" },

  // Additional common words
  { word: "Chineke", meaning: "God / Creator", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "Chukwu", meaning: "God (Supreme)", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "asụsụ", meaning: "language", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "Igbo", meaning: "Igbo (language/people)", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "akụkọ", meaning: "story / news", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "egwu", meaning: "music / dance / fear", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "mmụta", meaning: "learning / education", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "okwu", meaning: "word / speech", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "aha", meaning: "name", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ụbọchị", meaning: "day", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "abalị", meaning: "night", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "afọ", meaning: "year / stomach", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "izu", meaning: "week", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "nkwenye", meaning: "belief / faith", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "omenala", meaning: "tradition / culture", category: "noun", frequency: 7, partOfSpeech: "noun" },
  { word: "nchekwa", meaning: "protection / savings", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "njem", meaning: "journey / travel", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "agha", meaning: "war / battle", category: "noun", frequency: 6, partOfSpeech: "noun" },
  { word: "ala", meaning: "land / ground", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "chi", meaning: "God / spirit / morning", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "ndị", meaning: "people / those", category: "noun", frequency: 9, partOfSpeech: "noun" },
  { word: "ụmụ", meaning: "children / offspring", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "akwụkwọ", meaning: "book / paper / leaf", category: "noun", frequency: 8, partOfSpeech: "noun" },
  { word: "dị", meaning: "is / be / husband", category: "verb", frequency: 10, partOfSpeech: "verb" },
  { word: "bụ", meaning: "is / am (identity)", category: "verb", frequency: 10, partOfSpeech: "verb" },
  { word: "ghị", meaning: "not (negation suffix)", category: "suffix", frequency: 9, partOfSpeech: "suffix" },
  { word: "kwụ", meaning: "to stand / pay", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "nọrọ", meaning: "stayed / sat", category: "verb", frequency: 7, partOfSpeech: "verb" },
  { word: "mere", meaning: "did / happened", category: "verb", frequency: 8, partOfSpeech: "verb" },
  { word: "maara", meaning: "knows / knew", category: "verb", frequency: 7, partOfSpeech: "verb" },
];

// Build a quick lookup set of all dictionary words (lowercase)
export const dictionaryWordSet = new Set(
  igboDictionary.map(e => e.word.toLowerCase())
);

// Common Igbo bigrams (word pairs that frequently appear together)
export const commonBigrams: Record<string, string[]> = {
  "kedu": ["ka", "ihe", "aha"],
  "ụtụtụ": ["ọma"],
  "ka": ["ọ", "anyị", "a"],
  "na": ["ụlọ", "ahịa", "obodo", "ụlọakwụkwọ"],
  "ọ": ["bụ", "dị", "nwere", "mere", "gara", "hụrụ", "na"],
  "ndị": ["mmadụ", "Igbo", "obodo", "ụmụ"],
  "ụmụ": ["nwoke", "nwanyị", "nta", "aka"],
  "ihe": ["ọma", "ọjọọ", "niile"],
  "nke": ["a", "ọma", "ọzọ"],
  "dị": ["mma", "ụtọ", "ike", "ukwu", "nta"],
  "bụ": ["onye", "ihe", "eze"],
  "nwere": ["ike", "ego", "obi"],
  "ezigbo": ["enyi", "mmadụ", "nri", "obodo"],
};

// Common Igbo sentence patterns for context checking
export const sentencePatterns = [
  ["kedu", "ka", "ọ", "dị"],
  ["ụtụtụ", "ọma"],
  ["daalụ", "nke", "ukwu"],
  ["ọ", "bụ", "onye"],
  ["ọ", "dị", "mma"],
  ["ndị", "Igbo"],
  ["biko", "nye", "mụ"],
  ["anyị", "na", "gaa"],
  ["ihe", "niile", "dị", "mma"],
];

// Common misspelling patterns in Igbo
export const commonMisspellings: Record<string, string> = {
  "kidu": "kedu",
  "nno": "nnọọ",
  "nnoo": "nnọọ",
  "daalu": "daalụ",
  "dalu": "daalụ",
  "ututu": "ụtụtụ",
  "oma": "ọma",
  "mmadu": "mmadụ",
  "nwanyi": "nwanyị",
  "ulo": "ụlọ",
  "uzo": "ụzọ",
  "oru": "ọrụ",
  "oku": "ọkụ",
  "onu": "ọnụ",
  "ahu": "ahụ",
  "ukwu": "ụkwụ",
  "uka": "ụka",
  "ndi": "ndị",
  "umu": "ụmụ",
  "ubochi": "ụbọchị",
  "ozo": "ọzọ",
  "ihunanya": "ịhụnanya",
  "onwu": "ọnwụ",
  "ujo": "ụjọ",
  "anuri": "aṅụrị",
  "oji": "ojii",
  "ocha": "ọcha",
  "ojoo": "ọjọọ",
  "ohuru": "ọhụrụ",
  "nuo": "ṅụọ",
  "guo": "gụọ",
  "juo": "jụọ",
  "anyanwu": "anyanwụ",
  "onwa": "ọnwa",
  "ohia": "ọhịa",
  "ahia": "ahịa",
  "nti": "ntị",
  "uto": "ụtọ",
  "choro": "chọrọ",
  "kpo": "kpọ",
  "kwusi": "kwụsị",
  "cho": "chọ",
  "biaa": "bịa",
  "bia": "bịa",
  "ahuu": "ahụ",
  "oka": "ọka",
  "okuko": "ọkụkọ",
  "nkita": "nkịta",
  "asuu": "asụsụ",
  "asusu": "asụsụ",
  "akuko": "akụkọ",
  "akwukwo": "akwụkwọ",
  "ndu": "ndụ",
  "bu": "bụ",
  "di": "dị",
  "gi": "gị",
  "gini": "gịnị",
  "si": "sị",
  "chi": "chi",
  "abu": "abụọ",
  "abuo": "abụọ",
  "ato": "atọ",
  "ano": "anọ",
  "asato": "asatọ",
};

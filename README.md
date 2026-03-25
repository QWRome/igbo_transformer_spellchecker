# igbo_transformer_spellchecker
A transformer-inspired spell checker for the Igbo language, built with React, TypeScript, and Tailwind CSS.

![Igbo SpellCheck AI](https://img.shields.io/badge/Language-Igbo-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running in VS Code](#running-in-vs-code)
  - [Building for Production](#building-for-production)
- [How It Works](#-how-it-works)
  - [Tokenization](#1-tokenization)
  - [Embedding Generation](#2-embedding-generation)
  - [Self-Attention Mechanism](#3-self-attention-mechanism)
  - [Igbo-Aware Edit Distance](#4-igbo-aware-edit-distance)
  - [Phonetic Matching](#5-phonetic-matching)
  - [Beam Search](#6-beam-search)
  - [Bigram Context Model](#7-bigram-context-model)
- [Dictionary](#-dictionary)
- [Sample Usage](#-sample-usage)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🌍 Overview

**Igbo SpellChecker** is a web-based natural language processing (NLP) application that performs real-time spell checking for the **Igbo language** — one of the major languages of Nigeria spoken by approximately 45 million people.

The application uses a **transformer-inspired machine learning architecture** that combines multiple NLP techniques including self-attention mechanisms, character-level embeddings, phonetic matching, and contextual beam search to provide accurate spelling suggestions for Igbo text. 

Unlike simple dictionary-lookup spell checkers, this engine understands the unique characteristics of the Igbo language, including:

- **Diacritical marks** (ị, ọ, ụ, ṅ) — critical for meaning distinction in Igbo
- **Digraph consonants** (ch, sh, gh, kw, gw, nw, ny) — common in Igbo orthography
- **Tonal context** — contextual co-occurrence patterns between words

---

## ✨ Features

### Core Spell Checking
- ✅ **Real-time spell checking** with debounced analysis
- ✅ **170+ word Igbo dictionary** with English translations
- ✅ **Igbo-specific diacritic awareness** — detects missing ọ, ụ, ị, ṅ marks
- ✅ **Multiple suggestion methods** — edit distance, phonetic, diacritic, and contextual
- ✅ **One-click suggestion application** — click any suggestion to auto-correct
- ✅ **Confidence scoring** — each correction comes with a confidence percentage

### NLP Engine
- 🧠 **Transformer-inspired architecture** with self-attention
- 🧠 **16-dimensional sinusoidal character embeddings**
- 🧠 **Beam search** (width=6) combining all scoring signals
- 🧠 **Bigram context modeling** for word co-occurrence scoring
- 🧠 **Phonetic similarity** via custom Igbo soundex algorithm
- 🧠 **Modified Levenshtein distance** with reduced cost for diacritic swaps

### Interactive UI
- 🎨 **Dark neural-network theme** with animated particle background
- 🎨 **Self-attention heatmap** — visual matrix of token-to-token attention weights
- 🎨 **Token embedding visualization** — color-coded 16-dim vectors
- 🎨 **NLP pipeline diagram** — interactive, collapsible architecture view
- 🎨 **Igbo special character keyboard** — quick-insert buttons for ị, ọ, ụ, ṅ
- 🎨 **Dictionary explorer** — searchable, filterable dictionary with category color coding
- 🎨 **Model dashboard** — real-time accuracy gauge, metrics grid
- 🎨 **Sample texts** — pre-loaded examples with intentional errors for demo

---

## 🏗 Architecture

The application follows a modular architecture with a clear separation between the NLP engine and the UI layer.

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│  ┌──────────┐  ┌───────────────┐  ┌──────────┐  ┌───────────┐  │
│  │   Text   │  │    Token      │  │ Attention│  │  Model    │  │
│  │  Editor  │  │   Analysis    │  │ Heatmap  │  │ Dashboard │  │
│  └────┬─────┘  └───────┬───────┘  └────┬─────┘  └─────┬─────┘  │
│       │                │               │               │        │
│  ┌────┴────────────────┴───────────────┴───────────────┴─────┐  │
│  │                     App Component                         │  │
│  └──────────────────────────┬────────────────────────────────┘  │
│                             │                                   │
├─────────────────────────────┼───────────────────────────────────┤
│                    NLP ENGINE LAYER                              │
│  ┌──────────────────────────┴────────────────────────────────┐  │
│  │                   Transformer Engine                       │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │  │
│  │  │ Tokenizer  │→ │ Embedding  │→ │ Self-Attention     │   │  │
│  │  │            │  │ Generator  │  │ (Softmax + Decay)  │   │  │
│  │  └────────────┘  └────────────┘  └────────────────────┘   │  │
│  │  ┌────────────┐  ┌────────────┐  ┌────────────────────┐   │  │
│  │  │ Edit Dist  │  │ Phonetic   │  │ Beam Search        │   │  │
│  │  │ (Igbo-     │  │ Matching   │  │ (width=6)          │   │  │
│  │  │  aware)    │  │ (Soundex)  │  │                    │   │  │
│  │  └────────────┘  └────────────┘  └────────────────────┘   │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                  │
├──────────────────────────────────────────────────────────────────┤
│                       DATA LAYER                                 │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  Igbo Dictionary (170+ words, 12+ categories)             │  │
│  │  Bigram Tables • Special Characters • Frequency Scores    │  │
│  └───────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Technology         | Purpose                           | Version |
|--------------------|-----------------------------------|---------|
| **React**          | UI framework                      | 19.x    |
| **TypeScript**     | Type-safe development             | 5.x     |
| **Vite**           | Build tool & dev server           | 7.x     |
| **Tailwind CSS**   | Utility-first styling             | 4.x     |
| **Framer Motion**  | Animations & transitions          | 12.x    |
| **Lucide React**   | Icon library                      | 0.577+  |
| **clsx + tailwind-merge** | Conditional class utility  | -       |

---

## 📁 Project Structure

```
igbo_transformer_spellchecker/
├── public/                        # Static assets
├── src/
│   ├── components/                # React UI components
│   │   ├── AttentionHeatmap.tsx   # Self-attention weight visualization
│   │   ├── DictionaryExplorer.tsx # Searchable dictionary browser
│   │   ├── ModelDashboard.tsx     # Model metrics & architecture view
│   │   ├── NeuralBackground.tsx   # Animated particle background
│   │   ├── TextEditor.tsx         # Main text input with Igbo keyboard
│   │   └── TokenAnalysis.tsx      # Per-token analysis & suggestions
│   ├── data/
│   │   └── igboDictionary.ts      # Igbo word database (170+ entries)
│   ├── engine/
│   │   └── transformer.ts         # Core NLP spell-check engine
│   ├── utils/
│   │   └── cn.ts                  # Tailwind class merge utility
│   ├── App.tsx                    # Main application component
│   ├── index.css                  # Global styles
│   └── main.tsx                   # React entry point
├── index.html                     # HTML entry point
├── package.json                   # Dependencies & scripts
├── tailwind.config.ts             # Tailwind configuration
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite build configuration
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** — version 18.x or higher ([download](https://nodejs.org/))
- **npm** — version 9.x or higher (comes with Node.js)
- **VS Code** — recommended editor ([download](https://code.visualstudio.com/))

You can verify your installations by running:

```bash
node --version    # Should output v18.x.x or higher
npm --version     # Should output 9.x.x or higher
```

### Installation

1. **Clone the repository** (or download the project folder):

   ```bash
   git clone https://github.com/yourusername/igbo-spellcheck-ai.git
   cd igbo-spellcheck-ai
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

   This will install all required packages listed in `package.json`.

### Running in VS Code

Follow these step-by-step instructions to run the project from VS Code:

1. **Open the project folder in VS Code:**
   - Launch VS Code
   - Go to **File → Open Folder** (or press `Ctrl+K Ctrl+O`)
   - Navigate to the `igbo-spellcheck-ai` folder and select it

2. **Open the integrated terminal:**
   - Press `` Ctrl+` `` (backtick) to toggle the terminal
   - Or go to **Terminal → New Terminal** from the menu bar

3. **Install dependencies** (first time only):

   ```bash
   npm install
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. **Open in browser:**
   - The terminal will display a local URL, typically:
     ```
     ➜  Local:   http://localhost:5173/
     ```
   - **Ctrl+Click** the URL in the terminal to open it in your browser
   - Or manually open your browser and navigate to `http://localhost:5173`

6. **Live reload:**
   - Any changes you make to the source files will automatically reload in the browser
   - No need to restart the server

7. **Stop the server:**
   - Press `Ctrl+C` in the terminal to stop the dev server

### Recommended VS Code Extensions

For the best development experience, install these extensions:

| Extension | ID | Purpose |
|-----------|-----|---------|
| **ESLint** | `dbaeumer.vscode-eslint` | JavaScript/TypeScript linting |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Tailwind class autocomplete |
| **TypeScript Importer** | `pmneo.tsimporter` | Auto-import TypeScript modules |
| **Prettier** | `esbenp.prettier-vscode` | Code formatting |

### Building for Production

To create an optimized production build:

```bash
npm run build
```

This generates a `dist/` folder containing the static files. To preview the production build locally:

```bash
npm run preview
```

---

## 🔬 How It Works

The spell-check engine (`src/engine/transformer.ts`) implements a multi-stage NLP pipeline:

### 1. Tokenization

```
Input: "Kedu ka ị mere"
Output: ["Kedu", "ka", "ị", "mere"]
```

The tokenizer splits text by whitespace and punctuation while preserving Igbo word boundaries. It handles Igbo-specific characters (ị, ọ, ụ, ṅ) as valid word characters.

### 2. Embedding Generation

Each token is converted into a **16-dimensional vector** using sinusoidal positional encoding (inspired by [Vaswani et al., 2017](https://arxiv.org/abs/1706.03762)):

```
embedding[d] += sin(charCode × (d+1) × 0.1) × cos(position × (d+1) × 0.15)
```

The embedding captures both character identity and positional information within the word. Vectors are L2-normalized.

### 3. Self-Attention Mechanism

Token-to-token attention weights are computed using **scaled dot-product attention** with positional decay:

```
attention(i,j) = softmax(dot(embed_i, embed_j) × exp(-|i-j| × 0.3))
```

- **Dot product** measures semantic similarity between token embeddings
- **Positional decay** reduces attention strength for distant tokens
- **Softmax normalization** ensures attention weights sum to 1 per row

The resulting attention matrix is visualized as an interactive heatmap in the UI.

### 4. Igbo-Aware Edit Distance

A modified **Levenshtein distance** algorithm with Igbo-specific character awareness:

| Operation | Standard Cost | Igbo Cost |
|-----------|:---:|:---:|
| Insertion | 1 | 1 |
| Deletion | 1 | 1 |
| Substitution (general) | 1 | 1 |
| Substitution (diacritic pair: i↔ị, o↔ọ, u↔ụ, n↔ṅ) | 1 | **0.5** |

This reduced cost for diacritic swaps means the engine prioritizes diacritic corrections — which are the most common errors when typing Igbo on a standard keyboard.

### 5. Phonetic Matching

A custom **Igbo Soundex** algorithm maps phonetically similar characters to the same representation:

```
ch → C    sh → S    gh → G    kw → K
gw → G    nw → N    ny → N
ị,i → I   ọ,o → O   ụ,u → U   ṅ,ñ,n → N
```

Words with the same phonetic code are considered phonetically similar and receive a bonus score.

### 6. Beam Search

A **beam search** algorithm (width=6) explores the dictionary to find the best correction candidates. Each candidate is scored using a weighted combination of:

| Signal | Weight | Description |
|--------|:---:|-------------|
| Edit Distance Score | 40% | `1 - (editDist / maxLen)` |
| Word Frequency | 20% | How common the word is in Igbo (1-10 scale) |
| Phonetic Match | 25% bonus | Same Igbo Soundex code |
| Diacritic Match | 30% bonus | Differs only by diacritical marks |
| Contextual Match | 15% bonus | Appears in bigram table with previous word |
| Length Similarity | 5% bonus | Within ±1 character of input |
| First Char Match | 10% bonus | Same starting character |

### 7. Bigram Context Model

The engine uses a **bigram co-occurrence table** to provide contextual suggestions. For example:

```
"kedu" → commonly followed by: ["ka", "ihe", "ebe", "mgbe", "onye"]
"ọ"    → commonly followed by: ["bụ", "nọ", "na", "ga-", "mere", ...]
"biko" → commonly followed by: ["nye", "mee", "bịa", "gaa"]
```

If the previous word exists in the bigram table, candidate suggestions matching expected next words receive a contextual bonus.

---

## 📖 Dictionary

The Igbo dictionary (`src/data/igboDictionary.ts`) contains **170+ words** organized into **12+ categories**:

| Category | Count | Examples |
|----------|:---:|---------|
| **Greetings** | 5+ | nnọọ (welcome), kedu (how are you), daalụ (thank you) |
| **Pronouns** | 9+ | mụ (I), gị (you), ya (he/she), anyị (we), ha (they) |
| **Verbs** | 50+ | bịa (come), gaa (go), mee (do), ri (eat), dee (write) |
| **Nouns - People** | 14+ | nne (mother), nna (father), nwa (child), enyi (friend) |
| **Nouns - Body** | 8+ | isi (head), anya (eye), aka (hand), obi (heart) |
| **Nouns - Nature** | 12+ | mmiri (water), anyanwụ (sun), osisi (tree), ụlọ (house) |
| **Nouns - Food** | 9+ | nri (food), ji (yam), ofe (soup), anụ (meat) |
| **Nouns - Abstract** | 16+ | ọrụ (work), ego (money), udo (peace), ịhụnanya (love) |
| **Adjectives** | 9+ | ukwu (big), nta (small), ọma (good), ọjọọ (bad) |
| **Numbers** | 12 | otu (1), abụọ (2), atọ (3), anọ (4), ise (5), iri (10) |
| **Conjunctions** | 3+ | na (and), ma (but), mana (however) |
| **Adverbs** | 7+ | ugbu (now), echi (tomorrow), ọzọ (again), niile (all) |
| **Prepositions** | 5+ | nʼime (inside), nʼelu (on top), nʼokpuru (under) |

Each word entry includes:
- **word** — the correctly spelled Igbo word with proper diacritics
- **category** — grammatical category (noun, verb, adjective, etc.)
- **frequency** — commonality score from 1 (rare) to 10 (very common)
- **english** — English translation

---

## 💡 Sample Usage

### Example 1: Missing Diacritics
```
Input:  "Kedu ka i mere"
Issue:  "i" should be "ị"
Output: Suggests "ị" with method "diacritic" (high confidence)
```

### Example 2: Phonetic Misspelling
```
Input:  "Biko bia n'ulo"
Issue:  "bia" → "bịa", "n'ulo" → not in dictionary
Output: Suggests "bịa" (phonetic match), context-aware ordering
```

### Example 3: Context-Aware Suggestion
```
Input:  "Kedu ka ..."
Engine: Recognizes "kedu" is commonly followed by "ka", "ihe", "ebe"
Result: Contextual scoring boosts appropriate next-word suggestions
```

### Try the Built-in Sample Texts

The app includes **5 pre-loaded sample texts** with intentional errors that you can click to load instantly. These demonstrate various error types and correction capabilities.

---

## 📸 Screenshots

The application features three main tabs:

### 🖊️ Editor Tab
- Text input area with Igbo special character keyboard (ị, ọ, ụ, ṅ)
- Real-time analysis with color-coded error highlighting
- Token-by-token analysis panel with expandable suggestions
- Attention heatmap visualization

### 📚 Dictionary Explorer Tab
- Full searchable dictionary with category filtering
- Color-coded category badges
- Frequency bars showing word commonality
- English translations for all words

### ℹ️ About Tab
- Model architecture diagram
- NLP pipeline visualization (collapsible stages)
- Performance metrics and configuration details

---

## 🤝 Contributing

Contributions are welcome! Here are some ways to help:

### Adding Words to the Dictionary

1. Open `src/data/igboDictionary.ts`
2. Add entries to the `igboDictionary` array:

   ```typescript
   { word: "your_igbo_word", category: "noun", frequency: 7, english: "english meaning" }
   ```

3. Valid categories: `greeting`, `pronoun`, `verb`, `noun`, `adjective`, `number`, `conjunction`, `particle`, `adverb`, `preposition`, `prefix`, `time`

### Adding Bigram Patterns

1. Open `src/data/igboDictionary.ts`
2. Add entries to the `igboBigrams` object:

   ```typescript
   "word": ["commonly", "following", "words"]
   ```

### Improving the Engine

- Enhance the phonetic matching in `igboPhonetic()` function
- Add more character similarity pairs in `igboEditDistance()`
- Tune the scoring weights in `beamSearchSuggestions()`
- Increase beam width for more thorough search (at cost of speed)

---

## 📄 License



---

## 🙏 Acknowledgments

- **Igbo language resources** — Based on standard Igbo orthography (Ọnwụ orthography)
- **Transformer architecture** — Inspired by ["Attention Is All You Need" (Vaswani et al., 2017)](https://arxiv.org/abs/1706.03762)
- **React ecosystem** — Built with React 19, Vite 7, and Tailwind CSS 4
- **Igbo NLP community** — For ongoing efforts to digitize and preserve the Igbo language

---

<div align="center">

**Built with ❤️ for the Igbo language**

*Asụsụ Igbo ga-adị ndụ* — The Igbo language will live on.

</div>

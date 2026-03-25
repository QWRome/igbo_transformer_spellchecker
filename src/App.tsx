// Copyright © 2026 Roselinemaria Ekwe.
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

//This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Contact me at roselineekwe30@gmail.com for any questions or contributions!

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Zap,
  BarChart3,
  BookOpen,
  RotateCcw,
  Clipboard,
  CheckCheck,
  ChevronDown,
  Layers,
  Globe,
  Cpu,
  ArrowRight,
  Sparkles,
  FileText,
  Info,
} from "lucide-react";
import {
  checkSpelling,
  getDictionaryStats,
  getSampleTexts,
  type CheckResult,
  type SpellError,
} from "./utils/transformer";
import ErrorPanel from "./components/ErrorPanel";
import TransformerVisual from "./components/TransformerVisual";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [selectedErrorIndex, setSelectedErrorIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"errors" | "model" | "stats">("errors");
  const [copied, setCopied] = useState(false);
  const [showSamples, setShowSamples] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const dictStats = getDictionaryStats();
  const sampleTexts = getSampleTexts();

  // Auto-check with debounce
  useEffect(() => {
    if (!text.trim()) {
      setResult(null);
      return;
    }
    const timer = setTimeout(() => {
      runCheck();
    }, 400);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  const runCheck = useCallback(() => {
    if (!text.trim()) return;
    setIsChecking(true);
    // Small delay for animation effect
    setTimeout(() => {
      const checkResult = checkSpelling(text);
      setResult(checkResult);
      setIsChecking(false);
      setSelectedErrorIndex(null);
    }, 150);
  }, [text]);

  const applyFix = useCallback(
    (error: SpellError, suggestion: string) => {
      const newText =
        text.slice(0, error.startPos) + suggestion + text.slice(error.endPos);
      setText(newText);
    },
    [text]
  );

  const applyAllFixes = useCallback(() => {
    if (!result) return;
    let newText = text;
    // Apply fixes from end to start to preserve positions
    const sortedErrors = [...result.errors]
      .filter((e) => e.suggestions.length > 0)
      .sort((a, b) => b.startPos - a.startPos);

    for (const error of sortedErrors) {
      newText =
        newText.slice(0, error.startPos) +
        error.suggestions[0].word +
        newText.slice(error.endPos);
    }
    setText(newText);
  }, [text, result]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [text]);

  const handleSyncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  // Build highlighted text
  const getHighlightedHTML = () => {
    if (!result || result.errors.length === 0) return text;
    let html = "";
    let lastEnd = 0;
    const sortedErrors = [...result.errors].sort(
      (a, b) => a.startPos - b.startPos
    );
    for (const error of sortedErrors) {
      html += escapeHtml(text.slice(lastEnd, error.startPos));
      const colorClass =
        error.errorType === "diacritics"
          ? "error-diacritics"
          : error.errorType === "context"
          ? "error-context"
          : error.errorType === "unknown"
          ? "error-unknown"
          : "error-spelling";
      html += `<mark class="${colorClass}">${escapeHtml(error.word)}</mark>`;
      lastEnd = error.endPos;
    }
    html += escapeHtml(text.slice(lastEnd));
    return html;
  };

  function escapeHtml(str: string) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br/>");
  }

  const errorsByType = result
    ? {
        misspelling: result.errors.filter((e) => e.errorType === "misspelling").length,
        diacritics: result.errors.filter((e) => e.errorType === "diacritics").length,
        context: result.errors.filter((e) => e.errorType === "context").length,
        unknown: result.errors.filter((e) => e.errorType === "unknown").length,
      }
    : null;

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white font-['Inter',sans-serif] overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: "2s" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800/50 backdrop-blur-xl bg-gray-900/30">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full" />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                    Igbo SpellCheck
                  </span>
                  <span className="text-gray-500 font-normal text-sm ml-2 hidden sm:inline">
                    Transformer NLP
                  </span>
                </h1>
                <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-medium">
                  Neural Spell Correction Engine
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="p-2 rounded-lg text-gray-500 hover:text-gray-300 hover:bg-gray-800/50 transition-all"
                title="About"
              >
                <Info className="w-4 h-4" />
              </button>
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-gray-600 bg-gray-800/30 rounded-full px-3 py-1.5 border border-gray-800/50">
                <Cpu className="w-3 h-3" />
                <span>6-Layer Transformer</span>
                <span className="text-gray-700">•</span>
                <Globe className="w-3 h-3" />
                <span>{dictStats.totalWords} words</span>
              </div>
            </div>
          </div>

          {/* About panel */}
          <AnimatePresence>
            {showAbout && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-4 p-4 rounded-xl bg-gray-800/30 border border-gray-700/50 text-sm text-gray-400 leading-relaxed">
                  <p className="mb-2">
                    <strong className="text-emerald-400">Igbo SpellCheck</strong> is a transformer-based spell correction engine
                    for the Igbo language — one of Africa's most spoken languages with over 44 million speakers.
                  </p>
                  <p className="mb-2">
                    The system uses <strong className="text-gray-300">self-attention mechanisms</strong>,{" "}
                    <strong className="text-gray-300">positional encodings</strong>, and{" "}
                    <strong className="text-gray-300">contextual embeddings</strong> to detect and correct spelling errors,
                    missing diacritical marks (ọ, ụ, ị, ṅ), and contextual misuses.
                  </p>
                  <p className="text-xs text-gray-500">
                    Built with multi-head attention, Damerau-Levenshtein distance, bigram context modeling, and diacritics-aware matching.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 py-6">
        {/* Top Stats Bar */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              className="mb-5"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  {
                    label: "Words Analyzed",
                    value: result.stats.totalWords,
                    icon: FileText,
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    label: "Errors Found",
                    value: result.stats.errorCount,
                    icon: Zap,
                    color: result.stats.errorCount > 0 ? "from-red-500 to-pink-500" : "from-emerald-500 to-green-500",
                  },
                  {
                    label: "Accuracy",
                    value: `${result.stats.accuracy}%`,
                    icon: BarChart3,
                    color: result.stats.accuracy >= 80 ? "from-emerald-500 to-teal-500" : "from-amber-500 to-orange-500",
                  },
                  {
                    label: "Latency",
                    value: `${result.stats.processingTimeMs}ms`,
                    icon: Cpu,
                    color: "from-purple-500 to-violet-500",
                  },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-gray-800/20 backdrop-blur-sm rounded-xl border border-gray-800/50 p-3 flex items-center gap-3"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{stat.value}</div>
                      <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Panel - Text Editor */}
          <div className="lg:col-span-7 space-y-4">
            {/* Sample texts dropdown */}
            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative">
                <button
                  onClick={() => setShowSamples(!showSamples)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 text-xs text-gray-400 hover:text-white hover:border-gray-600 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Sample Texts</span>
                  <ChevronDown className={`w-3 h-3 transition-transform ${showSamples ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {showSamples && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="absolute top-full left-0 mt-1 z-30 w-72 bg-gray-900 border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {sampleTexts.map((sample, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setText(sample.text);
                            setShowSamples(false);
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-800/50 transition-colors border-b border-gray-800/50 last:border-b-0"
                        >
                          <div className="text-xs font-medium text-gray-300">{sample.title}</div>
                          <div className="text-[10px] text-gray-600 mt-0.5 truncate">{sample.text}</div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex-1" />

              {result && result.errors.length > 0 && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={applyAllFixes}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-400 hover:bg-emerald-500/30 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Fix All ({result.errors.filter(e => e.suggestions.length > 0).length})
                </motion.button>
              )}

              <button
                onClick={handleCopy}
                disabled={!text}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 text-xs text-gray-400 hover:text-white disabled:opacity-30 transition-all"
              >
                {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Clipboard className="w-3.5 h-3.5" />}
                {copied ? "Copied!" : "Copy"}
              </button>

              <button
                onClick={() => { setText(""); setResult(null); }}
                disabled={!text}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 text-xs text-gray-400 hover:text-white disabled:opacity-30 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Clear
              </button>
            </div>

            {/* Text Editor with Highlights */}
            <div className="relative rounded-2xl border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/20">
              {/* Editor toolbar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-gray-800/30 bg-gray-900/30">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-[10px] text-gray-600 ml-2 font-mono">igbo-spellcheck.txt</span>
                <div className="flex-1" />
                {isChecking && (
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                    Analyzing...
                  </div>
                )}
              </div>

              {/* Text area with highlight overlay */}
              <div className="relative min-h-[300px] sm:min-h-[400px]">
                {/* Highlight layer */}
                <div
                  ref={highlightRef}
                  className="absolute inset-0 px-5 py-4 text-base leading-7 font-['JetBrains_Mono',monospace] whitespace-pre-wrap break-words pointer-events-none overflow-hidden text-transparent"
                  dangerouslySetInnerHTML={{ __html: getHighlightedHTML() }}
                />
                {/* Textarea */}
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onScroll={handleSyncScroll}
                  placeholder="Dee okwu Igbo ebe a... (Type Igbo text here...)"
                  className="relative w-full min-h-[300px] sm:min-h-[400px] px-5 py-4 bg-transparent text-base leading-7 text-gray-200 font-['JetBrains_Mono',monospace] placeholder-gray-700 resize-none focus:outline-none caret-emerald-400"
                  spellCheck={false}
                />
              </div>

              {/* Error type legend */}
              {result && result.errors.length > 0 && (
                <div className="flex items-center gap-4 px-4 py-2 border-t border-gray-800/30 bg-gray-900/20 flex-wrap">
                  {errorsByType && errorsByType.misspelling > 0 && (
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-red-500/40 border border-red-500/60" />
                      Misspelling ({errorsByType.misspelling})
                    </span>
                  )}
                  {errorsByType && errorsByType.diacritics > 0 && (
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/40 border border-amber-500/60" />
                      Diacritics ({errorsByType.diacritics})
                    </span>
                  )}
                  {errorsByType && errorsByType.context > 0 && (
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/40 border border-blue-500/60" />
                      Context ({errorsByType.context})
                    </span>
                  )}
                  {errorsByType && errorsByType.unknown > 0 && (
                    <span className="flex items-center gap-1.5 text-[10px] text-gray-500">
                      <span className="w-2.5 h-2.5 rounded-sm bg-purple-500/40 border border-purple-500/60" />
                      Unknown ({errorsByType.unknown})
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Corrected Output */}
            <AnimatePresence>
              {result && result.errors.length > 0 && result.errors.some(e => e.suggestions.length > 0) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="rounded-2xl border border-emerald-800/30 bg-emerald-900/10 backdrop-blur-sm p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <ArrowRight className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                      Suggested Correction
                    </span>
                  </div>
                  <p className="text-sm text-emerald-200 font-['JetBrains_Mono',monospace] leading-7">
                    {(() => {
                      let corrected = text;
                      const sorted = [...result.errors]
                        .filter(e => e.suggestions.length > 0)
                        .sort((a, b) => b.startPos - a.startPos);
                      for (const err of sorted) {
                        corrected = corrected.slice(0, err.startPos) + err.suggestions[0].word + corrected.slice(err.endPos);
                      }
                      return corrected;
                    })()}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Panel - Analysis */}
          <div className="lg:col-span-5 space-y-4">
            {/* Tabs */}
            <div className="flex rounded-xl bg-gray-800/20 border border-gray-800/50 p-1">
              {[
                { id: "errors" as const, label: "Errors", icon: Zap, count: result?.errors.length },
                { id: "model" as const, label: "Model", icon: Layers },
                { id: "stats" as const, label: "Stats", icon: BarChart3 },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeTab === tab.id
                      ? "bg-emerald-500/20 text-emerald-400 shadow-lg shadow-emerald-500/5"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.label}
                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="ml-1 px-1.5 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="rounded-2xl border border-gray-800/50 bg-gray-900/30 backdrop-blur-sm p-4 min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === "errors" && (
                  <motion.div
                    key="errors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {result ? (
                      <ErrorPanel
                        errors={result.errors}
                        onApplyFix={applyFix}
                        selectedErrorIndex={selectedErrorIndex}
                        onSelectError={setSelectedErrorIndex}
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 rounded-2xl bg-gray-800/50 flex items-center justify-center mb-4">
                          <Zap className="w-7 h-7 text-gray-700" />
                        </div>
                        <p className="text-gray-600 text-sm">Type or paste Igbo text to begin analysis</p>
                        <p className="text-gray-700 text-xs mt-1">Errors will appear here</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "model" && (
                  <motion.div
                    key="model"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <TransformerVisual
                      tokens={result?.tokens || []}
                      attentionWeights={result?.attentionWeights || []}
                    />
                  </motion.div>
                )}

                {activeTab === "stats" && (
                  <motion.div
                    key="stats"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    {/* Dictionary Stats */}
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                        Dictionary Coverage
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-800/50">
                          <div className="text-2xl font-bold text-white">{dictStats.totalWords}</div>
                          <div className="text-[10px] text-gray-500 uppercase">Total Words</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-800/50">
                          <div className="text-2xl font-bold text-white">{dictStats.bigramCount}</div>
                          <div className="text-[10px] text-gray-500 uppercase">Bigram Pairs</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-800/50">
                          <div className="text-2xl font-bold text-white">{dictStats.misspellingPatterns}</div>
                          <div className="text-[10px] text-gray-500 uppercase">Error Patterns</div>
                        </div>
                        <div className="bg-gray-800/30 rounded-xl p-3 border border-gray-800/50">
                          <div className="text-2xl font-bold text-white">{Object.keys(dictStats.categories).length}</div>
                          <div className="text-[10px] text-gray-500 uppercase">Categories</div>
                        </div>
                      </div>
                    </div>

                    {/* Category Breakdown */}
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                        Word Categories
                      </h4>
                      <div className="space-y-2">
                        {Object.entries(dictStats.categories)
                          .sort((a, b) => b[1] - a[1])
                          .map(([cat, count]) => {
                            const pct = (count / dictStats.totalWords) * 100;
                            return (
                              <div key={cat} className="flex items-center gap-2">
                                <span className="text-[10px] text-gray-500 w-20 text-right capitalize truncate">{cat}</span>
                                <div className="flex-1 h-3 bg-gray-800/50 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${pct}%` }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full"
                                  />
                                </div>
                                <span className="text-[10px] text-gray-600 w-8">{count}</span>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {/* Parts of Speech */}
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                        Parts of Speech
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {Object.entries(dictStats.partsOfSpeech)
                          .sort((a, b) => b[1] - a[1])
                          .map(([pos, count]) => (
                            <span
                              key={pos}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-800/40 border border-gray-700/50 text-[10px] text-gray-400"
                            >
                              <span className="capitalize">{pos}</span>
                              <span className="text-emerald-500 font-bold">{count}</span>
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Model Info */}
                    <div>
                      <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                        Transformer Architecture
                      </h4>
                      <div className="space-y-1.5 text-xs text-gray-500">
                        {[
                          ["Model Type", "Encoder-Only Transformer"],
                          ["Attention Heads", "8"],
                          ["Hidden Dimension", "64"],
                          ["Layers", "6"],
                          ["Embedding Dim", "8"],
                          ["Positional Encoding", "Sinusoidal"],
                          ["Similarity Metric", "Damerau-Levenshtein"],
                          ["Context Window", "Bigram + Attention"],
                        ].map(([key, val]) => (
                          <div key={key} className="flex justify-between py-1 border-b border-gray-800/30">
                            <span>{key}</span>
                            <span className="text-gray-400 font-mono text-[10px]">{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-800/30 text-center">
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.3em]">
            Transformer-Based Igbo NLP • Neural Spell Correction Engine • {dictStats.totalWords} Word Dictionary
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;

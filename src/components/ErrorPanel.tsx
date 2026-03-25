// Copyright © 2026 Roselinemaria Ekwe.
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

//This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Contact me at roselineekwe30@gmail.com for any questions or contributions!

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle, Sparkles, Type, BookOpen } from "lucide-react";
import type { SpellError } from "../utils/transformer";

interface Props {
  errors: SpellError[];
  onApplyFix: (error: SpellError, suggestion: string) => void;
  selectedErrorIndex: number | null;
  onSelectError: (index: number | null) => void;
}

const errorTypeConfig = {
  misspelling: {
    icon: AlertTriangle,
    label: "Misspelling",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30",
  },
  diacritics: {
    icon: Type,
    label: "Missing Diacritics",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  context: {
    icon: BookOpen,
    label: "Context Error",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
  },
  unknown: {
    icon: Sparkles,
    label: "Unknown Word",
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
  },
};

export default function ErrorPanel({
  errors,
  onApplyFix,
  selectedErrorIndex,
  onSelectError,
}: Props) {
  if (errors.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-12 text-center"
      >
        <CheckCircle className="w-12 h-12 text-emerald-400 mb-3" />
        <p className="text-emerald-400 font-semibold text-lg">All Clear!</p>
        <p className="text-gray-500 text-sm mt-1">No spelling errors detected</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1 custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {errors.map((error, i) => {
          const config = errorTypeConfig[error.errorType];
          const Icon = config.icon;
          const isSelected = selectedErrorIndex === i;

          return (
            <motion.div
              key={`${error.word}-${error.startPos}`}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelectError(isSelected ? null : i)}
              className={`rounded-xl border cursor-pointer transition-all duration-200 ${
                isSelected
                  ? `${config.bg} ${config.border} shadow-lg`
                  : "bg-gray-800/30 border-gray-700/50 hover:border-gray-600/50"
              }`}
            >
              {/* Error Header */}
              <div className="px-4 py-3 flex items-start gap-3">
                <div className={`mt-0.5 ${config.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-mono text-sm font-semibold bg-red-500/20 px-2 py-0.5 rounded">
                      {error.word}
                    </span>
                    <span className={`text-[10px] uppercase tracking-wider font-bold ${config.color}`}>
                      {config.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${error.confidence * 100}%` }}
                        className="h-full bg-emerald-500 rounded-full"
                      />
                    </div>
                    <span className="text-[10px] text-gray-500">
                      {(error.confidence * 100).toFixed(0)}% confidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Suggestions (expanded) */}
              <AnimatePresence>
                {isSelected && error.suggestions.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 space-y-1.5">
                      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                        Suggestions
                      </p>
                      {error.suggestions.map((sug, j) => (
                        <motion.button
                          key={j}
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: j * 0.05 }}
                          onClick={(e) => {
                            e.stopPropagation();
                            onApplyFix(error, sug.word);
                          }}
                          className="w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800/50 hover:bg-emerald-500/20 border border-gray-700/50 hover:border-emerald-500/40 transition-all group"
                        >
                          <span className="text-emerald-400 font-mono text-sm font-semibold group-hover:text-emerald-300">
                            {sug.word}
                          </span>
                          <span className="text-gray-500 text-xs flex-1 truncate">
                            {sug.meaning}
                          </span>
                          <span className="text-[9px] text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">
                            {sug.method}
                          </span>
                          <span className="text-[10px] text-emerald-500/70">
                            {(sug.score * 100).toFixed(0)}%
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

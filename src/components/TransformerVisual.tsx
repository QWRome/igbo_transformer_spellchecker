// Copyright © 2026 Roselinemaria Ekwe.
// This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or at your option) any later version.

//This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.

// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// Contact me at roselineekwe30@gmail.com for any questions or contributions!

import { motion } from "framer-motion";
import type { TokenInfo } from "../utils/transformer";

interface Props {
  tokens: TokenInfo[];
  attentionWeights: number[][];
}

export default function TransformerVisual({ tokens, attentionWeights }: Props) {
  const displayTokens = tokens.slice(0, 12); // limit for visualization
  const displayWeights = attentionWeights.slice(0, 12).map(row => row.slice(0, 12));

  if (displayTokens.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500 text-sm italic">
        Enter text to see transformer attention visualization...
      </div>
    );
  }

  const maxWeight = Math.max(...displayWeights.flat(), 0.001);

  return (
    <div className="space-y-4">
      {/* Attention Heatmap */}
      <div>
        <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
          Self-Attention Heatmap (Layer 1)
        </h4>
        <div className="overflow-x-auto">
          <div className="inline-block">
            {/* Column headers */}
            <div className="flex ml-20">
              {displayTokens.map((t, j) => (
                <div
                  key={`col-${j}`}
                  className="w-10 text-[9px] text-gray-400 text-center truncate transform -rotate-45 origin-bottom-left mb-1"
                  title={t.token}
                >
                  {t.token.length > 5 ? t.token.slice(0, 5) + "…" : t.token}
                </div>
              ))}
            </div>
            {/* Rows */}
            {displayWeights.map((row, i) => (
              <div key={`row-${i}`} className="flex items-center">
                <div className="w-20 text-[9px] text-gray-400 text-right pr-2 truncate" title={displayTokens[i]?.token}>
                  {displayTokens[i]?.token || ""}
                </div>
                {row.map((weight, j) => {
                  const intensity = weight / maxWeight;
                  return (
                    <motion.div
                      key={`cell-${i}-${j}`}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: (i * row.length + j) * 0.01 }}
                      className="w-10 h-7 border border-gray-800/50 flex items-center justify-center"
                      style={{
                        backgroundColor: `rgba(16, 185, 129, ${intensity * 0.85})`,
                      }}
                      title={`${displayTokens[i]?.token} → ${displayTokens[j]?.token}: ${weight.toFixed(3)}`}
                    >
                      <span className="text-[8px] text-white/70">
                        {weight > 0.01 ? weight.toFixed(2) : ""}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Token Embeddings */}
      <div>
        <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
          Token Embeddings (8-dim)
        </h4>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1 custom-scrollbar">
          {displayTokens.map((t, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-2"
            >
              <span
                className={`text-[10px] w-16 truncate text-right ${
                  t.isCorrect ? "text-emerald-400" : "text-red-400"
                }`}
                title={t.token}
              >
                {t.token}
              </span>
              <div className="flex gap-0.5">
                {t.embedding.map((val, j) => {
                  const normalized = (val + 2) / 4; // normalize to 0-1
                  const clamped = Math.max(0, Math.min(1, normalized));
                  return (
                    <div
                      key={j}
                      className="w-5 h-4 rounded-sm"
                      style={{
                        backgroundColor:
                          val >= 0
                            ? `rgba(16, 185, 129, ${clamped})`
                            : `rgba(239, 68, 68, ${1 - clamped})`,
                      }}
                      title={`dim[${j}]: ${val}`}
                    />
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div>
        <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
          Model Architecture
        </h4>
        <div className="flex flex-col items-center gap-1">
          {[
            "Output Probabilities",
            "Feed Forward",
            "Layer Norm",
            "Multi-Head Attention",
            "Positional Encoding",
            "Token Embedding",
            "Input Tokens",
          ].map((layer, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: (6 - i) * 0.1 }}
              className="relative"
            >
              <div
                className={`px-4 py-1.5 rounded text-[10px] font-medium text-center border ${
                  i === 0
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-300"
                    : i === 3
                    ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                    : i === 6
                    ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                    : "bg-gray-800/50 border-gray-700/50 text-gray-400"
                }`}
              >
                {layer}
              </div>
              {i < 6 && (
                <div className="flex justify-center">
                  <div className="w-px h-2 bg-gray-700" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

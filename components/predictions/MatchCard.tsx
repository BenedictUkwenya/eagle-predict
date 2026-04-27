import Link from "next/link";
import Image from "next/image";
import type { Match } from "@/types";
import { Clock, Eye, TrendingUp, Shield } from "lucide-react";
import clsx from "clsx";

interface Props {
  match: Match;
}

const CONFIDENCE_CONFIG = {
  high: { label: "High", class: "badge-success" },
  medium: { label: "Medium", class: "badge-warning" },
  low: { label: "Low", class: "badge-error" },
};

const FORM_CONFIG = {
  W: "form-W",
  D: "form-D",
  L: "form-L",
};

export default function MatchCard({ match }: Props) {
  const confidence = CONFIDENCE_CONFIG[match.prediction.confidence];

  return (
    <Link href={`/predictions/match/${match.slug}`} className="block">
      <div className="match-card bg-base-100 border border-base-300 rounded-xl overflow-hidden hover:border-primary/40 hover:shadow-md transition-all duration-200">
        {/* Top: league & meta */}
        <div className="flex items-center justify-between px-3 pt-2.5 pb-1.5">
          <div className="flex items-center gap-1.5 text-xs text-base-content/60">
            <Clock size={11} />
            <span>{match.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`badge badge-xs ${confidence.class} gap-1`}>
              <TrendingUp size={9} />
              {confidence.label} Confidence
            </span>
          </div>
        </div>

        {/* Teams */}
        <div className="px-3 py-2">
          <div className="flex items-center gap-2">
            {/* Home team */}
            <div className="flex-1 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={match.homeTeam.logo}
                  alt={match.homeTeam.name}
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-team.svg";
                  }}
                />
              </div>
              <span className="font-semibold text-sm truncate">{match.homeTeam.shortName}</span>
            </div>

            {/* VS */}
            <div className="flex-shrink-0 text-center">
              {match.status === "finished" ? (
                <div className="flex items-center gap-1 text-sm font-bold">
                  <span>{match.homeScore}</span>
                  <span className="text-base-content/40">-</span>
                  <span>{match.awayScore}</span>
                </div>
              ) : (
                <span className="text-xs font-bold text-base-content/40 px-2">VS</span>
              )}
            </div>

            {/* Away team */}
            <div className="flex-1 flex items-center justify-end gap-2">
              <span className="font-semibold text-sm truncate text-right">{match.awayTeam.shortName}</span>
              <div className="w-8 h-8 rounded-full bg-base-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                <img
                  src={match.awayTeam.logo}
                  alt={match.awayTeam.name}
                  className="w-7 h-7 object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-team.svg";
                  }}
                />
              </div>
            </div>
          </div>

          {/* Full names */}
          <div className="flex items-center justify-between mt-1 text-xs text-base-content/50">
            <span className="truncate max-w-[40%]">{match.homeTeam.name}</span>
            <span className="truncate max-w-[40%] text-right">{match.awayTeam.name}</span>
          </div>
        </div>

        {/* Prediction banner */}
        <div className="mx-3 mb-2.5 bg-primary/10 border border-primary/20 rounded-lg px-3 py-2 flex items-center justify-between">
          <div>
            <p className="text-[10px] text-primary/70 font-medium uppercase tracking-wide">
              Prediction
            </p>
            <p className="font-bold text-sm text-primary">{match.prediction.value}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-base-content/50 font-medium uppercase tracking-wide">
              Best Odds
            </p>
            <p className="font-bold text-sm">
              {match.prediction.type === "both-teams-to-score"
                ? match.odds.btts
                : match.prediction.type === "over-25-goals"
                ? match.odds.over25
                : match.odds.home}
            </p>
          </div>
        </div>

        {/* Odds row */}
        <div className="grid grid-cols-3 text-center border-t border-base-300">
          <div className="py-2 border-r border-base-300">
            <p className="text-[10px] text-base-content/50">Home</p>
            <p className="font-bold text-sm">{match.odds.home}</p>
          </div>
          <div className="py-2 border-r border-base-300">
            <p className="text-[10px] text-base-content/50">Draw</p>
            <p className="font-bold text-sm">{match.odds.draw}</p>
          </div>
          <div className="py-2">
            <p className="text-[10px] text-base-content/50">Away</p>
            <p className="font-bold text-sm">{match.odds.away}</p>
          </div>
        </div>

        {/* Form row */}
        <div className="flex items-center justify-between px-3 py-2 bg-base-200/50 border-t border-base-300">
          <div className="flex items-center gap-1">
            {match.homeForm.slice(0, 5).map((f, i) => (
              <span
                key={i}
                className={clsx(
                  "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold",
                  FORM_CONFIG[f.result]
                )}
              >
                {f.result}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-xs text-base-content/50">
            <Eye size={11} />
            <span>{match.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 flex-row-reverse">
            {match.awayForm.slice(0, 5).map((f, i) => (
              <span
                key={i}
                className={clsx(
                  "w-5 h-5 rounded-sm flex items-center justify-center text-[10px] font-bold",
                  FORM_CONFIG[f.result]
                )}
              >
                {f.result}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

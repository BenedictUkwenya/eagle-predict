import Link from "next/link";
import type { League, Match } from "@/types";
import MatchCard from "./MatchCard";

interface Props {
  league: League;
  matches: Match[];
}

export default function LeagueSection({ league, matches }: Props) {
  if (!matches.length) return null;

  return (
    <div className="mb-6">
      {/* League header */}
      <div className="league-header rounded-t-xl sticky top-16 z-10">
        <div className="w-5 h-5 rounded-sm overflow-hidden bg-base-300 flex-shrink-0">
          <img
            src={`https://flagcdn.com/w40/${league.countryCode.toLowerCase()}.png`}
            alt={league.country}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <span className="font-semibold text-sm">{league.name}</span>
          <span className="text-base-content/50 text-xs ml-1.5">{league.country}</span>
        </div>
        <Link
          href={`/league/${league.slug}`}
          className="text-xs text-primary hover:underline flex-shrink-0"
        >
          View all
        </Link>
      </div>

      {/* Match cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-3 bg-base-200/30 border border-t-0 border-base-300 rounded-b-xl">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

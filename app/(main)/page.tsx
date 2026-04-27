"use client";

import { useState, useMemo } from "react";
import dayjs from "dayjs";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import DatePicker from "@/components/home/DatePicker";
import LeagueSection from "@/components/predictions/LeagueSection";
import PopularLeagues from "@/components/home/PopularLeagues";
import AccumulatorWidget from "@/components/home/AccumulatorWidget";
import BettingSiteWidget from "@/components/ads/BettingSiteWidget";
import PredictionCategoryBar from "@/components/predictions/PredictionCategoryBar";
import { MATCHES, LEAGUES, ACCUMULATORS, BETTING_SITES, getFeaturedMatches } from "@/lib/mockData";
import { Filter, Search } from "lucide-react";
import type { Match } from "@/types";

export default function HomePage() {
  const today = dayjs().format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedLeague, setSelectedLeague] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredMatches = getFeaturedMatches().filter((m) => m.date === today || m.date === dayjs().add(1, "day").format("YYYY-MM-DD"));

  // Filter matches by date + league + search
  const filteredMatches = useMemo(() => {
    return MATCHES.filter((m) => {
      const dateMatch = m.date === selectedDate;
      const leagueMatch = selectedLeague === "all" || m.league.id === selectedLeague;
      const searchMatch =
        !searchQuery ||
        m.homeTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.awayTeam.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.league.name.toLowerCase().includes(searchQuery.toLowerCase());
      return dateMatch && leagueMatch && searchMatch;
    });
  }, [selectedDate, selectedLeague, searchQuery]);

  // Group by league
  const matchesByLeague = useMemo(() => {
    const groups: Record<string, Match[]> = {};
    filteredMatches.forEach((m) => {
      if (!groups[m.league.id]) groups[m.league.id] = [];
      groups[m.league.id].push(m);
    });
    return groups;
  }, [filteredMatches]);

  const leaguesWithMatches = LEAGUES.filter((l) => matchesByLeague[l.id]?.length > 0);

  // Unique leagues present in today's data for filter
  const availableLeagues = useMemo(() => {
    const ids = new Set(MATCHES.filter((m) => m.date === selectedDate).map((m) => m.league.id));
    return LEAGUES.filter((l) => ids.has(l.id));
  }, [selectedDate]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Featured carousel */}
          {featuredMatches.length > 0 && (
            <div className="mb-6">
              <FeaturedCarousel matches={featuredMatches.slice(0, 5)} />
            </div>
          )}

          {/* Prediction category bar */}
          <div className="mb-4">
            <PredictionCategoryBar />
          </div>

          {/* Filters bar */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-3 mb-4 space-y-3">
            {/* Date picker */}
            <DatePicker selected={selectedDate} onChange={setSelectedDate} />

            {/* League filter + search */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-base-content/40"
                />
                <input
                  type="text"
                  placeholder="Search team or league..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input input-sm input-bordered w-full pl-8 text-sm"
                />
              </div>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="select select-sm select-bordered text-sm max-w-[160px]"
              >
                <option value="all">All Leagues</option>
                {availableLeagues.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name} ({l.country})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Match count */}
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="font-bold text-base">
              {dayjs(selectedDate).isSame(dayjs(), "day")
                ? "Today's Predictions"
                : dayjs(selectedDate).isSame(dayjs().add(1, "day"), "day")
                ? "Tomorrow's Predictions"
                : `Predictions for ${dayjs(selectedDate).format("ddd, MMM D")}`}
            </h2>
            <span className="badge badge-outline badge-sm">
              {filteredMatches.length} matches
            </span>
          </div>

          {/* No matches state */}
          {filteredMatches.length === 0 && (
            <div className="text-center py-16 bg-base-200/50 rounded-2xl border border-base-300">
              <div className="text-4xl mb-3">⚽</div>
              <p className="font-semibold text-lg mb-1">No predictions found</p>
              <p className="text-base-content/60 text-sm">
                {searchQuery
                  ? `No matches found for "${searchQuery}"`
                  : "No predictions available for this date"}
              </p>
              <button
                onClick={() => {
                  setSelectedDate(today);
                  setSelectedLeague("all");
                  setSearchQuery("");
                }}
                className="btn btn-primary btn-sm mt-4"
              >
                Show Today's Predictions
              </button>
            </div>
          )}

          {/* League sections */}
          {leaguesWithMatches.map((league) => (
            <LeagueSection
              key={league.id}
              league={league}
              matches={matchesByLeague[league.id]}
            />
          ))}

          {/* Inline ad */}
          {filteredMatches.length > 0 && (
            <div className="mb-6">
              <BettingSiteWidget site={BETTING_SITES[0]} variant="banner" />
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
          {/* Accumulator widget */}
          <AccumulatorWidget accumulator={ACCUMULATORS[0]} />

          {/* Betting site promos */}
          <div className="bg-base-100 border border-base-300 rounded-xl p-4">
            <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
              ⭐ Top Betting Sites
            </h3>
            <div className="space-y-3">
              {BETTING_SITES.slice(0, 4).map((site) => (
                <BettingSiteWidget key={site.id} site={site} variant="compact" />
              ))}
            </div>
          </div>

          {/* Popular leagues */}
          <PopularLeagues />
        </aside>
      </div>
    </div>
  );
}

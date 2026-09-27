import React from 'react';
import { Pandal, Ritual } from '../types/festival';

interface HomePageProps {
  onNavigate: (tab: string, filter?: string) => void;
  onSelectPandal: (pandal: Pandal) => void;
  onOpenHopperTrail: () => void;
  onOpenChatbot: () => void;
  featuredPandal: Pandal;
  trendingPandals: Pandal[];
  rituals: Ritual[];
  onToggleBookmark: (pandalId: string) => void;
  bookmarkedIds: Set<string>;
  onOpenLiveAarti: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectPandal,
  onOpenHopperTrail,
  onOpenChatbot,
  featuredPandal,
  trendingPandals,
  rituals,
  onToggleBookmark,
  bookmarkedIds,
  onOpenLiveAarti,
}) => {
  const isFeaturedBookmarked = bookmarkedIds.has(featuredPandal.id);

  return (
    <div className="flex flex-col w-full pb-8">
      {/* 1. Festive Hero Banner (Matches Image 3) */}
      <section className="relative px-4 sm:px-6 pt-5 pb-8 overflow-hidden text-white rounded-b-[2.5rem] shadow-2xl min-h-[380px] flex flex-col justify-end bg-[#1a1423]">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center duration-700 transform scale-105"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDbgZe8TqeUW3UF5nG7RVrJNeSraTVx8Lcdh5huqHhlguioPQWe_RoTHJtvqdE7Zg2Ucqxohs9bsoFv8-njLZOdeuqZAM3e3r5kh0-DxHGJeIPXajPtKWbID6QdDFaRBWOcNf_T9C-ZnxXzxvhJP3wIDvO3hmFGBVOUIDFSGfXeYRwxzBj8jNYqb6pLqGK4OtkRfVlzwm-l0TSxMde-wEbQlQ2Gqc3n_raqc1bgZUFTDjKcmra6C6MX')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#91000a] via-[#91000a]/85 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#ffdea5]/25 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-3">
          {/* Top Chips */}
          <div className="flex items-center justify-between gap-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#ffdea5] border border-[#ffdea5]/30 text-[11px] font-bold uppercase tracking-wider shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#fe851f] animate-ping" />
              <span>Sharad Utsav 1431</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[#ffdea5] text-[11px] font-bold border border-[#ffdea5]/30">
              <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                sparkles
              </span>
              <span>Kolkata 2024</span>
            </div>
          </div>

          {/* Heading */}
          <div className="flex flex-col mt-2">
            <span className="text-[#ffdea5] font-serif font-bold text-base sm:text-lg tracking-wide drop-shadow-md">
              শুভ শারদীয়া • Subho Sharadiya!
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
              Maha Ashtami Mahotsav
            </h1>
            <p className="text-sm text-[#ffdad6] mt-1 leading-relaxed drop-shadow-sm max-w-xl">
              Festive greetings of joy, devotion, and harmony to you and your family. Experience live crowd radar, authentic rituals, and VIP passes.
            </p>
          </div>

          {/* Live Aarti Countdown Banner */}
          <div className="mt-2 flex items-center justify-between p-3 rounded-2xl bg-white/20 backdrop-blur-md text-white border border-[#ffdea5]/40 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#fe851f] to-[#795700] flex items-center justify-center text-white ring-2 ring-[#ffdea5]/50 shadow-md">
                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[11px] text-[#ffdea5] font-bold uppercase tracking-wider flex items-center gap-1.5">
                  Live Aarti & Darshan
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ffdea5] animate-ping" />
                </span>
                <span className="text-base font-bold text-white tracking-tight">
                  Pushpanjali in 24m
                </span>
              </div>
            </div>
            <button
              onClick={onOpenLiveAarti}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffdea5] text-[#5c4100] font-bold text-xs shadow-md hover:bg-white transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">videocam</span>
              <span>Watch Live</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Quick Action 4 Cards (Matches Image 3) */}
      <section className="px-4 sm:px-6 -mt-7 relative z-20">
        <div className="grid grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-3 bg-white rounded-2xl shadow-[0_8px_24px_rgba(26,20,35,0.08)] border border-[#e4beb9]/30">
          <button
            onClick={onOpenLiveAarti}
            className="group flex flex-col items-center gap-1.5 p-1 rounded-xl active:scale-95 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#91000a]/10 text-[#91000a] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#91000a] group-hover:text-white transition-all shadow-sm ring-1 ring-[#91000a]/20">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                live_tv
              </span>
            </div>
            <span className="text-xs text-[#1f1928] font-bold leading-tight">Live Aarti</span>
          </button>

          <button
            onClick={() => onNavigate('pandals', 'radar')}
            className="group flex flex-col items-center gap-1.5 p-1 rounded-xl active:scale-95 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#fe851f]/15 text-[#964900] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#fe851f] group-hover:text-white transition-all shadow-sm ring-1 ring-[#fe851f]/30">
              <span className="material-symbols-outlined text-[24px]">radar</span>
            </div>
            <span className="text-xs text-[#1f1928] font-bold leading-tight">Crowd Radar</span>
          </button>

          <button
            onClick={() => onNavigate('passes')}
            className="group flex flex-col items-center gap-1.5 p-1 rounded-xl active:scale-95 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#795700]/15 text-[#5c4100] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#795700] group-hover:text-white transition-all shadow-sm ring-1 ring-[#795700]/25">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                confirmation_number
              </span>
            </div>
            <span className="text-xs text-[#1f1928] font-bold leading-tight">VIP Pass</span>
          </button>

          <button
            onClick={() => onNavigate('rituals-bhog')}
            className="group flex flex-col items-center gap-1.5 p-1 rounded-xl active:scale-95 transition-all text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#b71c1c]/15 text-[#b71c1c] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#b71c1c] group-hover:text-white transition-all shadow-sm ring-1 ring-[#b71c1c]/30">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                restaurant_menu
              </span>
            </div>
            <span className="text-xs text-[#1f1928] font-bold leading-tight">Bhog Order</span>
          </button>
        </div>
      </section>

      {/* 3. Community Buzz Ticker */}
      <div className="px-4 sm:px-6 mt-4">
        <div
          onClick={() => onNavigate('pandals')}
          className="flex items-center gap-3 p-3 rounded-2xl bg-[#f0e4fa] text-[#1f1928] shadow-sm hover:shadow transition-shadow cursor-pointer border border-[#e4beb9]/20"
        >
          <div className="w-8 h-8 rounded-full bg-[#fe851f] flex items-center justify-center text-white shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[18px]">campaign</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-bold text-[#91000a] tracking-wide">
                Community Buzz
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#fe851f] animate-pulse" />
            </div>
            <p className="text-xs sm:text-sm truncate text-[#5b403d] font-medium">
              Over 120K devotees visited South Kolkata pandals today! Check live traffic tips.
            </p>
          </div>
          <span className="material-symbols-outlined text-[#5b403d] text-[18px]">chevron_right</span>
        </div>
      </div>

      {/* 4. Curator's Royal Pick: Featured Mega Pandal (Ekdalia Evergreen) */}
      <section className="px-4 sm:px-6 mt-6 flex flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#964900] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#fe851f]" style={{ fontVariationSettings: "'FILL' 1" }}>
                workspace_premium
              </span>
              Curator's Royal Pick
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#1f1928] font-bold">
              Featured Mega Pandal
            </h2>
          </div>
          <span className="text-xs text-[#91000a] font-bold px-2.5 py-1 rounded-full bg-[#91000a]/10 border border-[#91000a]/20">
            South Kolkata
          </span>
        </div>

        <div className="group relative flex flex-col rounded-3xl bg-white overflow-hidden shadow-[0_8px_24px_rgba(26,20,35,0.08)] ring-1 ring-[#e4beb9]/40 hover:shadow-xl transition-all">
          <div className="relative w-full h-64 overflow-hidden">
            <img
              src={featuredPandal.image}
              alt={featuredPandal.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1f1928] via-[#1f1928]/40 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md shadow-sm border border-[#e4beb9]/30">
              <span className="w-2 h-2 rounded-full bg-[#fe851f] animate-pulse" />
              <span className="text-xs font-bold text-[#1f1928]">
                Moderate Crowd • {featuredPandal.waitTimeMinutes}m wait
              </span>
            </div>

            <button
              onClick={() => onToggleBookmark(featuredPandal.id)}
              aria-label="Bookmark Pandal"
              className="absolute top-3.5 right-3.5 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-[#91000a] active:scale-90 transition-transform shadow-md hover:bg-[#faf0ff]"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={{ fontVariationSettings: isFeaturedBookmarked ? "'FILL' 1" : "'FILL' 0" }}
              >
                bookmark
              </span>
            </button>

            {/* Bottom Title on Image */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-end justify-between text-white">
              <div className="flex flex-col">
                <span className="text-[11px] uppercase tracking-wider text-[#ffdcc7] font-bold drop-shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">verified</span>
                  75th Jubilee Heritage
                </span>
                <h3 className="font-serif text-2xl font-bold leading-tight drop-shadow-md">
                  {featuredPandal.name}
                </h3>
              </div>
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white/95 text-[#1f1928] backdrop-blur-md font-bold text-xs shadow-md border border-[#e4beb9]/20">
                <span className="material-symbols-outlined text-[16px] text-[#fe851f]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  star
                </span>
                <span>{featuredPandal.rating}</span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-4 sm:p-5 flex flex-col gap-3 bg-white">
            <p className="text-xs sm:text-sm text-[#5b403d] line-clamp-2 leading-relaxed">
              {featuredPandal.description}
            </p>

            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-lg bg-[#f5eaff] text-[#5b403d] text-xs font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#91000a]">near_me</span>
                Gariahat Crossing
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#f5eaff] text-[#5b403d] text-xs font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-[#964900]">train</span>
                600m from Ballygunge Stn
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-[#ffdea5]/30 text-[#5c4100] text-xs font-bold flex items-center gap-1 border border-[#f7bd43]/40">
                <span className="material-symbols-outlined text-[14px] text-[#5c4100]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_florist
                </span>
                Traditional Pratima
              </span>
            </div>

            <div className="pt-1 flex items-center gap-3">
              <button
                onClick={() => onSelectPandal(featuredPandal)}
                className="flex-1 h-12 rounded-xl bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#fe851f] text-white font-bold text-sm flex items-center justify-center gap-2 active:scale-98 transition-all shadow-md hover:shadow-lg"
              >
                <span className="material-symbols-outlined text-[18px]">navigation</span>
                View Pandal & Route
              </button>
              <button
                onClick={() => onNavigate('passes')}
                className="px-4 h-12 rounded-xl bg-[#ffdcc7] text-[#723600] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#ffb787] transition-colors"
                title="Get VIP Pass"
              >
                <span className="material-symbols-outlined text-[16px]">qr_code</span>
                VIP Pass
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Sacred Calendar: Today's Ritual Highlights */}
      <section className="px-4 sm:px-6 mt-7 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#964900] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                calendar_month
              </span>
              Sacred Calendar
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#1f1928] font-bold">
              Today's Ritual Highlights
            </h2>
          </div>
          <div className="flex items-center gap-1 text-[#91000a] text-xs font-bold px-2.5 py-1 rounded-full bg-[#91000a]/10 border border-[#91000a]/20">
            <span>Maha Shashti</span>
            <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-[#faf0ff] flex flex-col gap-4 shadow-sm border border-[#e4beb9]/30">
          {rituals.slice(0, 3).map((r, idx) => (
            <div key={r.id} className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shadow-sm ${
                    r.status === 'completed'
                      ? 'bg-[#91000a] text-white ring-2 ring-[#91000a]/20'
                      : r.status === 'ongoing'
                      ? 'bg-[#fe851f] text-white ring-4 ring-[#fe851f]/20 animate-pulse'
                      : 'bg-[#eadef4] text-[#5b403d]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {r.status === 'completed'
                      ? 'done'
                      : r.status === 'ongoing'
                      ? 'notifications_active'
                      : 'local_fire_department'}
                  </span>
                </div>
                {idx < 2 && (
                  <div
                    className={`w-0.5 h-12 ${
                      r.status === 'completed' ? 'bg-[#91000a]/30' : 'bg-[#e4beb9]'
                    }`}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <h4
                    className={`font-serif text-base sm:text-lg font-bold ${
                      r.status === 'ongoing' ? 'text-[#fe851f]' : 'text-[#1f1928]'
                    }`}
                  >
                    {r.title}
                  </h4>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      r.status === 'ongoing'
                        ? 'bg-[#ffdcc7] text-[#723600] border-[#fe851f]/20 shadow-sm'
                        : 'bg-white text-[#5b403d] border-[#e4beb9]/30'
                    }`}
                  >
                    {r.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#5b403d] mt-0.5 leading-relaxed">
                  {r.description}
                </p>
              </div>
            </div>
          ))}

          <div className="pt-1 flex items-center justify-end">
            <button
              onClick={() => onNavigate('rituals-bhog')}
              className="text-xs font-bold text-[#91000a] flex items-center gap-1 hover:underline"
            >
              Full 5-Day Sacred Calendar <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* 6. Citywide Pulse: Trending Pandals Carousel */}
      <section className="mt-7 flex flex-col gap-3">
        <div className="px-4 sm:px-6 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#964900]">
              Citywide Pulse
            </span>
            <h2 className="font-serif text-xl sm:text-2xl text-[#1f1928] font-bold">
              Trending Pandals
            </h2>
          </div>
          <button
            onClick={() => onNavigate('pandals')}
            className="text-xs font-bold text-[#91000a] flex items-center gap-0.5 hover:underline"
          >
            See All ({trendingPandals.length + 5}){' '}
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>

        {/* Horizontal Carousel */}
        <div className="flex overflow-x-auto gap-3 px-4 sm:px-6 pb-2 pt-1 no-scrollbar snap-x snap-mandatory">
          {trendingPandals.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelectPandal(p)}
              className="snap-start shrink-0 w-64 rounded-2xl bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all cursor-pointer border border-[#e4beb9]/30"
            >
              <div className="relative h-36 w-full overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#91000a] text-white text-[10px] font-bold shadow-sm">
                  {p.category}
                </span>
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-[#342d3e]/85 text-white backdrop-blur-md text-[11px] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[13px] text-[#fe851f]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                  </span>
                  {p.rating}
                </div>
              </div>

              <div className="p-3 flex flex-col justify-between flex-1 gap-1">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#1f1928] leading-tight">
                    {p.name}
                  </h4>
                  <p className="text-xs text-[#5b403d] line-clamp-1 mt-0.5">
                    {p.theme}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span
                    className={`text-[11px] font-bold flex items-center gap-1 ${
                      p.waitTimeMinutes < 20 ? 'text-[#964900]' : 'text-[#91000a]'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        p.waitTimeMinutes < 20 ? 'bg-[#fe851f]' : 'bg-[#91000a]'
                      }`}
                    />
                    {p.waitTimeMinutes}m Wait
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-[#f5eaff] text-[#91000a] flex items-center justify-center hover:bg-[#91000a] hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-[18px]">arrow_outward</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Festival Companion Card: Build Your Pandal Hop Route */}
      <section className="px-4 sm:px-6 mt-7 mb-2">
        <div className="relative overflow-hidden rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#fe851f] text-white shadow-xl flex items-center justify-between border border-[#ffdea5]/30">
          <div className="flex flex-col gap-1 z-10 max-w-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#ffdea5] font-bold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              Smart Darshan Pass & Points
            </span>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white leading-tight">
              Build Your Pandal Hop Route
            </h3>
            <p className="text-xs text-[#ffcac4]">
              AI crowd-optimizer & traffic-smart metro transit for hassle-free darshan.
            </p>
          </div>
          <button
            onClick={onOpenHopperTrail}
            className="z-10 shrink-0 px-4 py-2.5 rounded-xl bg-white text-[#91000a] font-bold text-xs active:scale-95 transition-transform shadow-md hover:bg-[#faf0ff] flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              route
            </span>
            Create Plan
          </button>
          <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-[#ffdcc7]/20 blur-xl pointer-events-none" />
          <div className="absolute -left-6 -top-6 w-20 h-20 rounded-full bg-[#ffdea5]/15 blur-lg pointer-events-none" />
        </div>
      </section>

      {/* 8. Floating Durga Sahayak AI Chatbot Teaser */}
      <div className="px-4 sm:px-6 mt-4">
        <div
          onClick={onOpenChatbot}
          className="p-3.5 rounded-2xl bg-gradient-to-r from-[#faf0ff] to-[#fff] border border-[#e4beb9]/40 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#91000a]/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#91000a] to-[#fe851f] text-white flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <div>
              <p className="text-xs font-bold text-[#91000a] flex items-center gap-1">
                <span>Durga Sahayak AI Guide</span>
                <span className="px-1.5 py-0.2 rounded text-[9px] bg-[#ffdcc7] text-[#723600]">24/7 Live</span>
              </p>
              <p className="text-[11px] text-[#5b403d]">
                Ask about pandal queues, Pushpanjali mantras, and transit passes.
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#91000a] text-[20px]">chat_bubble</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { DarshanPass } from '../types/festival';

interface PassesPageProps {
  passes: DarshanPass[];
  onCreatePass: (newPass: Omit<DarshanPass, 'id' | 'passCode' | 'qrCodeValue' | 'generatedAt' | 'status' | 'entryGate'>) => void;
  onRedeemPass: (passId: string) => void;
  onOpenShareModal: () => void;
}

export const PassesPage: React.FC<PassesPageProps> = ({
  passes,
  onCreatePass,
  onRedeemPass,
  onOpenShareModal,
}) => {
  const [activeTab, setActiveTab] = useState<'generate' | 'my-passes' | 'scanner'>('generate');

  // Form State
  const [devoteeName, setDevoteeName] = useState('');
  const [contact, setContact] = useState('+91 98301 23456');
  const [passType, setPassType] = useState<DarshanPass['passType']>('VIP Fast-Track');
  const [zone, setZone] = useState('South Kolkata');
  const [pandalVenue, setPandalVenue] = useState('All South Heritage Pandals');
  const [visitorCount, setVisitorCount] = useState(2);
  const [selectedDate, setSelectedDate] = useState('2024-10-11 (Maha Ashtami)');
  const [isGeneratedSuccess, setIsGeneratedSuccess] = useState(false);
  const [scanFeedback, setScanFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreatePass({
      devoteeName: devoteeName.trim() || 'Devotee Pass Holder',
      contact,
      passType,
      zone,
      pandalVenue,
      visitorCount,
      date: selectedDate,
    });
    setIsGeneratedSuccess(true);
    setTimeout(() => {
      setIsGeneratedSuccess(false);
      setActiveTab('my-passes');
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* Header Banner */}
      <div className="px-4 sm:px-6">
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#795700] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#ffdea5] text-[10px] uppercase font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">confirmation_number</span>
              Utsav Pass Points & Verification
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              VIP Darshan & Express Passes
            </h2>
            <p className="text-xs sm:text-sm text-[#ffcac4] mt-1 max-w-lg">
              Official digital entry passes for expedited queue lines, senior citizen assistance, and sacred Pushpanjali slots across Kolkata.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-15 pointer-events-none">
            <span className="material-symbols-outlined text-[140px] text-white">
              verified
            </span>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 px-4 sm:px-6 mt-5">
        <button
          onClick={() => setActiveTab('generate')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            activeTab === 'generate'
              ? 'bg-[#91000a] text-white'
              : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">add_circle</span>
          <span>Book / Issue Pass</span>
        </button>

        <button
          onClick={() => setActiveTab('my-passes')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            activeTab === 'my-passes'
              ? 'bg-[#91000a] text-white'
              : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">receipt_long</span>
          <span>My Passes ({passes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1 ${
            activeTab === 'scanner'
              ? 'bg-[#795700] text-white'
              : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
          }`}
          title="Gate Check-in Simulator"
        >
          <span className="material-symbols-outlined text-[17px]">qr_code_scanner</span>
          <span className="hidden sm:inline">Gate Scan</span>
        </button>
      </div>

      {/* 1. Generate Pass Form */}
      {activeTab === 'generate' && (
        <div className="px-4 sm:px-6 mt-5">
          <form
            onSubmit={handleSubmit}
            className="p-5 sm:p-6 rounded-3xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#e4beb9]/30">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#1f1928]">
                  Select Your Pass Category
                </h3>
                <p className="text-xs text-[#5b403d]">Free devotional issuance by Puja Samiti</p>
              </div>
              <span className="text-[11px] font-bold text-[#91000a] px-2.5 py-1 rounded-full bg-[#ffdad6]">
                Instant QR
              </span>
            </div>

            {/* Pass Types Radio Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'VIP Fast-Track',
                  title: 'Sharad VIP Fast-Track Pass',
                  desc: 'Priority Gate entry bypassing standard queue lines at participating mega pandals.',
                  icon: 'stars',
                  tag: 'Most Popular',
                },
                {
                  id: 'Senior Citizen Sakha',
                  title: 'Senior Citizen & Divyang Sakha',
                  desc: 'Zero-step accessible entrance + complimentary battery rickshaw from nearest metro.',
                  icon: 'elderly',
                  tag: 'Special Care',
                },
                {
                  id: 'Mahashtami Pushpanjali',
                  title: 'Mahashtami Pushpanjali Slot',
                  desc: 'Dedicated prayer sanctum batch timing with fresh lotus offering package.',
                  icon: 'local_florist',
                  tag: 'Sacred Batch',
                },
                {
                  id: 'Dhunuchi Arena',
                  title: 'Dhunuchi Naach Arena Access',
                  desc: 'Reserved front-row viewing area for evening ceremonial Dhunuchi dance.',
                  icon: 'fireplace',
                  tag: 'Evening Event',
                },
              ].map((pt) => (
                <div
                  key={pt.id}
                  onClick={() => setPassType(pt.id as DarshanPass['passType'])}
                  className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all ${
                    passType === pt.id
                      ? 'border-[#91000a] bg-[#faf0ff] shadow-sm'
                      : 'border-[#e4beb9]/40 hover:border-[#91000a]/40 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#91000a] text-[20px]">
                        {pt.icon}
                      </span>
                      <h4 className="text-xs font-bold text-[#1f1928]">{pt.title}</h4>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#ffdcc7] text-[#723600]">
                      {pt.tag}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#5b403d] mt-1.5 leading-snug">
                    {pt.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Devotee Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Primary Mobile / WhatsApp
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98301 23456"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928] focus:outline-none focus:ring-2 focus:ring-[#91000a]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Pass Reference / Group Label (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Family Pass / Group"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928] focus:outline-none focus:ring-2 focus:ring-[#91000a]"
                />
              </div>
            </div>

            {/* Pandal Selection & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Zone / Region
                </label>
                <select
                  value={zone}
                  onChange={(e) => setZone(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928] focus:outline-none focus:ring-2 focus:ring-[#91000a]"
                >
                  <option value="South Kolkata">South Kolkata</option>
                  <option value="North Kolkata">North Kolkata</option>
                  <option value="Central Kolkata">Central Kolkata</option>
                  <option value="All Kolkata Mega Circuit">All Kolkata Circuit</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Target Venue / Pandal
                </label>
                <select
                  value={pandalVenue}
                  onChange={(e) => setPandalVenue(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928] focus:outline-none focus:ring-2 focus:ring-[#91000a]"
                >
                  <option value="All South Heritage Pandals">All South Heritage Pandals</option>
                  <option value="Ekdalia Evergreen Club">Ekdalia Evergreen Club</option>
                  <option value="Tridhara Sammilani">Tridhara Sammilani</option>
                  <option value="Sree Bhumi Sporting Club">Sree Bhumi Sporting Club</option>
                  <option value="Ahiritola Sarbojanin">Ahiritola Sarbojanin</option>
                  <option value="Mohammad Ali Park">Mohammad Ali Park</option>
                  <option value="Suruchi Sangha">Suruchi Sangha</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Number of Devotees
                </label>
                <div className="flex items-center h-11 px-3 rounded-xl border border-[#e4beb9]/60 bg-white justify-between">
                  <button
                    type="button"
                    onClick={() => setVisitorCount(Math.max(1, visitorCount - 1))}
                    className="w-7 h-7 rounded-lg bg-[#faf0ff] text-[#91000a] font-bold flex items-center justify-center text-sm"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold text-[#1f1928]">
                    {visitorCount} Person{visitorCount > 1 ? 's' : ''}
                  </span>
                  <button
                    type="button"
                    onClick={() => setVisitorCount(Math.min(6, visitorCount + 1))}
                    className="w-7 h-7 rounded-lg bg-[#faf0ff] text-[#91000a] font-bold flex items-center justify-center text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1f1928] block mb-1">
                Auspicious Darshan Date
              </label>
              <select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-[#e4beb9]/60 text-xs text-[#1f1928] focus:outline-none focus:ring-2 focus:ring-[#91000a]"
              >
                <option value="2024-10-09 (Maha Shashti)">Maha Shashti • Today</option>
                <option value="2024-10-10 (Maha Saptami)">Maha Saptami • Tomorrow</option>
                <option value="2024-10-11 (Maha Ashtami)">Maha Ashtami • Peak Devotion</option>
                <option value="2024-10-12 (Maha Navami)">Maha Navami • Sandhi Yajna</option>
                <option value="2024-10-13 (Vijaya Dashami)">Vijaya Dashami • Sindoor Khela</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-2 h-13 rounded-2xl bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#fe851f] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
              <span>Generate My Instant Darshan Pass</span>
            </button>

            {isGeneratedSuccess && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                <span>Pass Generated Successfully! Opening Your Ticket...</span>
              </div>
            )}
          </form>
        </div>
      )}

      {/* 2. My Passes List */}
      {activeTab === 'my-passes' && (
        <div className="px-4 sm:px-6 mt-5 flex flex-col gap-4">
          {passes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl p-6 border border-[#e4beb9]/30">
              <span className="material-symbols-outlined text-4xl text-[#91000a]/50">confirmation_number</span>
              <p className="font-serif text-lg font-bold text-[#1f1928] mt-2">No Active Passes Yet</p>
              <p className="text-xs text-[#5b403d] mt-1">Book your free VIP Darshan Pass in just 30 seconds.</p>
              <button
                onClick={() => setActiveTab('generate')}
                className="mt-4 px-4 py-2.5 rounded-xl bg-[#91000a] text-white text-xs font-bold shadow-md"
              >
                Issue VIP Pass Now
              </button>
            </div>
          ) : (
            passes.map((pass) => (
              <div
                key={pass.id}
                className="relative rounded-3xl bg-white border-2 border-[#e4beb9]/50 shadow-lg overflow-hidden flex flex-col"
              >
                {/* Gold Ornamental Top Bar */}
                <div className="bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#795700] text-white p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSyDGO5q_tfBNufWHsYFac55vQKtvUIQjvecGXurmDbMgK5cjHUvwr_NLcZfUDz8XxPwWBqDe2LAcCQwt0wASGsgRtSc83sCNKTEXr4zlnLNB631_tdHaJUIVoY3YvwymmoTf3y-yfDsR6CGxR566rBh5CA9UmaevEQ7uclZOFHJwPXpY2oARBX1QHY1LEDpAcWz4ujuUB0OKbT-EM6xHM169j7U5QowNPaNw0z7mm770OWY9KKY7t"
                      alt="Durga Emblem"
                      className="h-6 w-auto"
                    />
                    <div>
                      <span className="text-[10px] text-[#ffdea5] uppercase font-bold tracking-wider block">
                        Official Puja Pass
                      </span>
                      <h4 className="font-serif text-sm font-bold text-white leading-tight">
                        {pass.passType}
                      </h4>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-extrabold px-2.5 py-1 rounded-full ${
                      pass.status === 'Active'
                        ? 'bg-green-100 text-green-800 border border-green-300'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {pass.status}
                  </span>
                </div>

                {/* Pass Ticket Body */}
                <div className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#faf0ff] text-[#91000a] text-xs font-bold font-mono">
                          {pass.passCode}
                        </span>
                      </div>
                      <p className="text-xs text-[#5b403d] mt-1.5 flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[14px] text-[#91000a]">phone</span>
                        <span>{pass.contact}</span>
                      </p>

                      <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                            Venue / Zone
                          </span>
                          <span className="font-semibold text-[#1f1928]">{pass.pandalVenue}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                            Pass Quota
                          </span>
                          <span className="font-semibold text-[#1f1928]">
                            {pass.visitorCount} Person{pass.visitorCount > 1 ? 's' : ''}
                          </span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                            Valid Date
                          </span>
                          <span className="font-semibold text-[#91000a]">{pass.date}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#5b403d] block">
                            Gate Allocation
                          </span>
                          <span className="font-semibold text-[#723600]">{pass.entryGate}</span>
                        </div>
                      </div>
                    </div>

                    {/* QR Code Block */}
                    <div className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/40 text-center shrink-0">
                      <div className="w-24 h-24 bg-white p-2 rounded-xl shadow-inner flex items-center justify-center border border-[#e4beb9]/30">
                        {/* Simulated high-fidelity SVG QR code */}
                        <svg className="w-full h-full text-[#1f1928]" viewBox="0 0 100 100" fill="currentColor">
                          <path d="M0,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z" />
                          <path d="M70,0 h30 v30 h-30 z M80,10 h10 v10 h-10 z" />
                          <path d="M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z" />
                          <rect x="40" y="10" width="10" height="20" />
                          <rect x="55" y="10" width="10" height="10" />
                          <rect x="10" y="40" width="20" height="10" />
                          <rect x="40" y="40" width="20" height="20" />
                          <rect x="70" y="40" width="20" height="10" />
                          <rect x="70" y="60" width="10" height="20" />
                          <rect x="40" y="70" width="10" height="20" />
                          <rect x="60" y="80" width="30" height="10" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-mono font-bold text-[#91000a] mt-1">
                        {pass.passCode}
                      </span>
                    </div>
                  </div>

                  {/* Perforated Divider */}
                  <div className="relative border-t-2 border-dashed border-[#e4beb9] my-1">
                    <div className="absolute -left-7 -top-3 w-5 h-5 rounded-full bg-[#fef7ff] border-r border-[#e4beb9]" />
                    <div className="absolute -right-7 -top-3 w-5 h-5 rounded-full bg-[#fef7ff] border-l border-[#e4beb9]" />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={onOpenShareModal}
                      className="flex-1 py-2 rounded-xl bg-[#faf0ff] text-[#91000a] font-bold text-xs flex items-center justify-center gap-1 hover:bg-[#f0e4fa] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">share</span>
                      <span>Share Pass</span>
                    </button>

                    {pass.status === 'Active' ? (
                      <button
                        onClick={() => onRedeemPass(pass.id)}
                        className="flex-1 py-2 rounded-xl bg-[#795700] hover:bg-[#5c4100] text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px]">verified</span>
                        <span>Redeem at Gate</span>
                      </button>
                    ) : (
                      <span className="flex-1 py-2 text-center text-xs text-gray-400 font-bold">
                        Already Checked In
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* 3. Gate Scanner Simulator */}
      {activeTab === 'scanner' && (
        <div className="px-4 sm:px-6 mt-5">
          <div className="p-6 rounded-3xl bg-[#1a1423] text-white border border-[#ffdea5]/30 text-center flex flex-col items-center gap-4">
            <span className="text-[10px] uppercase font-bold text-[#ffdea5] tracking-widest">
              Puja Samiti Official Gate Scanner
            </span>
            <h3 className="font-serif text-xl font-bold">
              Volunteer Check-In Terminal
            </h3>

            <div className="relative w-48 h-48 rounded-2xl border-2 border-dashed border-[#fe851f] flex items-center justify-center overflow-hidden bg-black/40">
              <span className="material-symbols-outlined text-6xl text-[#ffdea5]/40 animate-pulse">
                qr_code_scanner
              </span>
              <div className="absolute inset-x-0 top-0 h-0.5 bg-[#fe851f] shadow-[0_0_12px_#fe851f] animate-bounce" />
            </div>

            <p className="text-xs text-[#ffdad6] max-w-xs">
              Align devotee pass QR within the frame to validate Fast-Track eligibility and prevent duplicate entries.
            </p>

            {scanFeedback && (
              <div className="p-3.5 rounded-2xl bg-green-950/80 border border-green-500/50 text-green-200 text-xs font-bold text-center flex items-center justify-center gap-2 animate-in fade-in">
                <span className="material-symbols-outlined text-green-400 text-[20px]">verified</span>
                <span>{scanFeedback}</span>
              </div>
            )}

            <button
              onClick={() => {
                if (passes.length > 0) {
                  onRedeemPass(passes[0].id);
                  setScanFeedback(`Verified Pass ${passes[0].passCode}! Gate entrance validated for ${passes[0].visitorCount} persons.`);
                } else {
                  setScanFeedback('Please book a pass first to simulate scanning.');
                }
              }}
              className="px-6 py-2.5 rounded-xl bg-[#fe851f] text-white font-bold text-xs shadow-md hover:bg-[#b71c1c] transition-colors"
            >
              Simulate Gate Scan Verification
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

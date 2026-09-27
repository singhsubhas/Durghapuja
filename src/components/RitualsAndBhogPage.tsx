import React, { useState } from 'react';
import { Ritual, BhogItem, BhogOrder } from '../types/festival';
import { BHOG_MENU } from '../data/festivalData';
import { pujaAudio } from '../utils/audioSynth';
import { RitualCountdown } from './RitualCountdown';

interface RitualsAndBhogPageProps {
  rituals: Ritual[];
  onOrderBhog: (order: Omit<BhogOrder, 'id' | 'orderCode' | 'status' | 'bookedAt'>) => void;
  orders: BhogOrder[];
  onOpenMusicStudio?: (presetPrompt?: string) => void;
}

export const RitualsAndBhogPage: React.FC<RitualsAndBhogPageProps> = ({
  rituals,
  onOrderBhog,
  orders,
  onOpenMusicStudio,
}) => {
  const [activeSection, setActiveSection] = useState<'rituals' | 'bhog' | 'aarti'>('rituals');
  const [selectedDay, setSelectedDay] = useState<string>('All');

  // Interactive Aarti State
  const [flowerCount, setFlowerCount] = useState<number>(0);
  const [isDiyaLit, setIsDiyaLit] = useState<boolean>(true);
  const [isBlowingConch, setIsBlowingConch] = useState<boolean>(false);

  // Bhog Order Form State
  const [selectedItem, setSelectedItem] = useState<BhogItem>(BHOG_MENU[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [devoteeName, setDevoteeName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [pandalName, setPandalName] = useState<string>('Ekdalia Evergreen Club Sanctum');
  const [pickupDate, setPickupDate] = useState<string>('2024-10-11 (Maha Ashtami)');
  const [timeSlot, setTimeSlot] = useState<string>('12:30 PM – 02:00 PM (Afternoon Bhog)');
  const [showOrderSuccess, setShowOrderSuccess] = useState<boolean>(false);

  // Days list
  const days = ['All', 'Maha Shashti', 'Maha Saptami', 'Maha Ashtami', 'Maha Navami', 'Vijaya Dashami'];

  const filteredRituals = rituals.filter(
    (r) => selectedDay === 'All' || r.day === selectedDay
  );

  const handleOfferFlower = () => {
    setFlowerCount((prev) => prev + 1);
    pujaAudio.playKanshi();
  };

  const handleBlowShankha = () => {
    setIsBlowingConch(true);
    pujaAudio.playShankha();
    setTimeout(() => setIsBlowingConch(false), 2400);
  };

  const handleBhogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOrderBhog({
      devoteeName: devoteeName.trim() || 'Devotee Guest',
      phone,
      pandalName,
      items: [{ item: selectedItem, quantity }],
      totalAmount: selectedItem.price * quantity,
      pickupDate,
      timeSlot,
    });
    setShowOrderSuccess(true);
    setTimeout(() => setShowOrderSuccess(false), 3000);
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2">
      {/* 1. Header Hero */}
      <div className="px-4 sm:px-6">
        <div className="p-5 rounded-3xl bg-gradient-to-r from-[#91000a] via-[#fe851f] to-[#795700] text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-lg">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-[#ffdea5] text-[10px] uppercase font-bold tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
              Sacred Rituals & Mahabhog
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold">
              Timings, Mantras & Prasad
            </h2>
            <p className="text-xs sm:text-sm text-[#ffcac4] mt-1">
              Participate virtually with live Pushpanjali offerings and reserve sanctum-blessed Rajbhog thalis for your family.
            </p>
          </div>
        </div>
      </div>

      {/* Dynamic Auspicious Ritual Countdown (Live ticking clock for Sandhi Puja, Pushpanjali, etc.) */}
      <div className="px-4 sm:px-6 mt-4">
        <RitualCountdown
          onOpenLiveAarti={() => setActiveSection('aarti')}
          onOpenMusicStudio={onOpenMusicStudio}
        />
      </div>

      {/* 2. Top Nav Section Pills */}
      <div className="flex items-center gap-2 px-4 sm:px-6 mt-5">
        <button
          onClick={() => setActiveSection('rituals')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            activeSection === 'rituals'
              ? 'bg-[#91000a] text-white'
              : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">calendar_month</span>
          <span>Ritual Calendar</span>
        </button>

        <button
          onClick={() => setActiveSection('aarti')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            activeSection === 'aarti'
              ? 'bg-[#fe851f] text-white'
              : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">live_tv</span>
          <span>Live Aarti & Darshan</span>
        </button>

        <button
          onClick={() => setActiveSection('bhog')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 ${
            activeSection === 'bhog'
              ? 'bg-[#795700] text-white'
              : 'bg-white text-[#5b403d] hover:bg-[#faf0ff] border border-[#e4beb9]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[17px]">restaurant_menu</span>
          <span>Bhog Orders</span>
        </button>
      </div>

      {/* 3. Section: Rituals Calendar */}
      {activeSection === 'rituals' && (
        <div className="flex flex-col mt-4">
          {/* Day Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto px-4 sm:px-6 py-2 no-scrollbar">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedDay === day
                    ? 'bg-[#91000a] text-white shadow-sm'
                    : 'bg-white text-[#5b403d] border border-[#e4beb9]/30 hover:bg-[#faf0ff]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Ritual Timeline Cards */}
          <div className="px-4 sm:px-6 mt-3 flex flex-col gap-3.5">
            {filteredRituals.map((r) => (
              <div
                key={r.id}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-extrabold text-[#723600] px-2 py-0.5 rounded-full bg-[#ffdcc7]">
                        {r.day}
                      </span>
                      <span className="text-xs font-bold text-[#5b403d]">{r.time}</span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-[#1f1928] mt-1">
                      {r.title} • <span className="font-normal text-[#91000a]">{r.bengaliTitle}</span>
                    </h3>
                  </div>

                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full ${
                      r.status === 'completed'
                        ? 'bg-gray-100 text-gray-600'
                        : r.status === 'ongoing'
                        ? 'bg-[#fe851f] text-white animate-pulse'
                        : 'bg-[#ffdad6] text-[#93000b]'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#5b403d] leading-relaxed">
                  {r.description}
                </p>

                <div className="p-3 rounded-xl bg-[#faf0ff] border border-[#e4beb9]/30 text-xs text-[#5b403d] flex items-start gap-2 mt-1">
                  <span className="material-symbols-outlined text-[16px] text-[#91000a] shrink-0 mt-0.5">
                    info
                  </span>
                  <span><strong>Spiritual Essence:</strong> {r.significance}</span>
                </div>

                {r.mantra && (
                  <div className="p-3.5 rounded-xl bg-[#fffdf9] border border-[#f7bd43]/40 text-xs flex flex-col gap-1 mt-1">
                    <span className="text-[10px] uppercase font-bold text-[#5c4100] tracking-wider">
                      Sacred Pushpanjali Invocation
                    </span>
                    <p className="font-serif text-sm font-bold text-[#91000a] leading-relaxed">
                      {r.mantra}
                    </p>
                    <p className="text-[11px] text-[#5b403d] italic mt-0.5">
                      "{r.mantraMeaning}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Section: Live Aarti & Interactive Darshan */}
      {activeSection === 'aarti' && (
        <div className="px-4 sm:px-6 mt-4 flex flex-col gap-4">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-black aspect-video flex items-center justify-center border-2 border-[#ffdea5]/40">
            {/* Live stream preview background */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDbgZe8TqeUW3UF5nG7RVrJNeSraTVx8Lcdh5huqHhlguioPQWe_RoTHJtvqdE7Zg2Ucqxohs9bsoFv8-njLZOdeuqZAM3e3r5kh0-DxHGJeIPXajPtKWbID6QdDFaRBWOcNf_T9C-ZnxXzxvhJP3wIDvO3hmFGBVOUIDFSGfXeYRwxzBj8jNYqb6pLqGK4OtkRfVlzwm-l0TSxMde-wEbQlQ2Gqc3n_raqc1bgZUFTDjKcmra6C6MX"
              alt="Live Sanctum Stream"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

            {/* Top Bar on Video */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/90 text-white text-xs font-bold shadow-md">
                <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                <span>LIVE FEED • Sree Bhumi Sanctum</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-medium">
                <span className="material-symbols-outlined text-[15px]">visibility</span>
                <span>14.8K Devotees Watching</span>
              </div>
            </div>

            {/* Simulated Center Darshan Diya */}
            {isDiyaLit && (
              <div className="absolute bottom-12 flex flex-col items-center pointer-events-none z-10 animate-pulse">
                <div className="w-12 h-12 rounded-full bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 blur-sm" />
                <span className="text-[10px] text-[#ffdea5] uppercase font-bold tracking-widest drop-shadow-md">
                  Sanctum Aarti Active
                </span>
              </div>
            )}

            {/* Floating flower animation feedback */}
            {flowerCount > 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <span className="text-3xl animate-bounce">🌺 🌸 🌺</span>
              </div>
            )}
          </div>

          {/* Interactive Devotional Actions */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-3">
            <h4 className="font-serif text-base font-bold text-[#1f1928]">
              Interactive Sanctum Offerings
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleOfferFlower}
                className="py-3 px-2 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/40 hover:bg-[#ffdad6] text-[#91000a] font-bold text-xs flex flex-col items-center gap-1 active:scale-95 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[24px]">local_florist</span>
                <span>Offer Flower</span>
                <span className="text-[10px] text-[#5b403d] font-normal">({flowerCount} offered)</span>
              </button>

              <button
                onClick={() => {
                  setIsDiyaLit(!isDiyaLit);
                  pujaAudio.playKanshi();
                }}
                className="py-3 px-2 rounded-2xl bg-[#ffdcc7]/40 border border-[#fe851f]/40 hover:bg-[#fe851f]/20 text-[#723600] font-bold text-xs flex flex-col items-center gap-1 active:scale-95 transition-all shadow-sm"
              >
                <span className="material-symbols-outlined text-[24px]">local_fire_department</span>
                <span>{isDiyaLit ? 'Aarti Burning' : 'Light Diya'}</span>
                <span className="text-[10px] text-[#5b403d] font-normal">Kanshi Chime</span>
              </button>

              <button
                onClick={handleBlowShankha}
                className={`py-3 px-2 rounded-2xl border text-xs font-bold flex flex-col items-center gap-1 active:scale-95 transition-all shadow-sm ${
                  isBlowingConch
                    ? 'bg-[#795700] text-white border-[#795700]'
                    : 'bg-[#ffdea5]/30 border-[#f7bd43]/40 text-[#5c4100] hover:bg-[#ffdea5]/50'
                }`}
              >
                <span className="material-symbols-outlined text-[24px]">air</span>
                <span>Blow Shankha</span>
                <span className="text-[10px] font-normal">Sacred Conch</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Section: Bhog Booking */}
      {activeSection === 'bhog' && (
        <div className="px-4 sm:px-6 mt-4 flex flex-col gap-5">
          {/* Menu items */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {BHOG_MENU.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedItem(b)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex flex-col justify-between ${
                  selectedItem.id === b.id
                    ? 'border-[#91000a] bg-[#faf0ff] shadow-md'
                    : 'border-[#e4beb9]/30 bg-white hover:border-[#91000a]/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-[#ffdad6] text-[#93000b]">
                      Prasad Thali
                    </span>
                    <span className="font-bold text-[#91000a] text-sm">₹{b.price}</span>
                  </div>
                  <h4 className="font-serif text-base font-bold text-[#1f1928] mt-2">
                    {b.name}
                  </h4>
                  <p className="text-xs text-[#5b403d] mt-1">{b.description}</p>

                  <div className="mt-2 flex flex-col gap-1 text-[11px] text-[#5b403d]">
                    {b.includes.slice(0, 3).map((inc, i) => (
                      <span key={i} className="flex items-center gap-1">
                        • {inc}
                      </span>
                    ))}
                    {b.includes.length > 3 && (
                      <span className="text-[10px] text-[#964900] font-bold">
                        + {b.includes.length - 3} more items included
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Booking Form */}
          <form
            onSubmit={handleBhogSubmit}
            className="p-5 rounded-3xl bg-white border border-[#e4beb9]/40 shadow-sm flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#e4beb9]/30">
              <h3 className="font-serif text-lg font-bold text-[#1f1928]">
                Reserve Bhog Token for Pickup
              </h3>
              <span className="text-xs font-bold text-[#91000a]">
                Selected: {selectedItem.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Devotee Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Self / Family"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#e4beb9]/60 text-xs"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl border border-[#e4beb9]/60 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Sanctum Pickup Venue
                </label>
                <select
                  value={pandalName}
                  onChange={(e) => setPandalName(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#e4beb9]/60 text-xs"
                >
                  <option value="Ekdalia Evergreen Club Sanctum">Ekdalia Evergreen Club</option>
                  <option value="Tridhara Sammilani Counter">Tridhara Sammilani</option>
                  <option value="Sree Bhumi Sporting Counter">Sree Bhumi Sporting</option>
                  <option value="Ahiritola Sarbojanin Hall">Ahiritola Sarbojanin</option>
                  <option value="College Square Central Counter">College Square</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Pickup Date
                </label>
                <select
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-[#e4beb9]/60 text-xs"
                >
                  <option value="2024-10-10 (Maha Saptami)">Maha Saptami</option>
                  <option value="2024-10-11 (Maha Ashtami)">Maha Ashtami</option>
                  <option value="2024-10-12 (Maha Navami)">Maha Navami</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1f1928] block mb-1">
                  Number of Thalis
                </label>
                <div className="flex items-center h-11 px-3 rounded-xl border border-[#e4beb9]/60 bg-white justify-between">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-lg bg-[#faf0ff] text-[#91000a] font-bold"
                  >
                    -
                  </button>
                  <span className="text-xs font-bold">{quantity} Thali(s)</span>
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.min(10, quantity + 1))}
                    className="w-7 h-7 rounded-lg bg-[#faf0ff] text-[#91000a] font-bold"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#1f1928] block mb-1">
                Pickup Timeslot
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-[#e4beb9]/60 text-xs"
              >
                <option value="12:30 PM – 02:00 PM (Afternoon Bhog)">12:30 PM – 02:00 PM (Afternoon Bhog)</option>
                <option value="02:00 PM – 03:30 PM (Post-Aarti Slot)">02:00 PM – 03:30 PM (Post-Aarti Slot)</option>
                <option value="07:30 PM – 09:00 PM (Evening Sandhya Prasad)">07:30 PM – 09:00 PM (Evening Sandhya Prasad)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf0ff] text-xs font-bold">
              <span>Total Contribution: ₹{selectedItem.price * quantity}</span>
              <span className="text-[#91000a]">Pay at Counter / QR Token</span>
            </div>

            <button
              type="submit"
              className="h-12 rounded-2xl bg-gradient-to-r from-[#91000a] to-[#fe851f] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Reserve Bhog Coupon</span>
            </button>

            {showOrderSuccess && (
              <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs font-bold text-center flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-green-600 text-[18px]">check_circle</span>
                <span>Bhog Token Confirmed! Show token at pickup counter.</span>
              </div>
            )}
          </form>

          {/* Confirmed Orders List */}
          {orders.length > 0 && (
            <div className="flex flex-col gap-2">
              <h4 className="font-serif text-sm font-bold text-[#1f1928]">
                Your Booked Bhog Coupons ({orders.length})
              </h4>
              {orders.map((ord) => (
                <div
                  key={ord.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#e4beb9]/40 shadow-sm flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-[#91000a]">{ord.orderCode}</span>
                    <p className="text-[#1f1928] font-semibold mt-0.5">{ord.pandalName}</p>
                    <p className="text-[11px] text-[#5b403d]">{ord.pickupDate} • {ord.timeSlot}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-800">
                      {ord.status}
                    </span>
                    <p className="font-bold text-sm text-[#1f1928] mt-1">₹{ord.totalAmount}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

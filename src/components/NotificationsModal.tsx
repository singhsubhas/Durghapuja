import React from 'react';

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClearNotifications: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  isOpen,
  onClose,
  onClearNotifications,
}) => {
  if (!isOpen) return null;

  const notifications = [
    {
      id: 'n1',
      title: 'Queue Clearance at Tridhara Sammilani',
      time: '12 mins ago',
      category: 'Crowd Radar',
      text: 'Queue wait-time dropped to under 10 minutes at Tridhara! Best time for darshan via Kalighat Metro.',
      icon: 'radar',
      type: 'green',
    },
    {
      id: 'n2',
      title: 'Upcoming: Amantran & Adhivas',
      time: '25 mins ago',
      category: 'Sacred Ritual',
      text: 'Ceremonial awakening of the Goddess begins at 06:45 PM tonight. Live Aarti feed will be active.',
      icon: 'notifications_active',
      type: 'amber',
    },
    {
      id: 'n3',
      title: 'All-Night Kolkata Metro Advisory',
      time: '1 hour ago',
      category: 'City Transit',
      text: 'Metro trains on Blue Line (Dakshineswar – Kavi Subhash) and Green Line will run continuously throughout Maha Saptami, Ashtami, and Navami.',
      icon: 'subway',
      type: 'crimson',
    },
    {
      id: 'n4',
      title: 'Maha Ashtami Pushpanjali Fast-Track Slots Open',
      time: '3 hours ago',
      category: 'VIP Pass',
      text: 'Special morning prayer batch passes are now open for registration under the Passes section.',
      icon: 'confirmation_number',
      type: 'gold',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-5 flex flex-col gap-3.5 border border-[#e4beb9]/40">
        <div className="flex items-center justify-between pb-2 border-b border-[#e4beb9]/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl text-[#91000a]">notifications</span>
            <h3 className="font-serif text-lg font-bold text-[#1f1928]">
              Live Puja Bulletins & Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-2xl bg-[#faf0ff] border border-[#e4beb9]/30 flex items-start gap-3"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 ${
                  n.type === 'green'
                    ? 'bg-emerald-600'
                    : n.type === 'amber'
                    ? 'bg-[#fe851f]'
                    : n.type === 'gold'
                    ? 'bg-[#795700]'
                    : 'bg-[#91000a]'
                }`}
              >
                <span className="material-symbols-outlined text-[19px]">{n.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase text-[#964900]">
                    {n.category}
                  </span>
                  <span className="text-[10px] text-[#5b403d]">{n.time}</span>
                </div>
                <h4 className="text-xs font-bold text-[#1f1928] mt-0.5">{n.title}</h4>
                <p className="text-[11px] text-[#5b403d] mt-0.5 leading-snug">{n.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onClearNotifications}
            className="text-xs font-bold text-[#91000a] hover:underline"
          >
            Mark All as Read
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#91000a] text-white font-bold text-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

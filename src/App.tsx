/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePage } from './components/HomePage';
import { PandalsPage } from './components/PandalsPage';
import { PassesPage } from './components/PassesPage';
import { RitualsAndBhogPage } from './components/RitualsAndBhogPage';
import { CulturalPage } from './components/CulturalPage';
import { ChatbotModal } from './components/ChatbotModal';
import { HopperTrailModal } from './components/HopperTrailModal';
import { PandalDetailModal } from './components/PandalDetailModal';
import { PublicShareModal } from './components/PublicShareModal';
import { NotificationsModal } from './components/NotificationsModal';
import { MusicGeneratorModal } from './components/MusicGeneratorModal';
import { PANDALS_DATA, RITUALS_DATA } from './data/festivalData';
import { Pandal, DarshanPass, BhogOrder } from './types/festival';

export default function App() {
  // Navigation & Page State
  const [activeTab, setActiveTab] = useState<string>('home');
  const [pandalsFilter, setPandalsFilter] = useState<string>('list');

  // Modals State
  const [isChatbotOpen, setIsChatbotOpen] = useState<boolean>(false);
  const [isHopperModalOpen, setIsHopperModalOpen] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState<boolean>(false);
  const [isMusicModalOpen, setIsMusicModalOpen] = useState<boolean>(false);
  const [musicInitialPrompt, setMusicInitialPrompt] = useState<string | undefined>(undefined);
  const [selectedPandal, setSelectedPandal] = useState<Pandal | null>(null);
  const [isKioskMode, setIsKioskMode] = useState<boolean>(false);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);

  // Bookmarks & Hopper Trail State
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(
    new Set(['ekdalia-evergreen', 'tridhara-sammilani'])
  );
  const [selectedHopperIds, setSelectedHopperIds] = useState<Set<string>>(
    new Set(['tridhara-sammilani', 'sree-bhumi', 'ahiritola-sarbojanin'])
  );

  // User Passes State ("rasspoint")
  const [passes, setPasses] = useState<DarshanPass[]>([
    {
      id: 'pass-default-1',
      passCode: 'UTSAV-2024-VIP-8492',
      devoteeName: '',
      contact: '',
      date: '2024-10-11 (Maha Ashtami)',
      zone: 'South Kolkata',
      passType: 'VIP Fast-Track',
      visitorCount: 3,
      status: 'Active',
      pandalVenue: 'All South Heritage Pandals',
      qrCodeValue: 'UTSAV-VIP-8492',
      generatedAt: 'Today, 09:15 AM',
      entryGate: 'VIP Gate 2 (Near Monoharpukur)',
    },
    {
      id: 'pass-default-2',
      passCode: 'UTSAV-2024-SAKHA-2104',
      devoteeName: '',
      contact: '',
      date: '2024-10-11 (Maha Ashtami)',
      zone: 'South Kolkata',
      passType: 'Senior Citizen Sakha',
      visitorCount: 2,
      status: 'Active',
      pandalVenue: 'Ekdalia Evergreen Club',
      qrCodeValue: 'UTSAV-SAKHA-2104',
      generatedAt: 'Yesterday, 04:30 PM',
      entryGate: 'Accessible Ramp Gate A (Ekdalia Road)',
    },
  ]);

  // User Bhog Orders State
  const [orders, setOrders] = useState<BhogOrder[]>([
    {
      id: 'order-1',
      orderCode: 'BHOG-7821',
      devoteeName: 'Devotee',
      phone: '',
      pandalName: 'Ekdalia Evergreen Club Sanctum',
      items: [],
      totalAmount: 300,
      pickupDate: '2024-10-11 (Maha Ashtami)',
      timeSlot: '12:30 PM – 02:00 PM',
      status: 'Confirmed',
      bookedAt: 'Today, 10:00 AM',
    },
  ]);

  // Deep linking: read query parameters or hash on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['home', 'pandals', 'passes', 'rituals-bhog', 'cultural'].includes(tabParam)) {
        setActiveTab(tabParam);
      }
      const pandalParam = params.get('pandal');
      if (pandalParam) {
        const found = PANDALS_DATA.find((p) => p.id === pandalParam);
        if (found) setSelectedPandal(found);
      }
    }
  }, []);

  // Handlers
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleToggleHopper = (id: string) => {
    setSelectedHopperIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCreatePass = (
    newPassData: Omit<DarshanPass, 'id' | 'passCode' | 'qrCodeValue' | 'generatedAt' | 'status' | 'entryGate'>
  ) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newPass: DarshanPass = {
      ...newPassData,
      id: `pass-${Date.now()}`,
      passCode: `UTSAV-2024-VIP-${randomCode}`,
      qrCodeValue: `UTSAV-VIP-${randomCode}`,
      generatedAt: 'Just Now',
      status: 'Active',
      entryGate: 'Fast-Track North Gate (QR Scanner 1)',
    };
    setPasses((prev) => [newPass, ...prev]);
  };

  const handleRedeemPass = (passId: string) => {
    setPasses((prev) =>
      prev.map((p) => (p.id === passId ? { ...p, status: 'Redeemed' as const } : p))
    );
  };

  const handleOrderBhog = (
    newOrderData: Omit<BhogOrder, 'id' | 'orderCode' | 'status' | 'bookedAt'>
  ) => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const newOrder: BhogOrder = {
      ...newOrderData,
      id: `order-${Date.now()}`,
      orderCode: `BHOG-${randomCode}`,
      status: 'Confirmed',
      bookedAt: 'Just Now',
    };
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleSelectCuratedTrail = (trailIds: string[]) => {
    setSelectedHopperIds(new Set(trailIds));
  };

  const handleOpenMusicStudio = (prompt?: string) => {
    setMusicInitialPrompt(prompt);
    setIsMusicModalOpen(true);
  };

  const selectedHopperPandals = PANDALS_DATA.filter((p) =>
    selectedHopperIds.has(p.id)
  );

  return (
    <div
      className={`min-h-screen bg-[#fef7ff] text-[#1f1928] flex flex-col font-sans relative ${
        isKioskMode ? 'border-8 border-[#91000a]' : ''
      }`}
    >
      {/* Kiosk Mode Top Indicator */}
      {isKioskMode && (
        <div className="bg-[#91000a] text-white px-4 py-1.5 flex items-center justify-between text-xs font-bold z-50">
          <span>PUBLIC KIOSK DISPLAY MODE ACTIVE • TOUCH TO EXPLORE</span>
          <button
            onClick={() => setIsKioskMode(false)}
            className="px-2 py-0.5 rounded bg-white text-[#91000a] hover:bg-gray-100"
          >
            Exit Kiosk
          </button>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        onOpenNotifications={() => {
          setIsNotificationsOpen(true);
          setUnreadNotifications(0);
        }}
        onOpenShareModal={() => setIsShareModalOpen(true)}
        unreadCount={unreadNotifications}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto pt-16">
        {activeTab === 'home' && (
          <HomePage
            onNavigate={(tab, filter) => {
              setActiveTab(tab);
              if (filter) setPandalsFilter(filter);
            }}
            onSelectPandal={(pandal) => setSelectedPandal(pandal)}
            onOpenHopperTrail={() => setIsHopperModalOpen(true)}
            onOpenChatbot={() => setIsChatbotOpen(true)}
            featuredPandal={PANDALS_DATA[0]}
            trendingPandals={PANDALS_DATA.slice(1, 5)}
            rituals={RITUALS_DATA}
            onToggleBookmark={handleToggleBookmark}
            bookmarkedIds={bookmarkedIds}
            onOpenLiveAarti={() => setActiveTab('rituals-bhog')}
          />
        )}

        {activeTab === 'pandals' && (
          <PandalsPage
            pandals={PANDALS_DATA}
            onSelectPandal={(pandal) => setSelectedPandal(pandal)}
            selectedHopperIds={selectedHopperIds}
            onToggleHopper={handleToggleHopper}
            onOpenHopperTrail={() => setIsHopperModalOpen(true)}
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            initialViewMode={pandalsFilter === 'radar' ? 'radar' : 'list'}
          />
        )}

        {activeTab === 'passes' && (
          <PassesPage
            passes={passes}
            onCreatePass={handleCreatePass}
            onRedeemPass={handleRedeemPass}
            onOpenShareModal={() => setIsShareModalOpen(true)}
          />
        )}

        {activeTab === 'rituals-bhog' && (
          <RitualsAndBhogPage
            rituals={RITUALS_DATA}
            onOrderBhog={handleOrderBhog}
            orders={orders}
            onOpenMusicStudio={handleOpenMusicStudio}
          />
        )}

        {activeTab === 'cultural' && (
          <CulturalPage
            onOpenShareModal={() => setIsShareModalOpen(true)}
            onOpenMusicStudio={handleOpenMusicStudio}
          />
        )}
      </main>

      {/* Floating AI Puja Guide Chatbot Button (Requested: "and also created help chatbolt, option") */}
      <div className="fixed bottom-22 right-4 sm:right-6 z-40">
        <button
          onClick={() => setIsChatbotOpen(true)}
          aria-label="Open Durga Sahayak AI Assistant"
          className="group relative flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#91000a] via-[#b71c1c] to-[#fe851f] text-white shadow-[0_8px_25px_rgba(145,0,10,0.45)] hover:shadow-[0_12px_32px_rgba(145,0,10,0.6)] active:scale-95 transition-all border border-[#ffdea5]/50"
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              smart_toy
            </span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-green-400 ring-2 ring-white animate-pulse" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight">
            Durga Sahayak
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-extrabold px-1.5 py-0.5 rounded bg-white/20 text-[#ffdea5]">
            AI Help
          </span>
        </button>
      </div>

      {/* Bottom Navigation Bar */}
      <BottomNav
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        hopperCount={selectedHopperIds.size}
        onOpenHopperTrail={() => setIsHopperModalOpen(true)}
      />

      {/* Modals & Overlays */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        onNavigateToTab={(tab) => {
          setIsChatbotOpen(false);
          setActiveTab(tab);
        }}
      />

      <HopperTrailModal
        isOpen={isHopperModalOpen}
        onClose={() => setIsHopperModalOpen(false)}
        selectedPandals={selectedHopperPandals}
        allPandals={PANDALS_DATA}
        onToggleHopper={handleToggleHopper}
        onClearTrail={() => setSelectedHopperIds(new Set())}
        onSelectCuratedTrail={handleSelectCuratedTrail}
        onOpenShareModal={() => setIsShareModalOpen(true)}
      />

      <PandalDetailModal
        pandal={selectedPandal}
        onClose={() => setSelectedPandal(null)}
        isInHopper={selectedPandal ? selectedHopperIds.has(selectedPandal.id) : false}
        onToggleHopper={() => {
          if (selectedPandal) handleToggleHopper(selectedPandal.id);
        }}
        onOpenPasses={() => setActiveTab('passes')}
        onSharePandal={() => setIsShareModalOpen(true)}
      />

      <PublicShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        isKioskMode={isKioskMode}
        onToggleKioskMode={() => setIsKioskMode(!isKioskMode)}
      />

      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onClearNotifications={() => setUnreadNotifications(0)}
      />

      <MusicGeneratorModal
        isOpen={isMusicModalOpen}
        onClose={() => setIsMusicModalOpen(false)}
        initialPrompt={musicInitialPrompt}
      />
    </div>
  );
}

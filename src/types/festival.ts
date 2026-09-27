export interface Pandal {
  id: string;
  name: string;
  bengaliName: string;
  zone: 'South Kolkata' | 'North Kolkata' | 'Central Kolkata' | 'Salt Lake & East' | 'Howrah & Suburbs';
  category: 'Heritage Gold' | 'State Theme' | 'Water Illumination' | 'Eco-Craft' | 'Fast-Track Eligible' | 'Illumination Wonder' | 'Bonedi Bari';
  theme: string;
  description: string;
  image: string;
  rating: number;
  reviewsCount: string;
  waitTimeMinutes: number;
  crowdStatus: 'low' | 'moderate' | 'high' | 'fast-moving';
  location: {
    address: string;
    metroStation: string;
    metroDistance: string;
    landmark: string;
    coordinates: { lat: number; lng: number };
  };
  bestWindow: string;
  fastTrackAvailable: boolean;
  liveStreamAvailable: boolean;
  riverGhat?: string;
  lightShowTime?: string;
  facilities: string[];
  tags: string[];
}

export interface Ritual {
  id: string;
  title: string;
  bengaliTitle: string;
  day: 'Maha Shashti' | 'Maha Saptami' | 'Maha Ashtami' | 'Maha Navami' | 'Vijaya Dashami';
  time: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  description: string;
  significance: string;
  mantra?: string;
  mantraMeaning?: string;
}

export interface DarshanPass {
  id: string;
  passCode: string;
  devoteeName?: string;
  contact?: string;
  date: string;
  zone: string;
  passType: 'VIP Fast-Track' | 'Senior Citizen Sakha' | 'General Darshan' | 'Dhunuchi Arena' | 'Mahashtami Pushpanjali';
  visitorCount: number;
  status: 'Active' | 'Redeemed' | 'Scheduled';
  pandalVenue: string;
  qrCodeValue: string;
  generatedAt: string;
  entryGate: string;
}

export interface BhogItem {
  id: string;
  name: string;
  bengaliName: string;
  description: string;
  price: number;
  icon: string;
  includes: string[];
  isSpecial?: boolean;
}

export interface BhogOrder {
  id: string;
  orderCode: string;
  devoteeName: string;
  phone: string;
  pandalName: string;
  items: { item: BhogItem; quantity: number }[];
  totalAmount: number;
  pickupDate: string;
  timeSlot: string;
  status: 'Confirmed' | 'Preparing' | 'Ready for Pickup';
  bookedAt: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  suggestions?: string[];
  source?: 'gemini' | 'fallback';
}

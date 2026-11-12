import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Gift, Heart, Bell, User, Sparkles, ShieldCheck, ArrowRight, ArrowLeft,
  Check, X, Search, SlidersHorizontal, Star, ExternalLink, Rotate3d,
  ZoomIn, ZoomOut, Share2, Calendar, Plus, Trash2, Mail, Phone,
  Lock, CheckCircle2, AlertCircle, Code2, Database, Server, Layers,
  Award, Tag, Eye, Send, Copy, RefreshCw, ChevronRight, ChevronLeft,
  Palette, MessageSquareHeart, IndianRupee, Compass, Bookmark
} from 'lucide-react';

// ============================================================================
// DATA & CONSTANTS (Rich Indian E-Commerce & Relationship Dataset)
// ============================================================================

const RELATIONSHIPS = [
  { id: 'mother', label: 'Mother', emoji: '👩‍👧', desc: 'Warm, thoughtful & heartfelt' },
  { id: 'father', label: 'Father', emoji: '👨‍👦', desc: 'Classic, practical & refined' },
  { id: 'sister', label: 'Sister', emoji: '👯‍♀️', desc: 'Trendy, expressive & fun' },
  { id: 'brother', label: 'Brother', emoji: '🤜🤛', desc: 'Cool, tech-savvy & bold' },
  { id: 'girlfriend', label: 'Girlfriend', emoji: '💝', desc: 'Romantic, bespoke & dreamy' },
  { id: 'boyfriend', label: 'Boyfriend', emoji: '🖤', desc: 'Stylish, memorable & personal' },
  { id: 'parents', label: 'Parents', emoji: '🏡', desc: 'Timeless home & togetherness' },
  { id: 'bestfriend', label: 'Best Friend', emoji: '✨', desc: 'Inside jokes & shared memories' },
  { id: 'aunt', label: 'Aunt', emoji: '🌸', desc: 'Graceful, artisanal & cozy' },
  { id: 'uncle', label: 'Uncle', emoji: '☕', desc: 'Distinguished & gourmet' },
  { id: 'teacher', label: 'Teacher', emoji: '📚', desc: 'Respectful, inspiring & curated' },
];

const INTEREST_OPTIONS = [
  'Fashion',
  'Tech & Gadgets',
  'Books & Stationery',
  'Home Decor',
  'Artisanal Food/Hampers',
  'Wellness & Spa',
  'Art & Crafts',
  'Fitness',
  'Travel',
  'Jewelry',
];

const COLOR_PALETTES = [
  { id: 'lavender', name: 'Royal Lavender & Lilac', hex: '#7C3AED', secondary: '#DDD6FE', ring: 'ring-violet-500' },
  { id: 'pastel-pink', name: 'Blush Rose & Peach', hex: '#F43F5E', secondary: '#FFE4E6', ring: 'ring-rose-400' },
  { id: 'royal-blue', name: 'Sapphire & Sky', hex: '#2563EB', secondary: '#DBEAFE', ring: 'ring-blue-500' },
  { id: 'emerald', name: 'Emerald & Sage', hex: '#059669', secondary: '#D1FAE5', ring: 'ring-emerald-500' },
  { id: 'black-gold', name: 'Noir Black & Gold', hex: '#18181B', secondary: '#FDE68A', ring: 'ring-amber-500' },
  { id: 'terracotta', name: 'Warm Terracotta & Rust', hex: '#EA580C', secondary: '#FFEDD5', ring: 'ring-orange-500' },
  { id: 'ivory-beige', name: 'Ivory, Cream & Sand', hex: '#D6C7B2', secondary: '#FAF8F5', ring: 'ring-stone-400' },
  { id: 'multicolor', name: 'Vibrant Festive Spectrum', hex: 'linear-gradient(135deg, #EC4899, #8B5CF6, #F59E0B)', secondary: '#F3E8FF', ring: 'ring-fuchsia-500' },
];

const MEMORY_PROMPTS = [
  'Late night chai & endless conversations',
  'Our favorite road trip together',
  'Always cheering me on during tough exams/work',
  'Childhood festivals and family dinners',
  'Surprise birthday celebrations at midnight',
];

const GIFT_CATALOG = [
  {
    id: 'gift-1',
    title: 'Handcrafted Velvet Memory Scrapbook & Polaroid Kit',
    category: 'Art & Crafts',
    interests: ['Art & Crafts', 'Books & Stationery', 'Home Decor'],
    relationships: ['mother', 'sister', 'girlfriend', 'boyfriend', 'bestfriend', 'parents'],
    colors: ['lavender', 'pastel-pink', 'ivory-beige', 'multicolor'],
    is3DPersonalizable: true,
    modelType: 'scrapbook',
    rating: 4.9,
    reviews: 1420,
    badge: '3D Customizable',
    accentBg: 'from-violet-100 via-purple-50 to-fuchsia-100',
    originalAccent: '#7C3AED',
    visualIcon: '📖',
    description: '40-page acid-free archival cotton paper scrapbook with metallic gel pens, dried pressed flowers, and custom gold-foil cover embossing.',
    prices: [
      { platform: 'Amazon', price: 899, delivery: 'Tomorrow by 9 PM', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 849, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 949, delivery: 'In 3 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 999, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 779, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-2',
    title: 'Royal Saffron & Artisanal Indulgence Luxe Hamper',
    category: 'Artisanal Food/Hampers',
    interests: ['Artisanal Food/Hampers', 'Wellness & Spa', 'Home Decor'],
    relationships: ['mother', 'father', 'parents', 'aunt', 'uncle', 'teacher'],
    colors: ['black-gold', 'terracotta', 'ivory-beige', 'lavender'],
    is3DPersonalizable: true,
    modelType: 'hamper',
    rating: 4.8,
    reviews: 985,
    badge: 'Bestseller Hamper',
    accentBg: 'from-amber-100 via-orange-50 to-rose-100',
    originalAccent: '#D97706',
    visualIcon: '🧺',
    description: 'Curated wooden keepsake trunk packed with Kashmiri saffron kahwa, Belgian dark truffles, roasted pistachios, and hand-poured soy candles.',
    prices: [
      { platform: 'Amazon', price: 2499, delivery: 'Tomorrow by 6 PM', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 2399, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 2599, delivery: 'In 2 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 2450, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 2290, delivery: 'In 5 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-3',
    title: 'Engraved Rosewood & Brass Heirloom Keepsake Box',
    category: 'Home Decor',
    interests: ['Home Decor', 'Jewelry', 'Art & Crafts'],
    relationships: ['mother', 'girlfriend', 'sister', 'aunt', 'parents', 'teacher'],
    colors: ['terracotta', 'black-gold', 'ivory-beige', 'emerald'],
    is3DPersonalizable: true,
    modelType: 'keepsake-box',
    rating: 4.9,
    reviews: 760,
    badge: '3D Engraving Preview',
    accentBg: 'from-emerald-100 via-teal-50 to-amber-100',
    originalAccent: '#059669',
    visualIcon: '🎁',
    description: 'Hand-carved Indian rosewood jewelry & memento organizer with velvet lining and custom laser-engraved initials & message plaque.',
    prices: [
      { platform: 'Amazon', price: 1499, delivery: 'In 2 days', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 1549, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 1399, delivery: 'Tomorrow', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 1449, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 1299, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-4',
    title: 'AMOLED Smart Fitness & Wellness Chronometer Watch',
    category: 'Tech & Gadgets',
    interests: ['Tech & Gadgets', 'Fitness', 'Fashion', 'Travel'],
    relationships: ['father', 'brother', 'boyfriend', 'girlfriend', 'sister', 'bestfriend'],
    colors: ['black-gold', 'royal-blue', 'lavender', 'pastel-pink'],
    is3DPersonalizable: false,
    modelType: 'keepsake-box',
    rating: 4.7,
    reviews: 3410,
    badge: 'Top Rated Tech',
    accentBg: 'from-blue-100 via-indigo-50 to-slate-200',
    originalAccent: '#2563EB',
    visualIcon: '⌚',
    description: '1.43" Always-On AMOLED display, Bluetooth calling, SpO2 & stress monitor, 100+ sports modes, and interchangeable vegan leather straps.',
    prices: [
      { platform: 'Amazon', price: 3299, delivery: 'Tomorrow by 1 PM', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 3199, delivery: 'Tomorrow by 9 PM', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 3499, delivery: 'In 2 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 3399, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 3149, delivery: 'In 4 days', url: '#meesho', inStock: false },
    ],
  },
  {
    id: 'gift-5',
    title: '925 Sterling Silver Minimalist Lotus Pendant Set',
    category: 'Jewelry',
    interests: ['Jewelry', 'Fashion'],
    relationships: ['mother', 'sister', 'girlfriend', 'aunt', 'bestfriend'],
    colors: ['pastel-pink', 'lavender', 'ivory-beige', 'black-gold'],
    is3DPersonalizable: false,
    modelType: 'keepsake-box',
    rating: 4.9,
    reviews: 1890,
    badge: 'Hallmarked 925 Silver',
    accentBg: 'from-rose-100 via-pink-50 to-violet-100',
    originalAccent: '#E11D48',
    visualIcon: '💎',
    description: 'Rhodium-plated pure 925 sterling silver necklace and stud earrings set with AAA-grade cubic zirconia in an anti-tarnish gift box.',
    prices: [
      { platform: 'Amazon', price: 1899, delivery: 'In 2 days', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 1949, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 1749, delivery: 'Tomorrow', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 1799, delivery: 'In 2 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 1699, delivery: 'In 5 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-6',
    title: 'Botanical Aromatherapy & Himalayan Salt Spa Ritual Box',
    category: 'Wellness & Spa',
    interests: ['Wellness & Spa', 'Home Decor', 'Artisanal Food/Hampers'],
    relationships: ['mother', 'sister', 'girlfriend', 'aunt', 'teacher', 'parents'],
    colors: ['lavender', 'pastel-pink', 'emerald', 'ivory-beige'],
    is3DPersonalizable: true,
    modelType: 'hamper',
    rating: 4.8,
    reviews: 1120,
    badge: 'Self-Care Favorite',
    accentBg: 'from-purple-100 via-fuchsia-50 to-emerald-100',
    originalAccent: '#8B5CF6',
    visualIcon: '🧘‍♀️',
    description: 'French lavender essential oil mist, rose-quartz facial roller, cold-pressed shea body butter, and organic chamomile infusion.',
    prices: [
      { platform: 'Amazon', price: 1299, delivery: 'Tomorrow', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 1249, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 1199, delivery: 'Tomorrow', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 1275, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 1099, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-7',
    title: 'Personalized Full-Grain Leather Travel Organizer & Passport Folio',
    category: 'Travel',
    interests: ['Travel', 'Fashion', 'Books & Stationery'],
    relationships: ['father', 'brother', 'boyfriend', 'uncle', 'bestfriend', 'teacher'],
    colors: ['terracotta', 'black-gold', 'royal-blue', 'emerald'],
    is3DPersonalizable: true,
    modelType: 'scrapbook',
    rating: 4.7,
    reviews: 840,
    badge: 'Custom Name Tag',
    accentBg: 'from-orange-100 via-amber-50 to-stone-200',
    originalAccent: '#C2410C',
    visualIcon: '🧳',
    description: 'RFID-protected handcrafted leather travel wallet with custom metallic charm, luggage tag, and brass-nibbed travel journal.',
    prices: [
      { platform: 'Amazon', price: 1149, delivery: 'Tomorrow', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 1099, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 1199, delivery: 'In 2 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 1049, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 949, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-8',
    title: 'Ceramic Pour-Over Specialty Coffee & Brass Grinder Set',
    category: 'Artisanal Food/Hampers',
    interests: ['Artisanal Food/Hampers', 'Home Decor', 'Books & Stationery'],
    relationships: ['father', 'uncle', 'teacher', 'brother', 'boyfriend', 'bestfriend'],
    colors: ['ivory-beige', 'black-gold', 'terracotta', 'emerald'],
    is3DPersonalizable: false,
    modelType: 'hamper',
    rating: 4.8,
    reviews: 630,
    badge: 'Connoisseur Pick',
    accentBg: 'from-stone-200 via-amber-50 to-orange-100',
    originalAccent: '#78350F',
    visualIcon: '☕',
    description: 'Studio-pottery fluted dripper, borosilicate server, stainless burr hand-grinder, and 250g Chikmagalur single-estate Arabica beans.',
    prices: [
      { platform: 'Amazon', price: 2199, delivery: 'Tomorrow', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 2249, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 2399, delivery: 'In 3 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 2149, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 1999, delivery: 'In 5 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-9',
    title: 'Fountain Pen & Wax-Seal Calligraphy Desk Suite',
    category: 'Books & Stationery',
    interests: ['Books & Stationery', 'Art & Crafts', 'Home Decor'],
    relationships: ['teacher', 'father', 'mother', 'sister', 'brother', 'bestfriend'],
    colors: ['royal-blue', 'black-gold', 'emerald', 'lavender'],
    is3DPersonalizable: true,
    modelType: 'keepsake-box',
    rating: 4.9,
    reviews: 915,
    badge: 'Teacher & Writer Fav',
    accentBg: 'from-indigo-100 via-violet-50 to-amber-100',
    originalAccent: '#4338CA',
    visualIcon: '✒️',
    description: 'Weighted iridium-nib fountain pen, bottled midnight ink, brass monogram wax stamp, and 200gsm deckle-edge correspondence cards.',
    prices: [
      { platform: 'Amazon', price: 699, delivery: 'Tomorrow', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 649, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 749, delivery: 'In 3 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 729, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 549, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-10',
    title: 'Active Noise-Cancelling Studio Wireless Headphones',
    category: 'Tech & Gadgets',
    interests: ['Tech & Gadgets', 'Travel', 'Fitness'],
    relationships: ['brother', 'boyfriend', 'girlfriend', 'sister', 'bestfriend'],
    colors: ['black-gold', 'royal-blue', 'lavender', 'ivory-beige'],
    is3DPersonalizable: false,
    modelType: 'keepsake-box',
    rating: 4.8,
    reviews: 2740,
    badge: '45dB Hybrid ANC',
    accentBg: 'from-slate-200 via-violet-100 to-indigo-100',
    originalAccent: '#6D28D9',
    visualIcon: '🎧',
    description: '40mm custom silk-diaphragm drivers, 50-hour battery life, plush memory-foam earcups, and dual-device multipoint pairing.',
    prices: [
      { platform: 'Amazon', price: 4999, delivery: 'Tomorrow by 2 PM', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 4799, delivery: 'Tomorrow by 9 PM', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 5199, delivery: 'In 2 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 4899, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 4699, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-11',
    title: 'Handloom Mulberry Silk Stole & Brooch Gift Box',
    category: 'Fashion',
    interests: ['Fashion', 'Jewelry', 'Art & Crafts'],
    relationships: ['mother', 'aunt', 'teacher', 'sister', 'girlfriend'],
    colors: ['lavender', 'pastel-pink', 'emerald', 'multicolor'],
    is3DPersonalizable: false,
    modelType: 'hamper',
    rating: 4.9,
    reviews: 540,
    badge: 'Artisan Handloom',
    accentBg: 'from-fuchsia-100 via-purple-50 to-rose-100',
    originalAccent: '#A21CAF',
    visualIcon: '🧣',
    description: 'Pure woven mulberry silk stole with zari borders paired with an antique-finish floral brooch in a satin-lined presentation box.',
    prices: [
      { platform: 'Amazon', price: 1649, delivery: 'In 2 days', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 1599, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 1499, delivery: 'Tomorrow', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 1449, delivery: 'In 2 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 1349, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
  {
    id: 'gift-12',
    title: 'Smart LED Galaxy Mood Lamp & Bluetooth Speaker',
    category: 'Home Decor',
    interests: ['Home Decor', 'Tech & Gadgets'],
    relationships: ['sister', 'brother', 'girlfriend', 'boyfriend', 'bestfriend'],
    colors: ['lavender', 'royal-blue', 'multicolor', 'pastel-pink'],
    is3DPersonalizable: false,
    modelType: 'keepsake-box',
    rating: 4.6,
    reviews: 1680,
    badge: 'Under ₹500 Steal',
    accentBg: 'from-violet-200 via-indigo-100 to-fuchsia-100',
    originalAccent: '#7C3AED',
    visualIcon: '🔮',
    description: 'Touch-dimmable 16-million color ambient bedside orb with warm reading mode, sunrise alarm, and crisp acoustic speaker.',
    prices: [
      { platform: 'Amazon', price: 449, delivery: 'Tomorrow', url: '#amazon', inStock: true },
      { platform: 'Flipkart', price: 429, delivery: 'In 2 days', url: '#flipkart', inStock: true },
      { platform: 'Myntra', price: 499, delivery: 'In 3 days', url: '#myntra', inStock: true },
      { platform: 'Ajio', price: 479, delivery: 'In 3 days', url: '#ajio', inStock: true },
      { platform: 'Meesho', price: 369, delivery: 'In 4 days', url: '#meesho', inStock: true },
    ],
  },
];

const INITIAL_REMINDERS = [
  {
    id: 'rem-1',
    recipientName: 'Maa (Ananya Sharma)',
    relationship: 'mother',
    occasion: 'Birthday',
    date: '2026-11-24',
    budget: 3000,
    note: 'Loves lavender shades and artisanal tea hampers',
  },
  {
    id: 'rem-2',
    recipientName: 'Rohan (Bestie)',
    relationship: 'bestfriend',
    occasion: 'Friendship Anniversary',
    date: '2026-12-05',
    budget: 1500,
    note: 'Include inside joke from our Manali trip!',
  },
  {
    id: 'rem-3',
    recipientName: 'Prof. Kulkarni',
    relationship: 'teacher',
    occasion: 'Retirement & Gratitude',
    date: '2026-12-18',
    budget: 1200,
    note: 'Fountain pen or classic stationery set',
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

const getLowestPriceInfo = (prices) => {
  const available = prices.filter((p) => p.inStock);
  const list = available.length > 0 ? available : prices;
  return list.reduce((min, curr) => (curr.price < min.price ? curr : min), list[0]);
};

const getDaysUntil = (dateStr) => {
  const target = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target - today) / (1000 * 60 * 60 * 24));
  return diff;
};

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

/**
 * Mandatory Authentication Gate (Login / Sign Up + 6-Digit OTP Verification)
 */
function AuthScreen({ onAuthenticated, showToast }) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'signup'
  const [contactType, setContactType] = useState('email'); // 'email' | 'phone'
  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [fullName, setFullName] = useState('');
  const [contactValue, setContactValue] = useState('');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpRefs = useRef([]);

  useEffect(() => {
    if (step !== 'otp' || resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [step, resendTimer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');

    if (authMode === 'signup' && fullName.trim().length < 2) {
      setError('Please enter your full name to create your Giftology account.');
      return;
    }

    if (contactType === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(contactValue.trim())) {
        setError('Please enter a valid email address (e.g., priya@example.com).');
        return;
      }
    } else {
      const phoneClean = contactValue.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        setError('Please enter a valid 10-digit Indian mobile number.');
        return;
      }
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('otp');
      setResendTimer(30);
      setOtpDigits(['', '', '', '', '', '']);
      showToast(`6-digit OTP sent to ${contactValue}`, 'success');
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 450);
  };

  const handleOtpChange = (index, val) => {
    const clean = val.replace(/\D/g, '').slice(-1);
    const updated = [...otpDigits];
    updated[index] = clean;
    setOtpDigits(updated);
    setError('');

    if (clean && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleAutofillDemoOtp = () => {
    setOtpDigits(['1', '2', '3', '4', '5', '6']);
    setError('');
    otpRefs.current[5]?.focus();
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const entered = otpDigits.join('');
    if (entered.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }
    if (entered !== '123456') {
      setError('Invalid OTP entered. Use 123456 for instant verification.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const derivedName =
        fullName.trim() ||
        (contactType === 'email'
          ? contactValue.split('@')[0].replace(/[._]/g, ' ')
          : 'Gift Explorer');
      onAuthenticated({
        name: derivedName.charAt(0).toUpperCase() + derivedName.slice(1),
        contact: contactValue.trim(),
        contactType,
        credits: 250,
      });
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#F8F7FF] flex flex-col lg:flex-row">
      {/* Left Brand Showcase Panel */}
      <div className="lg:w-5/12 bg-gradient-to-br from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-purple-950/30 blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2.5 bg-white/15 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-8">
            <Gift className="w-5 h-5 text-violet-100" />
            <span className="font-bold tracking-wide text-sm">GIFTOLOGY INDIA</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-5">
            Gifts crafted from <span className="text-violet-200 underline decoration-violet-300/60">cherished memories</span>, not guesswork.
          </h1>
          <p className="text-violet-100 text-base sm:text-lg leading-relaxed max-w-md">
            Answer 4 intuitive questions, preview custom keepsakes in interactive 3D, and compare live prices across Amazon, Flipkart, Ajio, Myntra & Meesho.
          </p>
        </div>

        <div className="relative z-10 mt-10 space-y-4">
          <div className="grid grid-cols-3 gap-3 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15">
            <div>
              <div className="text-2xl font-extrabold">95%</div>
              <div className="text-xs text-violet-200">Match Accuracy</div>
            </div>
            <div className="border-x border-white/15 px-3">
              <div className="text-2xl font-extrabold">5 Sites</div>
              <div className="text-xs text-violet-200">Live Price Compare</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold">3D View</div>
              <div className="text-xs text-violet-200">Bespoke Studio</div>
            </div>
          </div>
          <p className="text-xs text-violet-200/80 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            Mandatory OTP-secured session • ₹200 – ₹10,000 curated range
          </p>
        </div>
      </div>

      {/* Right Authentication Card */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-violet-900/5 border border-[#EDE9FE] p-7 sm:p-9 transition-all">
          {step === 'credentials' ? (
            <>
              {/* Auth Mode Toggle */}
              <div className="flex bg-[#F8F7FF] p-1.5 rounded-2xl border border-[#EDE9FE] mb-6">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setError('');
                  }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    authMode === 'login'
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#6D28D9]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('signup');
                    setError('');
                  }}
                  className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all ${
                    authMode === 'signup'
                      ? 'bg-[#7C3AED] text-white shadow-sm'
                      : 'text-slate-600 hover:text-[#6D28D9]'
                  }`}
                >
                  Create Account
                </button>
              </div>

              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  {authMode === 'login' ? 'Welcome back to Giftology' : 'Join Giftology Free'}
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Verify via mandatory one-time passcode to unlock your personalized gift engine.
                </p>
              </div>

              {/* Email vs Phone Selector */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => {
                    setContactType('email');
                    setContactValue('');
                    setError('');
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                    contactType === 'email'
                      ? 'border-[#7C3AED] bg-[#EDE9FE]/60 text-[#6D28D9]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Email OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setContactType('phone');
                    setContactValue('');
                    setError('');
                  }}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-sm font-medium transition-all ${
                    contactType === 'phone'
                      ? 'border-[#7C3AED] bg-[#EDE9FE]/60 text-[#6D28D9]'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                  Phone OTP
                </button>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g., Aarav Mehta"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-violet-500/10 outline-none text-sm text-slate-900 transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                    {contactType === 'email' ? 'Email Address' : 'Indian Mobile Number (+91)'}
                  </label>
                  <div className="relative">
                    {contactType === 'email' ? (
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    ) : (
                      <span className="text-xs font-bold text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2">
                        +91
                      </span>
                    )}
                    <input
                      type={contactType === 'email' ? 'email' : 'tel'}
                      value={contactValue}
                      onChange={(e) => setContactValue(e.target.value)}
                      placeholder={
                        contactType === 'email' ? 'you@example.com' : '98765 43210'
                      }
                      className={`w-full ${
                        contactType === 'email' ? 'pl-10' : 'pl-12'
                      } pr-4 py-3 rounded-xl border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-violet-500/10 outline-none text-sm text-slate-900 transition-all`}
                    />
                  </div>
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60"
                >
                  {isSubmitting ? 'Sending OTP...' : 'Send Verification OTP'}
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Quick Demo Fill Pill */}
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setContactType('email');
                      setContactValue('diya.kapoor@giftology.in');
                      if (authMode === 'signup') setFullName('Diya Kapoor');
                      setError('');
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#6D28D9] bg-[#EDE9FE] hover:bg-violet-200/80 px-3 py-1.5 rounded-full transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Demo: Fill sample email
                  </button>
                </div>
              </form>
            </>
          ) : (
            /* Step 2: Mandatory OTP Verification */
            <div>
              <button
                type="button"
                onClick={() => {
                  setStep('credentials');
                  setError('');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#6D28D9] mb-5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Change {contactType === 'email' ? 'email' : 'number'}
              </button>

              <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] text-[#7C3AED] flex items-center justify-center mb-4">
                <Lock className="w-6 h-6" />
              </div>

              <h2 className="text-2xl font-bold text-slate-900">Verify Your OTP</h2>
              <p className="text-sm text-slate-500 mt-1">
                We sent a 6-digit security code to{' '}
                <span className="font-semibold text-slate-800">{contactValue}</span>
              </p>

              {/* Demo OTP Helper Pill */}
              <div className="mt-4">
                <button
                  type="button"
                  onClick={handleAutofillDemoOtp}
                  className="w-full flex items-center justify-between bg-[#F8F7FF] hover:bg-[#EDE9FE] border border-violet-200 rounded-xl px-3.5 py-2.5 text-xs transition-colors group"
                >
                  <span className="text-slate-600">
                    Demo OTP: <strong className="text-[#6D28D9] font-mono tracking-widest">123456</strong>
                  </span>
                  <span className="font-semibold text-[#7C3AED] group-hover:underline">
                    Click to auto-fill →
                  </span>
                </button>
              </div>

              <form onSubmit={handleVerifyOtp} className="mt-6 space-y-5">
                <div className="flex justify-between gap-2">
                  {otpDigits.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => (otpRefs.current[idx] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      aria-label={`OTP Digit ${idx + 1}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      className="w-11 h-13 sm:w-12 sm:h-14 text-center text-xl font-bold rounded-xl border-2 border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-violet-500/15 outline-none text-slate-900 transition-all"
                    />
                  ))}
                </div>

                {error && (
                  <div className="flex items-start gap-2 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  {isSubmitting ? 'Verifying...' : 'Verify & Enter Giftology'}
                </button>

                <div className="text-center text-xs text-slate-500">
                  {resendTimer > 0 ? (
                    <span>Resend code in 00:{resendTimer.toString().padStart(2, '0')}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setResendTimer(30);
                        showToast('New OTP (123456) sent!', 'success');
                      }}
                      className="font-semibold text-[#7C3AED] hover:underline"
                    >
                      Resend OTP Now
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive 3D Product Viewer & Personal Birthday/Occasion Message Studio
 */
function ThreeDStudioModal({ gift, initialMessage, selectedColorHex, onClose, onSaveToWishlist, isWishlisted, showToast }) {
  const [rotX, setRotX] = useState(-14);
  const [rotY, setRotY] = useState(24);
  const [zoom, setZoom] = useState(1);
  const [isOpenLid, setIsOpenLid] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  const [wrapColor, setWrapColor] = useState(selectedColorHex || gift.originalAccent || '#7C3AED');
  const [recipientTitle, setRecipientTitle] = useState('For Someone Extraordinary');
  const [occasionTag, setOccasionTag] = useState('Happy Birthday! 🎂');
  const [personalMessage, setPersonalMessage] = useState(
    initialMessage ||
      'Every laugh we share becomes my favorite memory. Wishing you a year filled with warmth, wonder, and endless reasons to smile!'
  );
  const [senderSign, setSenderSign] = useState('With all my love ❤️');

  const handlePointerDown = (e) => {
    setIsDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX, y: clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const deltaX = clientX - dragStart.current.x;
    const deltaY = clientY - dragStart.current.y;
    setRotY((prev) => prev + deltaX * 0.65);
    setRotX((prev) => Math.max(-55, Math.min(55, prev - deltaY * 0.65)));
    dragStart.current = { x: clientX, y: clientY };
  };

  const handlePointerUp = () => setIsDragging(false);

  const wrapSwatches = [
    { name: 'Royal Lavender', hex: '#7C3AED' },
    { name: 'Blush Rose', hex: '#E11D48' },
    { name: 'Emerald Velvet', hex: '#059669' },
    { name: 'Midnight Noir', hex: '#1E1B4B' },
    { name: 'Warm Terracotta', hex: '#C2410C' },
  ];

  const lowest = getLowestPriceInfo(gift.prices);

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onMouseUp={handlePointerUp}
      onTouchEnd={handlePointerUp}
    >
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-[#EDE9FE] overflow-hidden my-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F8F7FF] border-b border-[#EDE9FE]">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center shadow-sm">
              <Rotate3d className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                  Interactive 3D Keepsake & Message Studio
                </h3>
                <span className="hidden sm:inline-block text-[11px] font-semibold bg-[#EDE9FE] text-[#6D28D9] px-2.5 py-0.5 rounded-full">
                  Live 3D Preview
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate max-w-md">{gift.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close 3D Studio"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-violet-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Cols: Interactive 3D Viewport */}
          <div className="lg:col-span-7 bg-gradient-to-b from-[#F8F7FF] via-[#EDE9FE]/50 to-white p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[#EDE9FE]">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-xs font-medium text-slate-600 bg-white px-3 py-1.5 rounded-full border border-violet-100 shadow-xs">
                🖱️ Drag or swipe anywhere on object to rotate 360°
              </span>
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-violet-100 shadow-xs">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(0.75, +(z - 0.15).toFixed(2)))}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-700"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-semibold text-slate-600 px-1.5">
                  {Math.round(zoom * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(1.45, +(z + 0.15).toFixed(2)))}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-slate-700"
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRotX(-14);
                    setRotY(24);
                    setZoom(1);
                  }}
                  className="p-1.5 rounded-lg hover:bg-violet-50 text-[#7C3AED]"
                  title="Reset Angle"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 3D CSS Perspective Stage */}
            <div
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              className="relative h-72 sm:h-80 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden rounded-2xl border border-violet-200/60 bg-[radial-gradient(circle_at_center,#ffffff_0%,#EDE9FE_100%)]"
              style={{ perspective: '1000px' }}
            >
              {/* Soft Floor Shadow */}
              <div
                className="absolute bottom-8 w-44 h-8 rounded-full bg-violet-950/15 blur-md transition-transform duration-200"
                style={{ transform: `scale(${zoom})` }}
              />

              {/* 3D Transformable Keepsake Box / Scrapbook */}
              <div
                className="relative w-48 h-36 transition-transform duration-75"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `scale(${zoom}) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
                }}
              >
                {/* Front Face */}
                <div
                  className="absolute inset-0 rounded-xl shadow-xl border-2 border-amber-200/70 flex flex-col items-center justify-center p-4 text-center text-white"
                  style={{
                    backgroundColor: wrapColor,
                    transform: 'translateZ(48px)',
                  }}
                >
                  <div className="w-full h-full border border-amber-300/60 rounded-lg flex flex-col items-center justify-center p-2">
                    <span className="text-2xl mb-1">{gift.visualIcon}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-amber-200 font-semibold">
                      Giftology Bespoke
                    </span>
                    <p className="text-xs font-bold mt-1 line-clamp-1">{recipientTitle}</p>
                    <div className="w-10 h-0.5 bg-amber-300/80 my-1.5 rounded-full" />
                    <span className="text-[10px] text-white/90">{occasionTag}</span>
                  </div>
                </div>

                {/* Back Face */}
                <div
                  className="absolute inset-0 rounded-xl border border-white/30 flex items-center justify-center p-4 text-white/90 text-xs text-center"
                  style={{
                    backgroundColor: wrapColor,
                    filter: 'brightness(0.88)',
                    transform: 'rotateY(180deg) translateZ(48px)',
                  }}
                >
                  <div>
                    <p className="font-semibold text-amber-200 text-[11px]">Handcrafted Edition</p>
                    <p className="text-[10px] mt-1 opacity-80">Sealed with love • {senderSign}</p>
                  </div>
                </div>

                {/* Right Face */}
                <div
                  className="absolute top-0 bottom-0 w-24 left-12 border border-amber-200/40 flex items-center justify-center"
                  style={{
                    backgroundColor: wrapColor,
                    filter: 'brightness(0.82)',
                    transform: 'rotateY(90deg) translateZ(96px)',
                  }}
                >
                  <div className="w-3 h-full bg-amber-300/70" />
                </div>

                {/* Left Face (Spine) */}
                <div
                  className="absolute top-0 bottom-0 w-24 left-12 border border-amber-200/40 flex items-center justify-center"
                  style={{
                    backgroundColor: wrapColor,
                    filter: 'brightness(0.75)',
                    transform: 'rotateY(-90deg) translateZ(96px)',
                  }}
                >
                  <div className="w-3 h-full bg-amber-300/70" />
                </div>

                {/* Top Lid (Interactive Open/Close Hinge) */}
                <div
                  className="absolute left-0 right-0 h-24 top-6 rounded-lg border-2 border-amber-200/80 flex items-center justify-center transition-transform duration-500"
                  style={{
                    backgroundColor: wrapColor,
                    filter: 'brightness(1.08)',
                    transformOrigin: 'top center',
                    transform: isOpenLid
                      ? 'rotateX(135deg) translateZ(48px)'
                      : 'rotateX(90deg) translateZ(48px)',
                  }}
                >
                  {/* Satin Ribbon Cross */}
                  <div className="w-full h-3 bg-amber-300/80 absolute" />
                  <div className="h-full w-3 bg-amber-300/80 absolute" />
                  <div className="w-7 h-7 rounded-full bg-amber-200 text-amber-900 font-bold text-xs flex items-center justify-center z-10 shadow">
                    ✦
                  </div>
                </div>

                {/* Interior Surprise Glow when Lid Opened */}
                {isOpenLid && (
                  <div
                    className="absolute inset-2 bg-amber-50 rounded-lg border border-amber-300 flex flex-col items-center justify-center p-2 text-center shadow-inner"
                    style={{ transform: 'translateZ(20px)' }}
                  >
                    <span className="text-lg">✨💌✨</span>
                    <p className="text-[10px] font-bold text-violet-900 leading-tight mt-1">
                      “{personalMessage.slice(0, 62)}...”
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Interactive Controls Below 3D Stage */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-600">Wrap Shade:</span>
                {wrapSwatches.map((swatch) => (
                  <button
                    key={swatch.hex}
                    type="button"
                    onClick={() => setWrapColor(swatch.hex)}
                    title={swatch.name}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      wrapColor === swatch.hex
                        ? 'scale-125 border-slate-900 ring-2 ring-violet-400'
                        : 'border-white shadow'
                    }`}
                    style={{ backgroundColor: swatch.hex }}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIsOpenLid((prev) => !prev)}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-violet-50 text-[#6D28D9] border border-violet-200 text-xs font-semibold shadow-xs transition-all"
              >
                {isOpenLid ? 'Close Keepsake Lid' : '✨ Peek Inside Gift Box'}
              </button>
            </div>
          </div>

          {/* Right 5 Cols: Personal Birthday / Occasion Message Studio */}
          <div className="lg:col-span-5 p-6 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center gap-2 text-[#7C3AED] font-bold text-sm mb-3">
                <MessageSquareHeart className="w-4 h-4" />
                Personal Occasion & Birthday Card Studio
              </div>

              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Engraved Title
                    </label>
                    <input
                      type="text"
                      maxLength={28}
                      value={recipientTitle}
                      onChange={(e) => setRecipientTitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Occasion Header
                    </label>
                    <select
                      value={occasionTag}
                      onChange={(e) => setOccasionTag(e.target.value)}
                      className="w-full px-2.5 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none bg-white"
                    >
                      <option>Happy Birthday! 🎂</option>
                      <option>Happy Anniversary 💐</option>
                      <option>Thank You So Much ✨</option>
                      <option>Best Wishes Always 🌟</option>
                      <option>Just Because 💜</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-[11px] font-semibold text-slate-500">
                      Heartfelt Message Inside Card
                    </label>
                    <span className="text-[10px] text-slate-400">{personalMessage.length}/180</span>
                  </div>
                  <textarea
                    rows={3}
                    maxLength={180}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    placeholder="Write a personal birthday wish or favorite memory..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                    Sign-off
                  </label>
                  <input
                    type="text"
                    maxLength={32}
                    value={senderSign}
                    onChange={(e) => setSenderSign(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none"
                  />
                </div>
              </div>

              {/* Live Rendered Keepsake Note Card */}
              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#F8F7FF] to-[#EDE9FE] border border-violet-200/80 relative">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#7C3AED]">
                  Live Card Preview
                </span>
                <p className="text-xs font-bold text-slate-800 mt-1">{occasionTag}</p>
                <p className="text-xs text-slate-700 italic mt-1.5 leading-relaxed">
                  “{personalMessage || 'Your heartfelt message will appear here...'}”
                </p>
                <p className="text-[11px] font-semibold text-[#6D28D9] mt-2 text-right">
                  — {senderSign}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div>
                <div className="text-[11px] text-slate-500">Best Price on {lowest.platform}</div>
                <div className="text-lg font-extrabold text-slate-900">{formatINR(lowest.price)}</div>
              </div>
              <button
                type="button"
                onClick={() => {
                  onSaveToWishlist(gift);
                  showToast('Custom 3D gift & personal card saved to Wish List!', 'success');
                }}
                className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-violet-600/20 transition-all"
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                {isWishlisted ? 'Saved with Note' : 'Save Custom Gift'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Multi-Platform Indian E-Commerce Price Comparison Modal
 */
function PriceCompareModal({ gift, onClose, showToast }) {
  const sortedPrices = [...gift.prices].sort((a, b) => a.price - b.price);
  const lowestPrice = sortedPrices[0].price;

  const platformBadges = {
    Amazon: 'bg-amber-100 text-amber-900 border-amber-200',
    Flipkart: 'bg-blue-100 text-blue-900 border-blue-200',
    Myntra: 'bg-pink-100 text-pink-900 border-pink-200',
    Ajio: 'bg-slate-100 text-slate-900 border-slate-300',
    Meesho: 'bg-purple-100 text-purple-900 border-purple-200',
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-[#EDE9FE] overflow-hidden">
        <div className="p-6 bg-[#F8F7FF] border-b border-[#EDE9FE] flex items-start justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gift.accentBg} flex items-center justify-center text-3xl shadow-xs shrink-0`}
            >
              {gift.visualIcon}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#7C3AED]">
                Live Indian Store Comparison
              </span>
              <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug">
                {gift.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-violet-100 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          {sortedPrices.map((item, idx) => {
            const isLowest = item.price === lowestPrice && item.inStock;
            const savings = sortedPrices[sortedPrices.length - 1].price - item.price;

            return (
              <div
                key={item.platform}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all ${
                  isLowest
                    ? 'border-[#7C3AED] bg-[#F8F7FF] shadow-sm'
                    : 'border-slate-200 bg-white hover:border-violet-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border ${
                      platformBadges[item.platform] || 'bg-slate-100 text-slate-800'
                    }`}
                  >
                    {item.platform}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-900 text-base">
                        {formatINR(item.price)}
                      </span>
                      {isLowest && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          Lowest Price
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{item.inStock ? `🚚 ${item.delivery}` : 'Currently Out of Stock'}</span>
                      {savings > 0 && item.inStock && (
                        <span className="text-emerald-700 font-medium">
                          • Save {formatINR(savings)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!item.inStock}
                  onClick={() =>
                    showToast(`Redirecting to ${item.platform} deal at ${formatINR(item.price)}...`, 'info')
                  }
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    item.inStock
                      ? isLowest
                        ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-violet-100 text-slate-800 hover:text-[#6D28D9]'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Buy Now
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Prices include GST • Updated just now</span>
          <button
            type="button"
            onClick={onClose}
            className="font-semibold text-[#7C3AED] hover:underline"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Full-Stack Architecture, SQL Database Schema & API Blueprint Modal
 */
function TechSpecsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('schema');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#EDE9FE] overflow-hidden my-auto">
        <div className="px-6 py-4 bg-[#F8F7FF] border-b border-[#EDE9FE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#7C3AED] text-white flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Giftology Full-Stack Architecture & SQL Schema</h3>
              <p className="text-xs text-slate-500">
                React + TypeScript • Node.js / Express • PostgreSQL / SQLite • Docker CI/CD
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:bg-violet-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 pt-4 border-b border-slate-100 flex gap-2">
          {[
            { id: 'schema', label: 'SQL Database Schema', icon: Database },
            { id: 'api', label: 'Express REST API', icon: Server },
            { id: 'devops', label: 'Docker & QA Metrics', icon: Layers },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold rounded-t-xl border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#7C3AED] text-[#6D28D9] bg-[#F8F7FF]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="p-6 max-h-[65vh] overflow-y-auto text-xs">
          {activeTab === 'schema' && (
            <div className="space-y-4">
              <p className="text-slate-600">
                Normalized relational schema supporting OTP authentication, memory-weighted preferences, multi-store price indexing, wish lists, and occasion reminders:
              </p>
              <pre className="bg-slate-900 text-violet-100 p-4 rounded-2xl overflow-x-auto font-mono leading-relaxed">
{`-- 1. Users & Mandatory OTP Verification
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(20) UNIQUE,
  otp_hash VARCHAR(255),
  otp_expires_at TIMESTAMP,
  is_verified BOOLEAN DEFAULT FALSE,
  referral_code VARCHAR(20) UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Relationships Taxonomy
CREATE TABLE relationships (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(50) UNIQUE NOT NULL, -- mother, father, teacher, etc.
  display_name VARCHAR(80) NOT NULL
);

-- 3. Gifts Catalog & Multi-Platform Prices
CREATE TABLE gifts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(200) NOT NULL,
  category VARCHAR(80) NOT NULL,
  is_3d_customizable BOOLEAN DEFAULT FALSE,
  base_price_inr INTEGER CHECK (base_price_inr BETWEEN 200 AND 10000),
  platform_prices JSONB NOT NULL -- { amazon, flipkart, ajio, myntra, meesho }
);

-- 4. User Questionnaire Preferences & Memory Context
CREATE TABLE preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  relationship_slug VARCHAR(50) REFERENCES relationships(slug),
  favorite_memory TEXT,
  liked_categories TEXT[],
  preferred_colors TEXT[],
  budget_min INTEGER DEFAULT 200,
  budget_max INTEGER DEFAULT 10000
);

-- 5. Wish Lists & Custom Personal Messages
CREATE TABLE wish_lists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  gift_id UUID REFERENCES gifts(id) ON DELETE CASCADE,
  custom_message TEXT,
  wrap_color VARCHAR(30),
  saved_at TIMESTAMP DEFAULT NOW()
);

-- 6. Occasion Reminders
CREATE TABLE reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_name VARCHAR(120) NOT NULL,
  relationship_slug VARCHAR(50),
  occasion_type VARCHAR(80) NOT NULL,
  occasion_date DATE NOT NULL,
  budget_inr INTEGER DEFAULT 1500
);`}
              </pre>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              {[
                { method: 'POST', path: '/api/v1/auth/send-otp', desc: 'Dispatches 6-digit SMS/Email OTP with rate-limiting (<1% failure SLA).' },
                { method: 'POST', path: '/api/v1/auth/verify-otp', desc: 'Validates OTP hash and issues HTTP-only JWT session token.' },
                { method: 'POST', path: '/api/v1/recommendations/generate', desc: 'Scores gifts using memory NLP keywords, relationship weights, colors & ₹200–₹10k budget.' },
                { method: 'GET', path: '/api/v1/prices/compare/:giftId', desc: 'Fetches cached real-time pricing across Amazon, Flipkart, Ajio, Myntra & Meesho.' },
                { method: 'GET/POST', path: '/api/v1/wishlist', desc: 'Persists saved gifts alongside custom 3D wrap shade & birthday card notes.' },
                { method: 'GET/POST', path: '/api/v1/reminders', desc: 'Schedules automated email/push alerts ahead of birthdays & anniversaries.' },
              ].map((ep) => (
                <div
                  key={ep.path}
                  className="p-3.5 rounded-xl border border-slate-200 bg-[#F8F7FF]/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-lg bg-[#7C3AED] text-white font-mono font-bold text-[11px]">
                      {ep.method}
                    </span>
                    <code className="font-mono font-semibold text-slate-900">{ep.path}</code>
                  </div>
                  <p className="text-slate-600">{ep.desc}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'devops' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#F8F7FF] border border-[#EDE9FE]">
                <h4 className="font-bold text-slate-900 mb-2">Docker & CI/CD Pipeline</h4>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li>Multi-stage Docker builds (Node 20 Alpine + Nginx static edge)</li>
                  <li>GitHub Actions CI: ESLint, TypeScript check, Vitest unit & Playwright E2E</li>
                  <li>Redis caching layer for Indian e-commerce price feeds (&lt;2s load)</li>
                </ul>
              </div>
              <div className="p-4 rounded-2xl bg-[#F8F7FF] border border-[#EDE9FE]">
                <h4 className="font-bold text-slate-900 mb-2">Quality & WCAG 2.1 Targets</h4>
                <ul className="space-y-1.5 text-slate-600 list-disc pl-4">
                  <li>AA+ contrast ratios across lavender & white surfaces</li>
                  <li>Keyboard-navigable controls, ARIA labels & mobile touch targets</li>
                  <li>95% recommendation relevance score via multi-factor matching</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Authentication State (Mandatory Login + OTP)
  const [currentUser, setCurrentUser] = useState(null);

  // Navigation Tabs: 'finder' | 'wishlist' | 'reminders'
  const [activeNav, setActiveNav] = useState('finder');

  // Gift Finder Wizard State
  const [finderStep, setFinderStep] = useState(1); // 1: Relationship, 2: Questionnaire, 3: Recommendations
  const [selectedRelationship, setSelectedRelationship] = useState('mother');
  const [favoriteMemory, setFavoriteMemory] = useState('');
  const [selectedInterests, setSelectedInterests] = useState(['Artisanal Food/Hampers', 'Wellness & Spa']);
  const [selectedColors, setSelectedColors] = useState(['lavender']);
  const [budgetMin, setBudgetMin] = useState(200);
  const [budgetMax, setBudgetMax] = useState(5000);

  // Recommendations View Options
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'carousel'
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [only3DFilter, setOnly3DFilter] = useState(false);

  // Interactive Modals
  const [active3DGift, setActive3DGift] = useState(null);
  const [activeCompareGift, setActiveCompareGift] = useState(null);
  const [showTechSpecs, setShowTechSpecs] = useState(false);

  // Wish List & Reminders State
  const [wishlistIds, setWishlistIds] = useState(['gift-1', 'gift-6']);
  const [reminders, setReminders] = useState(INITIAL_REMINDERS);

  // New Reminder Form State
  const [remName, setRemName] = useState('');
  const [remRel, setRemRel] = useState('mother');
  const [remOccasion, setRemOccasion] = useState('Birthday');
  const [remDate, setRemDate] = useState('2026-12-10');
  const [remBudget, setRemBudget] = useState(2000);

  // Toast Notification State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3400);
  };

  // Toggle Interest Tag
  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((item) => item !== interest) : [...prev, interest]
    );
  };

  // Toggle Color Shade
  const toggleColor = (colorId) => {
    setSelectedColors((prev) =>
      prev.includes(colorId)
        ? prev.length > 1
          ? prev.filter((c) => c !== colorId)
          : prev
        : [...prev, colorId]
    );
  };

  // Toggle Wish List Item
  const toggleWishlist = (gift) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(gift.id);
      if (exists) {
        showToast(`Removed "${gift.title.slice(0, 28)}..." from Wish List`, 'info');
        return prev.filter((id) => id !== gift.id);
      } else {
        showToast(`Saved "${gift.title.slice(0, 28)}..." to Wish List!`, 'success');
        return [...prev, gift.id];
      }
    });
  };

  // Compute Personalized Gift Recommendations with Match Score & Explanations
  const recommendedGifts = useMemo(() => {
    return GIFT_CATALOG.map((gift) => {
      const lowest = getLowestPriceInfo(gift.prices);
      let score = 68;
      const reasons = [];

      if (gift.relationships.includes(selectedRelationship)) {
        score += 14;
        const relObj = RELATIONSHIPS.find((r) => r.id === selectedRelationship);
        reasons.push(`Ideal for ${relObj?.label || 'them'}`);
      }

      const matchedInterests = gift.interests.filter((i) => selectedInterests.includes(i));
      if (matchedInterests.length > 0) {
        score += Math.min(12, matchedInterests.length * 6);
        reasons.push(`Matches ${matchedInterests[0]}`);
      }

      const matchedColors = gift.colors.filter((c) => selectedColors.includes(c));
      if (matchedColors.length > 0) {
        score += 5;
        const colObj = COLOR_PALETTES.find((cp) => cp.id === matchedColors[0]);
        reasons.push(`${colObj?.name.split('&')[0].trim()} palette`);
      }

      if (favoriteMemory.trim().length > 4 && gift.is3DPersonalizable) {
        score += 4;
        reasons.push('Memory-engravable');
      }

      return {
        ...gift,
        lowestPrice: lowest.price,
        lowestPlatform: lowest.platform,
        matchScore: Math.min(99, score),
        reasons: reasons.slice(0, 3),
      };
    })
      .filter((gift) => gift.lowestPrice >= budgetMin && gift.lowestPrice <= budgetMax)
      .filter((gift) => (!only3DFilter ? true : gift.is3DPersonalizable))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [selectedRelationship, selectedInterests, selectedColors, budgetMin, budgetMax, favoriteMemory, only3DFilter]);

  const wishlistedGifts = useMemo(
    () => GIFT_CATALOG.filter((g) => wishlistIds.includes(g.id)),
    [wishlistIds]
  );

  // Add New Occasion Reminder
  const handleAddReminder = (e) => {
    e.preventDefault();
    if (!remName.trim()) {
      showToast('Please enter the recipient name.', 'info');
      return;
    }
    const newItem = {
      id: `rem-${Date.now()}`,
      recipientName: remName.trim(),
      relationship: remRel,
      occasion: remOccasion,
      date: remDate,
      budget: Number(remBudget) || 1500,
      note: 'Custom reminder alert enabled',
    };
    setReminders((prev) => [newItem, ...prev]);
    setRemName('');
    showToast(`Occasion reminder set for ${newItem.recipientName}!`, 'success');
  };

  // Gate behind Mandatory Email/Phone OTP Auth
  if (!currentUser) {
    return (
      <>
        <AuthScreen
          onAuthenticated={(user) => {
            setCurrentUser(user);
            showToast(`Welcome to Giftology, ${user.name}! ₹250 gift credit unlocked.`, 'success');
          }}
          showToast={showToast}
        />
        {toast && (
          <div className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-medium border border-violet-500/30">
            <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
            <span>{toast.message}</span>
          </div>
        )}
      </>
    );
  }

  const currentRelObj = RELATIONSHIPS.find((r) => r.id === selectedRelationship);
  const primaryColorObj = COLOR_PALETTES.find((c) => c.id === selectedColors[0]);

  return (
    <div className="min-h-screen bg-[#F8F7FF] text-slate-900 flex flex-col selection:bg-violet-200 selection:text-violet-900">
      {/* ====================================================================
          TOP NAVIGATION BAR
         ==================================================================== */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#EDE9FE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => {
              setActiveNav('finder');
              setFinderStep(1);
            }}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#7C3AED] to-[#6D28D9] text-white flex items-center justify-center shadow-md shadow-violet-600/20 group-hover:scale-105 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 block leading-none">
                Giftology
              </span>
              <span className="text-[11px] font-medium text-[#7C3AED]">
                The Perfect Gift Finder
              </span>
            </div>
          </button>

          {/* Center Navigation Pills */}
          <nav className="hidden md:flex items-center bg-[#F8F7FF] p-1 rounded-2xl border border-[#EDE9FE]">
            <button
              type="button"
              onClick={() => setActiveNav('finder')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeNav === 'finder'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#6D28D9]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Gift Finder
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('wishlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeNav === 'wishlist'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#6D28D9]'
              }`}
            >
              <Heart className="w-3.5 h-3.5" />
              Wish List
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeNav === 'wishlist'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EDE9FE] text-[#6D28D9]'
                }`}
              >
                {wishlistIds.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveNav('reminders')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeNav === 'reminders'
                  ? 'bg-[#7C3AED] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#6D28D9]'
              }`}
            >
              <Bell className="w-3.5 h-3.5" />
              Occasion Reminders
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeNav === 'reminders'
                    ? 'bg-white/20 text-white'
                    : 'bg-[#EDE9FE] text-[#6D28D9]'
                }`}
              >
                {reminders.length}
              </span>
            </button>
          </nav>

          {/* Right Actions: Tech Blueprint + User Badge */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setShowTechSpecs(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#6D28D9] bg-[#EDE9FE]/70 hover:bg-[#EDE9FE] border border-violet-200 transition-colors"
              title="View SQL Schema, Express REST API & Docker Specs"
            >
              <Code2 className="w-3.5 h-3.5" />
              Tech Specs & DB
            </button>

            <div className="flex items-center gap-2 bg-[#F8F7FF] border border-[#EDE9FE] pl-3 pr-1.5 py-1 rounded-full">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser.name}
                </div>
                <div className="text-[10px] font-semibold text-emerald-600">
                  ₹{currentUser.credits} Credits
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setCurrentUser(null);
                  showToast('Signed out safely.', 'info');
                }}
                className="px-2.5 py-1.5 rounded-full bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 text-[11px] font-semibold transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Bottom-of-Header Tab Bar */}
        <div className="flex md:hidden border-t border-[#EDE9FE] bg-white px-2 py-1.5 gap-1">
          {[
            { id: 'finder', label: 'Gift Finder', icon: Sparkles },
            { id: 'wishlist', label: `Wish List (${wishlistIds.length})`, icon: Heart },
            { id: 'reminders', label: `Reminders (${reminders.length})`, icon: Bell },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold ${
                  activeNav === item.id
                    ? 'bg-[#7C3AED] text-white'
                    : 'text-slate-600 hover:bg-[#F8F7FF]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ====================================================================
          MAIN CONTENT AREA
         ==================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        {/* ------------------------------------------------------------------
            VIEW 1: GIFT RECOMMENDATION ENGINE (3-Step Flow)
           ------------------------------------------------------------------ */}
        {activeNav === 'finder' && (
          <div>
            {/* Progress Stepper Header */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-sm border border-[#EDE9FE] mb-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#7C3AED]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Memory-Driven Gift Intelligence
                  </span>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
                    {finderStep === 1 && 'Who are we celebrating today?'}
                    {finderStep === 2 && `Tell us about your ${currentRelObj?.label}`}
                    {finderStep === 3 && `Curated Gifts for Your ${currentRelObj?.label}`}
                  </h1>
                </div>

                {/* Step Indicators */}
                <div className="flex items-center gap-2">
                  {[
                    { num: 1, label: 'Relationship' },
                    { num: 2, label: 'Preferences' },
                    { num: 3, label: 'Matches' },
                  ].map((s, i) => (
                    <React.Fragment key={s.num}>
                      <button
                        type="button"
                        onClick={() => setFinderStep(s.num)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          finderStep === s.num
                            ? 'bg-[#7C3AED] text-white shadow-sm'
                            : finderStep > s.num
                            ? 'bg-[#EDE9FE] text-[#6D28D9]'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[11px] font-bold">
                          {finderStep > s.num ? '✓' : s.num}
                        </span>
                        <span className="hidden sm:inline">{s.label}</span>
                      </button>
                      {i < 2 && <ChevronRight className="w-4 h-4 text-slate-300" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* STEP 1: RELATIONSHIP SELECTOR */}
            {finderStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
                  {RELATIONSHIPS.map((rel) => {
                    const isSelected = selectedRelationship === rel.id;
                    return (
                      <button
                        key={rel.id}
                        type="button"
                        onClick={() => setSelectedRelationship(rel.id)}
                        className={`group text-left p-5 rounded-3xl border-2 transition-all duration-200 flex flex-col justify-between ${
                          isSelected
                            ? 'bg-white border-[#7C3AED] shadow-lg shadow-violet-600/10 -translate-y-0.5'
                            : 'bg-white border-[#EDE9FE] hover:border-violet-300 hover:shadow-md'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform">
                            {rel.emoji}
                          </span>
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors ${
                              isSelected
                                ? 'bg-[#7C3AED] text-white'
                                : 'bg-[#F8F7FF] text-transparent border border-violet-200'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 text-base">{rel.label}</div>
                          <div className="text-xs text-slate-500 mt-0.5">{rel.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setFinderStep(2)}
                    className="px-7 py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-lg shadow-violet-600/25 flex items-center gap-2 transition-all"
                  >
                    Continue to Personalization
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: PERSONALIZED QUESTIONNAIRE */}
            {finderStep === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                  {/* Question 1: Favorite Memory (with Skip Option) */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EDE9FE]">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <label className="font-bold text-slate-900 text-base flex items-center gap-2">
                        <span className="w-7 h-7 rounded-xl bg-[#EDE9FE] text-[#6D28D9] text-xs font-extrabold flex items-center justify-center">
                          1
                        </span>
                        What’s your favorite memory with them?
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setFavoriteMemory('');
                          showToast('Memory step skipped — using relationship & interest signals.', 'info');
                        }}
                        className="text-xs font-semibold text-slate-500 hover:text-[#7C3AED] bg-slate-100 hover:bg-[#EDE9FE] px-3 py-1.5 rounded-full transition-colors"
                      >
                        Skip this step →
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">
                      Optional — helps us prioritize custom keepsakes, photo scrapbooks & engraved notes.
                    </p>
                    <textarea
                      rows={3}
                      value={favoriteMemory}
                      onChange={(e) => setFavoriteMemory(e.target.value)}
                      placeholder="e.g., Drinking filter coffee on the balcony during monsoon rains and talking for hours..."
                      className="w-full p-3.5 rounded-2xl border border-slate-200 focus:border-[#7C3AED] focus:ring-4 focus:ring-violet-500/10 outline-none text-sm text-slate-800 resize-none"
                    />
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {MEMORY_PROMPTS.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => setFavoriteMemory(prompt)}
                          className="text-[11px] bg-[#F8F7FF] hover:bg-[#EDE9FE] text-slate-600 hover:text-[#6D28D9] border border-violet-100 px-2.5 py-1 rounded-full transition-colors"
                        >
                          + {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Question 2: What do they like most? */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EDE9FE]">
                    <label className="font-bold text-slate-900 text-base flex items-center gap-2 mb-1">
                      <span className="w-7 h-7 rounded-xl bg-[#EDE9FE] text-[#6D28D9] text-xs font-extrabold flex items-center justify-center">
                        2
                      </span>
                      What do they like most?
                    </label>
                    <p className="text-xs text-slate-500 mb-4">
                      Select one or more passions to tailor the gift categories.
                    </p>
                    <div className="flex flex-wrap gap-2.5">
                      {INTEREST_OPTIONS.map((interest) => {
                        const active = selectedInterests.includes(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                              active
                                ? 'bg-[#7C3AED] text-white border-[#7C3AED] shadow-sm'
                                : 'bg-[#F8F7FF] text-slate-700 border-violet-100 hover:border-violet-300'
                            }`}
                          >
                            {active && <Check className="w-3.5 h-3.5" />}
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Question 3: Preferred Colors / Color Combinations */}
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EDE9FE]">
                    <label className="font-bold text-slate-900 text-base flex items-center gap-2 mb-1">
                      <span className="w-7 h-7 rounded-xl bg-[#EDE9FE] text-[#6D28D9] text-xs font-extrabold flex items-center justify-center">
                        3
                      </span>
                      Preferred colors / color combinations
                    </label>
                    <p className="text-xs text-slate-500 mb-4">
                      All shades available — choose their signature aesthetic palette.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {COLOR_PALETTES.map((palette) => {
                        const active = selectedColors.includes(palette.id);
                        return (
                          <button
                            key={palette.id}
                            type="button"
                            onClick={() => toggleColor(palette.id)}
                            className={`p-3 rounded-2xl border-2 text-left transition-all ${
                              active
                                ? 'border-[#7C3AED] bg-[#F8F7FF] shadow-xs'
                                : 'border-slate-100 hover:border-violet-200 bg-white'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 mb-2">
                              <span
                                className="w-6 h-6 rounded-full shadow-inner border border-black/10"
                                style={{ background: palette.hex }}
                              />
                              <span
                                className="w-4 h-4 rounded-full -ml-2.5 border border-white shadow-xs"
                                style={{ backgroundColor: palette.secondary }}
                              />
                            </div>
                            <div className="text-xs font-semibold text-slate-800 leading-tight">
                              {palette.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Column: Question 4 Budget Range & Summary Card */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white rounded-3xl p-6 shadow-sm border border-[#EDE9FE] sticky top-24">
                    <label className="font-bold text-slate-900 text-base flex items-center gap-2 mb-1">
                      <span className="w-7 h-7 rounded-xl bg-[#EDE9FE] text-[#6D28D9] text-xs font-extrabold flex items-center justify-center">
                        4
                      </span>
                      Budget Range (₹200 – ₹10,000)
                    </label>
                    <p className="text-xs text-slate-500 mb-5">
                      We’ll find the lowest price across 5 Indian stores within your range.
                    </p>

                    <div className="bg-[#F8F7FF] rounded-2xl p-4 border border-[#EDE9FE] mb-4">
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Min Budget</span>
                        <span>Max Budget</span>
                      </div>
                      <div className="flex items-center justify-between text-lg font-extrabold text-[#6D28D9]">
                        <span>{formatINR(budgetMin)}</span>
                        <span>—</span>
                        <span>{formatINR(budgetMax)}</span>
                      </div>

                      <div className="mt-4 space-y-3">
                        <div>
                          <span className="text-[11px] font-medium text-slate-500">
                            Minimum: {formatINR(budgetMin)}
                          </span>
                          <input
                            type="range"
                            min={200}
                            max={5000}
                            step={100}
                            value={budgetMin}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setBudgetMin(Math.min(val, budgetMax - 200));
                            }}
                            className="w-full accent-[#7C3AED] cursor-pointer"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] font-medium text-slate-500">
                            Maximum: {formatINR(budgetMax)}
                          </span>
                          <input
                            type="range"
                            min={500}
                            max={10000}
                            step={250}
                            value={budgetMax}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setBudgetMax(Math.max(val, budgetMin + 200));
                            }}
                            className="w-full accent-[#7C3AED] cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Quick Budget Presets */}
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {[
                        { label: 'Under ₹1,000', min: 200, max: 1000 },
                        { label: '₹1,000 – ₹2,500', min: 1000, max: 2500 },
                        { label: '₹2,500 – ₹5,000', min: 2500, max: 5000 },
                        { label: 'All (₹200–₹10k)', min: 200, max: 10000 },
                      ].map((preset) => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => {
                            setBudgetMin(preset.min);
                            setBudgetMax(preset.max);
                          }}
                          className={`py-2 px-2.5 rounded-xl text-[11px] font-semibold border transition-colors ${
                            budgetMin === preset.min && budgetMax === preset.max
                              ? 'bg-[#EDE9FE] border-[#7C3AED] text-[#6D28D9]'
                              : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setCarouselIndex(0);
                          setFinderStep(3);
                        }}
                        className="w-full py-3.5 px-5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm shadow-lg shadow-violet-600/25 flex items-center justify-center gap-2 transition-all"
                      >
                        <Sparkles className="w-4 h-4" />
                        Reveal Tailored Gifts
                      </button>
                      <button
                        type="button"
                        onClick={() => setFinderStep(1)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800"
                      >
                        ← Back to Relationship
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: TAILORED GIFT RECOMMENDATIONS & PRICE COMPARISON */}
            {finderStep === 3 && (
              <div className="space-y-6">
                {/* Active Preferences Summary & View Controls */}
                <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#EDE9FE] shadow-xs flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="px-3 py-1.5 rounded-full bg-[#EDE9FE] text-[#6D28D9] font-bold">
                      {currentRelObj?.emoji} For {currentRelObj?.label}
                    </span>
                    <span className="px-3 py-1.5 rounded-full bg-[#F8F7FF] border border-violet-200 text-slate-700 font-semibold">
                      {formatINR(budgetMin)} – {formatINR(budgetMax)}
                    </span>
                    {favoriteMemory.trim() && (
                      <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 font-medium max-w-xs truncate">
                        💭 “{favoriteMemory}”
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => setFinderStep(2)}
                      className="text-[#7C3AED] font-semibold hover:underline ml-1"
                    >
                      Edit Preferences
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setOnly3DFilter((prev) => !prev)}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                        only3DFilter
                          ? 'bg-[#7C3AED] text-white border-[#7C3AED]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-violet-300'
                      }`}
                    >
                      <Rotate3d className="w-3.5 h-3.5" />
                      3D Personalizable Only
                    </button>

                    <div className="flex bg-[#F8F7FF] p-1 rounded-xl border border-[#EDE9FE]">
                      <button
                        type="button"
                        onClick={() => setViewMode('grid')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          viewMode === 'grid' ? 'bg-white text-[#6D28D9] shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Grid ({recommendedGifts.length})
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setCarouselIndex(0);
                          setViewMode('carousel');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          viewMode === 'carousel' ? 'bg-white text-[#6D28D9] shadow-xs' : 'text-slate-500'
                        }`}
                      >
                        Carousel
                      </button>
                    </div>
                  </div>
                </div>

                {/* Empty Budget Fallback */}
                {recommendedGifts.length === 0 ? (
                  <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE9FE]">
                    <div className="text-4xl mb-3">🎁</div>
                    <h3 className="text-lg font-bold text-slate-900">
                      No exact matches in this narrow filter
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                      Try expanding your budget range (₹200 – ₹10,000) or turning off the 3D-only filter to see all curated options.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setBudgetMin(200);
                        setBudgetMax(10000);
                        setOnly3DFilter(false);
                      }}
                      className="mt-5 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold"
                    >
                      Reset Budget & Filters
                    </button>
                  </div>
                ) : viewMode === 'carousel' ? (
                  /* CAROUSEL VIEW */
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EDE9FE] shadow-md">
                    {(() => {
                      const safeIdx = carouselIndex % recommendedGifts.length;
                      const gift = recommendedGifts[safeIdx];
                      const isSaved = wishlistIds.includes(gift.id);

                      return (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                          <div
                            className={`md:col-span-5 h-72 rounded-3xl bg-gradient-to-br ${gift.accentBg} flex flex-col items-center justify-center relative p-6 border border-white shadow-inner`}
                          >
                            <span className="absolute top-4 left-4 bg-white/95 text-[#6D28D9] text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                              {gift.matchScore}% Match
                            </span>
                            <span className="text-7xl drop-shadow-sm">{gift.visualIcon}</span>
                            <span className="mt-4 text-xs font-semibold text-slate-700 bg-white/80 px-3 py-1 rounded-full">
                              {gift.badge}
                            </span>
                          </div>

                          <div className="md:col-span-7 space-y-4">
                            <div className="flex flex-wrap gap-1.5">
                              {gift.reasons.map((r) => (
                                <span
                                  key={r}
                                  className="text-[11px] font-semibold bg-[#EDE9FE] text-[#6D28D9] px-2.5 py-1 rounded-full"
                                >
                                  ✓ {r}
                                </span>
                              ))}
                            </div>

                            <h2 className="text-2xl font-extrabold text-slate-900">{gift.title}</h2>
                            <p className="text-sm text-slate-600 leading-relaxed">{gift.description}</p>

                            <div className="flex items-center gap-4 pt-1">
                              <div>
                                <div className="text-xs text-slate-500">
                                  Lowest on <strong>{gift.lowestPlatform}</strong>
                                </div>
                                <div className="text-2xl font-extrabold text-slate-900">
                                  {formatINR(gift.lowestPrice)}
                                </div>
                              </div>
                              <div className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-xl">
                                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                {gift.rating} ({gift.reviews})
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2.5 pt-2">
                              <button
                                type="button"
                                onClick={() => setActiveCompareGift(gift)}
                                className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold shadow-sm"
                              >
                                Compare 5 Stores
                              </button>
                              <button
                                type="button"
                                onClick={() => setActive3DGift(gift)}
                                className="px-4 py-2.5 rounded-xl bg-[#EDE9FE] hover:bg-violet-200 text-[#6D28D9] text-xs font-semibold flex items-center gap-1.5"
                              >
                                <Rotate3d className="w-4 h-4" />
                                3D View & Card
                              </button>
                              <button
                                type="button"
                                onClick={() => toggleWishlist(gift)}
                                className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 ${
                                  isSaved
                                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                                    : 'bg-white border-slate-200 text-slate-700'
                                }`}
                              >
                                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                                {isSaved ? 'Saved' : 'Save'}
                              </button>
                            </div>

                            {/* Carousel Controls */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                              <button
                                type="button"
                                onClick={() =>
                                  setCarouselIndex(
                                    (prev) => (prev - 1 + recommendedGifts.length) % recommendedGifts.length
                                  )
                                }
                                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#7C3AED]"
                              >
                                <ChevronLeft className="w-4 h-4" /> Previous Gift
                              </button>
                              <span className="text-xs font-semibold text-slate-400">
                                {safeIdx + 1} of {recommendedGifts.length}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  setCarouselIndex((prev) => (prev + 1) % recommendedGifts.length)
                                }
                                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#7C3AED]"
                              >
                                Next Gift <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* RESPONSIVE GRID VIEW */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedGifts.map((gift) => {
                      const isSaved = wishlistIds.includes(gift.id);
                      return (
                        <article
                          key={gift.id}
                          className="bg-white rounded-3xl border border-[#EDE9FE] shadow-sm hover:shadow-xl hover:shadow-violet-900/5 transition-all duration-300 flex flex-col overflow-hidden group"
                        >
                          {/* Product Visual Header in Original Vibrant Colors */}
                          <div
                            className={`relative h-48 bg-gradient-to-br ${gift.accentBg} p-5 flex items-center justify-center`}
                          >
                            <span className="absolute top-3.5 left-3.5 bg-white/95 backdrop-blur-xs text-[#6D28D9] text-[11px] font-extrabold px-3 py-1 rounded-full shadow-xs">
                              {gift.matchScore}% Match
                            </span>

                            <button
                              type="button"
                              onClick={() => toggleWishlist(gift)}
                              aria-label={isSaved ? 'Remove from Wish List' : 'Save to Wish List'}
                              className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center shadow-xs transition-transform active:scale-90 ${
                                isSaved
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-white/95 text-slate-600 hover:text-rose-500'
                              }`}
                            >
                              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                            </button>

                            <span className="text-6xl group-hover:scale-110 transition-transform duration-300 select-none">
                              {gift.visualIcon}
                            </span>

                            <span className="absolute bottom-3 left-3.5 text-[11px] font-semibold bg-white/90 text-slate-800 px-2.5 py-0.5 rounded-full">
                              {gift.badge}
                            </span>

                            <span className="absolute bottom-3 right-3.5 text-[11px] font-bold bg-white/90 text-amber-700 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                              {gift.rating}
                            </span>
                          </div>

                          {/* Card Body */}
                          <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                              <div className="flex flex-wrap gap-1.5 mb-2.5">
                                {gift.reasons.map((reason) => (
                                  <span
                                    key={reason}
                                    className="text-[10px] font-semibold bg-[#F8F7FF] text-[#6D28D9] border border-violet-200/70 px-2 py-0.5 rounded-full"
                                  >
                                    {reason}
                                  </span>
                                ))}
                              </div>

                              <h3 className="font-bold text-slate-900 text-base leading-snug mb-1.5">
                                {gift.title}
                              </h3>
                              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                                {gift.description}
                              </p>
                            </div>

                            {/* Price Comparison Strip + Action Buttons */}
                            <div className="mt-5 pt-4 border-t border-slate-100">
                              <div className="flex items-end justify-between mb-3.5">
                                <div>
                                  <span className="text-[11px] text-slate-500 block">
                                    Lowest on{' '}
                                    <strong className="text-[#6D28D9]">{gift.lowestPlatform}</strong>
                                  </span>
                                  <span className="text-xl font-extrabold text-slate-900">
                                    {formatINR(gift.lowestPrice)}
                                  </span>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setActiveCompareGift(gift)}
                                  className="text-xs font-semibold text-[#7C3AED] hover:text-[#6D28D9] bg-[#F8F7FF] hover:bg-[#EDE9FE] px-3 py-1.5 rounded-xl border border-violet-200/80 transition-colors"
                                >
                                  Compare 5 Sites →
                                </button>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  type="button"
                                  onClick={() => setActive3DGift(gift)}
                                  className="py-2.5 px-3 rounded-xl bg-[#EDE9FE]/80 hover:bg-[#EDE9FE] text-[#6D28D9] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                                >
                                  <Rotate3d className="w-3.5 h-3.5" />
                                  3D & Note
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setActiveCompareGift(gift)}
                                  className="py-2.5 px-3 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
                                >
                                  Best Deal
                                  <ExternalLink className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------
            VIEW 2: WISH LIST MANAGER & REFERRAL PROGRAM
           ------------------------------------------------------------------ */}
        {activeNav === 'wishlist' && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-[#EDE9FE] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">Your Saved Wish List</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Compare multi-platform deals, customize 3D cards, or share your curated list with family & friends.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText('https://giftology.in/wishlist/shared-lavender-box');
                    showToast('Shareable Wish List link copied to clipboard!', 'success');
                  }}
                  className="px-4 py-2.5 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm"
                >
                  <Share2 className="w-4 h-4" />
                  Share Wish List
                </button>
              </div>
            </div>

            {/* Referral Program Banner */}
            <div className="bg-gradient-to-r from-[#6D28D9] to-[#8B5CF6] rounded-3xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg shadow-violet-600/15">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-amber-200" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-violet-200">
                    Giftology Referral Rewards
                  </span>
                  <h2 className="text-lg font-extrabold mt-0.5">
                    Invite friends & earn ₹250 gift credits on every signup!
                  </h2>
                  <p className="text-xs text-violet-100 mt-1">
                    Share your personal invite code <strong className="font-mono bg-white/15 px-2 py-0.5 rounded">GIFT250INDIA</strong> with friends.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText('GIFT250INDIA');
                  showToast('Referral code GIFT250INDIA copied!', 'success');
                }}
                className="px-4 py-2.5 rounded-xl bg-white text-[#6D28D9] hover:bg-violet-50 text-xs font-bold flex items-center gap-1.5 shrink-0 self-start md:self-center"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Invite Code
              </button>
            </div>

            {wishlistedGifts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EDE9FE]">
                <div className="text-4xl mb-3">💜</div>
                <h3 className="text-lg font-bold text-slate-900">Your Wish List is empty</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Tap the heart icon on any recommended gift to save it here.
                </p>
                <button
                  type="button"
                  onClick={() => setActiveNav('finder')}
                  className="mt-4 px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold"
                >
                  Explore Gift Recommendations
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistedGifts.map((gift) => {
                  const lowest = getLowestPriceInfo(gift.prices);
                  return (
                    <div
                      key={gift.id}
                      className="bg-white rounded-3xl border border-[#EDE9FE] p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div
                            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gift.accentBg} flex items-center justify-center text-3xl`}
                          >
                            {gift.visualIcon}
                          </div>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(gift)}
                            className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                            title="Remove from Wish List"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <h3 className="font-bold text-slate-900 text-base">{gift.title}</h3>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">{gift.description}</p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-slate-500">Best on {lowest.platform}</span>
                          <span className="text-lg font-extrabold text-slate-900">
                            {formatINR(lowest.price)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setActive3DGift(gift)}
                            className="py-2 px-3 rounded-xl bg-[#EDE9FE] text-[#6D28D9] text-xs font-semibold"
                          >
                            3D Customize
                          </button>
                          <button
                            type="button"
                            onClick={() => setActiveCompareGift(gift)}
                            className="py-2 px-3 rounded-xl bg-[#7C3AED] text-white text-xs font-semibold"
                          >
                            Compare Prices
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ------------------------------------------------------------------
            VIEW 3: OCCASION REMINDERS MANAGER
           ------------------------------------------------------------------ */}
        {activeNav === 'reminders' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 7 Cols: Upcoming Reminders List */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-[#EDE9FE] shadow-xs">
                <h1 className="text-2xl font-extrabold text-slate-900">Occasion Reminders</h1>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  Never miss a birthday, anniversary, or Teacher’s Day — launch tailored gift ideas in one tap.
                </p>
              </div>

              {reminders.map((rem) => {
                const relObj = RELATIONSHIPS.find((r) => r.id === rem.relationship);
                const daysLeft = getDaysUntil(rem.date);

                return (
                  <div
                    key={rem.id}
                    className="bg-white rounded-3xl p-5 border border-[#EDE9FE] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-[#EDE9FE] flex items-center justify-center text-2xl shrink-0">
                        {relObj?.emoji || '🎂'}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-base">{rem.recipientName}</h3>
                          <span className="text-[11px] font-semibold bg-[#F8F7FF] text-[#6D28D9] border border-violet-200 px-2.5 py-0.5 rounded-full">
                            {rem.occasion}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 mt-1 flex flex-wrap items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#7C3AED]" />
                            {new Date(rem.date).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                          <span>• Budget: {formatINR(rem.budget)}</span>
                          <span className="font-semibold text-emerald-700">
                            {daysLeft >= 0 ? `In ${daysLeft} days` : 'Upcoming'}
                          </span>
                        </div>
                        {rem.note && (
                          <p className="text-xs text-slate-600 mt-1.5 italic">“{rem.note}”</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedRelationship(rem.relationship);
                          setBudgetMax(rem.budget);
                          setActiveNav('finder');
                          setFinderStep(3);
                          showToast(`Showing curated gifts for ${rem.recipientName}!`, 'success');
                        }}
                        className="px-3.5 py-2 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        Find Gift
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setReminders((prev) => prev.filter((item) => item.id !== rem.id));
                          showToast('Reminder deleted.', 'info');
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                        title="Delete Reminder"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right 5 Cols: Add New Reminder Form */}
            <div className="lg:col-span-5">
              <form
                onSubmit={handleAddReminder}
                className="bg-white rounded-3xl p-6 border border-[#EDE9FE] shadow-sm space-y-4 sticky top-24"
              >
                <div className="flex items-center gap-2 text-[#6D28D9] font-bold text-base">
                  <Plus className="w-5 h-5" />
                  Add New Occasion Reminder
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Recipient Name
                  </label>
                  <input
                    type="text"
                    value={remName}
                    onChange={(e) => setRemName(e.target.value)}
                    placeholder="e.g., Sister Kavya"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Relationship
                    </label>
                    <select
                      value={remRel}
                      onChange={(e) => setRemRel(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none text-xs bg-white"
                    >
                      {RELATIONSHIPS.map((r) => (
                        <option key={r.id} value={r.id}>
                          {r.emoji} {r.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Occasion Type
                    </label>
                    <select
                      value={remOccasion}
                      onChange={(e) => setRemOccasion(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none text-xs bg-white"
                    >
                      <option>Birthday</option>
                      <option>Anniversary</option>
                      <option>Raksha Bandhan</option>
                      <option>Teacher’s Day</option>
                      <option>Graduation</option>
                      <option>Festive Surprise</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Celebration Date
                    </label>
                    <input
                      type="date"
                      value={remDate}
                      onChange={(e) => setRemDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1">
                      Target Budget (₹)
                    </label>
                    <input
                      type="number"
                      min={200}
                      max={10000}
                      step={100}
                      value={remBudget}
                      onChange={(e) => setRemBudget(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:border-[#7C3AED] outline-none text-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-xs font-semibold shadow-md shadow-violet-600/20 flex items-center justify-center gap-1.5 transition-all"
                >
                  <Bell className="w-4 h-4" />
                  Save Occasion Alert
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* ====================================================================
          FOOTER
         ==================================================================== */}
      <footer className="bg-white border-t border-[#EDE9FE] py-6 px-4 sm:px-6 lg:px-8 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Giftology</span>
            <span>• Personalized Gifting & Live Price Intelligence across India</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Amazon • Flipkart • Ajio • Myntra • Meesho</span>
            <button
              type="button"
              onClick={() => setShowTechSpecs(true)}
              className="text-[#7C3AED] font-semibold hover:underline"
            >
              Architecture & SQL Schema
            </button>
          </div>
        </div>
      </footer>

      {/* ====================================================================
          INTERACTIVE MODALS
         ==================================================================== */}
      {active3DGift && (
        <ThreeDStudioModal
          gift={active3DGift}
          initialMessage={favoriteMemory}
          selectedColorHex={
            primaryColorObj?.hex?.startsWith('#') ? primaryColorObj.hex : '#7C3AED'
          }
          onClose={() => setActive3DGift(null)}
          onSaveToWishlist={toggleWishlist}
          isWishlisted={wishlistIds.includes(active3DGift.id)}
          showToast={showToast}
        />
      )}

      {activeCompareGift && (
        <PriceCompareModal
          gift={activeCompareGift}
          onClose={() => setActiveCompareGift(null)}
          showToast={showToast}
        />
      )}

      {showTechSpecs && <TechSpecsModal onClose={() => setShowTechSpecs(false)} />}

      {/* Toast Feedback Banner */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-xs font-medium border border-violet-500/30 animate-bounce"
        >
          <CheckCircle2 className="w-4 h-4 text-violet-400 shrink-0" />
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
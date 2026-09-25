export type TimeOfDayPeriod = 'night' | 'dawn' | 'morning' | 'noon' | 'golden' | 'sunset' | 'dusk';

export interface TimeAtmosphere {
  id: TimeOfDayPeriod;
  label: string;
  hourRange: string;
  background: string; // Zenith color
  baseColor: string;  // Horizon color
  accentColor: string; // Cloud color
  sun: {
    x: number;
    y: number;
    glow: string;
  };
  clouds: {
    cirrus: number;
    shadow: number;
    softness: number;
  };
  speed: number;
  density: number;
  description: string;
  iconName: string;
}

export const TIME_ATMOSPHERES: Record<TimeOfDayPeriod, TimeAtmosphere> = {
  dawn: {
    id: 'dawn',
    label: 'Dawn / Sunrise',
    hourRange: '5:00 AM – 7:00 AM',
    background: '#831843', // Deep rose-violet zenith
    baseColor: '#FDBA74',  // Warm apricot dawn horizon
    accentColor: '#FEF3C7', // Warm glowing cloud rims
    sun: {
      x: 88,
      y: 68,
      glow: 'rgba(253, 186, 116, 0.95)',
    },
    clouds: {
      cirrus: 85,
      shadow: 75,
      softness: 210,
    },
    speed: 48,
    density: 90,
    description: 'Soft rose-gold dawn with gentle morning mist',
    iconName: 'Sunrise',
  },
  morning: {
    id: 'morning',
    label: 'Morning Light',
    hourRange: '7:00 AM – 11:00 AM',
    background: '#0284C7', // Clear sky cyan
    baseColor: '#BAE6FD', // Bright morning azure horizon
    accentColor: '#FFFFFF', // Clean white morning clouds
    sun: {
      x: 82,
      y: 86,
      glow: 'rgba(255, 255, 255, 0.95)',
    },
    clouds: {
      cirrus: 95,
      shadow: 65,
      softness: 190,
    },
    speed: 56,
    density: 95,
    description: 'Crisp morning blue with clear drifting clouds',
    iconName: 'SunMedium',
  },
  noon: {
    id: 'noon',
    label: 'Midday Daylight',
    hourRange: '11:00 AM – 4:00 PM',
    background: '#0075FF', // Vibrant Originkit zenith
    baseColor: '#B4D2F0', // Atmospheric blue horizon
    accentColor: '#FFFFFF', // High-contrast white cumulus
    sun: {
      x: 78,
      y: 94,
      glow: '#FFFFFF',
    },
    clouds: {
      cirrus: 100,
      shadow: 70,
      softness: 200,
    },
    speed: 64,
    density: 100,
    description: 'Vibrant azure sky with brilliant white cloud layers',
    iconName: 'Sun',
  },
  golden: {
    id: 'golden',
    label: 'Golden Hour',
    hourRange: '4:00 PM – 6:00 PM',
    background: '#1D4ED8', // Deep sapphire zenith
    baseColor: '#FED7AA', // Warm honey amber horizon
    accentColor: '#FEF08A', // Gilded golden-edged clouds
    sun: {
      x: 88,
      y: 74,
      glow: 'rgba(254, 215, 170, 0.95)',
    },
    clouds: {
      cirrus: 90,
      shadow: 85,
      softness: 200,
    },
    speed: 50,
    density: 95,
    description: 'Warm late-afternoon golden glow across cloud tops',
    iconName: 'Sunset',
  },
  sunset: {
    id: 'sunset',
    label: 'Sunset Glow',
    hourRange: '6:00 PM – 8:00 PM',
    background: '#7C2D12', // Burnt crimson-orange zenith
    baseColor: '#F97316', // Fiery orange & coral horizon
    accentColor: '#FDE68A', // Luminous sunset cloud highlights
    sun: {
      x: 92,
      y: 65,
      glow: 'rgba(251, 146, 60, 0.95)',
    },
    clouds: {
      cirrus: 100,
      shadow: 95,
      softness: 220,
    },
    speed: 42,
    density: 105,
    description: 'Fiery amber and crimson sunset atmospheric lighting',
    iconName: 'Sunset',
  },
  dusk: {
    id: 'dusk',
    label: 'Dusk / Twilight',
    hourRange: '8:00 PM – 10:00 PM',
    background: '#1E1B4B', // Deep indigo twilight zenith
    baseColor: '#4F46E5', // Lavender purple horizon
    accentColor: '#CBD5E1', // Silvery violet evening clouds
    sun: {
      x: 95,
      y: 52,
      glow: 'rgba(129, 140, 248, 0.75)',
    },
    clouds: {
      cirrus: 80,
      shadow: 100,
      softness: 180,
    },
    speed: 38,
    density: 85,
    description: 'Serene indigo twilight with violet ambient horizon',
    iconName: 'MoonStar',
  },
  night: {
    id: 'night',
    label: 'Night / Midnight',
    hourRange: '10:00 PM – 5:00 AM',
    background: '#0B132B', // Midnight cosmic navy
    baseColor: '#1C2541', // Dark nocturnal slate horizon
    accentColor: '#64748B', // Moonlit silvery charcoal clouds
    sun: {
      x: 85,
      y: 80,
      glow: 'rgba(203, 213, 225, 0.7)', // Cool lunar glow
    },
    clouds: {
      cirrus: 70,
      shadow: 120,
      softness: 170,
    },
    speed: 32,
    density: 80,
    description: 'Calm nocturnal sky with cool moonlit cloud drifts',
    iconName: 'Moon',
  },
};

export function getPeriodForHour(hour: number): TimeOfDayPeriod {
  if (hour >= 5 && hour < 7) return 'dawn';
  if (hour >= 7 && hour < 11) return 'morning';
  if (hour >= 11 && hour < 16) return 'noon';
  if (hour >= 16 && hour < 18) return 'golden';
  if (hour >= 18 && hour < 20) return 'sunset';
  if (hour >= 20 && hour < 22) return 'dusk';
  return 'night';
}

export function getTimeAtmosphere(hour: number): TimeAtmosphere {
  const period = getPeriodForHour(hour);
  return TIME_ATMOSPHERES[period];
}

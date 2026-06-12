import type { Provider } from '../domain/types';

type ProviderStyle = {
  accent: string;
  accentSoft: string;
  accentDark: string;
};

const providerStyles: Record<Provider, ProviderStyle> = {
  Telkomsel: {
    accent: '#ef3b45',
    accentSoft: '#fff0f1',
    accentDark: '#9f1722',
  },
  XL: {
    accent: '#1457d9',
    accentSoft: '#edf3ff',
    accentDark: '#173c8c',
  },
  Indosat: {
    accent: '#f2b705',
    accentSoft: '#fff7d8',
    accentDark: '#8a6200',
  },
  Tri: {
    accent: '#7c3aed',
    accentSoft: '#f3ecff',
    accentDark: '#4c1d95',
  },
  Smartfren: {
    accent: '#ff6b35',
    accentSoft: '#fff1ea',
    accentDark: '#9a3412',
  },
};

export function getProviderStyle(provider: Provider) {
  return providerStyles[provider];
}

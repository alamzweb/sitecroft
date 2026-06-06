/**
 * Sitecroft — Brand Constants & Configuration
 * Centralised brand values, gradients, and site metadata.
 */

/* ── Color Palette ── */
export const COLORS = {
  /** Primary background (#060b14) */
  primaryBg: '#060b14',
  /** Secondary/card background (#0a1020) */
  secondaryBg: '#0a1020',
  /** Brand blue (#3b82f6) */
  brandBlue: '#3b82f6',
  /** Brand cyan (#06b6d4) */
  brandCyan: '#06b6d4',
  /** Text muted (#64748b) */
  textMuted: '#64748b',
  /** Text primary (#e2e8f0) */
  textPrimary: '#e2e8f0',
  /** Text white (#ffffff) */
  textWhite: '#ffffff',
} as const;

/* ── Gradients ── */
export const GRADIENTS = {
  /** Cyan-to-blue (primary brand gradient) */
  brand: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  /** Cyan-to-blue for text clipping */
  brandText: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
} as const;

/* ── Site Metadata ── */
export const SITE = {
  name: 'Sitecroft',
  tagline: 'High-Performance Web Solutions for Modern Brands',
  description:
    'WordPress services and custom-coded websites. From WordPress sites, bug fixes, and support to hand-coded React, Next.js, and HTML builds.',
  url: '#', // Domain TBD
  logo: '/logo.png',
} as const;

/* ── Service Categories ── */
export interface PricingItem {
  title: string;
  startingPrice: string;
  description: string;
  category: 'wordpress' | 'coded';
}

export const PRICING: PricingItem[] = [
  // ── WordPress Services ──
  { title: 'Standard WordPress Site', startingPrice: '$50', description: 'Template-driven execution', category: 'wordpress' },
  { title: 'WooCommerce Online Store', startingPrice: '$80', description: 'Product pipelines & gateways', category: 'wordpress' },
  { title: 'WordPress Support & Tasks', startingPrice: '$5', description: 'Plugin hooks, design edits', category: 'wordpress' },
  { title: 'Landing Page (WordPress)', startingPrice: '$20', description: 'Conversion architectures on WordPress', category: 'wordpress' },
  { title: 'WordPress Bug Fixing', startingPrice: '$10', description: 'Critical fatal loops, layout crashes', category: 'wordpress' },
  { title: 'Website Maintenance', startingPrice: '$10/month', description: 'Backups, core updates, health monitoring', category: 'wordpress' },
  // ── Coded Websites ──
  { title: 'Custom Code Website', startingPrice: '$100', description: 'React / Next.js / HTML / CSS / JS', category: 'coded' },
  { title: 'Landing Page (Pure Code)', startingPrice: '$20', description: 'Conversion architectures in raw code', category: 'coded' },
  { title: 'Custom Feature & Page Edits', startingPrice: 'Based on work', description: 'Layout tweaks, feature additions on coded sites', category: 'coded' },
  { title: 'Domain & Hosting Setup', startingPrice: '$10', description: 'Registrar paths, Vercel production linkage', category: 'coded' },
] as const;

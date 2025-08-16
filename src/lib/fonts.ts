/**
 * Font configuration and optimization utilities for VetKonnect
 * 
 * This file contains the centralized font configuration using Next.js Google Fonts optimization.
 * All fonts are loaded with 'swap' display for better performance and user experience.
 */

import { Inter, Poppins, Open_Sans, Nunito } from 'next/font/google';

// Inter - Primary font for body text and general content
// Excellent readability, designed for screens
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Poppins - Secondary font for headings and emphasis
// Modern, geometric sans-serif that's professional yet approachable
export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Open Sans - UI font for buttons, labels, and interface elements
// Highly legible and friendly, great for UI components
export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

// Nunito - Alternative font for headings
// Rounded, friendly and modern look
export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
});

/**
 * Combined font variables for easy use in layout
 */
export const fontVariables = `${inter.variable} ${poppins.variable} ${openSans.variable} ${nunito.variable}`;

/**
 * Font loading optimization tips:
 * 
 * 1. 'display: swap' ensures text is visible during font load
 * 2. 'preload: true' prioritizes font loading for better performance
 * 3. Fallback fonts provide graceful degradation
 * 4. CSS variables allow easy switching between fonts
 * 5. Subset loading reduces file size (latin subset only)
 * 
 * Performance considerations:
 * - Only load font weights you actually use
 * - Consider using font-display: optional for non-critical text
 * - Monitor Core Web Vitals impact of font loading
 */

/**
 * Font usage guidelines:
 * 
 * Inter (Body Text):
 * - Paragraphs, articles, descriptions
 * - Form inputs and general content
 * - Any text meant for extended reading
 * 
 * Poppins (Headings):
 * - Page titles, section headers
 * - Card titles, modal headers
 * - Any text that needs emphasis or hierarchy
 * 
 * Open Sans (UI Elements):
 * - Button text, navigation items
 * - Labels, badges, tags
 * - Form labels and UI components
 */

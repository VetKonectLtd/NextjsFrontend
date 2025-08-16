/**
 * Typography utility classes for consistent font usage across the application
 */

export const typography = {
  // Headings - Use Poppins for headings (professional and modern)
  heading: {
    h1: 'font-poppins text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'font-poppins text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight',
    h3: 'font-poppins text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
    h4: 'font-poppins text-xl md:text-2xl lg:text-3xl font-medium tracking-tight',
    h5: 'font-poppins text-lg md:text-xl lg:text-2xl font-medium tracking-tight',
    h6: 'font-poppins text-base md:text-lg lg:text-xl font-medium tracking-tight',
  },

  // Alternative headings with Nunito
  headingNunito: {
    h1: 'font-nunito text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight',
    h2: 'font-nunito text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight',
    h3: 'font-nunito text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight',
    h4: 'font-nunito text-xl md:text-2xl lg:text-3xl font-medium tracking-tight',
    h5: 'font-nunito text-lg md:text-xl lg:text-2xl font-medium tracking-tight',
    h6: 'font-nunito text-base md:text-lg lg:text-xl font-medium tracking-tight',
  },

  // Body text - Use Nunito as default body font
  body: {
    large: 'font-nunito text-lg leading-relaxed',
    base: 'font-nunito text-base leading-relaxed',
    small: 'font-nunito text-sm leading-relaxed',
    xs: 'font-nunito text-xs leading-relaxed',
  },

  // Inter font for specific use cases where better readability is needed
  bodyInter: {
    large: 'font-inter text-lg leading-relaxed',
    base: 'font-inter text-base leading-relaxed',
    small: 'font-inter text-sm leading-relaxed',
    xs: 'font-inter text-xs leading-relaxed',
  },

  // UI elements - Use Open Sans for UI elements (clean and friendly)
  ui: {
    button: 'font-open-sans font-medium tracking-wide',
    label: 'font-open-sans text-sm font-medium',
    caption: 'font-open-sans text-xs text-gray-600',
    badge: 'font-open-sans text-xs font-semibold uppercase tracking-wider',
  },

  // Special cases
  display: 'font-poppins text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight',
  subtitle: 'font-open-sans text-lg md:text-xl text-gray-600 leading-relaxed',
  overline: 'font-open-sans text-xs font-semibold uppercase tracking-widest text-gray-500',
} as const;

/**
 * Helper function to combine typography classes with additional classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Typography component props for consistent styling
 */
export type TypographyVariant = keyof typeof typography.heading | keyof typeof typography.body | keyof typeof typography.ui;

/**
 * Get typography classes by variant
 */
export function getTypographyClasses(variant: string): string {
  // Check heading variants
  if (variant in typography.heading) {
    return typography.heading[variant as keyof typeof typography.heading];
  }
  
  // Check body variants
  if (variant in typography.body) {
    return typography.body[variant as keyof typeof typography.body];
  }
  
  // Check UI variants
  if (variant in typography.ui) {
    return typography.ui[variant as keyof typeof typography.ui];
  }
  
  // Special cases
  if (variant === 'display') return typography.display;
  if (variant === 'subtitle') return typography.subtitle;
  if (variant === 'overline') return typography.overline;
  
  // Default fallback
  return typography.body.base;
}

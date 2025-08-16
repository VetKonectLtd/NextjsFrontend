import React from 'react';
import { typography, cn } from '@/lib/typography';

interface TypographyProps {
  variant?: 
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'large' | 'base' | 'small' | 'xs'
    | 'button' | 'label' | 'caption' | 'badge'
    | 'display' | 'subtitle' | 'overline';
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children: React.ReactNode;
  font?: 'nunito' | 'inter' | 'poppins' | 'open-sans';
}

export function Typography({ 
  variant = 'base', 
  as, 
  className, 
  children, 
  font,
  ...props 
}: TypographyProps) {
  // Determine the default HTML element based on variant
  const getDefaultElement = (variant: string): keyof JSX.IntrinsicElements => {
    if (variant.startsWith('h')) return variant as keyof JSX.IntrinsicElements;
    if (variant === 'display') return 'h1';
    if (variant === 'subtitle') return 'p';
    if (variant === 'overline') return 'span';
    if (variant === 'label') return 'label';
    if (variant === 'caption') return 'span';
    if (variant === 'badge') return 'span';
    return 'p';
  };

  const Component = as || getDefaultElement(variant);

  // Get typography classes based on font preference
  const getVariantClasses = (variant: string, font?: string): string => {
    // If a specific font is requested, use it
    if (font) {
      switch (font) {
        case 'inter':
          if (variant in typography.bodyInter) {
            return typography.bodyInter[variant as keyof typeof typography.bodyInter];
          }
          break;
        case 'poppins':
          if (variant in typography.heading) {
            return typography.heading[variant as keyof typeof typography.heading];
          }
          break;
        case 'open-sans':
          if (variant in typography.ui) {
            return typography.ui[variant as keyof typeof typography.ui];
          }
          break;
        case 'nunito':
          // Fall through to default handling
          break;
      }
    }

    // Default to Nunito for all text (as requested)
    // Check heading variants (Nunito)
    if (variant in typography.headingNunito) {
      return typography.headingNunito[variant as keyof typeof typography.headingNunito];
    }
    
    // Check body variants (Nunito)
    if (variant in typography.body) {
      return typography.body[variant as keyof typeof typography.body];
    }
    
    // Check UI variants (Open Sans)
    if (variant in typography.ui) {
      return typography.ui[variant as keyof typeof typography.ui];
    }
    
    // Special cases
    if (variant === 'display') return typography.display;
    if (variant === 'subtitle') return typography.subtitle;
    if (variant === 'overline') return typography.overline;
    
    return typography.body.base;
  };

  const variantClasses = getVariantClasses(variant, font);

  return (
    <Component 
      className={cn(variantClasses, className)} 
      {...props}
    >
      {children}
    </Component>
  );
}

// Convenience components for common use cases with Nunito as default
export const Heading1 = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h1" className={className} font={font} {...props} />
);

export const Heading2 = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h2" className={className} font={font} {...props} />
);

export const Heading3 = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="h3" className={className} font={font} {...props} />
);

export const Body = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="base" className={className} font={font} {...props} />
);

export const BodyLarge = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="large" className={className} font={font} {...props} />
);

export const BodySmall = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="small" className={className} font={font} {...props} />
);

export const Subtitle = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="subtitle" className={className} font={font} {...props} />
);

export const Display = ({ className, font, ...props }: Omit<TypographyProps, 'variant'>) => (
  <Typography variant="display" className={className} font={font} {...props} />
);

// Specialized components for when you need Inter font for better readability
export const BodyInter = ({ className, ...props }: Omit<TypographyProps, 'variant' | 'font'>) => (
  <Typography variant="base" font="inter" className={className} {...props} />
);

export const BodyLargeInter = ({ className, ...props }: Omit<TypographyProps, 'variant' | 'font'>) => (
  <Typography variant="large" font="inter" className={className} {...props} />
);

export const BodySmallInter = ({ className, ...props }: Omit<TypographyProps, 'variant' | 'font'>) => (
  <Typography variant="small" font="inter" className={className} {...props} />
);

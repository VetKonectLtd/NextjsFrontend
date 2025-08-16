# Typography Guide for VetKonnect

This guide explains how to use the Google Fonts configured in the VetKonnect project. Nunito is now the default base font for the entire application.

## Fonts Configuration

The project uses the following Google Fonts:

1. **Nunito** - Base font for all text (headings and body)
2. **Inter** - Alternative font for better readability
3. **Poppins** - Alternative font for headings
4. **Open Sans** - UI elements font

## How Fonts Are Set Up

Fonts are configured in `src/lib/fonts.ts` using Next.js's built-in Google Fonts optimization:

```typescript
import { Inter, Poppins, Open_Sans, Nunito } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
});

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-nunito',
  display: 'swap',
});
```

All fonts are combined in the `fontVariables` export and applied to the body element in `src/app/layout.tsx`:

```tsx
<body className={`${fontVariables} font-inter min-h-screen bg-white`}>
```

## Text Colors

The project now includes a custom gray color palette that matches your requested #555555:

- `gray-500`: #555555 (medium gray)
- `gray-100`: #f5f5f5 (light gray)
- `gray-900`: #171717 (dark gray)

You can use these colors in your components like this:

```tsx
<p className="text-gray-500">Text with custom gray color</p>
<h1 className="text-gray-900">Dark heading text</h1>
<div className="bg-gray-100">Light gray background</div>
```

## Using Fonts in Components

### 1. Using Font Classes Directly

You can use any of the configured fonts by applying their CSS variable classes:

```tsx
// For Nunito (base font)
<p className="font-nunito text-base">This is body text using Nunito</p>

// For Inter (alternative for better readability)
<p className="font-inter text-base">This is body text using Inter</p>

// For Poppins (alternative headings)
<h1 className="font-poppins text-4xl font-bold">This is a Poppins heading</h1>

// For Open Sans (UI elements)
<button className="font-open-sans font-medium">UI Button</button>
```

### 2. Using the Typography Component

The project includes a Typography component that makes it easy to use consistent styling:

```tsx
import { Typography, Heading1, Body, BodyInter } from '@/components/ui/Typography';

// These will use Nunito by default
<Heading1>Heading with Nunito</Heading1>
<Body>This body text uses Nunito</Body>

// Use Inter for better readability where needed
<BodyInter>This body text uses Inter for better readability</BodyInter>
```

### 3. Using Tailwind Font Utilities

The Tailwind configuration includes all font families:

```javascript
fontFamily: {
  'inter': ['var(--font-inter)', 'sans-serif'],
  'poppins': ['var(--font-poppins)', 'sans-serif'],
  'open-sans': ['var(--font-open-sans)', 'sans-serif'],
  'nunito': ['var(--font-nunito)', 'sans-serif'],
}
```

So you can use them directly in Tailwind classes:

```tsx
<h1 className="font-nunito text-5xl font-bold">Main Heading</h1>
<p className="font-nunito text-lg">Body text content (default)</p>
<p className="font-inter text-lg">Body text content (better readability)</p>
<span className="font-open-sans text-sm">UI element text</span>
```

## Typography Scale

### Headings (Poppins or Nunito)
- H1: `text-4xl md:text-5xl lg:text-6xl font-bold`
- H2: `text-3xl md:text-4xl lg:text-5xl font-semibold`
- H3: `text-2xl md:text-3xl lg:text-4xl font-semibold`
- H4: `text-xl md:text-2xl lg:text-3xl font-medium`
- H5: `text-lg md:text-xl lg:text-2xl font-medium`
- H6: `text-base md:text-lg lg:text-xl font-medium`

### Body Text (Inter)
- Large: `text-lg leading-relaxed`
- Base: `text-base leading-relaxed`
- Small: `text-sm leading-relaxed`
- Extra Small: `text-xs leading-relaxed`

## Best Practices

1. **Use Inter for body text** - It's optimized for readability on screens
2. **Use Poppins or Nunito for headings** - Both provide a modern, professional look
3. **Use Open Sans for UI elements** - Buttons, labels, and form elements
4. **Maintain consistency** - Stick to the established typography scale
5. **Consider accessibility** - Ensure sufficient contrast and appropriate sizing

## Font Loading Optimization

All fonts are configured with:
- `display: 'swap'` - Ensures text remains visible during font loading
- `preload: true` - Prioritizes critical font loading
- `fallback` - Provides system font fallbacks
- `subsets: ['latin']` - Loads only necessary character sets

## Example Usage

```tsx
export default function HomePage() {
  return (
    <div>
      <h1 className="font-nunito text-5xl font-bold text-gray-900">
        Welcome to VetKonnect
      </h1>
      
      <p className="font-inter text-lg text-gray-700 mt-4">
        Making animal care available and accessible to everyone everywhere.
      </p>
      
      <button className="font-open-sans font-medium bg-primary-600 text-white px-6 py-3 rounded-lg mt-6">
        Get Started
      </button>
    </div>
  );
}
```

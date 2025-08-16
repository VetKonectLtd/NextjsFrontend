import React from 'react';

export default function NunitoHeadingExample() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="font-nunito text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
        This is a heading using Nunito font
      </h1>
      
      <h2 className="font-nunito text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
        This is an H2 heading using Nunito font
      </h2>
      
      <h3 className="font-nunito text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight">
        This is an H3 heading using Nunito font
      </h3>
      
      <p className="font-inter text-base leading-relaxed">
        This paragraph uses Inter font for body text, which pairs nicely with Nunito headings.
      </p>
      
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 p-6 rounded-lg">
        <h3 className="font-nunito text-2xl font-semibold text-primary-800 mb-2">
          How to Use Nunito Headings
        </h3>
        <p className="font-inter text-primary-700">
          Simply add the className "font-nunito" to any heading element (h1-h6) along with your desired text size and weight.
          For example: className="font-nunito text-3xl font-semibold"
        </p>
      </div>
    </div>
  );
}

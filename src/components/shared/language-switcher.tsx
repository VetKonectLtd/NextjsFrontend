"use client";
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string;
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.__GOOGLE_TRANSLATION_CONFIG__) {
        setLanguageConfig(window.__GOOGLE_TRANSLATION_CONFIG__);

        const cookies = parseCookies();
        const existing = cookies[COOKIE_NAME];

        let lang =
          existing?.split("/")?.[2] ??
          window.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;

        setCurrentLanguage(lang);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!currentLanguage || !languageConfig) return null;

  const switchLanguage = (lang: string) => {
    setCookie(null, COOKIE_NAME, `/auto/${lang}`);
    window.location.reload();
    // document.cookie = `googtrans=/auto/${lang}; path=/`;
    // window.location.href = window.location.pathname;
  };

  const currentLangTitle =
    languageConfig.languages.find(
      (l: LanguageDescriptor) => l.name === currentLanguage,
    )?.title ?? currentLanguage.toUpperCase();

  return (
    <div className="relative notranslate">
      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer transition-colors text-gray-800 hover:text-green-600"
      >
        <span className="text-sm font-medium">{currentLangTitle}</span>
        <svg
          className={`w-4 h-4 ml-1 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dropdown */}
      {open && (
        <div
          style={{ position: "fixed" }}
          className="absolute right-5 mt-2 w-28 bg-white border rounded-md shadow-md z-[9999]"
        >
          {languageConfig.languages.map((ld: LanguageDescriptor) => (
            <div
              key={ld.name}
              onClick={() => switchLanguage(ld.name)}
              className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 ${
                currentLanguage === ld.name
                  ? "text-green-600 font-medium"
                  : "text-gray-700"
              }`}
            >
              {ld.title}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };

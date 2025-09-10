import React, { useEffect, useState } from 'react';

const THEME_KEY = 'smartstudio-theme';

const getSystemPrefersDark = () =>
  window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const ThemeToggle: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY);
    const shouldDark = stored ? stored === 'dark' : getSystemPrefersDark();
    setIsDark(shouldDark);
    document.documentElement.classList.toggle('dark', shouldDark);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <button
      aria-label="Toggle theme"
      onClick={() => setIsDark(prev => !prev)}
      className="ml-2 p-2 rounded-full border border-white/30 text-white hover:text-primary hover:border-primary transition"
      title="Toggle light/dark"
    >
      {isDark ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          <path
            fillRule="evenodd"
            d="M12 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm0 17a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm10-7a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5 12a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zm11.657 7.071a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zM5.222 6.343a1 1 0 000 1.414l.707.707A1 1 0 107.343 7.05l-.707-.707a1 1 0 00-1.414 0zm12.142 0a1 1 0 01.001 1.414l-.708.707a1 1 0 01-1.414-1.414l.708-.707a1 1 0 011.413 0zM6.343 17.657a1 1 0 001.414 0l.707-.707A1 1 0 107.05 15.536l-.707.707a1 1 0 000 1.414z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;

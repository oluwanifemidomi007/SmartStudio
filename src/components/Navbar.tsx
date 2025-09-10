import React, { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const navItemsBase = [
  { to: '/home', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/team', label: 'Team' },
  { to: '/offers', label: 'Offers' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/booking', label: 'Book' },
  { to: '/blog', label: 'Blog' },
  { to: '/testimonials', label: 'Testimonials' },
  { to: '/contact', label: 'Contact' },
];

function getInitials(name?: string) {
  if (!name) return 'SS';
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] || '';
  const second = parts[1]?.[0] || parts[0]?.[1] || '';
  return (first + second).toUpperCase();
}

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [notifCount, setNotifCount] = useState(0);
  const navigate = useNavigate();

  const mobileRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  const navItems =
    user?.role === 'admin' ? [...navItemsBase, { to: '/admin', label: 'Admin' }] : navItemsBase;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setDesktopOpen(false);
        setShowQR(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (mobileOpen && mobileRef.current && !mobileRef.current.contains(e.target as Node))
        setMobileOpen(false);
      if (desktopOpen && desktopRef.current && !desktopRef.current.contains(e.target as Node))
        setDesktopOpen(false);
    };
    if (mobileOpen || desktopOpen) document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [mobileOpen, desktopOpen]);

  useEffect(() => {
    const anyOpen = mobileOpen || desktopOpen || showQR;
    document.body.classList.toggle('overflow-hidden', anyOpen);
    return () => document.body.classList.remove('overflow-hidden');
  }, [mobileOpen, desktopOpen, showQR]);

  useEffect(() => {
    const handler = () => {
      if (user?.role === 'admin') setNotifCount(prev => prev + 1);
    };
    window.addEventListener('smartstudio:new-booking', handler as EventListener);
    return () => window.removeEventListener('smartstudio:new-booking', handler as EventListener);
  }, [user?.role]);

  const clearAndGoAdmin = () => {
    setNotifCount(0);
    navigate('/admin');
  };

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-50 border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex gap-3 items-center">
          <Link to="/home">
            <img
              src="/images/smart_tonsurium-removebg-preview.png"
              className="w-16 h-16"
              alt="logo"
            />
          </Link>
          <Link to="/home" className="md:text-2xl text-xl font-bold text-primary">
            Smart TS Studio
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* Admin notifications bell */}
          {user?.role === 'admin' && (
            <button
              onClick={clearAndGoAdmin}
              className="relative p-2 rounded-md border border-white/30 text-white hover:text-primary hover:border-primary transition"
              aria-label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M14 10V7a4 4 0 10-8 0v3a2 2 0 01-.586 1.414L4 12.828V14h12v-1.172l-1.414-1.414A2 2 0 0114 10z" />
                <path d="M6 16a4 4 0 008 0H6z" />
              </svg>
              {notifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] leading-none px-1.5 py-0.5 rounded-full">
                  {notifCount}
                </span>
              )}
            </button>
          )}

          {/* Desktop: Theme + name + avatar */}
          <div className="hidden md:flex items-center gap-2 mr-2">
            <ThemeToggle />
            {user && (
              <>
                <span className="text-sm text-white/80">{user.name}</span>
                <Link
                  to="/settings"
                  className="w-9 h-9 rounded-full overflow-hidden bg-white/10 flex items-center justify-center"
                >
                  {user.profilePic ? (
                    <img
                      src={user.profilePic}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xs font-semibold">{getInitials(user.name)}</span>
                  )}
                </Link>
              </>
            )}
          </div>

          {/* Mobile: only avatar */}
          <div className="md:hidden flex">
            <ThemeToggle />
            {/* {user && (
              <Link
                to="/settings"
                className="w-8 h-8 rounded-full overflow-hidden bg-white/10 flex items-center justify-center mr-2"
              >
                {user.profilePic ? (
                  <img src={user.profilePic} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-[10px] font-semibold">{getInitials(user.name)}</span>
                )}
              </Link>
            )} */}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden ml-1 p-2 rounded-md border border-white/30 text-white hover:text-primary hover:border-primary transition"
            aria-label="Open mobile menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-drawer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          {/* Desktop hamburger */}
          <button
            onClick={() => setDesktopOpen(true)}
            className="hidden md:inline-flex ml-2 items-center gap-2 px-4 py-2 rounded-full bg-primary text-black font-semibold hover:bg-white hover:text-black border-2 border-primary transition"
            aria-label="Open desktop menu"
            aria-expanded={desktopOpen}
            aria-controls="desktop-drawer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span>Menu</span>
          </button>
        </div>
      </div>

      {/* Overlays */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-[90]"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {desktopOpen && (
        <div
          className="hidden md:block fixed inset-0 bg-black/50 z-[90]"
          onClick={() => setDesktopOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        ref={mobileRef}
        className={`md:hidden fixed top-0 overflow-scroll left-0 h-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white w-2/3 sm:w-1/2 z-[100] transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b border-black/10 dark:border-white/10">
          <h2 className="text-xl font-bold text-primary">Menu</h2>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 hover:text-red-500"
            aria-label="Close mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 gap-2">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-3 rounded-lg border text-left font-medium transition ${
                  isActive
                    ? 'bg-primary text-black border-primary'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/settings"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-3 rounded-lg border text-left font-medium transition ${
                isActive
                  ? 'bg-primary text-black border-primary'
                  : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            Settings
          </NavLink>
          <button
            onClick={() => setShowQR(true)}
            className="mt-2 px-3 py-2 border border-black/30 dark:border-white/40 rounded text-sm hover:text-primary"
          >
            Show QR
          </button>
        </div>
      </div>

      {/* Desktop Drawer */}
      <div
        id="desktop-drawer"
        ref={desktopRef}
        className={`hidden md:flex flex-col fixed top-0 right-0 h-full w-[360px] bg-white dark:bg-gray-900 text-gray-900 dark:text-white z-[100] shadow-xl transform transition-transform duration-300 ease-in-out ${
          desktopOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-black/10 dark:border-white/10">
          <h2 className="text-xl font-bold text-primary">Navigation</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowQR(true)}
              className="px-3 py-1 rounded border border-black/30 dark:border-white/30 hover:text-primary hover:border-primary"
            >
              Show QR
            </button>
            <button
              onClick={() => setDesktopOpen(false)}
              className="p-2 rounded border border-black/30 dark:border-white/30 hover:text-red-500"
              aria-label="Close desktop menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
            Quick Links
          </p>
          <nav className="flex flex-col gap-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setDesktopOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-lg border text-left font-medium transition ${
                    isActive
                      ? 'bg-primary text-black border-primary'
                      : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/settings"
              onClick={() => setDesktopOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg border text-left font-medium transition ${
                  isActive
                    ? 'bg-primary text-black border-primary'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              Settings
            </NavLink>
          </nav>
        </div>
      </div>

      {/* QR modal */}
      {showQR && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center"
            onClick={e => e.stopPropagation()}
          >
            <QRCodeSVG value={`http://192.168.175.4:3000`} size={240} />
            <p className="text-sm mt-3">Scan to open Smart TS Studio</p>
            <button
              className="mt-4 px-4 py-1 text-sm text-white bg-red-600 rounded hover:bg-red-700"
              onClick={() => setShowQR(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

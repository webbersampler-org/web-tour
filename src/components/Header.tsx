import React, { useState, useEffect } from 'react';
import { Compass, Menu, X, ArrowUpRight, Shield, Sparkles, MapPin, Tent, Car } from 'lucide-react';
import type { PageRoute } from '../types';

interface HeaderProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute, params?: Record<string, string>) => void;
  destinationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate, destinationsCount }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Destinations', page: 'destinations' },
    { label: 'Book Journey', page: 'booking' },
    { label: 'Experience', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a2118]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[#0a2118]/90 via-[#0f2e24]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#70e29b] text-[#0f2e24] flex items-center justify-center shadow-lg shadow-[#70e29b]/25 group-hover:scale-105 transition-transform font-bold">
              <Compass className="w-6 h-6 text-[#0f2e24]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-extrabold tracking-tight text-white">
                  SOLIS
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0f2e24] bg-[#70e29b] px-2 py-0.5 rounded-full">
                  EXPEDITIONS
                </span>
              </div>
              <p className="text-[11px] text-emerald-200/80 font-sans tracking-wide">Roam Free • Stays & Adventures</p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden md:flex items-center gap-1 bg-[#133a2e]/90 backdrop-blur-md border border-emerald-400/20 rounded-full px-4 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  id={`nav-link-${link.page}`}
                  onClick={() => onNavigate(link.page)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-[#0f2e24] bg-[#70e29b] shadow-sm shadow-[#70e29b]/30'
                      : 'text-emerald-100/90 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {link.label}
                  {link.page === 'destinations' && destinationsCount ? (
                    <span className={`ml-1.5 text-[11px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-[#0f2e24]/20 text-[#0f2e24]' : 'bg-white/15 text-emerald-200'
                    }`}>
                      {destinationsCount}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          {/* Header Action CTA: Matching the reference "Find your RV ↗" pill button style */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="header-book-cta-btn"
              onClick={() => onNavigate('booking')}
              className="group inline-flex items-center gap-2.5 bg-[#0a2118] hover:bg-[#071912] text-white border border-[#70e29b]/40 pl-5 pr-2 py-2 rounded-full text-sm font-bold shadow-xl shadow-black/30 hover:border-[#70e29b] transition-all cursor-pointer"
            >
              <span>Find your Journey</span>
              <div className="w-8 h-8 rounded-full bg-white text-[#0a2118] flex items-center justify-center group-hover:bg-[#70e29b] transition-colors">
                <ArrowUpRight className="w-4 h-4 text-[#0a2118]" />
              </div>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-[#143a2e] border border-emerald-400/30 text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-nav-drawer" className="md:hidden bg-[#0a2118]/98 backdrop-blur-2xl border-b border-emerald-500/20 px-4 pt-4 pb-6 mt-3 space-y-2 animate-in fade-in slide-in-from-top-4 duration-200">
          {navLinks.map((link) => (
            <button
              key={link.page}
              id={`mobile-nav-link-${link.page}`}
              onClick={() => {
                onNavigate(link.page);
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold text-left transition-colors ${
                currentPage === link.page
                  ? 'bg-[#70e29b] text-[#0f2e24]'
                  : 'text-emerald-100 hover:bg-white/10'
              }`}
            >
              <span>{link.label}</span>
              {link.page === 'destinations' && destinationsCount && (
                <span className="text-xs px-2 py-0.5 bg-white/20 rounded-full font-bold">
                  {destinationsCount} stays
                </span>
              )}
            </button>
          ))}
          <div className="pt-3 border-t border-white/10">
            <button
              id="mobile-drawer-book-btn"
              onClick={() => {
                onNavigate('booking');
                setMobileMenuOpen(false);
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-[#70e29b] text-[#0f2e24] font-extrabold text-center flex items-center justify-center gap-2 shadow-lg shadow-[#70e29b]/20"
            >
              <span>Find your Journey</span>
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

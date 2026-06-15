/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Coffee, Menu, X, ShoppingBag, MapPin, Phone } from 'lucide-react';
import { ActiveTab } from '../types';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'menu', label: 'Menu' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'contact', label: 'Contact & Map' },
  ] as const;

  const handleNavClick = (tabId: ActiveTab) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FCFBF7] border-b border-[#EBE6DD] shadow-sm">
      {/* Top Banner with Quick Cafe info */}
      <div className="bg-[#606C38] text-[#F4F3EE] py-1.5 px-4 text-xs font-sans font-medium flex flex-wrap justify-between items-center gap-2">
        <div className="flex items-center gap-4 mx-auto md:mx-0">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#DDA15E]" />
            102 N Horton Pkwy, Chapel Hill, TN
          </span>
          <span className="hidden sm:flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#DDA15E]" />
            (931) 364-2233
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span>Mon-Fri: 6:30 AM - 4:00 PM | Sat: 7:00 AM - 3:00 PM</span>
          <span className="bg-[#DDA15E] text-[#283618] px-2 py-0.5 rounded-full font-bold text-[10px]">
            FREE WI-FI
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none text-left"
            id="bar-logo-btn"
          >
            <div className="w-11 h-11 bg-[#283618] rounded-xl flex items-center justify-center text-[#FEFAE0] shadow-md group-hover:bg-[#606C38] transition-colors duration-300">
              <Coffee className="w-6 h-6 transform group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#283618] tracking-tight block leading-none">
                South Arrow
              </span>
              <span className="text-[10px] tracking-[0.25em] font-sans font-semibold text-[#DDA15E] uppercase block mt-1">
                COFFEE CO. &bull; CHAPEL HILL
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  activeTab === link.id
                    ? 'bg-[#E2DCD2] text-[#283618] shadow-sm'
                    : 'text-[#6C584C] hover:text-[#283618] hover:bg-[#F4F3EE]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Interactive Utilities */}
          <div className="flex items-center gap-3">
            {/* View Cart / Ordering Trigger */}
            <button
              onClick={onCartClick}
              id="header-cart-btn"
              className="relative p-2.5 rounded-xl border border-[#EBE6DD] bg-white text-[#283618] hover:bg-[#FEFAE0] hover:border-[#DDA15E] transition-all duration-300 shadow-sm cursor-pointer"
              title="View Cart"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 px-1.5 py-0.5 rounded-full bg-[#DDA15E] text-[#283618] text-xs font-bold border-2 border-[#FCFBF7] animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Order Button */}
            <button
              onClick={() => handleNavClick('menu')}
              id="cta-order-top"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-[#283618] text-[#FEFAE0] hover:bg-[#606C38] active:scale-95 font-sans font-bold text-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Order Online
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#283618] hover:bg-[#F4F3EE] transition-colors"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FCFBF7] border-t border-[#EBE6DD] px-4 py-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`mob-nav-${link.id}`}
                onClick={() => handleNavClick(link.id)}
                className={`py-3 px-4 rounded-xl text-left font-sans font-bold text-sm transition-all ${
                  activeTab === link.id
                    ? 'bg-[#E2DCD2] text-[#283618]'
                    : 'text-[#6C584C] hover:text-[#283618] hover:bg-[#F4F3EE]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <hr className="my-2 border-[#EBE6DD]" />
            <button
              onClick={() => handleNavClick('menu')}
              id="mob-cta-order"
              className="w-full py-3.5 bg-[#283618] text-[#FEFAE0] text-center font-sans font-bold rounded-xl shadow-md hover:bg-[#606C38] transition-colors"
            >
              Order Online &bull; Quick Pickup
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

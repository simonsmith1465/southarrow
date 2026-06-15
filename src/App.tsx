/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import GallerySection from './components/GallerySection';
import ReviewsSection from './components/ReviewsSection';
import ContactSection from './components/ContactSection';
import CartDrawer from './components/CartDrawer';
import { ActiveTab, CartItem, MenuItem, CustomizationOptions } from './types';
import { Coffee, MapPin, Phone, Instagram, Facebook, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Email newsletter states
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [newsletterError, setNewsletterError] = useState('');

  // Compound Cart Adding Logic
  const handleAddItemToCart = (item: MenuItem, quantity: number, customizations: CustomizationOptions) => {
    // Stringify customizations to make a unique line ID so identical drinks with distinct milks don't collide
    const customKey = Object.keys(customizations).length > 0
      ? '-' + Object.entries(customizations)
          .map(([k, v]) => `${k}:${v}`)
          .sort()
          .join('_')
      : '';
    const uniqueLineItemID = `${item.id}${customKey}`;

    // Subtotal calculations with customization additions
    let perItemPrice = item.price;
    if (customizations.shots && item.category === 'coffee') {
      perItemPrice += customizations.shots * 0.75;
    }
    if ((customizations.milk === 'oat' || customizations.milk === 'almond' || customizations.milk === 'coconut') && (item.category === 'coffee' || item.category === 'tea')) {
      perItemPrice += 0.50;
    }

    setCartItems((prevList) => {
      const matchIndex = prevList.findIndex((ci) => ci.id === uniqueLineItemID);
      if (matchIndex > -1) {
        const nextList = [...prevList];
        nextList[matchIndex] = {
          ...nextList[matchIndex],
          quantity: nextList[matchIndex].quantity + quantity,
        };
        return nextList;
      } else {
        return [
          ...prevList,
          {
            id: uniqueLineItemID,
            menuItem: item,
            quantity: quantity,
            customization: customizations,
            totalItemPrice: perItemPrice,
          },
        ];
      }
    });

    // Auto-expand cart on successful additions
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (lineId: string, nextQty: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === lineId ? { ...item, quantity: nextQty } : item))
    );
  };

  const handleRemoveItem = (lineId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== lineId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterError('Please provide a valid email address.');
      return;
    }
    setNewsletterError('');
    setNewsletterSuccess(true);
    setNewsletterEmail('');
    setTimeout(() => setNewsletterSuccess(false), 5500);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FCFBF7] text-[#283618] font-sans selection:bg-[#DDA15E]/30 selection:text-[#283618]">
      {/* Visual Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        onCartClick={() => setCartDrawerOpen(true)}
      />

      {/* Primary Section Routes */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <GallerySection />
            <ContactSection />
          </>
        )}

        {activeTab === 'menu' && (
          <MenuSection onAddItemToCart={handleAddItemToCart} />
        )}

        {activeTab === 'gallery' && (
          <GallerySection />
        )}

        {activeTab === 'reviews' && (
          <ReviewsSection />
        )}

        {activeTab === 'contact' && (
          <ContactSection />
        )}
      </main>

      {/* Slide-out Shopping Cart Drawer with simulated preparation */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* --- Visual Newsletter Sign-Up Row --- */}
      <section className="bg-[#606C38] text-[#FEFAE0] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-[#DDA15E] font-bold text-xs uppercase tracking-widest block">
            South Arrow Dispatch
          </span>
          <h3 className="font-serif text-3xl font-bold tracking-tight">
            Stay in Our Small-Town Loop
          </h3>
          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Gain priority alerts on our seasonal maple spice pours, fresh cinnamon roll batches, local pottery drops, and weekend gatherings in Chapel Hill.
          </p>

          {newsletterSuccess ? (
            <div className="p-4 bg-[#F4F3EE] text-[#283618] rounded-2xl max-w-md mx-auto flex items-center justify-center gap-2 font-bold text-xs shadow-md animate-bounce" id="news-success-toast">
              <CheckCircle2 className="w-5 h-5 text-[#606C38]" />
              Welcome to the family! Fresh brew alerts headed your way.
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2" id="newsletter-form-box">
              <input
                type="text"
                placeholder="gwen@vancefarms.com"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white/10 placeholder-stone-300 border border-[#FEFAE0]/30 text-white rounded-xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#DDA15E]"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-[#DDA15E] text-[#283618] font-bold text-xs sm:text-sm rounded-xl hover:bg-[#FEFAE0] transition cursor-pointer"
              >
                Join Newsletter
              </button>
            </form>
          )}
          {newsletterError && (
            <p className="text-[#DDA15E] text-xs font-bold font-mono">{newsletterError}</p>
          )}
        </div>
      </section>

      {/* --- Main Visual Footer --- */}
      <footer className="bg-[#1E1711] text-[#FEFAE0]/80 py-16 px-4 border-t border-stone-850">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-sm">
          
          {/* Col 1: Brand details */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2 text-[#FEFAE0]">
              <div className="w-10 h-10 bg-[#FEFAE0]/10 rounded-xl flex items-center justify-center">
                <Coffee className="w-5.5 h-5.5 text-[#DDA15E]" />
              </div>
              <span className="font-serif font-black text-xl tracking-tight">South Arrow Coffee Co.</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Established proud in Chapel Hill, Tennessee. Synthesizing premium, ethically-sourced custom espresso roasts with cozy visual atmospheres, local pottery, and neighborhood friendliness.
            </p>
            {/* Social handles */}
            <div className="flex gap-3">
              <a
                href="https://facebook.com/SouthArrowCoffeeCo"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[#FEFAE0] hover:bg-[#DDA15E] hover:text-[#283618] transition"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/SouthArrowCoffeeCo"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-[#FEFAE0] hover:bg-[#DDA15E] hover:text-[#283618] transition"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-[#DDA15E] font-bold text-xs uppercase tracking-widest font-mono">Explore</h5>
            <ul className="space-y-2 mt-4 text-xs font-semibold">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition">
                  Homestead Lounge
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('menu'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition">
                  Menu Selections
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('gallery'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition">
                  Local Art Gallery
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('reviews'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition">
                  Regulars' Reviews
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth'}); }} className="hover:text-white transition">
                  Map & Driving Directions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates details */}
          <div className="md:col-span-5 space-y-4 text-xs">
            <h5 className="text-[#DDA15E] font-bold text-xs uppercase tracking-widest font-mono">Chapel Hill Coordinates</h5>
            <ul className="space-y-3 mt-4 text-stone-400">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#DDA15E]" />
                <span>102 N Horton Pkwy, Chapel Hill, TN 37034</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#DDA15E]" />
                <span>(931) 364-2233</span>
              </li>
              <li className="pt-2 border-t border-stone-800 leading-normal">
                <strong className="text-stone-300">Mon–Fri:</strong> 6:30 AM – 4:00 PM<br />
                <strong className="text-stone-300">Sat:</strong> 7:00 AM – 3:00 PM<br />
                <strong className="text-stone-300">Sun:</strong> Closed (Family Day)
              </li>
            </ul>
          </div>

        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-stone-850 flex flex-col sm:flex-row justify-between items-center text-[10px] text-stone-500 gap-4">
          <span>&copy; {new Date().getFullYear()} South Arrow Coffee Co., LLC. All rights cooked and poured with love.</span>
          <span className="flex items-center gap-1">
            Carefully Crafted for Middle Tennessee &bull; 
            <a href="https://maps.google.com/?q=102+N+Horton+Pkwy+Chapel+Hill+TN" target="_blank" rel="noreferrer" className="text-[#DDA15E] hover:underline flex items-center gap-0.5">
              Directions <ArrowUpRight className="w-3 h-3" />
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}

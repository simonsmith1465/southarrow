/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Search, Plus, Filter, Check, Flame, Sparkles, CheckCircle, HelpCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data';
import { MenuItem, CustomizationOptions } from '../types';

interface MenuSectionProps {
  onAddItemToCart: (item: MenuItem, quantity: number, custom: CustomizationOptions) => void;
}

type CategoryFilter = 'all' | 'coffee' | 'tea' | 'bakery' | 'lunch_breakfast';

export default function MenuSection({ onAddItemToCart }: MenuSectionProps) {
  // Filter States
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [glutenFreeOnly, setGlutenFreeOnly] = useState(false);
  const [veganOnly, setVeganOnly] = useState(false);
  const [popularOnly, setPopularOnly] = useState(false);

  // Customization Modal State
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [customQuantity, setCustomQuantity] = useState(1);
  const [customMilk, setCustomMilk] = useState<'whole' | 'oat' | 'almond' | 'coconut' | 'none'>('whole');
  const [customSweetness, setCustomSweetness] = useState<'none' | 'low' | 'medium' | 'extra'>('medium');
  const [customFlavor, setCustomFlavor] = useState<'none' | 'vanilla' | 'caramel' | 'lavender' | 'sugar_free_vanilla'>('none');
  const [customShots, setCustomShots] = useState(0);
  const [customTemp, setCustomTemp] = useState<'hot' | 'iced'>('hot');
  const [isToasted, setIsToasted] = useState(true);

  // Category labels map
  const categories = [
    { id: 'all', label: 'Full Menu' },
    { id: 'coffee', label: 'Coffee & Espresso' },
    { id: 'tea', label: 'Matcha & Teas' },
    { id: 'bakery', label: 'Fresh Bakery' },
    { id: 'lunch_breakfast', label: 'Breakfast & Lunch' },
  ] as const;

  // Filter computation
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category Match
      if (activeCategory !== 'all' && item.category !== activeCategory) return false;

      // Search query Match
      if (
        searchQuery &&
        !item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Dietary Toggles Match
      if (glutenFreeOnly && !item.isGlutenFree) return false;
      if (veganOnly && !item.isVegan) return false;
      if (popularOnly && !item.isPopular) return false;

      return true;
    });
  }, [activeCategory, searchQuery, glutenFreeOnly, veganOnly, popularOnly]);

  // Open modal config
  const handleOpenCustomizer = (item: MenuItem) => {
    setCustomizingItem(item);
    setCustomQuantity(1);

    // Default sensible options depending on item type
    if (item.category === 'coffee' || item.category === 'tea') {
      setCustomMilk(item.id.includes('matcha') || item.isVegan ? 'oat' : 'whole');
      setCustomSweetness('medium');
      setCustomFlavor(item.id.includes('lavender') ? 'lavender' : item.id.includes('maple') ? 'none' : 'none');
      setCustomShots(0);
      setCustomTemp(item.id.includes('nitro') || item.id.includes('peach') ? 'iced' : 'hot');
    } else {
      setIsToasted(true);
    }
  };

  // Close Customizer reset
  const handleCloseCustomizer = () => {
    setCustomizingItem(null);
  };

  // Add Item with computed shot price (+ $0.75 per extra raw espresso shot)
  const handleAddToCartSubmit = () => {
    if (!customizingItem) return;

    const options: CustomizationOptions = customizingItem.category === 'coffee' || customizingItem.category === 'tea'
      ? {
          milk: customMilk,
          sweetness: customSweetness,
          flavor: customFlavor,
          shots: customShots,
          temp: customTemp,
        }
      : {};

    onAddItemToCart(customizingItem, customQuantity, options);
    setCustomizingItem(null);
  };

  // Calculated individual item price with customizations
  const computedItemPrice = useMemo(() => {
    if (!customizingItem) return 0;
    let base = customizingItem.price;
    // Add espresso shots markup
    if (customizingItem.category === 'coffee') {
      base += customShots * 0.75;
    }
    // Add organic milk alternative markup
    if ((customMilk === 'oat' || customMilk === 'almond' || customMilk === 'coconut') && (customizingItem.category === 'coffee' || customizingItem.category === 'tea')) {
      base += 0.50;
    }
    return base;
  }, [customizingItem, customShots, customMilk]);

  return (
    <div className="py-12 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Titles */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#283618] tracking-tight">
            Our Cafe Menu
          </h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Every item is handcrafted with utmost care, local Tennessee farm ingredients (like raw honey), and love in Chapel Hill.
          </p>
        </div>

        {/* Searching & Filter Controls */}
        <div className="bg-white rounded-2xl border border-[#EBE6DD] p-5 sm:p-6 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search menu (e.g. matcha, bacon, cinnamon...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="menu-search-input"
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#EBE6DD] bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#DDA15E] focus:border-[#DDA15E] text-sm"
              />
            </div>

            {/* Quick dietary badge filters */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
              <span className="text-xs font-bold text-gray-500 uppercase flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Filter by:
              </span>
              
              <button
                onClick={() => setGlutenFreeOnly(!glutenFreeOnly)}
                id="filter-gf-btn"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  glutenFreeOnly
                    ? 'bg-emerald-800 text-[#FEFAE0]'
                    : 'bg-[#FCFBF7] text-gray-600 border border-[#EBE6DD] hover:bg-stone-100'
                }`}
              >
                Gluten Free
              </button>

              <button
                onClick={() => setVeganOnly(!veganOnly)}
                id="filter-vegan-btn"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  veganOnly
                    ? 'bg-emerald-800 text-[#FEFAE0]'
                    : 'bg-[#FCFBF7] text-gray-600 border border-[#EBE6DD] hover:bg-stone-100'
                }`}
              >
                Vegan
              </button>

              <button
                onClick={() => setPopularOnly(!popularOnly)}
                id="filter-popular-btn"
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  popularOnly
                    ? 'bg-[#DDA15E] text-[#283618]'
                    : 'bg-[#FCFBF7] text-gray-600 border border-[#EBE6DD] hover:bg-stone-100'
                }`}
              >
                Fayes / Popular
              </button>
            </div>
          </div>

          <hr className="border-[#EBE6DD]" />

          {/* Categories Tab Bar Selector */}
          <div className="flex overflow-x-auto gap-2 pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-filter-${cat.id}`}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#283618] text-[#FEFAE0] shadow-sm'
                    : 'bg-stone-50 text-[#6C584C] border border-[#EBE6DD] hover:bg-[#F4F3EE]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid results */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#EBE6DD] rounded-3xl" id="menu-empty-results">
            <span className="text-4xl">☕</span>
            <h3 className="font-serif text-xl font-bold text-[#283618] mt-4">We couldn't find matches</h3>
            <p className="text-gray-500 text-sm mt-1">Try resetting your gluten-free/vegan filters or adjusting search words.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setGlutenFreeOnly(false);
                setVeganOnly(false);
                setPopularOnly(false);
                setActiveCategory('all');
              }}
              className="mt-6 px-5 py-2 bg-[#283618] text-[#FEFAE0] rounded-xl text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 animate-in fade-in duration-300">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                id={`menu-item-card-${item.id}`}
                className="bg-white rounded-2xl border border-[#EBE6DD] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Product Image Panel */}
                <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    {item.tag && (
                      <span className="px-2.5 py-1 rounded-full bg-[#283618] text-[#FEFAE0] font-sans font-extrabold text-[10px] tracking-wide uppercase uppercase">
                        {item.tag}
                      </span>
                    )}
                    {item.isPopular && (
                      <span className="px-2.5 py-1 rounded-full bg-[#DDA15E] text-[#283618] font-sans font-extrabold text-[10px] tracking-wide uppercase flex items-center gap-0.5">
                        <Flame className="w-2.5 h-2.5 inline fill-current" /> Regulars' Pick
                      </span>
                    )}
                  </div>
                </div>

                {/* Info Text Area */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-serif font-black text-lg text-[#283618] leading-tight">
                        {item.name}
                      </h3>
                      <span className="font-sans font-extrabold text-[#283618] bg-[#FEFAE0] px-2.5 py-1 rounded-lg border border-[#EBE6DD] text-sm whitespace-nowrap">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                    {/* Diet Tag Indicators list */}
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-500">
                      {item.isGlutenFree && (
                        <span className="bg-emerald-100/70 text-emerald-800 px-2 py-0.5 rounded border border-emerald-200">
                          GF
                        </span>
                      )}
                      {item.isVegan && (
                        <span className="bg-[#606C38]/15 text-[#606C38] px-2 py-0.5 rounded border border-[#606C38]/20">
                          VEGAN
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => handleOpenCustomizer(item)}
                      id={`customize-btn-${item.id}`}
                      className="inline-flex items-center gap-1 px-4 py-2 bg-[#283618]/5 text-[#283618] hover:bg-[#DDA15E] hover:text-[#283618] active:scale-95 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Ordering Options
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* --- Beautiful Customization Modal --- */}
      {customizingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#EBE6DD] flex flex-col" id="customizing-modal-box">
            
            {/* Header of Modal */}
            <div className="p-6 border-b border-[#EBE6DD] flex justify-between items-start bg-[#F4F3EE] sticky top-0 z-10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#DDA15E] block mb-1">
                  Customizing Your South Arrow Drink
                </span>
                <h3 className="font-serif font-black text-xl text-[#283618]">
                  {customizingItem.name}
                </h3>
              </div>
              <button
                onClick={handleCloseCustomizer}
                className="p-1 rounded-full text-gray-400 hover:bg-stone-200 hover:text-black transition"
                id="modal-close-x"
              >
                &times;
              </button>
            </div>

            {/* Modal Custom Options Body */}
            <div className="p-6 space-y-6 flex-1">
              
              {/* If coffee or tea category, show beverage controls */}
              {(customizingItem.category === 'coffee' || customizingItem.category === 'tea') ? (
                <>
                  {/* Hot or Iced */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Serving Temperature</label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setCustomTemp('hot')}
                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition ${
                          customTemp === 'hot'
                            ? 'bg-[#283618] text-[#FEFAE0] border-[#283618]'
                            : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        🔥 Hot Comfort
                      </button>
                      <button
                        onClick={() => setCustomTemp('iced')}
                        className={`py-2 px-4 rounded-xl text-xs font-bold border transition ${
                          customTemp === 'iced'
                            ? 'bg-blue-900 text-white border-blue-900'
                            : 'border-stone-300 text-stone-600 hover:bg-stone-50'
                        }`}
                      >
                        ❄️ Iced Blend
                      </button>
                    </div>
                  </div>

                  {/* Milk Options */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">Choice of Milk</label>
                      {(customMilk === 'oat' || customMilk === 'almond' || customMilk === 'coconut') && (
                        <span className="text-[10px] bg-[#606C38]/10 text-[#606C38] px-1.5 py-0.5 rounded font-semibold">+ $0.50 alternative</span>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {(['whole', 'oat', 'almond', 'coconut', 'none'] as const).map((m) => (
                        <button
                          key={m}
                          onClick={() => setCustomMilk(m)}
                          className={`py-2 px-1 rounded-xl text-[11px] font-bold border uppercase transition ${
                            customMilk === m
                              ? 'bg-[#606C38] text-[#FEFAE0] border-[#606C38]'
                              : 'border-stone-250 text-stone-600 hover:bg-stone-50'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Flavor Syrups */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block">Syrup Infusion (Free)</label>
                    <select
                      value={customFlavor}
                      onChange={(e: any) => setCustomFlavor(e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-stone-300 bg-white text-xs font-medium focus:outline-none focus:ring-1 focus:ring-[#606C38]"
                    >
                      <option value="none">No Added Flavor Syrup</option>
                      <option value="vanilla">Organic Madagascan Vanilla</option>
                      <option value="caramel">Buttery Toasted Caramel</option>
                      <option value="lavender">Signature Lavender Infusion</option>
                      <option value="sugar_free_vanilla">Sugar-Free Gourmet Vanilla</option>
                    </select>
                  </div>

                  {/* Sweetness Slider */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 uppercase tracking-wider flex justify-between">
                      <span>Sweetness Level:</span>
                      <span className="text-[#DDA15E] uppercase font-extrabold">{customSweetness}</span>
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['none', 'low', 'medium', 'extra'] as const).map((s) => (
                        <button
                          key={s}
                          onClick={() => setCustomSweetness(s)}
                          className={`py-1.5 rounded-lg text-[10px] font-bold border uppercase transition ${
                            customSweetness === s
                              ? 'bg-stone-700 text-white border-stone-700'
                              : 'border-stone-250 text-stone-500 hover:bg-stone-50'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Latte Espresso Shots Adjuster (only for coffee category) */}
                  {customizingItem.category === 'coffee' && (
                    <div className="space-y-2 bg-[#FCFBF7] p-3 rounded-2xl border border-stone-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <label className="text-xs font-bold text-stone-700 uppercase block">Extra Espresso Shots</label>
                          <span className="text-[10px] text-gray-500">+ $0.75 each additional shot</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setCustomShots(Math.max(0, customShots - 1))}
                            className="bg-white border border-stone-300 hover:bg-stone-100 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-stone-800"
                          >
                            -
                          </button>
                          <span className="font-mono font-bold text-sm">{customShots} shot(s)</span>
                          <button
                            onClick={() => setCustomShots(Math.min(4, customShots + 1))}
                            className="bg-white border border-stone-300 hover:bg-stone-100 rounded-lg w-8 h-8 flex items-center justify-center font-bold text-stone-800"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Bakery and Sandwiches */
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3.5 bg-[#FEFAE0]/40 rounded-2xl border border-[#FEFAE0]">
                    <div>
                      <span className="text-xs font-bold text-[#283618] block">Serve Warm & Toasted</span>
                      <span className="text-[10px] text-gray-500">Fresh from our heating ovens for peak deliciousness!</span>
                    </div>
                    <button
                      onClick={() => setIsToasted(!isToasted)}
                      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                        isToasted ? 'bg-emerald-800 justify-end' : 'bg-gray-300 justify-start'
                      }`}
                    >
                      <span className="bg-white w-4 h-4 rounded-full shadow" />
                    </button>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-700 block">Specific Pickup Note (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. Leave sauce on the side, allergies note..."
                      className="w-full p-2.5 rounded-xl border border-stone-250 bg-white text-xs text-gray-800 focus:outline-none focus:border-stone-400"
                      maxLength={120}
                    />
                  </div>
                </div>
              )}

              {/* Quantity Select Slider */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-bold text-[#283618] uppercase tracking-wider">Order Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCustomQuantity(Math.max(1, customQuantity - 1))}
                    className="bg-[#FCFBF7] border border-stone-300 hover:bg-stone-50 rounded-xl w-10 h-10 flex items-center justify-center font-black"
                  >
                    -
                  </button>
                  <span className="font-serif font-bold text-base w-6 text-center">{customQuantity}</span>
                  <button
                    onClick={() => setCustomQuantity(Math.min(10, customQuantity + 1))}
                    className="bg-[#FCFBF7] border border-stone-300 hover:bg-stone-50 rounded-xl w-10 h-10 flex items-center justify-center font-black"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Footer containing pricing & Add CTA */}
            <div className="p-6 border-t border-stone-100 bg-[#FCFBF7] flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500">Combined Total Price:</span>
                <span className="font-sans font-black text-2xl text-[#283618]">
                  ${(computedItemPrice * customQuantity).toFixed(2)}
                </span>
              </div>

              <button
                onClick={handleAddToCartSubmit}
                id="modal-add-to-cart-btn"
                className="w-full py-4 bg-[#283618] text-[#FEFAE0] rounded-xl font-sans font-extrabold text-sm shadow-md hover:bg-[#606C38] active:scale-95 transition cursor-pointer"
              >
                Add {customQuantity} to Basket
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

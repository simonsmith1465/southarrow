/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data';
import { GalleryItem } from '../types';
import { Maximize2, X, PlusCircle, Sparkles } from 'lucide-react';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'interior' | 'beverages' | 'bakery' | 'dishes'>('all');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const filterTabs = [
    { id: 'all', label: 'All Snaps' },
    { id: 'interior', label: 'Our Cozy Space' },
    { id: 'beverages', label: 'Handcrafted Drinks' },
    { id: 'bakery', label: 'Fresh Bakery' },
    { id: 'dishes', label: 'Hearty Eats' },
  ] as const;

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="py-16 bg-[#F4F3EE] border-y border-[#EBE6DD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Gallery Headers */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#606C38] font-bold text-xs uppercase tracking-widest block mb-2">
            A Glimpse of South Arrow
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#283618] tracking-tight">
            Our Small-Town Canvas
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Take a peak inside. Good coffee, warm food, and visual moments captured inside our historic Horton Parkway location.
          </p>
        </div>

        {/* Gallery Cat Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-emerald-800 text-[#FEFAE0] shadow-sm'
                  : 'bg-[#FCFBF7] text-[#6C584C] border border-[#EBE6DD] hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid board */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              id={`gallery-item-card-${item.id}`}
              className="bg-white rounded-3xl overflow-hidden border border-[#EBE6DD] group shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-stone-100 cursor-pointer" onClick={() => setLightboxItem(item)}>
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <span className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white shadow-xl">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-extrabold uppercase bg-stone-100 text-[#6C584C] px-2 py-0.5 rounded border border-stone-250 uppercase">
                    {item.category}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#283618] leading-tight block">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Local pottery and display highlight */}
        <div className="max-w-4xl mx-auto mt-16 bg-[#E2DCD2]/50 rounded-3xl border border-[#EBE6DD] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
          <div className="w-14 h-14 bg-amber-800/10 text-amber-800 rounded-full flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg text-[#283618] mb-1">Local Pottery Showcase</h4>
            <p className="text-[#6C584C] text-xs sm:text-sm leading-relaxed">
              Did you fall in love with your mug? Every single hot beverage in our lounge is served in artisan ceramic goods made right here in Middle Tennessee. If you want, you can purchase standard cups, mugs, and vases at our counter to support local potters!
            </p>
          </div>
        </div>

      </div>

      {/* --- Lightbox Modal --- */}
      {lightboxItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-200" id="gallery-lightbox">
          <div className="relative max-w-4xl w-full bg-[#FCFBF7] rounded-3xl overflow-hidden shadow-2xl border border-stone-800 flex flex-col">
            
            <button
              onClick={() => setLightboxItem(null)}
              className="absolute top-4 right-4 z-10 p-2.5 bg-black/60 rounded-full text-white hover:bg-stone-800 transition"
              id="lightbox-close-btn"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Main Visual Image */}
            <div className="aspect-[16:10] max-h-[65vh] overflow-hidden bg-black">
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                className="w-full h-full object-contain mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Description details */}
            <div className="p-6 bg-white border-t border-[#EBE6DD]">
              <span className="text-xs font-bold text-[#DDA15E] tracking-wider uppercase">{lightboxItem.category}</span>
              <h3 className="font-serif font-black text-2xl text-[#283618] mt-1">{lightboxItem.title}</h3>
              <p className="text-gray-600 font-sans text-sm mt-2 leading-relaxed">{lightboxItem.description}</p>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

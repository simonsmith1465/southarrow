/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ChevronRight, ShieldAlert, Award, Coffee, ShieldCheck, Wifi, Users, CupSoda } from 'lucide-react';
import { heroBg } from '../data';
import { ActiveTab } from '../types';

interface HeroProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export default function Hero({ setActiveTab }: HeroProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Banner Section */}
      <section className="relative min-h-[550px] md:min-h-[620px] flex items-center justify-center py-20 px-4 bg-stone-900 overflow-hidden">
        {/* Background Image with Rich Mocha Overlays */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="South Arrow Coffee interior cozy table setting"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 scale-105 transform translate-y-[-2%]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1E1711]/90 via-[#283618]/60 to-[#1E1711]/90" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FCFBF7] to-transparent" />
        </div>

        {/* Content Card */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#DDA15E]/10 border border-[#DDA15E]/30 text-[#DDA15E] rounded-full text-xs font-bold uppercase tracking-wider mb-6 animate-pulse">
            <Coffee className="w-3.5 h-3.5" />
            Your Small-Town Gathering Place
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-black text-[#FEFAE0] tracking-tight leading-[1.1] mb-6">
            Where Craft Meets Community in <span className="text-[#DDA15E] underline decoration-wavy decoration-[#606C38] underline-offset-8">Chapel Hill</span>
          </h1>

          <p className="font-sans text-md sm:text-xl text-[#F4F3EE] max-w-2xl mx-auto leading-relaxed mb-10 text-shadow-sm">
            Step out of the rush and sink into South Arrow. Serving artisanal lattes, oven-fresh giant cinnamon rolls, gluten-free egg bites, and gourmet bacon grilled cheese in a cozy space filled with Tennessee hospitality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => {
                setActiveTab('menu');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="hero-order-online-btn"
              className="w-full sm:w-auto px-8 py-4 bg-[#DDA15E] text-[#283618] hover:bg-[#FEFAE0] hover:text-[#283618] active:scale-95 font-sans font-bold text-base rounded-xl transition-all duration-300 shadow-lg cursor-pointer"
            >
              Order Online &bull; Quick Pickup
            </button>
            <button
              onClick={() => {
                const element = document.getElementById('highlights-sec');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              id="hero-learn-more-btn"
              className="w-full sm:w-auto px-8 py-4 bg-transparent text-[#FEFAE0] border-2 border-[#FEFAE0]/80 hover:bg-[#FEFAE0]/10 font-sans font-bold text-base rounded-xl transition-all duration-300 cursor-pointer"
            >
              Explore Our Space
            </button>
          </div>
        </div>
      </section>

      {/* Visual Bullet Info/Hours Quick Access */}
      <section className="bg-[#FEFAE0]/40 py-6 border-b border-[#EBE6DD]">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left divide-y md:divide-y-0 md:divide-x divide-[#EBE6DD]">
          <div className="p-2 md:px-6">
            <h4 className="font-serif font-bold text-emerald-800 text-lg">Stop by and stay a while</h4>
            <p className="text-gray-600 text-sm mt-1">102 N Horton Pkwy, Chapel Hill, TN 37034</p>
          </div>
          <div className="p-2 md:px-6 pt-4 md:pt-2">
            <h4 className="font-serif font-bold text-emerald-800 text-lg">Morning pours & warm ovens</h4>
            <p className="text-gray-600 text-sm mt-1">Mon–Fri: 6:30 AM – 4PM &bull; Sat: 7AM – 3PM</p>
          </div>
          <div className="p-2 md:px-6 pt-4 md:pt-2">
            <h4 className="font-serif font-bold text-emerald-800 text-lg">Support Tennessee hands</h4>
            <p className="text-gray-600 text-sm mt-1">We serve only in custom, handmade pottery mugs made nearby.</p>
          </div>
        </div>
      </section>

      {/* Value Highlights Grid */}
      <section id="highlights-sec" className="py-20 px-4 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[#606C38] font-bold text-sm uppercase tracking-widest block mb-2">Our Core Promise</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#283618]">What Awaits You at South Arrow</h2>
          <p className="text-[#6C584C] mt-4">We believe a coffee shop should be more than just a quick drive-thru. It's the front porch of our southern community.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Card 1 */}
          <div className="bg-[#FCFBF7] p-8 rounded-2xl border border-[#EBE6DD] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#606C38]/10 rounded-xl flex items-center justify-center text-[#606C38] mb-6">
              <Wifi className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#283618] mb-3">Free Fiber Wi-Fi</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Power up your laptop or study with lightning-fast, high-speed fiber internet throughout our seating lounge.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#FCFBF7] p-8 rounded-2xl border border-[#EBE6DD] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#DDA15E]/10 rounded-xl flex items-center justify-center text-[#DDA15E] mb-6">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#283618] mb-3">Community Hub</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              From business meetings to high-school studying sessions, our tables are designed to nurture local connection.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#FCFBF7] p-8 rounded-2xl border border-[#EBE6DD] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#283618]/10 rounded-xl flex items-center justify-center text-[#283618] mb-6">
              <Coffee className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#283618] mb-3">Local Pottery Mugs</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Savor your hot beverages in beautiful clay mugs spun manually by Tennessee ceramic masters.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#FCFBF7] p-8 rounded-2xl border border-[#EBE6DD] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#E2DCD2] rounded-xl flex items-center justify-center text-stone-700 mb-6">
              <CupSoda className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-xl text-[#283618] mb-3">Cozy Lounge Areas</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Plush armchairs, beautiful natural wood features, and abundant sunlight to form your favorite corner.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Showcase with Text - Storytelling style */}
      <section className="bg-[#FCFBF7] border-y border-[#EBE6DD] py-20 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Photos Showcase Grid */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <img
                src={heroBg}
                alt="Cozy espresso pours"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Embedded Accent Card */}
            <div className="absolute -bottom-6 -right-6 md:right-8 bg-[#283618] text-[#FEFAE0] rounded-2xl p-6 shadow-2xl max-w-xs border border-[#606C38]/20">
              <span className="font-serif italic text-lg text-[#DDA15E] block mb-1">“A perfect gathering place.”</span>
              <p className="text-xs text-stone-300">Each month we display and sell handcrafted pottery to support local Tennessee visual artists.</p>
            </div>
          </div>

          {/* Text and Story block */}
          <div className="space-y-6">
            <span className="text-[#606C38] font-bold text-sm uppercase tracking-widest block">More Than A Grind</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#283618] tracking-tight leading-tight">
              Honoring Roots, Fostering Neighbors
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Nestled right in the heart of Chapel Hill on Horton Parkway, South Arrow Coffee Co. was founded on a simple belief: that premium, craft coffee and wholesome food have the unique power to unify families, friends, and coworkers. 
            </p>
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Our espresso is sourced ethically and roasted locally to pull smooth double-shots with rich, bold undertones. Whether you are stepping through our doors to fuel your commute with bacon gruyère egg bites or grabbing our legendary peach matcha to relax on the sofa, you are family here.
            </p>
            
            <div className="pt-4 flex flex-wrap gap-x-8 gap-y-4 text-[#283618] font-semibold text-sm">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#DDA15E]"></span> Handcrafted Milk Options
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#606C38]"></span> Local Pottery Collections
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-700"></span> Perfect High-Speed Wi-Fi
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => {
                  setActiveTab('menu');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-[#283618] hover:text-[#DDA15E] font-sans font-extrabold text-sm group"
                id="story-explore-cta"
              >
                Browse Our Menu Selection
                <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

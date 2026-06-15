/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, MessageSquareCode, CheckCircle2, User, Clock, AlertCircle } from 'lucide-react';
import { INITIAL_REVIEWS } from '../data';
import { Review } from '../types';

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [formOpen, setFormOpen] = useState(false);

  // Review Form state variables
  const [newName, setNewName] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newText, setNewText] = useState('');
  const [newSource, setNewSource] = useState<'Local Resident' | 'Visitor' | 'Regular'>('Local Resident');
  const [formError, setFormError] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) {
      setFormError('Please fill in both your name and feedback description.');
      return;
    }
    if (newText.length < 15) {
      setFormError('Feedback must be at least 15 characters long so other regulars can appreciate your story.');
      return;
    }

    const addedReview: Review = {
      id: `custom-rev-${Date.now()}`,
      name: newName,
      rating: newRating,
      text: newText,
      date: new Date().toISOString().split('T')[0],
      source: newSource,
    };

    setReviews([addedReview, ...reviews]);
    setNewName('');
    setNewText('');
    setNewRating(5);
    setFormError('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 5000);
    setFormOpen(false);
  };

  return (
    <div className="py-16 bg-[#FCFBF7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 max-w-6xl mx-auto">
          <div>
            <span className="text-[#606C38] font-bold text-xs uppercase tracking-widest block mb-1">
              Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#283618] tracking-tight">
              Community Stories
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl">
              Hear what our wonderful neighbors in Chapel Hill, regular remote workers, and traveling visitors are saying about their South Arrow comfort.
            </p>
          </div>

          <button
            onClick={() => setFormOpen(!formOpen)}
            id="write-review-toggle-btn"
            className="px-6 py-3.5 bg-[#283618] text-[#FEFAE0] hover:bg-[#606C38] font-sans font-bold text-sm rounded-xl shadow-md transition cursor-pointer shrink-0"
          >
            {formOpen ? 'Dismiss Feed Form' : 'Write A Review'}
          </button>
        </div>

        {/* --- Review Builder Box (Conditional Expand) --- */}
        {formOpen && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-[#EBE6DD] p-6 sm:p-8 shadow-md mb-12 animate-in slide-in-from-top-4 duration-300" id="adding-review-box">
            <h3 className="font-serif text-xl font-bold text-[#283618] mb-4">Share Your Experience</h3>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              
              {/* Star Rating Select */}
              <div className="space-y-1.5ClassName">
                <label className="text-xs font-bold text-gray-700 uppercase block">Your Star Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((stars) => (
                    <button
                      type="button"
                      key={stars}
                      onClick={() => setNewRating(stars)}
                      className="p-1 text-[#DDA15E] focus:outline-none cursor-pointer"
                    >
                      <Star className={`w-7 h-7 ${newRating >= stars ? 'fill-[#DDA15E]' : 'stroke-[#DDA15E]'}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Origin Source */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase block">Your Name</label>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-stone-500 bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-700 uppercase block">Relationship to Café</label>
                  <select
                    value={newSource}
                    onChange={(e: any) => setNewSource(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-stone-500 bg-white"
                  >
                    <option value="Local Resident">Chapel Hill Local</option>
                    <option value="Regular">Tennessee Regular</option>
                    <option value="Visitor">Out-of-Town Tourist</option>
                  </select>
                </div>
              </div>

              {/* Message text area */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-700 uppercase block">Feedback Message</label>
                <textarea
                  rows={4}
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Tell our baristas and other visitors what drink or food you loved! (at least 15 characters)"
                  className="w-full p-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-stone-500 bg-white"
                />
              </div>

              {formError && (
                <p className="text-red-700 text-xs font-bold flex items-center gap-1.5" id="review-error-box">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {formError}
                </p>
              )}

              <button
                type="submit"
                id="submit-review-action"
                className="w-full py-3 bg-[#606C38] text-white rounded-xl font-bold text-sm shadow hover:bg-emerald-900 transition cursor-pointer"
              >
                Publish Review
              </button>
            </form>
          </div>
        )}

        {/* Success toast popup */}
        {successMsg && (
          <div className="max-w-md mx-auto p-4 bg-emerald-800 text-[#FEFAE0] rounded-2xl mb-10 flex items-center gap-3 shadow-md animate-bounce" id="review-success-toast">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold">Successfully published your story! Look below to see it live.</span>
          </div>
        )}

        {/* Reviews Grid Display List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-card-${rev.id}`}
              className="bg-white rounded-2xl border border-[#EBE6DD] p-6 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Stars Row */}
                <div className="flex gap-1 mb-4 text-[#DDA15E]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < rev.rating ? 'fill-[#DDA15E]' : 'stroke-[#DDA15E]'}`}
                    />
                  ))}
                </div>

                {/* Content Message */}
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed italic mb-6">
                  “ {rev.text} ”
                </p>
              </div>

              {/* Review Author Foot */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between mt-auto">
                <div>
                  <h4 className="font-serif font-black text-xs text-[#283618]">
                    {rev.name}
                  </h4>
                  <span className="text-[9px] font-sans font-bold text-gray-400 block uppercase mt-0.5">
                    {rev.source}
                  </span>
                </div>
                <div className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

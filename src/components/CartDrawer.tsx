/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle, Flame, Coffee, Sparkles, Clock, MapPin } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

type OrderStage = 'pending' | 'grinding' | 'brewing' | 'bagging' | 'completed';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  const [checkoutState, setCheckoutState] = useState<'cart' | 'submitting' | 'progress'>('cart');
  const [currentStage, setCurrentStage] = useState<OrderStage>('pending');
  const [stageProgress, setStageProgress] = useState(0);
  const [customerName, setCustomerName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Math totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalItemPrice * item.quantity, 0);
  const taxRate = 0.0975; // Chapel Hill, TN Sales Tax (9.75%)
  const tax = subtotal * taxRate;
  const grandTotal = subtotal + tax;

  // Handles moving to automated simulation
  const handleStartCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      setErrorMessage('Please type your name so the Barista knows who to call!');
      return;
    }
    setErrorMessage('');
    setCheckoutState('submitting');

    // Simulate initial loading sequence
    setTimeout(() => {
      setCheckoutState('progress');
      setCurrentStage('grinding');
      setStageProgress(0);
    }, 1500);
  };

  // Automated stage transition timing loop
  useEffect(() => {
    if (checkoutState !== 'progress') return;

    let interval: any = null;
    interval = setInterval(() => {
      setStageProgress((prev) => {
        if (prev >= 100) {
          // Transition to next stage sequence
          if (currentStage === 'grinding') {
            setCurrentStage('brewing');
            return 0;
          } else if (currentStage === 'brewing') {
            setCurrentStage('bagging');
            return 0;
          } else if (currentStage === 'bagging') {
            setCurrentStage('completed');
            clearInterval(interval);
            return 100;
          }
          return 100;
        }
        return prev + 12; // speed of simulation steps
      });
    }, 700);

    return () => clearInterval(interval);
  }, [checkoutState, currentStage]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="cart-drawer-root">
      {/* Dark backdrop overlay */}
      <div
        onClick={checkoutState === 'progress' ? undefined : onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Main Drawer Panel sliding from right side */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-[#FCFBF7] shadow-2xl flex flex-col justify-between border-l border-[#EBE6DD] h-full focus:outline-none">
        
        {/* Drawer Header Area */}
        <div className="p-6 border-b border-[#EBE6DD] flex justify-between items-center bg-[#F4F3EE]">
          <h3 className="font-serif font-black text-xl text-[#283618] flex items-center gap-2">
            <ShoppingBag className="w-5.5 h-5.5 text-[#DDA15E]" />
            {checkoutState === 'progress' ? 'Order Progress' : 'Your Order Basket'}
          </h3>
          {checkoutState !== 'progress' && (
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-stone-200 rounded-full text-stone-500 hover:text-black transition cursor-pointer"
              id="close-cart-btn"
            >
              <X className="w-5.5 h-5.5" />
            </button>
          )}
        </div>

        {/* --- STATE 1: VIEWING BASKET ITEMS --- */}
        {checkoutState === 'cart' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-24" id="cart-empty-prompt">
                <span className="text-5xl block mb-4">☕</span>
                <p className="font-serif text-lg font-bold text-[#283618]">Your basket is currently empty.</p>
                <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">
                  Pop over to our menu and personalize your favorite southern latte or cinnamon roll!
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-6 py-2.5 bg-[#283618] text-[#FEFAE0] rounded-xl text-xs font-bold font-sans cursor-pointer"
                >
                  Start Ordering Now
                </button>
              </div>
            ) : (
              <>
                {/* Clear Cart Button */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{cartItems.length} items added</span>
                  <button
                    onClick={onClearCart}
                    className="text-xs text-red-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    id="clear-cart-all-btn"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Empty Basket
                  </button>
                </div>

                {/* Items loop */}
                <div className="space-y-3.5">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      id={`cart-row-item-${item.id}`}
                      className="bg-white rounded-2xl border border-[#EBE6DD] p-4 flex gap-3 shadow-xs justify-between"
                    >
                      {/* Thumbnail detail */}
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                        <img src={item.menuItem.image} alt={item.menuItem.name} className="w-full h-full object-cover" />
                      </div>

                      {/* Title + modification summaries */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-sm text-[#283618] truncate">
                          {item.menuItem.name}
                        </h4>
                        <div className="text-[10px] text-gray-500 space-y-0.5 mt-1 leading-normal capitalize">
                          {item.customization.temp && <span>Temp: {item.customization.temp}</span>}
                          {item.customization.milk && item.customization.milk !== 'none' && (
                            <span className="block">&bull; Milk: {item.customization.milk} choice</span>
                          )}
                          {item.customization.flavor && item.customization.flavor !== 'none' && (
                            <span className="block">&bull; Flavor: {item.customization.flavor.replace(/_/g, ' ')} syrup</span>
                          )}
                          {item.customization.sweetness && (
                            <span className="block">&bull; Sweetness: {item.customization.sweetness}</span>
                          )}
                          {item.customization.shots !== undefined && item.customization.shots > 0 && (
                            <span className="block text-emerald-800 font-bold">&bull; +{item.customization.shots} Espresso Shot(s)</span>
                          )}
                        </div>

                        {/* Price Calculations */}
                        <div className="text-[11px] font-bold text-[#6C584C] mt-2">
                          ${item.totalItemPrice.toFixed(2)} each
                        </div>
                      </div>

                      {/* Quantity counters and Delete column */}
                      <div className="flex flex-col justify-between items-end shrink-0">
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-stone-300 hover:text-red-700 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <div className="flex items-center gap-1.5 bg-stone-100 px-2 py-1 rounded-lg">
                          <button
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-stone-600 font-black text-xs hover:text-black w-4 text-center cursor-pointer"
                          >
                            -
                          </button>
                          <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="text-stone-600 font-black text-xs hover:text-black w-4 text-center cursor-pointer"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotals Panel */}
                <div className="bg-white border border-[#EBE6DD] rounded-2xl p-4 space-y-2 mt-6">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Items Subtotal:</span>
                    <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Sales Tax (9.75% Chapel Hill):</span>
                    <span className="font-semibold text-stone-900">${tax.toFixed(2)}</span>
                  </div>
                  <hr className="border-stone-100 my-1" />
                  <div className="flex justify-between items-center text-sm font-bold text-[#283618]">
                    <span>Grand Total:</span>
                    <span className="text-base">${grandTotal.toFixed(2)}</span>
                  </div>
                </div>

                {/* Simulated Checkout Form */}
                <form onSubmit={handleStartCheckout} className="mt-6 space-y-3 pt-4 border-t border-[#EBE6DD]">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-stone-700 block uppercase">Enter Your First Name (for Barista Callout)</label>
                    <input
                      type="text"
                      placeholder="e.g. Samantha or Jackson"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      id="checkout-customer-name"
                      className="w-full p-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none bg-white text-gray-800 focus:border-[#283618]"
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-red-700 text-xs font-bold leading-none">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    id="submit-checkout-btn"
                    className="w-full py-4 bg-[#283618] text-[#FEFAE0] rounded-xl font-bold text-sm tracking-wide shadow flex items-center justify-center gap-2 hover:bg-[#606C38] cursor-pointer"
                  >
                    Place Mock Order (${grandTotal.toFixed(2)}) <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-gray-400 text-center leading-normal">
                    *This is a simulation checkout! No actual bank details needed. Walk down to 102 N Horton Pkwy to pickup real orders!
                  </p>
                </form>
              </>
            )}
          </div>
        )}

        {/* --- STATE 2: SUBMITTING / CONNECTING --- */}
        {checkoutState === 'submitting' && (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center" id="cart-loading-state">
            <div className="w-16 h-16 border-4 border-[#DDA15E] border-t-transparent rounded-full animate-spin mb-6" />
            <h4 className="font-serif text-lg font-bold text-[#283618]">Dispatching To South Arrow Kitchen...</h4>
            <p className="text-xs text-gray-500 mt-2 max-w-xs leading-relaxed">
              Submitting order securely to our local Chapel Hill POS. Please do not close this drawer! Let's watch the baristas paint your cup.
            </p>
          </div>
        )}

        {/* --- STATE 3: INTERACTIVE ORDER PREPARING PREVIEW --- */}
        {checkoutState === 'progress' && (
          <div className="flex-1 flex flex-col justify-between p-6">
            
            {/* Top overview status */}
            <div className="bg-[#606C38]/10 border border-[#606C38]/20 rounded-2xl p-4 flex gap-3 text-[#283618] items-start mb-6">
              <Sparkles className="w-5 h-5 text-[#DDA15E] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-bold text-sm">Order In Assembly!</h5>
                <p className="text-xs text-[#6C584C] leading-normal mt-0.5">
                  Your customized coffee and bakes are being made right now for pickup under the name <strong className="text-[#283618]">{customerName}</strong>!
                </p>
              </div>
            </div>

            {/* Stages visualization block */}
            <div className="space-y-6 flex-1 py-4">
              
              {/* Stage 1: Grinding Beans */}
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  currentStage === 'grinding'
                    ? 'bg-[#283618] text-[#FEFAE0] ring-4 ring-[#DDA15E]/30'
                    : currentStage !== 'pending' && currentStage !== 'grinding'
                    ? 'bg-[#606C38] text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {currentStage !== 'grinding' && currentStage !== 'pending' ? '✓' : '1'}
                </div>
                <div className="flex-1">
                  <h6 className="font-serif font-black text-sm text-[#283618]">Grinding Handpicked Beans</h6>
                  <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                    Grinding our custom roasted espresso beans on premium flat burr grinders.
                  </p>
                  {currentStage === 'grinding' && (
                    <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#DDA15E] h-1.5 rounded-full transition-all" style={{ width: `${stageProgress}%` }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Stage 2: Brewing & Frothing */}
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  currentStage === 'brewing'
                    ? 'bg-[#283618] text-[#FEFAE0] ring-4 ring-[#DDA15E]/30'
                    : currentStage === 'bagging' || currentStage === 'completed'
                    ? 'bg-[#606C38] text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {currentStage === 'bagging' || currentStage === 'completed' ? '✓' : '2'}
                </div>
                <div className="flex-1">
                  <h6 className="font-serif font-black text-sm text-[#283618]">Brewing Espresso & Frothing Milk</h6>
                  <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                    Pulling rich double-shots and micro-foaming fresh alternative milk options meticulously.
                  </p>
                  {currentStage === 'brewing' && (
                    <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#DDA15E] h-1.5 rounded-full transition-all" style={{ width: `${stageProgress}%` }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Stage 3: Bagging items */}
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  currentStage === 'bagging'
                    ? 'bg-[#283618] text-[#FEFAE0] ring-4 ring-[#DDA15E]/30'
                    : currentStage === 'completed'
                    ? 'bg-[#606C38] text-white'
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  {currentStage === 'completed' ? '✓' : '3'}
                </div>
                <div className="flex-1">
                  <h6 className="font-serif font-black text-sm text-[#283618]">Warming Bakery & Bagging</h6>
                  <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                    Warming cinnamon rolls and assembly-packing with custom wooden pick-up labels.
                  </p>
                  {currentStage === 'bagging' && (
                    <div className="w-full bg-stone-200 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-[#DDA15E] h-1.5 rounded-full transition-all" style={{ width: `${stageProgress}%` }} />
                    </div>
                  )}
                </div>
              </div>

              {/* Stage 4: Order Completed! */}
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 font-bold text-xs ${
                  currentStage === 'completed'
                    ? 'bg-emerald-800 text-[#FEFAE0] ring-4 ring-[#FEFAE0]'
                    : 'bg-stone-200 text-stone-500'
                }`}>
                  🎯
                </div>
                <div className="flex-1">
                  <h6 className="font-serif font-black text-sm text-[#283618]">Ready on Bar Counter</h6>
                  <p className="text-xs text-gray-500 mt-0.5 leading-normal">
                    Cup has been stickered under <strong className="text-emerald-800">"{customerName}"</strong>! Free to pick up.
                  </p>
                </div>
              </div>

            </div>

            {/* Bottom Actions of Tracker */}
            <div className="space-y-4 pt-6 mt-6 border-t border-stone-200">
              {currentStage === 'completed' ? (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-emerald-800 text-white rounded-2xl space-y-1 animate-bounce" id="checkout-completed-toast">
                    <CheckCircle className="w-6 h-6 mx-auto mb-1 text-[#FEFAE0]" />
                    <h5 className="font-serif font-black text-sm">Perfect! Pickup ready!</h5>
                    <p className="text-[10px] text-stone-200 leading-normal">
                      Your order is finalized! Grab your customized latte and baked treats at South Arrow in Chapel Hill.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClearCart();
                      setCheckoutState('cart');
                      setCurrentStage('pending');
                      setCustomerName('');
                      onClose();
                    }}
                    id="finish-checkout-restart-btn"
                    className="w-full py-4 bg-[#283618] text-[#FEFAE0] rounded-xl font-bold text-sm tracking-wide hover:bg-[#606C38]"
                  >
                    Close & Finish Simulation
                  </button>
                </div>
              ) : (
                <div className="text-center text-xs text-gray-500 font-mono flex items-center gap-1.5 justify-center">
                  <Clock className="w-3.5 h-3.5 animate-spin" /> Simulating crafting moments. Hold tight!
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

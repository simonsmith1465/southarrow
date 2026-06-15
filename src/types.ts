/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'coffee' | 'tea' | 'bakery' | 'lunch_breakfast';
  tag?: string; // e.g., "Signature", "Seasonal", "Vegan", "GF"
  isGlutenFree?: boolean;
  isVegan?: boolean;
  isPopular?: boolean;
  image: string;
}

export interface CustomizationOptions {
  milk?: 'whole' | 'oat' | 'almond' | 'coconut' | 'none';
  sweetness?: 'none' | 'low' | 'medium' | 'extra';
  flavor?: 'none' | 'vanilla' | 'caramel' | 'lavender' | 'sugar_free_vanilla';
  shots?: number;
  temp?: 'hot' | 'iced';
}

export interface CartItem {
  id: string; // unique cart line item ID (combines menuItem.id + stringified customizations)
  menuItem: MenuItem;
  quantity: number;
  customization: CustomizationOptions;
  totalItemPrice: number;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  source: 'Local Resident' | 'Visitor' | 'Regular';
}

export interface GalleryItem {
  id: string;
  title: string;
  description: string;
  category: 'interior' | 'beverages' | 'bakery' | 'dishes';
  image: string;
}

export type ActiveTab = 'home' | 'menu' | 'gallery' | 'reviews' | 'contact' | 'order-now';

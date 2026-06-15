/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review, GalleryItem } from './types';

// Import the high-quality assets we generated
import heroBg from './assets/images/south_arrow_hero_bg_1781535881075.jpg';
import interiorBg from './assets/images/south_arrow_interior_1781535894930.jpg';
import latteBg from './assets/images/south_arrow_latte_1781535905861.jpg';
import pastriesBg from './assets/images/south_arrow_pastries_1781535918879.jpg';
import foodBg from './assets/images/south_arrow_food_1781535931952.jpg';

export { heroBg, interiorBg, latteBg, pastriesBg, foodBg };

export const MENU_ITEMS: MenuItem[] = [
  // --- Coffee and Espresso ---
  {
    id: 'lavender-honey-latte',
    name: 'Lavender Honey Latte',
    description: 'Double shot of our rich artisan espresso with creamy milk, localized organic honey, and a touch of organic lavender syrup. A floral, sweet masterpiece.',
    price: 5.25,
    category: 'coffee',
    tag: 'Signature',
    isPopular: true,
    image: latteBg
  },
  {
    id: 'south-arrow-maple-spice',
    name: 'South Arrow Maple Spice',
    description: 'A rich double espresso blended with organic pure maple syrup, a pinch of cinnamon, nutmeg, and steaming milk. Comfort in a cup.',
    price: 5.50,
    category: 'coffee',
    tag: 'Seasonal',
    image: latteBg
  },
  {
    id: 'southern-pecan-nitro',
    name: 'Southern Pecan Nitro Cold Brew',
    description: 'Our slow-steeped bold nitro cold brew infused with local toasted pecan essence, served velvety cold with dense foaming head.',
    price: 5.00,
    category: 'coffee',
    tag: 'Cold Brew',
    isPopular: true,
    image: latteBg
  },
  {
    id: 'classic-double-espresso',
    name: 'Handcrafted Double Espresso',
    description: 'Two shots of our signature medium-dark southern blend roast. Bright acidity, velvety crema, notes of dark chocolate and citrus.',
    price: 3.25,
    category: 'coffee',
    image: latteBg
  },
  {
    id: 'vanilla-bean-cappuccino',
    name: 'Vanilla Bean Cappuccino',
    description: 'Equal parts hand-pulled espresso, velvety milk, and luxurious microfoam, sweetened with fresh scraped vanilla bean reduction.',
    price: 4.75,
    category: 'coffee',
    image: latteBg
  },

  // --- Matcha and Teas ---
  {
    id: 'organic-peach-matcha',
    name: 'Organic Peach Matcha Latte',
    description: 'Ceremonial grade pure Uji matcha whisked to order, paired with cold oat milk and sweet organic southern peach purée.',
    price: 5.75,
    category: 'tea',
    tag: 'Trending',
    isPopular: true,
    image: latteBg
  },
  {
    id: 'maple-oat-matcha',
    name: 'Maple Oat Matcha Latte',
    description: 'Warm organic ceremonial matcha layered over creamy steamed oat milk and sweetened with premium pure maple syrup.',
    price: 5.75,
    category: 'tea',
    tag: 'Vegan',
    isVegan: true,
    image: latteBg
  },
  {
    id: 'sweet-chapel-earl-grey',
    name: 'Chapel Earl Grey Fog',
    description: 'Bold organic Earl Grey tea steeped with lavender petals, local honey, vanilla bean, and finished with thick microfoam.',
    price: 4.50,
    category: 'tea',
    image: latteBg
  },

  // --- Fresh Bakery ---
  {
    id: 'giant-cinnamon-roll',
    name: 'House-Baked Giant Cinnamon Roll',
    description: 'Our famous sweet-yeast dough rolled with cinnamon brown sugar, baked to a perfect golden brown, and smothered in warm dripping cream cheese glaze.',
    price: 4.95,
    category: 'bakery',
    tag: 'Must Try',
    isPopular: true,
    image: pastriesBg
  },
  {
    id: 'blueberry-crumble-muffin',
    name: 'Blueberry Oat Crumble Muffin',
    description: 'Fluffy local-flour muffin packed with plump wild blueberries and completed with a toasted cinnamon oat streusel top.',
    price: 3.75,
    category: 'bakery',
    tag: 'Baked Fresh',
    image: pastriesBg
  },
  {
    id: 'raspberry-almond-scone',
    name: 'Raspberry Cream Almond Scone',
    description: 'Tender, butter-layered scone loaded with tart raspberries and premium sliced almonds, dusted with a shimmering sugar glaze.',
    price: 3.95,
    category: 'bakery',
    image: pastriesBg
  },

  // --- Breakfast & Lunch ---
  {
    id: 'bacon-gruyere-egg-bites',
    name: 'Smoky Bacon & Gruyere Egg Bites',
    description: 'Fluffy cage-free eggs cooked sous-vide with premium hardwood smoked bacon, aged Swiss-Gruyere cheese, and French sea salt.',
    price: 5.25,
    category: 'lunch_breakfast',
    tag: 'Gluten-Free',
    isGlutenFree: true,
    image: foodBg
  },
  {
    id: 'garden-veggie-egg-bites',
    name: 'Garden Veggie & Feta Egg Bites',
    description: 'Two fluffy egg white bites baked with fresh spinach, sun-dried tomatoes, diced sweet peppers, and feta cheese. Nutritious and savory.',
    price: 4.95,
    category: 'lunch_breakfast',
    tag: 'V & GF',
    isGlutenFree: true,
    image: foodBg
  },
  {
    id: 'bacon-grilled-cheese',
    name: 'Artisan Bacon Grilled Cheese',
    description: 'Gourmet thick-cut rustic sourdough loaded with smoky bacon, melted local sharp cheddar, cream cheese, and a spread of sweet tomato pepper jam.',
    price: 8.95,
    category: 'lunch_breakfast',
    tag: 'Lunch Fave',
    isPopular: true,
    image: foodBg
  },
  {
    id: 'chicken-salad-croissant',
    name: 'Southern Chicken Salad Croissant',
    description: 'Our house-made roasted chicken breast salad with local pecans, diced apples, and celery, served on a warm buttery flaky croissant with crisp romaine.',
    price: 9.50,
    category: 'lunch_breakfast',
    image: foodBg
  },
];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Sarah Lafayette',
    rating: 5,
    text: "The best lavender honey latte I've ever had in my life! You can really taste the local craftsmanship, and those giant cinnamon rolls are absolute heaven. The small-town cozy vibe is exactly what Chapel Hill needed. Outstanding service!",
    date: '2026-06-10',
    source: 'Local Resident',
  },
  {
    id: 'rev-2',
    name: 'Michael Kinter',
    rating: 5,
    text: "A true Tennessee gem. The atmosphere is relaxing, the internet is lightning-fast for working remote, and the coffee serves in beautiful locally made pottery mugs. I stop by almost every morning for their smoky bacon grilled cheese!",
    date: '2026-06-03',
    source: 'Regular',
  },
  {
    id: 'rev-3',
    name: 'Amanda Taylor',
    rating: 5,
    text: "While passing through Rutherford/Marshall counties, we stumbled across this incredible coffee shop. The staff greeted us like old friends. The peach matcha latte with oat milk is brilliant, and the café is decorated so tastefully with lush plants.",
    date: '2026-05-28',
    source: 'Visitor',
  },
  {
    id: 'rev-4',
    name: 'Deacon Vance',
    rating: 5,
    text: "South Arrow has the most welcoming baristas around. Comfortable leather couches, plenty of outlets, great community environment. If you haven't tried the pecan nitro cold brew or the Bacon Gruyere egg bites, you are completely missing out!",
    date: '2026-05-15',
    source: 'Local Resident',
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Signature Latte Art',
    description: 'Each pour is uniquely crafted using locally sourced ingredients and served in standard pottery mugs of Chapel Hill.',
    category: 'beverages',
    image: latteBg,
  },
  {
    id: 'gal-2',
    title: 'Cozy Fireplace Lounge',
    description: 'Our comfortable couches and rustic-modern atmosphere let you relax with family or read a great book.',
    category: 'interior',
    image: interiorBg,
  },
  {
    id: 'gal-3',
    title: 'House-Baked Cinnamon Rolls',
    description: 'Fluffy layers, warm cinnamon spice, and glistening cream cheese frosting baked fresh every single morning.',
    category: 'bakery',
    image: pastriesBg,
  },
  {
    id: 'gal-4',
    title: 'Tennessee Bacon Grilled Cheese',
    description: 'Crisp, smoky, loaded with premium cheese, and griddled on rustic artisan sourdough sourdough sourdough.',
    category: 'dishes',
    image: foodBg,
  },
  {
    id: 'gal-5',
    title: 'The Communal Library Wall',
    description: 'Browse through our shelves of novels, board games, and local community notices in our seating area.',
    category: 'interior',
    image: interiorBg,
  },
  {
    id: 'gal-6',
    title: 'Southern Pecan & Matcha',
    description: 'Dazzling dual layers of ceremonial green matcha whisked meticulously alongside our pecan cold brew.',
    category: 'beverages',
    image: latteBg,
  },
];

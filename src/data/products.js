export const products = [
  {
    id: 'prod-01',
    name: 'Celestial Dew Hyaluronic Acid Serum',
    category: 'skincare',
    brand: 'Aura Botanicals',
    price: 1499.00,
    originalPrice: 1899.00,
    rating: 4.9,
    reviewCount: 328,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: true,
    stock: 45,
    skinType: ['All Skin Types', 'Dry', 'Sensitive'],
    vegan: true,
    crueltyFree: true,
    description: 'An ultra-hydrating elixir packed with multi-molecular weight hyaluronic acid and damask rose extract to plump fine lines and restore radiant skin barrier.',
    shortDescription: 'Deep hydration serum with multi-weight Hyaluronic Acid & Rosewater.',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597259-a97795baf2a7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Aqua/Water, Rosa Damascena Flower Water, Sodium Hyaluronate, Niacinamide, Glycerin, Panthenol, Phenoxyethanol, Ethylhexylglycerin.',
    howToUse: 'Apply 3-4 drops to cleansed, moist skin morning and night. Press gently into face and neck before applying moisturizer.',
    volume: '30 ml / 1.0 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Praveen.', rating: 5, date: '2026-06-12', title: 'Absolute Holy Grail!', comment: 'My dry skin literally drank this up. Gives the most luminous glass-skin glow without feeling tacky.' },
      { id: 2, author: 'Suriya.', rating: 5, date: '2026-05-28', title: 'Plumps in seconds', comment: 'Saw immediate hydration results. Fine lines around my eyes look noticeably softened after two weeks.' }
    ]
  },
  {
    id: 'prod-02',
    name: 'Velvet Velvet Matte Liquid Lipstick',
    category: 'makeup',
    brand: 'Lumière Velvet',
    price: 999.00,
    originalPrice: 1299.00,
    rating: 4.8,
    reviewCount: 215,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: false,
    stock: 60,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Weightless, 16-hour long-wear matte liquid lipstick infused with nourishing Vitamin E and Jojoba Oil for plush, smudge-proof color.',
    shortDescription: '16H transfer-proof velvet liquid lipstick with hydrating Vitamin E.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=800&auto=format&fit=crop'
    ],
    shades: [
      { name: 'Rose Cashmere', hex: '#B85B6C' },
      { name: 'Velvet Mulberry', hex: '#6B2B38' },
      { name: 'Golden Nude', hex: '#C2856E' },
      { name: 'Crimson Muse', hex: '#9E1B29' },
      { name: 'Dusty Peony', hex: '#D6898F' }
    ],
    ingredients: 'Isododecane, Dimethicone, Trimethylsiloxysilicate, Tocopheryl Acetate (Vitamin E), Simmondsia Chinensis (Jojoba) Seed Oil, Titanium Dioxide, Iron Oxides.',
    howToUse: 'Define lips with applicator tip, then fill in color with single swipe. Allow 60 seconds to set into transfer-resistant matte finish.',
    volume: '5.5 ml',
    reviewsList: [
      { id: 1, author: 'Jessica K.', rating: 5, date: '2026-07-01', title: 'Does not dry out lips!', comment: 'Usually matte liquid lipsticks make my lips crack, but this formula feels like silk.' }
    ]
  },
  {
    id: 'prod-03',
    name: 'Rose Gold Radiance Niacinamide Oil',
    category: 'skincare',
    brand: 'Nectar & Rose',
    price: 1899.00,
    originalPrice: 2299.00,
    rating: 4.7,
    reviewCount: 142,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 22,
    skinType: ['Combination', 'Oily', 'Normal'],
    vegan: true,
    crueltyFree: true,
    description: 'A lightweight facial elixir infused with 10% Niacinamide and 24K pure gold flakes to balance sebum production and refine pores.',
    shortDescription: 'Gold-infused facial oil targeting enlarged pores & dull skin tone.',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Caprylic/Capric Triglyceride, Niacinamide, Squalane, Rosa Canina Fruit Oil, Gold 24K, Tocopherol, Natural Rose Aroma.',
    howToUse: 'Dispense 2-3 drops into palms, warm up between hands, and gently press over face as the final step in night regimen.',
    volume: '30 ml',
    reviewsList: [
      { id: 1, author: 'Amara P.', rating: 5, date: '2026-06-20', title: 'Gives the healthiest glow!', comment: 'My pores look smaller and my skin feels balanced throughout the humid summer days.' }
    ]
  },
  {
    id: 'prod-04',
    name: 'Luminous Glow Silk Foundation',
    category: 'makeup',
    brand: 'Lumière Velvet',
    price: 1599.00,
    originalPrice: 1899.00,
    rating: 4.9,
    reviewCount: 412,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: false,
    stock: 50,
    skinType: ['All Skin Types', 'Normal', 'Dry'],
    vegan: true,
    crueltyFree: true,
    description: 'Buildable medium-to-full coverage silk fluid foundation with SPF 25 protection and real crushed pearl pigments.',
    shortDescription: 'Buildable medium coverage radiant foundation with SPF 25.',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop'
    ],
    shades: [
      { name: '100 Fair Vanilla', hex: '#F7E7DB' },
      { name: '140 Light Beige', hex: '#F0D5C3' },
      { name: '210 Warm Sand', hex: '#E3BEA6' },
      { name: '320 Golden Honey', hex: '#C6936E' },
      { name: '410 Deep Chestnut', hex: '#875236' }
    ],
    ingredients: 'Water, Cyclopentasiloxane, Titanium Dioxide, Ethylhexyl Methoxycinnamate, Pearl Powder, Glycerin, Dimethicone, Mica.',
    howToUse: 'Shake well before use. Blend 1-2 pumps onto skin using a foundation brush or damp sponge starting from the center of face outward.',
    volume: '30 ml',
    reviewsList: [
      { id: 1, author: 'Hannah B.', rating: 5, date: '2026-06-18', title: 'Second skin finish', comment: 'Matches my undertone perfectly and looks like actual radiant healthy skin!' }
    ]
  },
  {
    id: 'prod-05',
    name: 'Botanical Repair Argan Hair Serum',
    category: 'haircare',
    brand: 'Aura Botanicals',
    price: 1299.00,
    originalPrice: 1599.00,
    rating: 4.8,
    reviewCount: 189,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: false,
    stock: 35,
    skinType: ['All Hair Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Cold-pressed organic Argan oil infused with Camellia seed and Keratin peptide to seal split ends, eliminate frizz, and heat protect up to 450°F.',
    shortDescription: 'Heat-protecting & frizz-taming organic Argan oil serum.',
    images: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Argania Spinosa Kernel Oil, Camellia Japonica Seed Oil, Hydrolyzed Keratin, Cyclopentasiloxane, Fragrance (Parfum).',
    howToUse: 'Rub 1-2 pumps between palms and apply to damp or dry hair from mid-lengths to ends. Do not rinse.',
    volume: '100 ml / 3.4 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Rachel T.', rating: 5, date: '2026-05-14', title: 'Saved my bleached hair', comment: 'Instant shine without making my fine hair greasy or weighed down.' }
    ]
  },
  {
    id: 'prod-06',
    name: 'Midnight Bloom Eau de Parfum',
    category: 'fragrance',
    brand: 'Celestial Glow',
    price: 2999.00,
    originalPrice: 3499.00,
    rating: 5.0,
    reviewCount: 94,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 18,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'An intoxicating evening fragrance opening with Black Cherry and Damask Rose, deepening into Cashmere Wood and Warm Vanilla Bean.',
    shortDescription: 'Sensual oriental floral perfume with Black Cherry & Warm Vanilla.',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Alcohol Denat., Fragrance (Parfum), Aqua, Benzyl Salicylate, Linalool, Hydroxycitronellal, Limonene.',
    howToUse: 'Spritz on pulse points (wrists, neck, inner elbows) from 6 inches away. Do not rub wrists together.',
    volume: '50 ml / 1.7 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Victoria R.', rating: 5, date: '2026-07-10', title: 'Endless compliments!', comment: 'Lasts all night on my clothes. Mysterious, sophisticated, and deeply romantic.' }
    ]
  },
  {
    id: 'prod-07',
    name: 'Whipped Shea & Marula Body Butter',
    category: 'bodycare',
    brand: 'Pure Radiance',
    price: 1199.00,
    originalPrice: 1499.00,
    rating: 4.8,
    reviewCount: 167,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: false,
    stock: 40,
    skinType: ['Dry', 'Sensitive', 'Normal'],
    vegan: true,
    crueltyFree: true,
    description: 'Rich, cloud-like ultra-hydrating body cream whipped with raw African Shea Butter, Marula Oil, and Vanilla Orchid extract.',
    shortDescription: 'Decadent 48-hour moisture body cream with raw Shea & Marula oil.',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Butyrospermum Parkii (Shea) Butter, Sclerocarya Birrea (Marula) Seed Oil, Glycerin, Cetearyl Alcohol, Vanilla Planifolia Fruit Extract.',
    howToUse: 'Massage generously onto clean, warm skin after bath or shower, focusing on elbows, knees, and dry areas.',
    volume: '200 g / 7.0 oz.',
    reviewsList: [
      { id: 1, author: 'Chloe M.', rating: 5, date: '2026-06-25', title: 'Smells like heavenly vanilla dessert!', comment: 'Melts instantly into skin. My dry legs stayed smooth all day long.' }
    ]
  },
  {
    id: 'prod-08',
    name: 'Sculpting Rose Quartz Gua Sha & Jade Roller Set',
    category: 'accessories',
    brand: 'Aura Botanicals',
    price: 899.00,
    originalPrice: 1199.00,
    rating: 4.9,
    reviewCount: 280,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: true,
    stock: 55,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Hand-carved 100% natural Grade-A Brazilian Rose Quartz facial tools designed to encourage lymphatic drainage and contour facial features.',
    shortDescription: '100% Brazilian Rose Quartz lymphatic facial massage set.',
    images: [
      'https://images.unsplash.com/photo-1512290900673-7002fa8e79c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597259-a97795baf2a7?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: '100% Natural Genuine Rose Quartz Crystal, Zinc Alloy Frame.',
    howToUse: 'Apply face oil first. Glide Gua Sha tool in outward upward motions along cheekbones, jawline, and forehead. Use roller under eyes.',
    volume: 'Set of 2 Tools',
    reviewsList: [
      { id: 1, author: 'Samantha W.', rating: 5, date: '2026-07-04', title: 'So cooling and depuffing', comment: 'I keep mine in the skincare fridge. Perfect morning wake-up ritual for puffy cheeks.' }
    ]
  },
  {
    id: 'prod-09',
    name: 'Glazed Berry Antioxidant Lip Gloss',
    category: 'makeup',
    brand: 'Nectar & Rose',
    price: 799.00,
    originalPrice: 999.00,
    rating: 4.6,
    reviewCount: 115,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 65,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'High-shine non-sticky lip oil-gloss hybrid packed with Cranberry Seed Oil and Vitamin C for juicy glass lips.',
    shortDescription: 'Glass-shine lip oil gloss with antioxidant Berry extracts.',
    images: [
      'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop'
    ],
    shades: [
      { name: 'Crystal Clear', hex: '#FFFFFF' },
      { name: 'Honey Glaze', hex: '#E8A370' },
      { name: 'Berry Sorbet', hex: '#C23B5A' },
      { name: 'Plum Shine', hex: '#7D2342' }
    ],
    ingredients: 'Polybutene, Vaccinium Macrocarpon (Cranberry) Seed Oil, Tetrahexyldecyl Ascorbate (Vitamin C), Flavor, Tocopheryl Acetate.',
    howToUse: 'Swipe over bare lips for a hydrating tint or layer over liquid lipstick for multi-dimensional glossy shine.',
    volume: '7.0 ml',
    reviewsList: [
      { id: 1, author: 'Mia L.', rating: 5, date: '2026-06-15', title: 'Not sticky at all!', comment: 'Feels like a cushiony lip treatment. Love the Berry Sorbet shade!' }
    ]
  },
  {
    id: 'prod-10',
    name: 'Overnight Rejuvenating Retinol Cream',
    category: 'skincare',
    brand: 'Pure Radiance',
    price: 2199.00,
    originalPrice: 2699.00,
    rating: 4.9,
    reviewCount: 304,
    isBestSeller: true,
    isTrending: false,
    isNewArrival: false,
    isFlashSale: false,
    stock: 28,
    skinType: ['All Skin Types', 'Dry', 'Normal'],
    vegan: true,
    crueltyFree: true,
    description: 'Encapsulated 0.3% Pure Retinol combined with Bakuchiol and Ceramide NP to target wrinkles without causing redness or irritation.',
    shortDescription: 'Time-release 0.3% Retinol night repair cream with Ceramides.',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Water, Caprylic/Capric Triglyceride, Retinol, Bakuchiol, Ceramide NP, Squalane, Niacinamide, Sodium Hyaluronate.',
    howToUse: 'Use 2-3 times per week initially, building up to nightly. Apply pea-sized amount over face after cleansing.',
    volume: '50 ml / 1.7 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Karen B.', rating: 5, date: '2026-05-19', title: 'Gentle yet effective', comment: 'Zero peeling or redness! Smoothed out my texture after 3 weeks.' }
    ]
  },
  {
    id: 'prod-11',
    name: 'Silk Pillowcase & Eye Mask Sleep Set',
    category: 'accessories',
    brand: 'Lumière Velvet',
    price: 1799.00,
    originalPrice: 2199.00,
    rating: 4.9,
    reviewCount: 156,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 30,
    skinType: ['All Skin Types'],
    vegan: false,
    crueltyFree: true,
    description: '100% Pure 22 Momme Mulberry Silk pillowcase and cushioned contoured sleep mask to prevent sleep creases and hair breakage.',
    shortDescription: '100% 22-Momme Pure Mulberry Silk beauty sleep set.',
    images: [
      'https://images.unsplash.com/photo-1512290900673-7002fa8e79c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: '100% Pure Grade 6A 22 Momme Mulberry Silk.',
    howToUse: 'Machine wash delicate cycle in mesh laundry bag with cold water and gentle detergent. Air dry flat.',
    volume: 'Standard Pillowcase (20" x 26") + Eye Mask',
    reviewsList: [
      { id: 1, author: 'Camilla F.', rating: 5, date: '2026-06-30', title: 'My hair wakes up frizz-free!', comment: 'Game changer for hair and skin. Feels so luxurious to sleep on.' }
    ]
  },
  {
    id: 'prod-12',
    name: 'Golden Hour Shimmering Body Oil',
    category: 'bodycare',
    brand: 'Celestial Glow',
    price: 1399.00,
    originalPrice: 1699.00,
    rating: 4.7,
    reviewCount: 98,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: false,
    isFlashSale: false,
    stock: 40,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Dry body oil with mineral mica particles that coat collarbones, arms, and legs in a sun-kissed bronzed shimmer with Coconut-Tiaré scent.',
    shortDescription: 'Illuminating dry body oil with bronzed gold shimmer.',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Helianthus Annuus (Sunflower) Seed Oil, Mica, Silica, Fragrance, Tocopherol, Titanium Dioxide, Iron Oxides.',
    howToUse: 'Shake bottle vigorously to distribute mica. Spray onto limbs and blend in using hands or body brush for a luminous glow.',
    volume: '100 ml',
    reviewsList: [
      { id: 1, author: 'Zoe D.', rating: 5, date: '2026-07-08', title: 'Stunning beach glow', comment: 'Not greasy at all and absorbs super fast. Gives the prettiest golden shimmer.' }
    ]
  },
  {
    id: 'prod-13',
    name: 'Rosemary & Peptide Scalp Revitalizing Treatment',
    category: 'haircare',
    brand: 'Aura Botanicals',
    price: 1399.00,
    originalPrice: 1699.00,
    rating: 4.9,
    reviewCount: 145,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 40,
    skinType: ['All Hair Types', 'Oily', 'Normal'],
    vegan: true,
    crueltyFree: true,
    description: 'Concentrated scalp serum formulated with organic Rosemary extract, Copper Tripeptide-1, and Biotin to stimulate follicles and reduce hair fall.',
    shortDescription: 'Follicle-stimulating scalp serum with Rosemary Oil & Copper Peptides.',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Rosmarinus Officinalis (Rosemary) Leaf Oil, Copper Tripeptide-1, Biotin, Caffeine, Glycerin, Water.',
    howToUse: 'Part hair into sections and apply 1-2 pipettes directly to scalp. Massage thoroughly. Use daily on dry or towel-dried hair.',
    volume: '60 ml / 2.0 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Ananya S.', rating: 5, date: '2026-07-15', title: 'Visible hair growth!', comment: 'Noticeable baby hairs along my hairline after 3 weeks of daily use. Smells amazingly fresh.' }
    ]
  },
  {
    id: 'prod-14',
    name: 'Silk Protein Hydrating Deep Hair Mask',
    category: 'haircare',
    brand: 'Pure Radiance',
    price: 1499.00,
    originalPrice: 1799.00,
    rating: 4.8,
    reviewCount: 92,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 30,
    skinType: ['Dry', 'Damaged', 'All Hair Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Intensive conditioning hair mask enriched with Hydrolyzed Silk, Murumuru Butter, and Coconut Milk to restore softness to over-processed hair.',
    shortDescription: 'Deep moisturizing hair treatment mask with Hydrolyzed Silk & Murumuru Butter.',
    images: [
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Aqua, Astrocaryum Murumuru Seed Butter, Hydrolyzed Silk Protein, Cocos Nucifera (Coconut) Fruit Extract, Cetearyl Alcohol, Behentrimonium Chloride.',
    howToUse: 'Apply generously from mid-lengths to ends after shampooing. Leave on for 5-10 minutes, then rinse thoroughly with cool water.',
    volume: '250 g / 8.8 oz.',
    reviewsList: [
      { id: 1, author: 'Pooja M.', rating: 5, date: '2026-07-18', title: 'Salon-like softness', comment: 'Transformed my dry bleached strands into silky liquid gold. Worth every penny!' }
    ]
  },
  {
    id: 'prod-15',
    name: 'Keratin Clarifying & Detoxifying Shampoo',
    category: 'haircare',
    brand: 'Lumière Velvet',
    price: 1199.00,
    originalPrice: 1499.00,
    rating: 4.7,
    reviewCount: 78,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: false,
    stock: 50,
    skinType: ['All Hair Types', 'Oily'],
    vegan: true,
    crueltyFree: true,
    description: 'Sulfate-free detoxifying shampoo infused with Activated Charcoal and Botanical Keratin to gently melt away product buildup without stripping moisture.',
    shortDescription: 'Sulfate-free scalp detox shampoo with Charcoal & Keratin.',
    images: [
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Water (Aqua), Sodium Lauroyl Methyl Isethionate, Activated Charcoal Powder, Hydrolyzed Wheat Protein (Botanical Keratin), Aloe Barbadensis Leaf Juice.',
    howToUse: 'Lather a nickel-sized amount into wet hair and massage into scalp. Rinse thoroughly. Use 1-2 times weekly.',
    volume: '300 ml / 10.1 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Dev K.', rating: 5, date: '2026-07-20', title: 'Clean scalp feeling!', comment: 'Removes all dry shampoo buildup without leaving my hair feeling like straw.' }
    ]
  },
  {
    id: 'prod-16',
    name: 'Velvet Iris & Golden Amber Parfum',
    category: 'fragrance',
    brand: 'Celestial Glow',
    price: 3299.00,
    originalPrice: 3799.00,
    rating: 4.9,
    reviewCount: 112,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 25,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'A warm, regal perfume with top notes of Italian Bergamot and Tuscan Iris, heart notes of Warm Amber, and a base of Santal and Soft Musk.',
    shortDescription: 'Luxurious amber floral perfume with Tuscan Iris & Santal.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Alcohol Denat., Fragrance (Parfum), Aqua, Alpha-Isomethyl Ionone, Coumarin, Limonene, Linalool.',
    howToUse: 'Apply to wrists, collarbones, and pulse points. Reapply as desired throughout the day.',
    volume: '50 ml / 1.7 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Meera N.', rating: 5, date: '2026-07-22', title: 'Captivating fragrance', comment: 'Sophisticated, elegant, and warm. Lasts easily over 10 hours.' }
    ]
  },
  {
    id: 'prod-17',
    name: 'Sunkissed Neroli & Citrus Blossom Eau de Toilette',
    category: 'fragrance',
    brand: 'Nectar & Rose',
    price: 2499.00,
    originalPrice: 2899.00,
    rating: 4.8,
    reviewCount: 86,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 35,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'An uplifting crisp citrus fragrance capturing Mediterranean sunlit orange blossoms, crushed Petitgrain, and fresh Vetiver.',
    shortDescription: 'Refreshing sparkling citrus scent with Mediterranean Neroli & Vetiver.',
    images: [
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Alcohol Denat., Water/Aqua, Fragrance (Parfum), Citrus Aurantium Dulcis (Orange) Peel Oil, Linalool, Citral, Geraniol.',
    howToUse: 'Spray generously over hair and skin for a fresh burst of summer aroma.',
    volume: '100 ml / 3.4 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Rohan P.', rating: 5, date: '2026-07-24', title: 'Summer in a bottle!', comment: 'So refreshing and light. Great for hot days and everyday wear.' }
    ]
  },
  {
    id: 'prod-18',
    name: 'Oud Royale & Smoked Cardamom Eau de Parfum',
    category: 'fragrance',
    brand: 'Lumière Velvet',
    price: 3499.00,
    originalPrice: 3999.00,
    rating: 5.0,
    reviewCount: 64,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 20,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'An opulent unisex fragrance featuring rare Cambodian Oud, Smoked Cardamom, Pink Pepper, and rich Leather accord.',
    shortDescription: 'Opulent oriental woody perfume with Cambodian Oud & Smoked Cardamom.',
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Alcohol Denat., Fragrance (Parfum), Aqua, Eugenol, Isoeugenol, Farnesol, Benzyl Benzoate.',
    howToUse: 'Spritz onto pulse points for a long-lasting, mysterious fragrance profile.',
    volume: '50 ml / 1.7 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Karan G.', rating: 5, date: '2026-07-26', title: 'Rich and seductive', comment: 'Smoky, spicy, and deep. I get asked what perfume I am wearing everywhere I go!' }
    ]
  },
  {
    id: 'prod-19',
    name: 'Triple Ceramide Barrier Repair Hydrating Cleanser',
    category: 'skincare',
    brand: 'Aura Botanicals',
    price: 1099.00,
    originalPrice: 1399.00,
    rating: 4.9,
    reviewCount: 168,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 50,
    skinType: ['All Skin Types', 'Sensitive', 'Dry'],
    vegan: true,
    crueltyFree: true,
    description: 'Gentle non-foaming cream cleanser loaded with Ceramides NP/AP/EOP and Oat Beta-Glucan to wash away impurities while supporting the natural moisture barrier.',
    shortDescription: 'Barrier-soothing cream cleanser with Triple Ceramides & Oat Extract.',
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Water/Aqua, Glycerin, Ceramide NP, Ceramide AP, Ceramide EOP, Avena Sativa (Oat) Kernel Flour, Phytosphingosine, Cholesterol.',
    howToUse: 'Massage 1-2 pumps onto damp skin in gentle circular motions. Rinse thoroughly with lukewarm water.',
    volume: '150 ml / 5.1 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Shruti V.', rating: 5, date: '2026-07-21', title: 'So gentle on my sensitive skin', comment: 'Cleanses effectively without stripping my skin or making it feel tight.' }
    ]
  },
  {
    id: 'prod-20',
    name: 'Vitamin C 15% Glow Awakening Day Essence',
    category: 'skincare',
    brand: 'Nectar & Rose',
    price: 1699.00,
    originalPrice: 1999.00,
    rating: 4.8,
    reviewCount: 210,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 35,
    skinType: ['All Skin Types', 'Combination', 'Normal'],
    vegan: true,
    crueltyFree: true,
    description: 'Potent antioxidant brightening serum infused with 15% L-Ascorbic Acid, Ferulic Acid, and Kakadu Plum extract for radiant, even-toned skin.',
    shortDescription: '15% Vitamin C & Ferulic Acid brightening essence.',
    images: [
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1608248597259-a97795baf2a7?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Aqua, L-Ascorbic Acid, Ethoxydiglycol, Ferulic Acid, Terminalia Ferdinandiana (Kakadu Plum) Fruit Extract, Tocopherol.',
    howToUse: 'Apply 4-5 drops to clean face and neck in the morning before moisturizer and sunscreen.',
    volume: '30 ml / 1.0 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Neha R.', rating: 5, date: '2026-07-23', title: 'Dark spots faded fast', comment: 'Faded my acne marks in 3 weeks! Skin looks noticeably brighter and revitalized.' }
    ]
  },
  {
    id: 'prod-21',
    name: 'Soft Radiance Cream Blush & Lip Tint',
    category: 'makeup',
    brand: 'Lumière Velvet',
    price: 899.00,
    originalPrice: 1199.00,
    rating: 4.9,
    reviewCount: 134,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 45,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Melt-on-skin multi-use cream color stick packed with Rosehip Seed Oil and Hyaluronic Spheres for a dew-kissed natural cheek & lip flush.',
    shortDescription: 'Multi-use hydrating cream blush & lip tint stick.',
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?q=80&w=800&auto=format&fit=crop'
    ],
    shades: [
      { name: 'Coral Dawn', hex: '#E07A5F' },
      { name: 'Petal Flush', hex: '#E89CAE' },
      { name: 'Berry Dew', hex: '#A84257' }
    ],
    ingredients: 'Caprylic/Capric Triglyceride, Octyldodecanol, Rosa Canina (Rosehip) Seed Oil, Sodium Hyaluronate, Candelilla Wax, CI 77491.',
    howToUse: 'Dab directly onto cheek apples and lips, blending out with fingertips or beauty sponge.',
    volume: '8.5 g',
    reviewsList: [
      { id: 1, author: 'Tanvi M.', rating: 5, date: '2026-07-25', title: 'Perfect effortless flush', comment: 'Blends like butter and gives the most natural youthful glow!' }
    ]
  },
  {
    id: 'prod-22',
    name: 'Long-Wear Precision Waterproof Eyeliner Pen',
    category: 'makeup',
    brand: 'Celestial Glow',
    price: 699.00,
    originalPrice: 899.00,
    rating: 4.7,
    reviewCount: 98,
    isBestSeller: false,
    isTrending: false,
    isNewArrival: true,
    isFlashSale: true,
    stock: 60,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Ultra-fine 0.1mm Japanese felt-tip liquid eyeliner delivering 24-hour waterproof carbon black ink that won’t smudge or flake.',
    shortDescription: '24H waterproof ultra-fine 0.1mm felt-tip liquid eyeliner.',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop'
    ],
    shades: [
      { name: 'Midnight Jet Black', hex: '#0B0B0B' },
      { name: 'Espresso Dark Brown', hex: '#3B2418' }
    ],
    ingredients: 'Water, Acrylates Copolymer, Carbon Black (CI 77266), Butylene Glycol, Styrene/Acrylates Copolymer, Phenoxyethanol.',
    howToUse: 'Glide along lash line starting from inner corner outward. Store tip down for optimal ink flow.',
    volume: '1.2 ml',
    reviewsList: [
      { id: 1, author: 'Riya P.', rating: 5, date: '2026-07-26', title: 'Super sharp wing!', comment: 'Easiest liquid liner I have ever used. Doesn’t smudge even on my oily eyelids.' }
    ]
  },
  {
    id: 'prod-23',
    name: 'Exfoliating AHA & BHA Smoothing Body Polish',
    category: 'bodycare',
    brand: 'Pure Radiance',
    price: 1299.00,
    originalPrice: 1599.00,
    rating: 4.8,
    reviewCount: 115,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 40,
    skinType: ['All Skin Types', 'Dry'],
    vegan: true,
    crueltyFree: true,
    description: 'Dual-action resurfacing body scrub infused with 7% Glycolic Acid, 2% Salicylic Acid, and biodegradable Bamboo Powder to smooth strawberry legs and rough bumps.',
    shortDescription: 'Resurfacing body scrub with 7% AHA, 2% BHA & Bamboo Powder.',
    images: [
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Aqua, Glycolic Acid, Salicylic Acid, Bambusa Arundinacea Stem Extract, Glycerin, Simmondsia Chinensis Seed Oil.',
    howToUse: 'Massage over damp skin in shower, targeting arms, legs, and rough patches. Leave on for 2 minutes before rinsing.',
    volume: '220 g / 7.7 oz.',
    reviewsList: [
      { id: 1, author: 'Kavya S.', rating: 5, date: '2026-07-27', title: 'Goodbye strawberry legs!', comment: 'Smoothed out keratosis pilaris on my arms in just two uses. Absolutely love it.' }
    ]
  },
  {
    id: 'prod-24',
    name: 'Firming Caffeine & Green Coffee Body Serum Gel',
    category: 'bodycare',
    brand: 'Aura Botanicals',
    price: 1499.00,
    originalPrice: 1799.00,
    rating: 4.7,
    reviewCount: 88,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 30,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Cooling, fast-absorbing body gel powered by Green Coffee Bean Extract, Caffeine, and Niacinamide to visibly tighten skin and boost texture elasticity.',
    shortDescription: 'Firming & tightening body serum gel with Green Coffee Bean.',
    images: [
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Water/Aqua, Coffea Arabica (Coffee) Seed Extract, Caffeine, Niacinamide, Hyaluronic Acid, Menthol, Carbomer.',
    howToUse: 'Massage firmly in upward circular motions into thighs, abdomen, and arms until completely absorbed.',
    volume: '180 ml / 6.0 fl. oz.',
    reviewsList: [
      { id: 1, author: 'Divya N.', rating: 5, date: '2026-07-28', title: 'Refreshes and tightens', comment: 'Love the cooling menthol feel after workouts. My skin feels firm and super smooth.' }
    ]
  },
  {
    id: 'prod-25',
    name: 'Velvet Precision Makeup Sponge Set (3-Pack)',
    category: 'accessories',
    brand: 'Lumière Velvet',
    price: 699.00,
    originalPrice: 899.00,
    rating: 4.8,
    reviewCount: 175,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 50,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Latex-free microfiber velvet beauty sponges designed for streak-free foundation application, baking powder, and cream contouring.',
    shortDescription: '3-pack latex-free microfiber velvet blending sponges.',
    images: [
      'https://images.unsplash.com/photo-1512290900673-7002fa8e79c6?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: '100% Latex-Free Hydrophilic Polyurethane Foam, Microfiber Coating.',
    howToUse: 'Dampen sponge with water and squeeze out excess before bouncing over skin to seamlessly blend liquid or powder products.',
    volume: 'Set of 3 Sponges',
    reviewsList: [
      { id: 1, author: 'Priya R.', rating: 5, date: '2026-07-22', title: 'Flawless finish', comment: 'Absorbs minimal foundation and gives the smoothest airbrushed look!' }
    ]
  },
  {
    id: 'prod-26',
    name: 'Pro Artisanal 12-Piece Luxe Makeup Brush Set with Case',
    category: 'accessories',
    brand: 'Lumière Velvet',
    price: 2499.00,
    originalPrice: 2999.00,
    rating: 4.9,
    reviewCount: 204,
    isBestSeller: true,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: true,
    stock: 25,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Master set of 12 hand-crafted synthetic taklon makeup brushes with ergonomic wooden handles, packaged in a sleek travel roll-up case.',
    shortDescription: '12-piece professional synthetic makeup brush set with travel pouch.',
    images: [
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512290900673-7002fa8e79c6?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Ultra-soft Synthetic Taklon Bristles, Recycled Aluminum Ferrules, Sustainable Wooden Handles.',
    howToUse: 'Use face brushes for powder, blush, and contour; detail brushes for eyeshadow, liner, and brows. Clean weekly with gentle soap.',
    volume: '12 Brushes + Luxe Roll Case',
    reviewsList: [
      { id: 1, author: 'Sneha M.', rating: 5, date: '2026-07-24', title: 'Super soft bristles!', comment: 'Doesn’t shed at all after washing. Great value for a full set.' }
    ]
  },
  {
    id: 'prod-27',
    name: 'Sonic Facial Cleansing & Thermal Massager Device',
    category: 'accessories',
    brand: 'Aura Botanicals',
    price: 2999.00,
    originalPrice: 3499.00,
    rating: 5.0,
    reviewCount: 89,
    isBestSeller: false,
    isTrending: true,
    isNewArrival: true,
    isFlashSale: false,
    stock: 20,
    skinType: ['All Skin Types'],
    vegan: true,
    crueltyFree: true,
    description: 'Rechargeable medical-grade silicone sonic cleansing brush with 8 pulsation speeds and 42°C thermal massager to boost serum absorption.',
    shortDescription: '8-speed sonic silicone cleanser device with thermal massager.',
    images: [
      'https://images.unsplash.com/photo-1608248597259-a97795baf2a7?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1512290900673-7002fa8e79c6?q=80&w=800&auto=format&fit=crop'
    ],
    ingredients: 'Ultra-Hygienic Medical Grade Silicone, IPX7 Waterproof ABS Shell.',
    howToUse: 'Apply cleanser, turn on sonic cleansing mode, and glide over face for 1 minute. Switch to thermal massager after applying serums.',
    volume: '1 Device + USB Charging Cable',
    reviewsList: [
      { id: 1, author: 'Swati K.', rating: 5, date: '2026-07-27', title: 'Game changer for pore cleansing', comment: 'My skin feels ultra-clean and serum absorbs so much better with the warm massager!' }
    ]
  }
];

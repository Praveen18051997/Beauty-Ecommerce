export const quizQuestions = [
  {
    id: 1,
    question: "What is your primary skin type?",
    subtitle: "Select the option that best describes your bare skin mid-day.",
    options: [
      { label: "Dry", description: "Feels tight, flaky, or lacks moisture", icon: "Sun", value: "Dry" },
      { label: "Oily", description: "Excess shine & visible pores throughout face", icon: "Droplets", value: "Oily" },
      { label: "Combination", description: "Oily T-zone (forehead, nose) but dry cheeks", icon: "Layers", value: "Combination" },
      { label: "Sensitive", description: "Easily turns red, stings, or reacts to products", icon: "ShieldAlert", value: "Sensitive" },
      { label: "Normal", description: "Well balanced, comfortable, minimal breakouts", icon: "Smile", value: "Normal" }
    ]
  },
  {
    id: 2,
    question: "What is your top skincare goal?",
    subtitle: "We'll tailor your daily regimen to target this specific priority.",
    options: [
      { label: "Deep Hydration & Glass Skin Glow", description: "Plump up skin & boost moisture levels", icon: "Sparkles", value: "hydration" },
      { label: "Pore Refining & Oil Control", description: "Minimize pore size & balance sebum", icon: "Focus", value: "pore_control" },
      { label: "Anti-Aging & Firming", description: "Reduce fine lines & improve elasticity", icon: "Clock", value: "anti_aging" },
      { label: "Calming & Redness Relief", description: "Soothe irritation & strengthen skin barrier", icon: "Heart", value: "calming" }
    ]
  },
  {
    id: 3,
    question: "Which makeup finish do you adore most?",
    subtitle: "Select your everyday preferred complexion look.",
    options: [
      { label: "Dewy & Luminous", description: "Fresh, radiant, glass-skin finish", icon: "SunMedium", value: "dewy" },
      { label: "Soft Velvet Matte", description: "Smooth, airbrushed, shine-free finish", icon: "Feather", value: "matte" },
      { label: "Natural Minimalist", description: "Barely-there tint with effortless glow", icon: "Sparkle", value: "natural" }
    ]
  },
  {
    id: 4,
    question: "What aroma notes inspire your senses?",
    subtitle: "Helps us recommend your signature botanical fragrance.",
    options: [
      { label: "Floral & Rose", description: "Damask Rose, Peony, White Jasmine", icon: "Flower2", value: "floral" },
      { label: "Warm Oriental & Vanilla", description: "Amber, Cashmere, Vanilla Bean", icon: "Flame", value: "oriental" },
      { label: "Fresh Citrus & Botanical", description: "Bergamot, Green Tea, Crisp Aloe", icon: "Wind", value: "fresh" }
    ]
  }
];

import { AITool, ActivityItem } from '../types';

export const AI_TOOLS: AITool[] = [
  {
    id: 'homework',
    name: 'Homework AI',
    shortDesc: 'Step-by-step problem solver & clear concept explanations for any subject',
    longDesc: 'Tackle complex math problems, physics proofs, literature analyses, chemistry reactions, and history essays with detailed step-by-step guidance.',
    category: 'learning',
    categoryLabel: 'Learning',
    iconName: 'GraduationCap',
    badge: 'Popular',
    popular: true,
    accentColor: 'from-blue-600 to-indigo-600',
    placeholder: 'e.g., Solve for x in: 3x^2 - 12x + 9 = 0 with step-by-step reasoning',
    samplePrompts: [
      'Solve 2x^2 + 5x - 3 = 0 step-by-step with quadratic formula',
      'Explain Newton’s Third Law with real-world examples',
      'Analyze the theme of ambition in Shakespeare’s Macbeth',
      'Balance the chemical equation: C3H8 + O2 -> CO2 + H2O'
    ],
    acceptsMedia: 'both',
    options: [
      {
        key: 'subject',
        label: 'Subject',
        type: 'select',
        defaultValue: 'Math',
        options: [
          { value: 'Math', label: 'Mathematics' },
          { value: 'Physics', label: 'Physics' },
          { value: 'Chemistry', label: 'Chemistry' },
          { value: 'Biology', label: 'Biology' },
          { value: 'History', label: 'History' },
          { value: 'Literature', label: 'Literature' }
        ]
      },
      {
        key: 'depth',
        label: 'Explanation Depth',
        type: 'select',
        defaultValue: 'step-by-step',
        options: [
          { value: 'step-by-step', label: 'Step-by-Step with Formulas' },
          { value: 'simple', label: 'Simple (ELI5)' },
          { value: 'rigorous', label: 'Advanced & Proofs' }
        ]
      }
    ]
  },
  {
    id: 'translator',
    name: 'Translator',
    shortDesc: 'Context-aware multilingual translation with nuance and tone control',
    longDesc: 'Translate accurately between 50+ languages while preserving colloquial idioms, professional formality, or poetic cadence.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    iconName: 'Languages',
    badge: 'Fast',
    popular: true,
    accentColor: 'from-indigo-600 to-violet-600',
    placeholder: 'Enter any text, phrase, or paragraph to translate...',
    samplePrompts: [
      'Translate this contract clause to German preserving formal legal tone',
      'How do I say "It was great working with you, let\'s stay in touch" in polite Japanese?',
      'Translate this Spanish casual greeting to conversational English',
      'Translate this marketing pitch into French for a Paris startup expo'
    ],
    acceptsMedia: 'none',
    options: [
      {
        key: 'targetLang',
        label: 'Target Language',
        type: 'select',
        defaultValue: 'Spanish',
        options: [
          { value: 'Spanish', label: 'Spanish' },
          { value: 'French', label: 'French' },
          { value: 'German', label: 'German' },
          { value: 'Japanese', label: 'Japanese' },
          { value: 'Chinese (Mandarin)', label: 'Chinese (Mandarin)' },
          { value: 'Italian', label: 'Italian' },
          { value: 'Portuguese', label: 'Portuguese' },
          { value: 'Korean', label: 'Korean' },
          { value: 'Arabic', label: 'Arabic' },
          { value: 'English', label: 'English' }
        ]
      },
      {
        key: 'tone',
        label: 'Tone / Style',
        type: 'select',
        defaultValue: 'natural',
        options: [
          { value: 'natural', label: 'Natural & Conversational' },
          { value: 'formal', label: 'Formal / Business' },
          { value: 'academic', label: 'Academic' },
          { value: 'creative', label: 'Creative / Poetic' }
        ]
      }
    ]
  },
  {
    id: 'writing',
    name: 'Writing AI',
    shortDesc: 'Draft compelling essays, professional emails, blogs, and crisp copy',
    longDesc: 'Transform rough notes into articulate articles, persuasive proposals, bullet-pointed resumes, and engaging social posts in seconds.',
    category: 'creation',
    categoryLabel: 'Creativity',
    iconName: 'PenTool',
    badge: 'Essential',
    popular: true,
    accentColor: 'from-violet-600 to-purple-600',
    placeholder: 'What would you like to write or edit today?',
    samplePrompts: [
      'Write a polite email asking a client for payment on an overdue invoice',
      'Draft an introduction section for a research paper on Renewable Energy',
      'Create 5 engaging LinkedIn posts about AI product development',
      'Rewrite this bullet point to make it sound impactful for a senior resume'
    ],
    acceptsMedia: 'both',
    options: [
      {
        key: 'format',
        label: 'Document Type',
        type: 'select',
        defaultValue: 'email',
        options: [
          { value: 'email', label: 'Professional Email' },
          { value: 'essay', label: 'Essay / Article' },
          { value: 'blog', label: 'Blog Post' },
          { value: 'resume', label: 'Resume / Cover Letter' },
          { value: 'rephrase', label: 'Rephrase & Polish' }
        ]
      },
      {
        key: 'tone',
        label: 'Tone of Voice',
        type: 'select',
        defaultValue: 'confident',
        options: [
          { value: 'confident', label: 'Confident & Persuasive' },
          { value: 'friendly', label: 'Friendly & Warm' },
          { value: 'executive', label: 'Executive & Concise' },
          { value: 'inspirational', label: 'Inspirational' }
        ]
      }
    ]
  },
  {
    id: 'image_ai',
    name: 'Image AI',
    shortDesc: 'Image prompt architect, visual concept designer & image analyzer',
    longDesc: 'Craft photorealistic Midjourney, DALL-E, and Imagen prompts, extract visual concepts, or upload an image to receive deep technical and artistic analysis.',
    category: 'creation',
    categoryLabel: 'Creativity',
    iconName: 'Sparkles',
    accentColor: 'from-blue-500 to-cyan-500',
    placeholder: 'Describe the scene, subject, or upload an image to analyze...',
    samplePrompts: [
      'Generate a photorealistic 35mm prompt for a futuristic Tokyo coffee shop at night',
      'Design an isometric 3D render prompt for a cozy home office setup',
      'Analyze the composition and lighting of my uploaded photograph',
      'Create a minimalist vector logo prompt for an eco-friendly robotics brand'
    ],
    acceptsMedia: 'image',
    options: [
      {
        key: 'style',
        label: 'Aesthetic Style',
        type: 'select',
        defaultValue: 'photorealistic',
        options: [
          { value: 'photorealistic', label: 'Photorealistic / 8K Cinema' },
          { value: 'cyberpunk', label: 'Cyberpunk & Neon' },
          { value: 'minimalist', label: 'Minimalist Editorial' },
          { value: '3d-render', label: '3D Octane Render' },
          { value: 'anime', label: 'Studio Anime / Digital Art' }
        ]
      }
    ]
  },
  {
    id: 'video_prompt',
    name: 'Video Prompt AI',
    shortDesc: 'Cinematic camera prompts & scene direction for Veo, Sora, & Runway',
    longDesc: 'Structure text-to-video prompts with precise lens focal lengths, camera movements, lighting conditions, and dynamic actor choreography.',
    category: 'creation',
    categoryLabel: 'Creativity',
    iconName: 'Film',
    badge: 'New',
    accentColor: 'from-purple-600 to-pink-600',
    placeholder: 'Describe the video sequence you want to prompt...',
    samplePrompts: [
      'A drone fly-through over an alpine pine forest in winter misty morning',
      'A cinematic slow-motion tracking shot of an astronaut stepping onto Mars',
      'A macro slow pan of rain droplets hitting an illuminated neon glass window',
      'A dynamic fast-paced FPV drone racing through an abandoned futuristic hangar'
    ],
    acceptsMedia: 'none',
    options: [
      {
        key: 'cameraMove',
        label: 'Camera Movement',
        type: 'select',
        defaultValue: 'tracking',
        options: [
          { value: 'tracking', label: 'Dolly Tracking Shot' },
          { value: 'drone', label: 'FPV / Aerial Drone' },
          { value: 'pan', label: 'Smooth Panoramic Pan' },
          { value: 'crane', label: 'Crane / Jib Ascending' },
          { value: 'handheld', label: 'Documentary Handheld' }
        ]
      },
      {
        key: 'fps',
        label: 'Motion Speed',
        type: 'select',
        defaultValue: 'slowmo',
        options: [
          { value: 'slowmo', label: 'Cinematic Slow Motion (60fps/120fps)' },
          { value: 'realtime', label: 'Standard 24fps Film Cadence' },
          { value: 'timelapse', label: 'Hyperlapse / Timelapse' }
        ]
      }
    ]
  },
  {
    id: 'pdf_ai',
    name: 'PDF AI',
    shortDesc: 'Instant summaries, Q&A, and key data extraction for documents & papers',
    longDesc: 'Drop in contracts, research papers, financial reports, or lecture slides. Extract instant summaries, find key citations, and query specific clauses.',
    category: 'productivity',
    categoryLabel: 'Productivity',
    iconName: 'FileText',
    badge: 'Productive',
    accentColor: 'from-blue-600 to-teal-500',
    placeholder: 'Paste your document text or ask a question about your uploaded PDF...',
    samplePrompts: [
      'Summarize this research paper into 5 key takeaways and methodology',
      'What are the liability clauses in section 4 of this agreement?',
      'Extract all financial metrics, EBITDA, and projections from this report',
      'Create a one-page executive brief from these meeting minutes'
    ],
    acceptsMedia: 'pdf',
    options: [
      {
        key: 'outputType',
        label: 'Output Structure',
        type: 'select',
        defaultValue: 'executive-summary',
        options: [
          { value: 'executive-summary', label: 'Executive Summary & Bullets' },
          { value: 'qa-analysis', label: 'Deep Q&A & Citation Check' },
          { value: 'action-items', label: 'Action Items & Next Steps' },
          { value: 'bullet-notes', label: 'Comprehensive Study Notes' }
        ]
      }
    ]
  },
  {
    id: 'study',
    name: 'Study AI',
    shortDesc: 'Interactive quizzes, flashcards, mnemonics & exam master plans',
    longDesc: 'Accelerate your retention. Generate customized multiple-choice practice exams with instant answer rationales and personalized study checklists.',
    category: 'learning',
    categoryLabel: 'Learning',
    iconName: 'BookOpen',
    accentColor: 'from-indigo-500 to-sky-500',
    placeholder: 'Enter a topic, textbook chapter, or exam syllabus to study...',
    samplePrompts: [
      'Create a 5-question multiple choice quiz on the Krebs Cycle with explanations',
      'Explain the difference between TCP and UDP with mnemonic devices',
      'Generate a 1-week study schedule for the AP World History exam',
      'Break down the core principles of Macroeconomics (Supply, Demand, Inflation)'
    ],
    acceptsMedia: 'both',
    options: [
      {
        key: 'studyTool',
        label: 'Study Tool Format',
        type: 'select',
        defaultValue: 'quiz',
        options: [
          { value: 'quiz', label: 'Interactive Practice Quiz (with answers)' },
          { value: 'flashcards', label: 'Flashcards (Concept / Definition)' },
          { value: 'mnemonics', label: 'Memory Tricks & Mnemonics' },
          { value: 'cheat-sheet', label: 'High-Yield One-Page Cheat Sheet' }
        ]
      }
    ]
  },
  {
    id: 'code',
    name: 'Code AI',
    shortDesc: 'Code generator, bug debugger, performance optimizer & refactorer',
    longDesc: 'Write clean code in Python, TypeScript, Go, Rust, SQL, and more. Find tricky edge-case bugs, optimize Big-O complexity, and generate unit tests.',
    category: 'coding',
    categoryLabel: 'Coding',
    iconName: 'Code',
    badge: 'Popular',
    popular: true,
    accentColor: 'from-slate-800 to-indigo-900',
    placeholder: 'Describe the feature, paste buggy code, or ask an architecture question...',
    samplePrompts: [
      'Write a TypeScript custom hook for debounced window resize with clean cleanup',
      'Find the memory leak in this Node.js streaming pipeline',
      'Write an optimized SQL query to calculate 30-day customer retention cohort',
      'Implement an LRU Cache in Python with O(1) get and put'
    ],
    acceptsMedia: 'none',
    options: [
      {
        key: 'language',
        label: 'Programming Language',
        type: 'select',
        defaultValue: 'TypeScript',
        options: [
          { value: 'TypeScript', label: 'TypeScript / React' },
          { value: 'Python', label: 'Python' },
          { value: 'JavaScript', label: 'JavaScript (Node)' },
          { value: 'Rust', label: 'Rust' },
          { value: 'Go', label: 'Go (Golang)' },
          { value: 'SQL', label: 'SQL / PostgreSQL' },
          { value: 'C++', label: 'C++' },
          { value: 'HTML/CSS', label: 'HTML & Tailwind CSS' }
        ]
      },
      {
        key: 'action',
        label: 'Action',
        type: 'select',
        defaultValue: 'generate',
        options: [
          { value: 'generate', label: 'Generate New Implementation' },
          { value: 'debug', label: 'Debug Bug & Explain Root Cause' },
          { value: 'optimize', label: 'Optimize Complexity & Performance' },
          { value: 'tests', label: 'Generate Comprehensive Unit Tests' }
        ]
      }
    ]
  },
  {
    id: 'idea',
    name: 'Idea Generator',
    shortDesc: 'Brainstorm startup ideas, viral YouTube titles, marketing hooks & campaigns',
    longDesc: 'Never stare at a blank page again. Generate high-traction startup concepts, creative video hooks, product names, and viral marketing angles.',
    category: 'creation',
    categoryLabel: 'Creativity',
    iconName: 'Lightbulb',
    accentColor: 'from-amber-500 to-orange-500',
    placeholder: 'What industry, niche, or creative challenge are you brainstorming for?',
    samplePrompts: [
      '10 B2B micro-SaaS ideas that can be built by a solo developer in 2 weeks',
      'Viral YouTube video titles and thumbnail concepts for personal finance',
      'Brand names and domain ideas for an AI healthcare scheduling app',
      '5 guerrilla marketing campaigns for launching a specialty coffee brand'
    ],
    acceptsMedia: 'none',
    options: [
      {
        key: 'niche',
        label: 'Focus Area',
        type: 'select',
        defaultValue: 'startup',
        options: [
          { value: 'startup', label: 'Startup & SaaS Concepts' },
          { value: 'youtube', label: 'YouTube / TikTok Content Hooks' },
          { value: 'marketing', label: 'Marketing Campaigns & Angles' },
          { value: 'branding', label: 'Brand Names & Slogans' }
        ]
      }
    ]
  },
  {
    id: 'calculator',
    name: 'Calculator',
    shortDesc: 'Smart math, scientific equations, currency & financial calculations',
    longDesc: 'Calculate anything in plain English: compound interest, mortgage amortization, unit conversions, derivatives, integrals, and statistical analysis.',
    category: 'math',
    categoryLabel: 'Math & Logic',
    iconName: 'Calculator',
    accentColor: 'from-blue-600 to-indigo-700',
    placeholder: 'Enter calculation or problem (e.g. Monthly mortgage for $450k at 6.2% for 30 yrs)...',
    samplePrompts: [
      'Calculate monthly payment on $350,000 mortgage at 6.5% interest over 30 years',
      'What is the compound interest on $10,000 at 8% annual return over 15 years?',
      'Compute the definite integral of (3x^2 + 2x) from x = 1 to x = 4',
      'Convert 120 mph to km/h and meters per second'
    ],
    acceptsMedia: 'image',
    options: [
      {
        key: 'calcType',
        label: 'Calculation Mode',
        type: 'select',
        defaultValue: 'financial',
        options: [
          { value: 'financial', label: 'Financial (Loans, Investments, ROI)' },
          { value: 'scientific', label: 'Scientific & Calculus' },
          { value: 'units', label: 'Unit & Currency Conversion' },
          { value: 'statistics', label: 'Statistical Analysis' }
        ]
      }
    ]
  }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    toolId: 'code',
    toolName: 'Code AI',
    prompt: 'Implement a debounce hook in TypeScript with clean timer teardown',
    result: `### 💻 Debounce Hook in TypeScript\n\nHere is a production-ready, type-safe custom React hook for debouncing functions:\n\n\`\`\`typescript\nimport { useEffect, useRef, useCallback } from 'react';\n\nexport function useDebounce<T extends (...args: any[]) => void>(\n  callback: T,\n  delay: number\n): (...args: Parameters<T>) => void {\n  const callbackRef = useRef<T>(callback);\n  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);\n\n  // Keep callback reference updated without triggering re-creation\n  useEffect(() => {\n    callbackRef.current = callback;\n  }, [callback]);\n\n  // Clear timeout on unmount\n  useEffect(() => {\n    return () => {\n      if (timeoutRef.current) clearTimeout(timeoutRef.current);\n    };\n  }, []);\n\n  return useCallback((...args: Parameters<T>) => {\n    if (timeoutRef.current) {\n      clearTimeout(timeoutRef.current);\n    }\n    timeoutRef.current = setTimeout(() => {\n      callbackRef.current(...args);\n    }, delay);\n  }, [delay]);\n}\n\`\`\`\n\n#### ✨ Key Highlights\n- **Zero Memory Leaks**: Automatically clears timeouts on component unmount.\n- **Fresh Closures**: Uses \`useRef\` to always execute the freshest callback without resetting the timer.\n- **Strict Typing**: Full generic type inference for arguments and return types.`,
    timestamp: '10 minutes ago',
    model: 'gemini-3.8-flash',
    favorite: true
  },
  {
    id: 'act-2',
    toolId: 'homework',
    toolName: 'Homework AI',
    prompt: 'Solve: 2x^2 + 5x - 3 = 0 step-by-step using the quadratic formula',
    result: `### 📚 Step-by-Step Solution: Quadratic Equation\n\n**Given Equation**: $$2x^2 + 5x - 3 = 0$$\n\n#### 1. Identify Coefficients\nIn the standard form $$ax^2 + bx + c = 0$$:\n- $$a = 2$$\n- $$b = 5$$\n- $$c = -3$$\n\n#### 2. Quadratic Formula\n$$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$\n\n#### 3. Compute Discriminant ($$\\Delta$$)\n$$\\Delta = b^2 - 4ac = (5)^2 - 4(2)(-3)$$\n$$\\Delta = 25 - (-24) = 25 + 24 = 49$$\n\nSince $$\\sqrt{49} = 7$$, there are two real rational roots.\n\n#### 4. Calculate the Two Solutions\n- **Root 1**: $$x_1 = \\frac{-5 + 7}{2(2)} = \\frac{2}{4} = \\frac{1}{2}$$\n- **Root 2**: $$x_2 = \\frac{-5 - 7}{2(2)} = \\frac{-12}{4} = -3$$\n\n#### ✅ Final Answer\n$$x = \\frac{1}{2}$$ or $$x = -3$$`,
    timestamp: '45 minutes ago',
    model: 'gemini-3.8-flash',
    favorite: true
  },
  {
    id: 'act-3',
    toolId: 'translator',
    toolName: 'Translator',
    prompt: 'Translate to Spanish: "We are thrilled to partner with your team on this ambitious AI project."',
    result: `### 🌐 Spanish Translation (Professional)\n\n> *"Estamos encantados de asociarnos con su equipo en este ambicioso proyecto de inteligencia artificial."*\n\n#### 💡 Nuance & Tone Notes:\n- **"Estamos encantados"**: Strikes the perfect balance of professional warmth and genuine enthusiasm.\n- **"Su equipo"**: Uses the respectful form appropriate for business correspondence.`,
    timestamp: '2 hours ago',
    model: 'gemini-3.8-flash',
    favorite: false
  },
  {
    id: 'act-4',
    toolId: 'video_prompt',
    toolName: 'Video Prompt AI',
    prompt: 'Cinematic drone fly-through over an alpine pine forest in winter misty morning',
    result: `### 🎬 Video Generation Prompt (Veo / Sora / Runway)\n\n**Scene**: Breathtaking drone fly-through gliding just above mist-blanketed emerald pine trees in the Swiss Alps at dawn.\n\n- **Camera Movement**: Fluid forward low-altitude drone sweep, smoothly pitching down then tilting up to reveal towering snow-covered peaks.\n- **Lighting**: Volumetric sun rays piercing through alpine mist, soft golden rim light on frost-tipped pine needles.\n- **Camera Specs**: 35mm anamorphic, photorealistic 8K, 60fps cinematic motion blur, natural film grain.\n\n**Paste-Ready Prompt**:\n\`\`\`text\nCinematic 4K FPV drone tracking shot gliding through foggy winter alpine pine forest at sunrise. Golden sunbeams piercing dense morning mist, frost-covered needles glistening, snow-capped mountain range in deep background, smooth steadycam flight, photorealistic filmic grading, 24fps --ar 16:9\n\`\`\``,
    timestamp: 'Yesterday',
    model: 'gemini-3.8-flash',
    favorite: false
  }
];

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('Failed to initialize GoogleGenAI client:', err);
  }
}

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!process.env.GEMINI_API_KEY,
    model: 'gemini-3.8-flash',
    timestamp: new Date().toISOString(),
  });
});

// Tool prompt builders
function buildSystemInstruction(tool: string, options: Record<string, any> = {}): string {
  const baseInstruction = `You are LifeAI, a world-class, intelligent, helpful, and concise AI assistant built for millions of people. You deliver clear, structured, formatted markdown responses with clean typography, bullet points, and code formatting where suitable. Always be helpful, objective, and accurate.`;

  switch (tool) {
    case 'homework':
      return `${baseInstruction}
Specialty: Homework & Academic Solver.
Focus: Provide thorough, step-by-step explanations for academic questions. First state the core answer or formula, then break down each step clearly, explain the underlying concept, and offer a quick verification or tip for tests.`;

    case 'translator': {
      const source = options.sourceLang || 'auto-detect';
      const target = options.targetLang || 'English';
      const tone = options.tone || 'natural';
      return `${baseInstruction}
Specialty: Master Translator & Linguist.
Translate from ${source} to ${target} maintaining a ${tone} tone.
Output format:
1. **Translation**: The translated text accurately conveying context and nuances.
2. **Key Vocabulary & Nuances** (if applicable): 1-3 bullet points explaining cultural context, idioms, or grammar choices.
3. **Pronunciation Guide / Phonetics** (if applicable).`;
    }

    case 'writing': {
      const format = options.format || 'general';
      const tone = options.tone || 'professional';
      return `${baseInstruction}
Specialty: Professional Writing AI & Copy Editor.
Task format: ${format}. Tone: ${tone}.
Produce captivating, clear, and well-structured prose. Include headlines, bullet points, or strong opening hooks as appropriate. If asked to proofread, show corrected version and list the key improvements made.`;
    }

    case 'image_ai':
      return `${baseInstruction}
Specialty: AI Visual & Image Studio.
When analyzing images, provide rich visual descriptions, composition breakdown, colors, and subject analysis.
When asked for image generation prompts, produce 3 ultra-detailed, photorealistic or artistic prompts suitable for Midjourney v6, DALL-E 3, or Imagen, including details on lighting, camera lens, color grading, aspect ratio, and art style.`;

    case 'video_prompt':
      return `${baseInstruction}
Specialty: Cinematic Video Prompt Engineer.
Create production-grade text-to-video prompts (for Veo, Sora, Runway Gen-3, Kling).
Structure each prompt with:
1. **Scene Description & Subject Action**
2. **Camera Movement** (e.g. slow pan, tracking dolly shot, low angle whip-pan)
3. **Lighting & Atmosphere** (e.g. golden hour volumetric light, neon-drenched cyberpunk mist)
4. **Lens & Technical Specs** (e.g. 35mm anamorphic, 4K, 60fps cinematic shallow depth of field)
5. **Exact Prompt Copy** ready to paste into video AI tools.`;

    case 'pdf_ai':
      return `${baseInstruction}
Specialty: Document & PDF Intelligence.
Analyze the provided document or text thoroughly.
Provide:
1. **Executive Summary** (2-3 sentences)
2. **Key Findings & Core Points** (bulleted)
3. **Action Items / Takeaways**
4. Direct answers to any user questions regarding the document.`;

    case 'study':
      return `${baseInstruction}
Specialty: Study & Learning Accelerator.
Help users master any subject quickly. Provide:
1. **Core Concept Breakdown** (ELI5 or undergraduate level as requested)
2. **Memory Aids & Mnemonics**
3. **Interactive Mini-Quiz** with 3 multiple-choice or short-answer questions and explanations.`;

    case 'code': {
      const lang = options.language || 'TypeScript';
      return `${baseInstruction}
Specialty: Senior Software Engineer & Code Architect.
Target Language: ${lang}.
Write clean, modern, efficient, bug-free code with proper comments. Explain key architectural decisions. If debugging, explain what the bug was, why it happened, and how the fix resolves it.`;
    }

    case 'idea':
      return `${baseInstruction}
Specialty: Creative Idea Generator & Innovation Strategist.
Brainstorm innovative, high-impact ideas. Group them logically (e.g. Quick Wins, High Value, Viral Angle, Moonshot). Give each idea a catchy title, 2-sentence description, target audience, and monetization or execution strategy.`;

    case 'calculator':
      return `${baseInstruction}
Specialty: Intelligent Scientific & Financial Calculator.
Solve math problems, unit conversions, financial projections, or physics equations.
Format:
1. **Result**: Display the final numerical answer prominently.
2. **Formula Used**: Display the mathematical formulas clearly.
3. **Step-by-step Calculation**: Show all intermediate working.`;

    default:
      return `${baseInstruction}
Answer the user's inquiry with precision, warmth, and depth.`;
  }
}

// Fallback generator when API key is missing or for demo testing
function generateSmartFallback(prompt: string, tool: string, options: Record<string, any> = {}): string {
  switch (tool) {
    case 'homework':
      return `### 📚 Step-by-Step Solution\n\n**Question / Topic**: *${prompt}*\n\n#### 1. Core Principle & Formula\nTo solve this, we identify the fundamental relation: $$\\text{Result} = f(x)$$.\n\n#### 2. Detailed Step-by-Step Breakdown\n- **Step 1**: Identify given variables and constants.\n- **Step 2**: Apply substitution into the governing equation.\n- **Step 3**: Simplify algebraic expressions step-by-step to isolate unknown quantities.\n- **Step 4**: Verify boundary conditions and dimensional consistency.\n\n#### 3. Key Takeaway & Exam Tip\n*Remember to double-check units and sign conventions before finalizing your response.*`;

    case 'translator':
      return `### 🌐 Translation (${options.sourceLang || 'Auto'} ➔ ${options.targetLang || 'English'})\n\n**Original**: "${prompt}"\n\n**Translation** (${options.tone || 'Natural'}):\n> *"Welcome to LifeAI: seamless instant translation with contextual nuance."*\n\n#### 💡 Linguistic Notes:\n- Preserved colloquial formality.\n- Idiomatic meaning adapted for natural conversational flow.`;

    case 'code':
      return `### 💻 Code Solution (${options.language || 'TypeScript'})\n\nHere is a clean, robust solution for your request:\n\n\`\`\`${(options.language || 'typescript').toLowerCase()}\n// LifeAI Generated Code Solution\ninterface Result<T> {\n  success: boolean;\n  data: T;\n  timestamp: number;\n}\n\nexport async function processTask(input: string): Promise<Result<string>> {\n  // Validate input\n  if (!input || input.trim().length === 0) {\n    throw new Error('Invalid input parameter');\n  }\n\n  // Processing logic\n  const normalized = input.trim();\n  const processed = \`Processed [\${normalized}] successfully\`;\n\n  return {\n    success: true,\n    data: processed,\n    timestamp: Date.now(),\n  };\n}\n\`\`\`\n\n#### 🔍 Explanation\n1. **Type Safety**: Strictly typed with TypeScript generics.\n2. **Error Handling**: Early exit on invalid arguments.\n3. **Performance**: O(1) runtime complexity with minimal allocations.`;

    case 'writing':
      return `### ✍️ Generated Writing Piece\n\n**Topic**: *${prompt}*\n\n---\n\n#### Executive Summary\nClear communication transforms complex ideas into actionable outcomes. By aligning strategic vision with empathetic delivery, this piece articulates the core message directly to your audience.\n\n#### Core Highlights\n- **Precision & Impact**: Focused phrasing that eliminates ambiguity.\n- **Tone Alignment**: Crafted in an engaging, authoritative voice.\n- **Call to Action**: Guides the reader toward the intended next step with clarity.\n\n---\n*Feel free to request revisions or alternative styles!*`;

    case 'image_ai':
      return `### 🎨 AI Image Generation Prompts\n\nBased on your concept: *"${prompt}"*\n\n**Prompt 1 (Cinematic Realism)**:\n\`\`\`text\nA cinematic wide-angle shot of ${prompt}, shot on 35mm anamorphic lens, golden hour rim lighting, ultra-detailed textures, volumetric dust particles, photorealistic 8k, f/1.8 aperture --ar 16:9 --style raw\n\`\`\`\n\n**Prompt 2 (Cyberpunk / Neo-Futurism)**:\n\`\`\`text\nFuturistic hyper-detailed rendering of ${prompt}, glowing neon accents, vibrant teal and magenta lighting, reflections on wet asphalt, octane render, trending on ArtStation --ar 1:1\n\`\`\`\n\n**Prompt 3 (Minimalist Editorial)**:\n\`\`\`text\nMinimalist editorial fashion photography featuring ${prompt}, high key studio lighting, clean pastel gradients, sharp typography framing, award-winning composition --ar 4:5\n\`\`\``;

    case 'video_prompt':
      return `### 🎬 Cinematic Video Generation Prompt\n\n**Scene Concept**: *${prompt}*\n\n- **Camera Movement**: Slow forward tracking dolly with subtle rotational pan.\n- **Lighting**: Soft diffuse morning sun, warm golden flares.\n- **Frame Rate & Style**: 24fps filmic motion blur, Kodak Vision3 500T color grade.\n\n**Prompt String (for Veo / Sora / Runway)**:\n> *"Cinematic 4K shot, slow tracking dolly into ${prompt}. Intricate details, atmospheric haze, warm natural sunlight filtering through, photorealistic cinematic film grain, 35mm lens."*`;

    case 'pdf_ai':
      return `### 📄 Document Analysis & Summary\n\n**Document Scope**: *${prompt}*\n\n#### 📌 Key Takeaways\n1. **Core Objective**: Identified primary goals and contextual requirements.\n2. **Critical Data Points**: Synthesized key metrics and relevant findings.\n3. **Actionable Recommendations**: Clear roadmap established for next steps.\n\n#### ❓ Instant Q&A Ready\nYou can ask any specific questions about sections, tables, or conclusions!`;

    case 'study':
      return `### 🎓 Study Guide & Quiz\n\n**Subject**: *${prompt}*\n\n#### 🧠 Core Concept in Simple Terms\nThink of this concept like an orchestra conductor: each element works independently, yet syncs into a coherent system.\n\n#### 📝 Practice Quiz:\n1. **Question**: What is the most critical factor influencing this concept?\n   - *A)* Baseline input parameters\n   - *B)* Static variables\n   - *C)* External interference\n   *(Answer: A — baseline inputs dictate overall system state.)*`;

    case 'idea':
      return `### 💡 Innovation & Brainstorming Ideas\n\n**Focus**: *${prompt}*\n\n1. **Idea 1: The Fast-Mover**\n   - *Concept*: Direct-to-consumer micro-platform solving immediate friction.\n   - *Monetization*: Freemium with low-barrier subscription.\n\n2. **Idea 2: The Viral Hook**\n   - *Concept*: Interactive community challenge featuring gamified milestones.\n   - *Growth*: Organic short-form video sharing.\n\n3. **Idea 3: The Enterprise Lever**\n   - *Concept*: Automated B2B workflow integration saving 10+ hours per week.`;

    case 'calculator':
      return `### 🧮 Calculation & Analysis\n\n**Input Query**: *${prompt}*\n\n- **Primary Result**: **42.00** *(or computed value based on parameters)*\n- **Formula**: $$\\text{Output} = \\sum_{i=1}^n x_i$$\n- **Verification**: Verified using standard mathematical order of operations (PEMDAS).`;

    default:
      return `### 🤖 LifeAI Response\n\nThank you for reaching out with your request: *"${prompt}"*.\n\nLifeAI has analyzed your input. Here are key points to guide you:\n\n1. **Understanding the Request**: Thorough evaluation of contextual nuances.\n2. **Direct Answer**: Comprehensive response tailored to your inquiry.\n3. **Next Steps**: You can refine, regenerate, or copy this output directly.`;
  }
}

// Universal AI Generation Route
app.post('/api/generate', async (req, res) => {
  try {
    const { prompt, tool = 'general', options = {}, media } = req.body;

    if (!prompt && (!media || media.length === 0)) {
      res.status(400).json({ error: 'Prompt or media is required' });
      return;
    }

    const systemInstruction = buildSystemInstruction(tool, options);

    // If Gemini client is available, make the real call
    if (aiClient) {
      try {
        const contents: any[] = [];

        // Handle multimodal media if supplied (e.g. image or base64 document)
        if (Array.isArray(media) && media.length > 0) {
          for (const item of media) {
            if (item.data && item.mimeType) {
              contents.push({
                inlineData: {
                  mimeType: item.mimeType,
                  data: item.data,
                },
              });
            }
          }
        }

        const userText = prompt || 'Please analyze the attached file in depth.';
        contents.push({ text: userText });

        const response = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        const text = response.text || 'No response generated.';
        res.json({
          result: text,
          tool,
          model: 'gemini-3.8-flash',
          timestamp: new Date().toISOString(),
        });
        return;
      } catch (geminiError: any) {
        console.error('Gemini API call failed, falling back to smart engine:', geminiError?.message || geminiError);
        // Fall back gracefully with helpful message
        const fallbackText = generateSmartFallback(prompt || 'Media file', tool, options);
        res.json({
          result: `${fallbackText}\n\n> *Note: AI service is currently running in local response mode (${geminiError?.message || 'Quota/Key issue'}). Add your GEMINI_API_KEY to activate full live cloud generation.*`,
          tool,
          model: 'fallback-engine',
          timestamp: new Date().toISOString(),
        });
        return;
      }
    }

    // No API key configured: provide intelligent built-in fallback response
    const fallbackText = generateSmartFallback(prompt || 'General inquiry', tool, options);
    res.json({
      result: `${fallbackText}\n\n> *Tip: Configure your GEMINI_API_KEY in the environment or Secrets panel to unlock full live Google Gemini AI capabilities!*`,
      tool,
      model: 'demo-engine',
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error('Server error in /api/generate:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
});

// Setup Vite or static serving
async function startServer() {
  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LifeAI server running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

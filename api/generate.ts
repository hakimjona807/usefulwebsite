import { GoogleGenAI } from '@google/genai';

function buildSystemInstruction(tool: string, options: Record<string, any> = {}): string {
  const baseInstruction = `You are LifeAI, a world-class, intelligent, helpful, and concise AI assistant built for millions of people. You deliver clear, structured, formatted markdown responses with clean typography, bullet points, and code formatting where suitable. Always be helpful, objective, and accurate.`;

  switch (tool) {
    case 'homework':
      return `${baseInstruction}\nSpecialty: Homework & Academic Solver. Provide thorough, step-by-step explanations, formulas, and test tips.`;
    case 'translator':
      return `${baseInstruction}\nSpecialty: Master Translator. Translate from ${options.sourceLang || 'auto'} to ${options.targetLang || 'English'} in a ${options.tone || 'natural'} tone with nuance notes.`;
    case 'writing':
      return `${baseInstruction}\nSpecialty: Professional Writing AI. Format: ${options.format || 'general'}. Tone: ${options.tone || 'professional'}.`;
    case 'image_ai':
      return `${baseInstruction}\nSpecialty: AI Visual Studio. Generate detailed Midjourney/DALL-E prompts or analyze images.`;
    case 'video_prompt':
      return `${baseInstruction}\nSpecialty: Cinematic Video Prompt Engineer for Veo, Sora, and Runway. Include scene, camera motion, lighting, and copyable prompt.`;
    case 'pdf_ai':
      return `${baseInstruction}\nSpecialty: Document Intelligence. Provide executive summary, key findings, and action items.`;
    case 'study':
      return `${baseInstruction}\nSpecialty: Study Accelerator. Provide concepts, mnemonics, and practice quizzes with answers.`;
    case 'code':
      return `${baseInstruction}\nSpecialty: Senior Software Engineer. Language: ${options.language || 'TypeScript'}. Write clean, commented code and explain architecture.`;
    case 'idea':
      return `${baseInstruction}\nSpecialty: Innovation Strategist. Brainstorm creative high-impact ideas with monetization strategies.`;
    case 'calculator':
      return `${baseInstruction}\nSpecialty: Scientific & Financial Calculator. Show result, formula used, and step-by-step calculations.`;
    default:
      return `${baseInstruction}\nDeliver a direct, comprehensive, accurate answer.`;
  }
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const { prompt, tool = 'general', options = {}, media } = req.body || {};

    if (!prompt && (!media || media.length === 0)) {
      res.status(400).json({ error: 'Prompt or media is required' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = buildSystemInstruction(tool, options);
      const contents: any[] = [];

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

      contents.push({ text: prompt || 'Please analyze the attached document or image.' });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const text = response.text || 'No response generated.';
      res.status(200).json({
        result: text,
        tool,
        model: 'gemini-3.8-flash',
        timestamp: new Date().toISOString(),
      });
      return;
    }

    res.status(200).json({
      result: `### 🤖 LifeAI Generated Response\n\n**Inquiry**: *${prompt}*\n\nHere is your intelligent solution. To enable live Google Gemini Cloud generation on your deployment, configure the \`GEMINI_API_KEY\` environment variable in your Vercel Project Settings!`,
      tool,
      model: 'demo-engine',
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Vercel handler error:', err);
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
}

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Festival Knowledge Base for intelligent fallback and prompt grounding
const FESTIVAL_CONTEXT = `
You are "Durga Sahayak" (দুর্গা সহায়ক), the warm, knowledgeable, and festive AI festival guide for "Utsav Durgotsav" - Kolkata & Global Durga Puja.
You provide helpful, encouraging, and accurate advice to devotees and visitors.
Key Details:
- Festival: Durga Puja (Sharadotsav 1431 / Kolkata Durga Puja, UNESCO Intangible Cultural Heritage).
- Current Auspicious Days: Maha Shashti to Vijaya Dashami.
- Famous Pandals:
  * Ekdalia Evergreen Club (Gariahat, South Kolkata): Traditional Daaker Saaj, golden lighting, 25m wait, Kalighat/Ballygunge metro.
  * Tridhara Sammilani (Manoharpukur / Ballygunge): Rhythm of Terracotta & Clay, ~10m wait, Kalighat metro (500m).
  * Sree Bhumi Sporting Club (Lake Town / VIP Road): Grand architectural marvel (Vatican Basilica / Palace theme), ~50m wait, VIP gate available, Ultadanga/Dum Dum.
  * Ahiritola Sarbojanin (North Kolkata): Handloom & Living Heritage, Ahiritola Ghat / Shobhabazar Metro, ~20m wait.
  * Mohammad Ali Park (Central Kolkata): Illuminated Palace of Lights, fast-moving line, MG Road metro (300m).
  * Ballygunge Cultural: Bamboo & eco-craftsmanship, 15m wait.
  * Suruchi Sangha (New Alipore): Handcrafted state themes, ~40m wait.
  * College Square: World-famous lake illumination and boat reflections, ~20m wait.
  * Bagbazar Sarbojanin: Century-old pure traditional Sabekiana idol, 30m wait.
  * Maddox Square: Youth and family evening Adda with giant park ambiance.
- Sacred Rituals & Timings:
  * Maha Shashti: Kalparambha (10:30 AM), Bodhon, Amantran & Adhivas (6:45 PM), Sandhya Aarti (7:30 PM).
  * Maha Saptami: Nabapatrika Snan (Kola Bou bathing at river ghat at 06:00 AM), Prana Pratishtha.
  * Maha Ashtami: Pushpanjali (09:30 AM, 10:30 AM), Kumari Puja (11:00 AM), Sandhi Puja (auspicious junction of Ashtami & Navami with 108 lotus flowers & 108 brass diyas, 07:48 PM to 08:36 PM).
  * Maha Navami: Maha Navami Hom / Yajna, Dhunuchi Naach competition (08:00 PM).
  * Vijaya Dashami: Darpan Visarjan, Sindoor Khela (married women applying vermilion to Ma Durga & each other, 11:00 AM), Visarjan at Babughat/Ganges, Subho Bijoya sweet sharing.
- Passes & Hopper Trails ("rasspoint"):
  * VIP Darshan Pass & Senior Citizen Priority can be generated instantly in the app under the "Passes" section.
  * Kolkata Metro runs all-night special trains during Saptami, Ashtami, and Navami.
  * Pandal Hopper Trail optimizes your walking and metro transit so you avoid peak traffic bottlenecks.

Always respond politely, warmly (often starting with "Subho Sharadiya! 🌺" or "Nomoshkar!"), and provide clear bullet points for routes, times, passes, and tips.
`;

// Chatbot API Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: message,
          config: {
            systemInstruction: FESTIVAL_CONTEXT,
            temperature: 0.7,
          },
        });
        const replyText = response.text || "Subho Sharadiya! May Maa Durga bless you with joy and peace. How else can I assist your festival journey?";
        return res.json({ reply: replyText, source: 'gemini' });
      } catch (geminiError) {
        console.warn('Gemini API call failed, using intelligent fallback:', geminiError);
      }
    }

    // Intelligent Fallback based on keywords
    const lower = message.toLowerCase();
    let reply = "";

    if (lower.includes('queue') || lower.includes('wait') || lower.includes('crowd') || lower.includes('radar')) {
      reply = "🌺 **Subho Sharadiya! Live Queue Radar Update:**\n\n- **Tridhara Sammilani (South):** ~10 min wait (Fast Moving)\n- **Ballygunge Cultural:** ~15 min wait (Moderate)\n- **Ekdalia Evergreen:** ~25 min wait\n- **Suruchi Sangha (New Alipore):** ~40 min wait\n- **Sree Bhumi Sporting Club (Lake Town):** ~50 min wait (VIP Pass recommended)\n\n💡 *Pro-tip:* Visit between 1:30 PM – 4:30 PM for the shortest lines!";
    } else if (lower.includes('pass') || lower.includes('vip') || lower.includes('rasspoint') || lower.includes('ticket')) {
      reply = "🎫 **Utsav VIP & Darshan Pass Points ('rasspoint'):**\n\n1. **Sharad Fast-Track VIP Pass:** Allows priority gate access at Ekdalia, Sree Bhumi, and Tridhara.\n2. **Senior Citizen & Divyang Sakha:** Direct queue-free darshan with battery shuttle from nearest metro.\n3. **Bhog Token:** Reserve pure Khichuri & Labra prasad thali.\n\nYou can generate your instant digital pass right now in the **Passes & Trails** tab of this app with a personalized QR code!";
    } else if (lower.includes('pushpanjali') || lower.includes('ritual') || lower.includes('sandhi') || lower.includes('timing') || lower.includes('time')) {
      reply = "🙏 **Sacred Ritual Highlights & Timings:**\n\n- **Kalparambha (Shashti):** 10:30 AM (Completed)\n- **Amantran & Adhivas:** 06:45 PM\n- **Sandhya Aarti & Dhunuchi:** 07:30 PM\n- **Maha Ashtami Pushpanjali:** Batch 1 at 09:30 AM, Batch 2 at 10:30 AM\n- **Auspicious Sandhi Puja:** 07:48 PM – 08:36 PM (108 lotus flowers & 108 clay diyas lit)\n- **Sindoor Khela (Dashami):** From 10:30 AM onwards.";
    } else if (lower.includes('route') || lower.includes('hop') || lower.includes('metro') || lower.includes('trail')) {
      reply = "🚇 **Recommended Pandal Hopper Trail:**\n\n**South Kolkata Classic Loop:**\n1. Start at **Kalighat Metro** ➔ Walk 500m to **Tridhara Sammilani** (~10m queue)\n2. Walk 800m to **Maddox Square** for light refreshment & open adda\n3. Walk 600m to **Ballygunge Cultural** (~15m queue)\n4. Head to **Ekdalia Evergreen** at Gariahat Crossing\n\n*Note:* Kolkata Blue Line & Green Line Metros run overnight services throughout Puja!";
    } else if (lower.includes('bhog') || lower.includes('food') || lower.includes('prasad') || lower.includes('khichuri')) {
      reply = "🍲 **Sacred Bhog & Prasad Details:**\n\nTraditional Mahabhog consists of Gobindobhog rice Khichuri, seasonal vegetable Labra, crisp Beguni, Tomato-Khejur chutney, and authentic Bengali Mishti (Payesh & Rosogolla). You can book a verified coupon under our **Rituals & Bhog** tab!";
    } else {
      reply = "🌺 **Subho Sharadiya! Welcome to Utsav Durgotsav!**\n\nI am your Durga Sahayak guide. I can assist you with:\n- **Live Pandal Queues & Crowd Radar**\n- **Generating VIP & Senior Citizen Darshan Passes**\n- **Auspicious Puja Timings (Pushpanjali, Sandhi Puja, Sindoor Khela)**\n- **Metro & Walking Hopper Trails**\n- **Bhog & Live Aarti Offerings**\n\nWhat would you like to explore today?";
    }

    return res.json({ reply, source: 'fallback' });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

// Lyria Music Generation API Endpoint (Lyria Clip & Lyria Pro)
app.post('/api/generate-music', async (req, res) => {
  try {
    const { prompt, model = 'lyria-3-clip-preview' } = req.body;
    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const selectedModel = model === 'lyria-3-pro-preview' ? 'lyria-3-pro-preview' : 'lyria-3-clip-preview';

    if (ai) {
      try {
        const response = await ai.models.generateContentStream({
          model: selectedModel,
          contents: prompt,
        });

        let audioBase64 = '';
        let lyrics = '';
        let mimeType = 'audio/wav';

        for await (const chunk of response) {
          const parts = chunk.candidates?.[0]?.content?.parts;
          if (!parts) continue;

          for (const part of parts) {
            if (part.inlineData?.data) {
              if (!audioBase64 && part.inlineData.mimeType) {
                mimeType = part.inlineData.mimeType;
              }
              audioBase64 += part.inlineData.data;
            }
            if (part.text && !lyrics) {
              lyrics = part.text;
            }
          }
        }

        if (audioBase64) {
          return res.json({
            success: true,
            model: selectedModel,
            audioBase64,
            mimeType,
            lyrics: lyrics || 'Devotional instrumental melody celebrating Durga Puja.',
            duration: selectedModel === 'lyria-3-clip-preview' ? '30s' : 'Full Track',
          });
        }
      } catch (lyriaErr: any) {
        console.warn('Lyria API call failed:', lyriaErr?.message || lyriaErr);
        return res.status(200).json({
          success: false,
          error: lyriaErr?.message || 'Lyria service currently unavailable.',
          model: selectedModel,
          notice: 'Lyria models require a paid Gemini API key configured in AI Studio Secrets.',
          fallbackSuggestion: 'You can enjoy authentic real-time Dhak drums and conch rhythms in the Cultural Percussion Studio.',
        });
      }
    }

    return res.status(200).json({
      success: false,
      error: 'GEMINI_API_KEY is not configured on the server.',
      model: selectedModel,
      notice: 'Configure GEMINI_API_KEY in Secrets to generate live AI music with Lyria 3.',
    });
  } catch (error: any) {
    console.error('Error in /api/generate-music:', error);
    res.status(500).json({ error: 'Failed to generate music' });
  }
});

// Setup Vite or Static Serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const authenticateToken = require('../middleware/auth');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
You are a smart assistant integrated into the VilniusTech campus map.

You help students with:
- Finding buildings (e.g. S1, S2, S4, etc.)
- Getting walking directions between buildings
- Explaining what each building is used for
- Suggesting where to go for help, parking, or dorms

Here’s what the buildings mean:
- S1: Central building (administration, main faculty)
- S2: Lecture building (auditoriums)
- S3: Teaching labs
- S4/S5: Additional lecture rooms
- S6: Engineering labs
- S7: Research labs

Be short, clear, and polite. Answer only campus-related questions.
`;

router.post('/ask-ai', async (req, res) => {
  const { text } = req.body;

  if (!text || typeof text !== 'string') {
    return res.status(400).json({ error: 'Valid text is required' });
  }

  try {
        const response = await openai.chat.completions.create({
        model: 'gpt-4.1',
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: text }
          ],
        });

        res.json({ aiResponse: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API error:', error.message);
    res.status(500).json({ error: 'Failed to contact ChatGPT' });
  }
});

module.exports = router;

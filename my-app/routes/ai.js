// /routes/ai.js
import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

// POST /api/ai
router.post('/ai', async (req, res) => {
  const { mood } = req.body;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a supportive mental wellness bot.' },
          { role: 'user', content: `The user is feeling ${mood}. Write a short supportive message.` },
        ],
      }),
    });

    const data = await response.json();
    res.json({ message: data.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI request failed' });
  }
});

export default router;

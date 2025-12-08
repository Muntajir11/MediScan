import express from 'express';
import { analyzeSymptoms } from '../services/groq.js';

const router = express.Router();

router.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.post('/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || symptoms.trim() === '') {
      return res.status(400).json({ error: 'Please provide symptoms' });
    }

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured' });
    }

    const result = await analyzeSymptoms(symptoms.trim(), apiKey);
    res.json(result);

  } catch (error) {
    console.error('Error analyzing symptoms:', error.message);
    res.status(500).json({ error: 'Failed to analyze symptoms' });
  }
});

export default router;

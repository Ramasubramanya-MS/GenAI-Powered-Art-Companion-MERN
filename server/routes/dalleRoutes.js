import express from 'express';
import * as dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Try CommonJS-style import
const { OpenAI } = await import('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
    });

    const imageUrl = aiResponse.data[0].url;

    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    const errorMessage = error?.response?.data?.error?.message || 'Something went wrong';
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
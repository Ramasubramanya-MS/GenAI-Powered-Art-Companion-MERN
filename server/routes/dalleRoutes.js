import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai';  // Import the default OpenAI class

dotenv.config();

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  // Use your OpenAI API key from .env
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

    // Assuming the API returns a URL for the image
    const imageUrl = aiResponse.data[0].url;  // Get the image URL from OpenAI's response

    // Send the URL as a response
    res.status(200).json({ photo: imageUrl });
  } catch (error) {
    console.error(error);
    const errorMessage = error?.response?.data?.error?.message || 'Something went wrong';
    res.status(500).json({ error: errorMessage });  // Send error as JSON
  }
});

export default router;

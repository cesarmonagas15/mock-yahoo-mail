const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/', async (req, res) => {
  const { emailText } = req.body;

  try {
    const hfResponse = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        inputs: emailText,
        parameters: {
          candidate_labels: ['Prioridad', 'Ofertas', 'Actualizaciones', 'Noticias', 'Social'],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    );

    const label = hfResponse.data?.labels?.[0];
    console.log('✅ HuggingFace label:', label);
    res.json({ label });
  } catch (error) {
    console.error('❌ Error using HuggingFace:', error.response?.data || error);
    res.status(500).json({ error: 'Error during classification' });
  }
});

module.exports = router;

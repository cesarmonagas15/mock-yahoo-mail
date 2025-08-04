const express = require('express');
const router = express.Router();
const { Anthropic } = require('@anthropic-ai/sdk');

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Set this in your .env file
});

router.post('/', async (req, res) => {
  const { emailText } = req.body;

  try {
    const completion = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // you can also try opus or sonnet
      max_tokens: 10,
      temperature: 0.2,
      messages: [
        {
          role: 'user',
          content: `Eres un clasificador de correos electrónicos para Yahoo Mail. Clasifica el siguiente correo en una de estas categorías: [Prioridad, Ofertas, Actualizaciones, Boletines, Social]. Devuelve solo la etiqueta.\n\nCorreo:\n${emailText}`,
        },
      ],
    });

    const label = completion.content[0]?.text?.trim();
    res.json({ label });
  } catch (err) {
    console.error('❌ Error al clasificar con Claude:', err);
    res.status(500).send('Error en clasificación.');
  }
});

module.exports = router;

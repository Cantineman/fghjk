const express = require('express');
const authMiddleware = require('../middleware/authMiddleware'); // Stub, build if needed
const { createClient, addIntegration } = require('../services/clientService');

const router = express.Router();

router.use(authMiddleware); // Protect all

router.post('/', async (req, res) => {
  try {
    const client = await createClient(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/integrations', async (req, res) => {
  try {
    const integration = await addIntegration(req.params.id, req.body.type, req.body.provider, req.body.token);
    res.status(201).json(integration);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add more: GET /, GET /:id, etc.

module.exports = router;
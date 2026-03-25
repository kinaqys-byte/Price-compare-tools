const express = require('express');
const ComparisonService = require('./services/ComparisonService');
const logger = require('./utils/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const comparisonService = new ComparisonService();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

// Get all comparisons
app.get('/api/compare', (req, res) => {
  try {
    const comparison = comparisonService.compare();
    res.json(comparison);
  } catch (error) {
    logger.error(error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get connectors
app.get('/api/connectors', (req, res) => {
  const connectors = comparisonService.getConnectors().map(c => ({
    name: c.name,
    type: c.type,
  }));
  res.json(connectors);
});

app.listen(port, () => {
  logger.info(`Open Claw Price Compare server running on port ${port}`);
});

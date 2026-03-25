const logger = require('../utils/logger');

/**
 * Comparison Service
 * Orchestrates price comparisons across multiple suppliers
 */

class ComparisonService {
  constructor() {
    this.connectors = [];
  }

  /**
   * Add a connector
   */
  addConnector(connector) {
    this.connectors.push(connector);
    logger.info(`Added connector: ${connector.name}`);
  }

  /**
   * Remove a connector
   */
  removeConnector(name) {
    this.connectors = this.connectors.filter(c => c.name !== name);
    logger.info(`Removed connector: ${name}`);
  }

  /**
   * Fetch prices from all connectors
   */
  async fetchAllPrices() {
    try {
      logger.info('Fetching prices from all connectors...');
      const results = {};

      for (const connector of this.connectors) {
        results[connector.name] = await connector.fetchPrices();
      }

      logger.info('Successfully fetched prices from all connectors');
      return results;
    } catch (error) {
      logger.error(`Error fetching prices: ${error.message}`);
      throw error;
    }
  }

  /**
   * Compare prices across all connectors
   */
  compare() {
    const comparison = {};

    for (const connector of this.connectors) {
      comparison[connector.name] = {
        count: connector.getPrices().length,
        prices: connector.getPrices(),
        cheapest: this.findCheapest(connector.getPrices()),
        mostExpensive: this.findMostExpensive(connector.getPrices()),
        average: this.calculateAverage(connector.getPrices()),
      };
    }

    return comparison;
  }

  /**
   * Find cheapest item
   */
  findCheapest(items) {
    if (items.length === 0) return null;
    return items.reduce((min, item) => item.price < min.price ? item : min);
  }

  /**
   * Find most expensive item
   */
  findMostExpensive(items) {
    if (items.length === 0) return null;
    return items.reduce((max, item) => item.price > max.price ? item : max);
  }

  /**
   * Calculate average price
   */
  calculateAverage(items) {
    if (items.length === 0) return 0;
    const total = items.reduce((sum, item) => sum + item.price, 0);
    return (total / items.length).toFixed(2);
  }

  /**
   * Get all connectors
   */
  getConnectors() {
    return this.connectors;
  }
}

module.exports = ComparisonService;
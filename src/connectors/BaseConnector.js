const logger = require('../utils/logger');

class BaseConnector {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.prices = [];
  }

  async fetchPrices() {
    throw new Error('fetchPrices() must be implemented by subclass');
  }

  getPrices() {
    return this.prices;
  }

  setPrices(prices) {
    this.prices = prices;
    logger.info(`${this.name}: Updated ${prices.length} price entries`);
  }

  filterPrices(criteria) {
    return this.prices.filter(item => {
      for (const key in criteria) {
        if (item[key] !== criteria[key]) return false;
      }
      return true;
    });
  }

  sortPrices(field = 'price', order = 'asc') {
    const sorted = [...this.prices].sort((a, b) => {
      if (order === 'asc') return a[field] - b[field];
      return b[field] - a[field];
    });
    return sorted;
  }

  formatData(data) {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      supplier: this.name,
      timestamp: new Date(),
    }));
  }
}

module.exports = BaseConnector;
const BaseConnector = require('../BaseConnector');
const logger = require('../../utils/logger');

class ElectricityConnector extends BaseConnector {
  constructor(name) {
    super(name, 'electricity');
  }

  async fetchPrices() {
    try {
      logger.info(`${this.name}: Fetching electricity prices...`);
      
      // Mock data - replace with actual API call
      const mockData = [
        { id: 1, name: 'Standard Plan', price: 0.12, region: 'North' },
        { id: 2, name: 'Premium Plan', price: 0.15, region: 'North' },
        { id: 3, name: 'Budget Plan', price: 0.09, region: 'South' },
      ];

      const formatted = this.formatData(mockData);
      this.setPrices(formatted);
      return formatted;
    } catch (error) {
      logger.error(`${this.name}: ${error.message}`);
      throw error;
    }
  }

  filterByRegion(region) {
    return this.filterPrices({ region });
  }
}

module.exports = ElectricityConnector;
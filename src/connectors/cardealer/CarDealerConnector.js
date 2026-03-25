const BaseConnector = require('../BaseConnector');
const logger = require('../../utils/logger');

class CarDealerConnector extends BaseConnector {
  constructor(name) {
    super(name, 'cardealer');
  }

  async fetchPrices() {
    try {
      logger.info(`${this.name}: Fetching car prices...`);
      
      // Mock data - replace with actual API call
      const mockData = [
        { id: 101, name: 'Toyota Camry 2024', price: 28000, model: 'Sedan', location: 'Downtown' },
        { id: 102, name: 'Honda Civic 2024', price: 26000, model: 'Sedan', location: 'Downtown' },
        { id: 103, name: 'Ford F-150 2024', price: 35000, model: 'Truck', location: 'Suburb' },
      ];

      const formatted = this.formatData(mockData);
      this.setPrices(formatted);
      return formatted;
    } catch (error) {
      logger.error(`${this.name}: ${error.message}`);
      throw error;
    }
  }

  filterByModel(model) {
    return this.filterPrices({ model });
  }

  filterByLocation(location) {
    return this.filterPrices({ location });
  }
}

module.exports = CarDealerConnector;
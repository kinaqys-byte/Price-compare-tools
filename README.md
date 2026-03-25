# Open Claw Price Compare

A standalone Node.js application for comparing prices among multiple suppliers across various domains (electricity, car dealerships, real estate, etc.).

## Features

- Compare prices from multiple suppliers
- Modular connector architecture for easy extensibility
- Support for REST APIs, CSV imports, and manual data entry
- CLI and REST API interfaces
- Price filtering, sorting, and export functionality
- Example connectors for electricity and car dealers

## Installation

```bash
npm install
```

## Usage

### Start Server
```bash
npm start
```

### Development Mode
```bash
npm run dev
```

### Adding a New Supplier

1. Create a new connector file in `src/connectors/{supplier-type}/`
2. Extend `BaseConnector` class
3. Implement `fetchPrices()` method
4. Register the connector in your comparison service

See examples in `src/connectors/electricity/` and `src/connectors/cardealer/`

## Project Structure

```
src/
├── index.js                 # Express server entry point
├── connectors/              # Supplier connectors
│   ├── BaseConnector.js     # Base class for all connectors
│   ├── electricity/         # Electricity supplier connectors
│   └── cardealer/           # Car dealer connectors
├── services/                # Business logic services
│   └── ComparisonService.js # Orchestrates price comparisons
├── utils/                   # Utility functions
│   └── logger.js            # Logging utility
└── config/                  # Configuration
    └── config.js            # App configuration
```
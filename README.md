# Countries API

## Overview

This Node.js application serves as an API to retrieve information about countries using the [REST Countries API](https://restcountries.com/). It provides data such as country details, currencies, languages, and allows users to embed Google Maps for a specified location.

## Features

- Retrieve detailed information about a country.
- Embed Google Maps for a specific latitude and longitude.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- NPM (Node Package Manager) installed
- Google Maps Embed API key

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Setting up environment variabels:

   Create .env file in root directory of the project and add the following variables:

   ```bash
   API_endpoint=https://restcountries.com/v3.1/name/
   API_endpoint_countryCode=https://restcountries.com/v3.1/alpha/
   API_KEY=<Your_Google_Maps_API_Key>
   ```

### Usage

1. Run the server

   To launch the application use the following command:

   ```bash
   node index.js
   ```

2. Request Endpoints

- To get country information :

  ```bash
  GET http://localhost:3000/?country=<country-name>
  ```

- To get embedded Google Maps based on geo-location

  ```bash
  GET http://localhost:3000/embed-map?lat=<latitude>&lng=<longitude>
  ```

## Example

- To get information about Republic Of Ireland
  ```bash
  GET http://localhost:3000/?country=Republic%20Of%20Ireland
  ```
- Embed a Google Map of New York City

  ```bash
  GET http://localhost:3000/embed-map?lat=40.7128&lng=-74.0060
  ```

# Licence

This project is licensed under the ISC License.

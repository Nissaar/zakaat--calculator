# Zakat Calculator

A modern, responsive web application designed to help Muslims accurately calculate their Zakat on gold and cash savings. The calculations and Nisaab benchmarks used in this application are based primarily on the **Hanafi Madhab**.

## Features

- **Gold Purity Conversion:** Automatically converts various gold purities (22k, 21k, 18k, 14k, 9k) into their 24k pure gold equivalent.
- **Real-time Nisaab Checking:** Checks your total pure gold against the 87g and 93g benchmarks.
- **Cash & Savings:** Calculates the Money Nisaab based on the current price of 612 grams of silver.
- **Combined Assets:** Evaluates mixed assets (gold + cash) against the Silver Nisaab to determine if Zakat is obligatory.
- **Educational Footer:** Explains the math and benchmarks behind the calculations.
- **Advisory Modal:** Reminds users to verify prices with local jewelers and consult their local Imam/Ulama.

## Screenshots

*(Note: Replace these placeholder links with actual screenshots of your application)*

![Calculator Inputs](https://placehold.co/800x400/15803d/white?text=Calculator+Inputs+Section)
![Zakat Summary](https://placehold.co/800x400/1c1917/white?text=Zakat+Summary+Dashboard)

## Usage Instructions

1. **Acknowledge the Advisory:** Upon loading the app, read and accept the advisory modal regarding the Hanafi Madhab and the necessity of verifying with local scholars.
2. **Enter Current Prices:** 
   - Input the current market price for 1 gram of **24k Gold**.
   - Input the current market price for 1 gram of **Silver**.
3. **Enter Your Assets:**
   - Input the weight (in grams) of the gold you own next to its corresponding purity (e.g., 20g of 18k gold).
   - Input your total cash/savings for the year.
4. **Review Your Summary:**
   - The right-hand panel (or bottom section on mobile) will automatically update to show your total pure gold, total asset value, and whether you meet the Nisaab thresholds.
   - If you meet the Nisaab, the obligatory 2.5% Zakat amount will be displayed.

## Local Development

To run this project locally on your machine:

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000` (or the port specified in your terminal).

## Docker & Traefik Deployment

This project includes a `Dockerfile` and a `docker-compose.yml` pre-configured for deployment behind a **Traefik** reverse proxy.

### Setup Instructions:

1. Open `docker-compose.yml` and update the following placeholders:
   - `traefik-public`: Change to your actual Traefik Docker network name.
   - `zakat.yourdomain.com`: Change to your actual domain name.
   - `myresolver`: Change to your Traefik certificate resolver (e.g., `letsencrypt`).
2. Build and start the container in detached mode:
   ```bash
   docker compose up -d --build
   ```
3. The application will be built using a multi-stage process (Node.js for building, Nginx for serving) and will be automatically routed by Traefik with SSL enabled.

## Disclaimer

This calculator is provided as a helpful estimation tool. Users are responsible for the accuracy of the gold and silver prices they input. Always consult with a qualified local Imam or Ulama to ensure your Zakat is calculated correctly according to your specific circumstances.

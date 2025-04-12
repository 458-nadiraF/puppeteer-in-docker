const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 8080; // The port you exposed in Dockerfile

// Middleware to handle JSON responses
app.use(express.json());

// Route to trigger the Puppeteer scraping
app.get('/scrape', async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to the URL and scrape data
    await page.goto('https://example.com'); // Change to the page you want to scrape
    
    const time = await page.evaluate(() => {
      return document.querySelector('time').innerText; // Adjust as needed
    });

    await browser.close();
    
    // Respond with the scraped data
    res.json({ time });
  } catch (error) {
    res.status(500).json({ error: 'Error scraping data' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Puppeteer scraper running at http://localhost:${port}`);
});

// Import express and axios
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

// Create an express app and set the port number.
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
const API_URL = "";

// Use the public folder for static files.
app.use(express.static("public"));

// When the user goes to the home page it should render the index.ejs file.
app.get("/", async (req, res) => {
    try {
      const result = await axios.get("https://api.coindesk.com/v1/bpi/currentprice.json");
      const usdRateFloat = result.data.bpi.USD.rate_float;
      var formattedUsdRate = usdRateFloat.toLocaleString('en-US', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    });
      
      res.render("index.ejs", {
        btcPrice: formattedUsdRate
      });
    } catch (error) {
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
          error: error.message,
        });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  
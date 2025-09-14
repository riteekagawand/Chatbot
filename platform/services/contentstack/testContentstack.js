import fetch from "node-fetch"; // ES Module import
const STACK_API_KEY = "blt354ba6a0b8b7e140";      // Replace with your stack API key
const DELIVERY_TOKEN = "cs78a974094dbb32f8259dab99";    // Replace with your delivery token
const ENVIRONMENT = "development";   

const url = `https://cdn.contentstack.io/v3/content_types/tour/entries?environment=${ENVIRONMENT}`;

async function fetchTours() {
  try {
    const res = await fetch(url, {
      headers: {
        api_key: STACK_API_KEY,
        access_token: DELIVERY_TOKEN
      },
    });
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.error("Error:", err);
  }
}

fetchTours();

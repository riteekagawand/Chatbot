// Simple test to verify Contentstack connection
// Replace these with your actual credentials from Contentstack dashboard

const API_KEY = 'blt_your_api_key_here'; // Get this from Contentstack Settings > API Keys
const DELIVERY_TOKEN = 'cs_your_delivery_token_here'; // Get this from Contentstack Settings > Tokens
const ENVIRONMENT = 'development'; // or 'production'

async function testContentstack() {
  console.log('Testing Contentstack connection...');
  console.log('API Key:', API_KEY.substring(0, 10) + '...');
  console.log('Environment:', ENVIRONMENT);
  
  try {
    // Test getting tour entries
    const url = `https://cdn.contentstack.io/v3/content_types/tour/entries?environment=${ENVIRONMENT}&limit=5`;
    
    const response = await fetch(url, {
      headers: {
        'api_key': API_KEY,
        'access_token': DELIVERY_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Found', data.entries?.length || 0, 'tour entries');
      
      if (data.entries?.length > 0) {
        console.log('\nTour entries:');
        data.entries.forEach((tour, index) => {
          console.log(`${index + 1}. ${tour.title}`);
          console.log('   Price:', tour.price || 'Not set');
          console.log('   Location:', tour.location || 'Not set');
          console.log('   Description:', tour.description?.substring(0, 100) + '...' || 'Not set');
          console.log('');
        });
      }
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', response.status, errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testContentstack();

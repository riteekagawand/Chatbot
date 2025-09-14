// Simple test to get all tour entries without search query
const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your real API key
const DELIVERY_TOKEN = 'YOUR_DELIVERY_TOKEN_HERE'; // Replace with your real delivery token
const ENVIRONMENT = 'development'; // or 'production'

async function testSimple() {
  console.log('Testing simple Contentstack connection...');
  
  try {
    // Test 1: Get all tour entries without search
    const url = `https://cdn.contentstack.io/v3/content_types/tour/entries?environment=${ENVIRONMENT}&limit=10`;
    
    console.log('URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'api_key': API_KEY,
        'access_token': DELIVERY_TOKEN,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Success! Found', data.entries?.length || 0, 'tour entries');
      
      if (data.entries?.length > 0) {
        console.log('\nTour entries:');
        data.entries.forEach((tour, index) => {
          console.log(`${index + 1}. ${tour.title}`);
          console.log('   UID:', tour.uid);
          console.log('   Price:', tour.price || 'Not set');
          console.log('   Location:', tour.location || 'Not set');
          console.log('   Description:', tour.description?.substring(0, 100) + '...' || 'Not set');
          console.log('');
        });
      } else {
        console.log('No tour entries found. Check if:');
        console.log('1. Content type is named "tour"');
        console.log('2. Entries are published');
        console.log('3. Environment is correct');
      }
    } else {
      const errorText = await response.text();
      console.log('❌ Error:', response.status, response.statusText);
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testSimple();

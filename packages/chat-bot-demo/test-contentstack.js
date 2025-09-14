// Test script to debug Contentstack connection
const fetch = require('node-fetch');

async function testContentstack() {
  // Replace these with your actual Contentstack credentials
  const apiKey = 'YOUR_API_KEY_HERE';
  const deliveryToken = 'YOUR_DELIVERY_TOKEN_HERE';
  const environment = 'development'; // or 'production'
  
  console.log('Testing Contentstack connection...');
  console.log('API Key:', apiKey.substring(0, 10) + '...');
  console.log('Environment:', environment);
  
  try {
    // Test 1: Get all content types
    console.log('\n1. Testing content types...');
    const contentTypesUrl = `https://cdn.contentstack.io/v3/content_types?environment=${environment}`;
    const contentTypesResponse = await fetch(contentTypesUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    if (contentTypesResponse.ok) {
      const contentTypesData = await contentTypesResponse.json();
      console.log('✅ Content types found:', contentTypesData.content_types?.map(ct => ct.uid) || []);
    } else {
      console.log('❌ Content types error:', contentTypesResponse.status, await contentTypesResponse.text());
    }
    
    // Test 2: Get tour entries
    console.log('\n2. Testing tour entries...');
    const tourUrl = `https://cdn.contentstack.io/v3/content_types/tour/entries?environment=${environment}&limit=5`;
    const tourResponse = await fetch(tourUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    if (tourResponse.ok) {
      const tourData = await tourResponse.json();
      console.log('✅ Tour entries found:', tourData.entries?.length || 0);
      if (tourData.entries?.length > 0) {
        console.log('Sample tour entry:', JSON.stringify(tourData.entries[0], null, 2));
      }
    } else {
      console.log('❌ Tour entries error:', tourResponse.status, await tourResponse.text());
    }
    
    // Test 3: Search for Swiss Alps
    console.log('\n3. Testing Swiss Alps search...');
    const searchUrl = `https://cdn.contentstack.io/v3/content_types/tour/entries?environment=${environment}&limit=5&query={"title":{"$regex":"Swiss","$options":"i"}}`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('✅ Swiss Alps search results:', searchData.entries?.length || 0);
      if (searchData.entries?.length > 0) {
        console.log('Swiss Alps tour:', JSON.stringify(searchData.entries[0], null, 2));
      }
    } else {
      console.log('❌ Swiss Alps search error:', searchResponse.status, await searchResponse.text());
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testContentstack();

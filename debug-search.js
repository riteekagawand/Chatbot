#!/usr/bin/env node

/**
 * Debug search function directly
 */

const CONTENTSTACK_API_KEY = 'blt354ba6a0b8b7e140';
const CONTENTSTACK_TOKEN = 'cs7f1c6103726d54fe1978f31f';
const CONTENTSTACK_ENVIRONMENT = 'development';
const BASE_URL = 'https://eu-cdn.contentstack.com/v3';

async function debugSearch() {
  console.log('🔍 Debugging search function...\n');

  try {
    // Test the exact search query that should work
    const searchQuery = 'swiss';
    const contentType = 'tour';
    
    console.log(`Searching for "${searchQuery}" in ${contentType}...`);
    
    // Build the search URL exactly like the API does
    const query = JSON.stringify({"title":{"$regex":searchQuery,"$options":"i"}});
    const url = `${BASE_URL}/content_types/${contentType}/entries?environment=${CONTENTSTACK_ENVIRONMENT}&limit=5&query=${encodeURIComponent(query)}`;
    
    console.log('Search URL:', url);
    
    const response = await fetch(url, {
      headers: {
        'api_key': CONTENTSTACK_API_KEY,
        'access_token': CONTENTSTACK_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      return;
    }

    const data = await response.json();
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    const entries = data.entries || [];
    console.log(`\nFound ${entries.length} entries`);
    
    entries.forEach((entry, index) => {
      console.log(`\nEntry ${index + 1}:`);
      console.log(`  UID: ${entry.uid}`);
      console.log(`  Title: ${entry.title}`);
      console.log(`  Description: ${entry.description}`);
      console.log(`  Country: ${entry.country}`);
      console.log(`  Price: ${entry.price}`);
      console.log(`  Duration: ${entry.duration}`);
    });

    // Test the content extraction
    console.log('\n🧪 Testing content extraction...');
    
    if (entries.length > 0) {
      const entry = entries[0];
      const extractedContent = extractContent(entry, contentType);
      console.log('Extracted content:');
      console.log(extractedContent);
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

function extractContent(entry, contentType) {
  switch (contentType) {
    case 'tour':
      return `Title: ${entry.title || 'Untitled Tour'}
Description: ${entry.description || 'No description available'}
Country: ${entry.country || 'Country not specified'}
Price: ${entry.price || 'Price not available'}
Duration: ${entry.duration || 'Duration not specified'}`;
    
    case 'faqs':
      return `Question: ${entry.question || 'No question'}
Answer: ${entry.answers || 'No answer available'}
Category: ${entry.tags ? entry.tags.join(', ') : 'General'}`;
    
    default:
      return `Title: ${entry.title || 'Untitled'}
Content: ${JSON.stringify(entry, null, 2)}`;
  }
}

// Run the debug
debugSearch().catch(console.error);
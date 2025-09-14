#!/usr/bin/env node

/**
 * Test API search with known content
 */

const API_BASE_URL = 'http://localhost:3000/api';

async function testAPISearch() {
  console.log('🧪 Testing API search with known content...\n');

  try {
    // Test with "swiss" which we know returns results
    console.log('1️⃣ Testing search for "swiss"...');
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Tell me about Swiss tours',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['tour']
      })
    });

    const data = await response.json();
    console.log('✅ Response received');
    console.log('   Status:', response.status);
    console.log('   Search results:', data.searchResults?.length || 0);
    
    if (data.searchResults?.length > 0) {
      console.log('   Found content:');
      data.searchResults.forEach((result, index) => {
        console.log(`     ${index + 1}. ${result.title} (${result.contentType})`);
        console.log(`        Content preview: ${result.content.substring(0, 100)}...`);
      });
    } else {
      console.log('   No search results found');
      console.log('   Response content:', data.content?.substring(0, 200) || 'No content');
    }

    // Test with "alps" which we know returns results
    console.log('\n2️⃣ Testing search for "alps"...');
    const response2 = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What about Alps tours?',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['tour']
      })
    });

    const data2 = await response2.json();
    console.log('✅ Response received');
    console.log('   Status:', response2.status);
    console.log('   Search results:', data2.searchResults?.length || 0);
    
    if (data2.searchResults?.length > 0) {
      console.log('   Found content:');
      data2.searchResults.forEach((result, index) => {
        console.log(`     ${index + 1}. ${result.title} (${result.contentType})`);
      });
    }

    // Test with FAQs
    console.log('\n3️⃣ Testing FAQ search...');
    const response3 = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What are the frequently asked questions about tours?',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['faqs']
      })
    });

    const data3 = await response3.json();
    console.log('✅ Response received');
    console.log('   Status:', response3.status);
    console.log('   Search results:', data3.searchResults?.length || 0);
    
    if (data3.searchResults?.length > 0) {
      console.log('   Found FAQs:');
      data3.searchResults.forEach((result, index) => {
        console.log(`     ${index + 1}. ${result.title} (${result.contentType})`);
      });
    }

    console.log('\n🎉 API search testing complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testAPISearch().catch(console.error);


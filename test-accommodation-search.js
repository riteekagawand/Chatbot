#!/usr/bin/env node

/**
 * Test accommodation search specifically
 */

const API_BASE_URL = 'http://localhost:3000/api';

async function testAccommodationSearch() {
  console.log('🧪 Testing accommodation search...\n');

  try {
    // Test the exact query that was failing
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'what type of accomodation do you provide',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['faqs']
      })
    });

    const data = await response.json();
    console.log(`✅ Status: ${response.status}`);
    console.log(`✅ Search results: ${data.searchResults?.length || 0}`);
    
    if (data.searchResults?.length > 0) {
      console.log('✅ Found FAQs:');
      data.searchResults.forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.title}`);
        console.log(`      Content: ${result.content.substring(0, 100)}...`);
      });
    } else {
      console.log('❌ No FAQs found');
      console.log('Response content:', data.content?.substring(0, 200) || 'No content');
    }

    // Test with correct spelling
    console.log('\n🔍 Testing with correct spelling...');
    const response2 = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'what type of accommodation do you provide',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['faqs']
      })
    });

    const data2 = await response2.json();
    console.log(`✅ Status: ${response2.status}`);
    console.log(`✅ Search results: ${data2.searchResults?.length || 0}`);
    
    if (data2.searchResults?.length > 0) {
      console.log('✅ Found FAQs:');
      data2.searchResults.forEach((result, index) => {
        console.log(`   ${index + 1}. ${result.title}`);
      });
    }

    console.log('\n🎉 Accommodation search test complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testAccommodationSearch().catch(console.error);

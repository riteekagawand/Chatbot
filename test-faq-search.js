#!/usr/bin/env node

/**
 * Test FAQ search specifically
 */

const API_BASE_URL = 'http://localhost:3000/api';

async function testFAQSearch() {
  console.log('🧪 Testing FAQ search...\n');

  try {
    // Test with FAQ-related queries
    const queries = [
      'What are the frequently asked questions?',
      'Tell me about travel insurance',
      'How long does it take to process a refund?',
      'What type of accommodation is provided?',
      'Are flights included in the tour packages?'
    ];

    for (const query of queries) {
      console.log(`\n🔍 Testing: "${query}"`);
      
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          llmProvider: 'openai',
          llmApiKey: 'test-key',
          contentstackApiKey: 'blt354ba6a0b8b7e140',
          contentstackToken: 'cs7f1c6103726d54fe1978f31f',
          contentstackEnvironment: 'development',
          contentTypes: ['faqs']
        })
      });

      const data = await response.json();
      console.log(`   Status: ${response.status}`);
      console.log(`   Search results: ${data.searchResults?.length || 0}`);
      
      if (data.searchResults?.length > 0) {
        console.log('   Found FAQs:');
        data.searchResults.forEach((result, index) => {
          console.log(`     ${index + 1}. ${result.title} (${result.contentType})`);
        });
      } else {
        console.log('   No FAQs found');
      }
    }

    // Test with both content types
    console.log('\n🔍 Testing with both content types...');
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Tell me about tours and answer some questions',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['tour', 'faqs']
      })
    });

    const data = await response.json();
    console.log(`   Status: ${response.status}`);
    console.log(`   Search results: ${data.searchResults?.length || 0}`);
    
    if (data.searchResults?.length > 0) {
      console.log('   Found content:');
      const contentTypes = [...new Set(data.searchResults.map(r => r.contentType))];
      contentTypes.forEach(type => {
        const count = data.searchResults.filter(r => r.contentType === type).length;
        console.log(`     - ${type}: ${count} entries`);
      });
    }

    console.log('\n🎉 FAQ search testing complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testFAQSearch().catch(console.error);


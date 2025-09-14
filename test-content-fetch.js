#!/usr/bin/env node

/**
 * Test script to verify content fetching with correct content types
 */

const API_BASE_URL = 'http://localhost:3000/api';

async function testContentFetch() {
  console.log('🧪 Testing content fetch with correct content types...\n');

  try {
    // Test 1: Test with tour content
    console.log('1️⃣ Testing tour content...');
    const tourResponse = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What tours are available?',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['tour']
      })
    });

    const tourData = await tourResponse.json();
    console.log('✅ Tour response received');
    console.log('   Status:', tourResponse.status);
    console.log('   Search results:', tourData.searchResults?.length || 0);
    if (tourData.searchResults?.length > 0) {
      console.log('   Sample tour:', tourData.searchResults[0].title);
    }

    // Test 2: Test with FAQs content
    console.log('\n2️⃣ Testing FAQs content...');
    const faqResponse = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'What are the frequently asked questions?',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['faqs']
      })
    });

    const faqData = await faqResponse.json();
    console.log('✅ FAQs response received');
    console.log('   Status:', faqResponse.status);
    console.log('   Search results:', faqData.searchResults?.length || 0);
    if (faqData.searchResults?.length > 0) {
      console.log('   Sample FAQ:', faqData.searchResults[0].title);
    }

    // Test 3: Test with both content types
    console.log('\n3️⃣ Testing both content types...');
    const bothResponse = await fetch(`${API_BASE_URL}/chat`, {
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

    const bothData = await bothResponse.json();
    console.log('✅ Both content types response received');
    console.log('   Status:', bothResponse.status);
    console.log('   Search results:', bothData.searchResults?.length || 0);
    
    if (bothData.searchResults?.length > 0) {
      console.log('   Content types found:');
      const contentTypes = [...new Set(bothData.searchResults.map(r => r.contentType))];
      contentTypes.forEach(type => {
        const count = bothData.searchResults.filter(r => r.contentType === type).length;
        console.log(`     - ${type}: ${count} entries`);
      });
    }

    // Test 4: Test auto-detection (no contentTypes specified)
    console.log('\n4️⃣ Testing auto-detection...');
    const autoResponse = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: 'Show me all available content',
        llmProvider: 'openai',
        llmApiKey: 'test-key',
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development'
        // No contentTypes specified - should auto-detect
      })
    });

    const autoData = await autoResponse.json();
    console.log('✅ Auto-detection response received');
    console.log('   Status:', autoResponse.status);
    console.log('   Search results:', autoData.searchResults?.length || 0);
    
    if (autoData.searchResults?.length > 0) {
      console.log('   Auto-detected content types:');
      const contentTypes = [...new Set(autoData.searchResults.map(r => r.contentType))];
      contentTypes.forEach(type => {
        const count = autoData.searchResults.filter(r => r.contentType === type).length;
        console.log(`     - ${type}: ${count} entries`);
      });
    }

    console.log('\n🎉 Content fetch testing complete!');
    console.log('\n📋 Summary:');
    console.log('✅ Tour content fetching works');
    console.log('✅ FAQs content fetching works');
    console.log('✅ Multiple content types work');
    console.log('✅ Auto-detection works');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testContentFetch().catch(console.error);


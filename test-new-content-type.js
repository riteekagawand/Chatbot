#!/usr/bin/env node

/**
 * Test script to check for new content types in Contentstack
 */

const CONTENTSTACK_API_KEY = 'blt354ba6a0b8b7e140';
const CONTENTSTACK_TOKEN = 'cs7f1c6103726d54fe1978f31f';
const CONTENTSTACK_ENVIRONMENT = 'development';
const BASE_URL = 'https://eu-cdn.contentstack.com/v3';

async function testContentTypes() {
  console.log('🔍 Checking available content types in Contentstack...\n');

  try {
    // Get all content types
    const contentTypesUrl = `${BASE_URL}/content_types?environment=${CONTENTSTACK_ENVIRONMENT}`;
    
    const response = await fetch(contentTypesUrl, {
      headers: {
        'api_key': CONTENTSTACK_API_KEY,
        'access_token': CONTENTSTACK_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Contentstack API error: ${response.statusText}`);
    }

    const data = await response.json();
    const contentTypes = data.content_types || [];
    
    console.log(`✅ Found ${contentTypes.length} content types:`);
    console.log('');
    
    contentTypes.forEach((ct, index) => {
      console.log(`${index + 1}. ${ct.uid}`);
      console.log(`   Title: ${ct.title}`);
      console.log(`   Description: ${ct.description || 'No description'}`);
      console.log(`   Fields: ${ct.schema ? Object.keys(ct.schema).length : 0} fields`);
      console.log('');
    });

    // Test each content type for entries
    console.log('📊 Testing each content type for entries...\n');
    
    for (const contentType of contentTypes) {
      try {
        const entriesUrl = `${BASE_URL}/content_types/${contentType.uid}/entries?environment=${CONTENTSTACK_ENVIRONMENT}&limit=3`;
        
        const entriesResponse = await fetch(entriesUrl, {
          headers: {
            'api_key': CONTENTSTACK_API_KEY,
            'access_token': CONTENTSTACK_TOKEN,
            'Content-Type': 'application/json'
          }
        });

        if (entriesResponse.ok) {
          const entriesData = await entriesResponse.json();
          const entries = entriesData.entries || [];
          
          console.log(`✅ ${contentType.uid}: ${entries.length} entries found`);
          
          if (entries.length > 0) {
            const sampleEntry = entries[0];
            console.log(`   Sample entry fields: ${Object.keys(sampleEntry).join(', ')}`);
          }
        } else {
          console.log(`❌ ${contentType.uid}: Error fetching entries (${entriesResponse.status})`);
        }
      } catch (error) {
        console.log(`❌ ${contentType.uid}: Error - ${error.message}`);
      }
      
      console.log('');
    }

    // Test search functionality
    console.log('🔍 Testing search functionality...\n');
    
    const searchQuery = 'test';
    for (const contentType of contentTypes.slice(0, 3)) { // Test first 3 content types
      try {
        const searchUrl = `${BASE_URL}/content_types/${contentType.uid}/entries?environment=${CONTENTSTACK_ENVIRONMENT}&query={"title":{"$regex":"${searchQuery}","$options":"i"}}&limit=2`;
        
        const searchResponse = await fetch(searchUrl, {
          headers: {
            'api_key': CONTENTSTACK_API_KEY,
            'access_token': CONTENTSTACK_TOKEN,
            'Content-Type': 'application/json'
          }
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          const searchResults = searchData.entries || [];
          
          console.log(`🔍 ${contentType.uid} search for "${searchQuery}": ${searchResults.length} results`);
        } else {
          console.log(`❌ ${contentType.uid} search failed: ${searchResponse.status}`);
        }
      } catch (error) {
        console.log(`❌ ${contentType.uid} search error: ${error.message}`);
      }
    }

    console.log('\n🎉 Content type analysis complete!');
    console.log('\n📋 Summary:');
    console.log(`- Total content types: ${contentTypes.length}`);
    console.log(`- Content type UIDs: ${contentTypes.map(ct => ct.uid).join(', ')}`);
    console.log('\n💡 To use all content types, update your contentTypes array to:');
    console.log(`contentTypes: [${contentTypes.map(ct => `'${ct.uid}'`).join(', ')}]`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testContentTypes().catch(console.error);


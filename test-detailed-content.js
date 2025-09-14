#!/usr/bin/env node

/**
 * Detailed test to see what content is actually available
 */

const CONTENTSTACK_API_KEY = 'blt354ba6a0b8b7e140';
const CONTENTSTACK_TOKEN = 'cs7f1c6103726d54fe1978f31f';
const CONTENTSTACK_ENVIRONMENT = 'development';
const BASE_URL = 'https://eu-cdn.contentstack.com/v3';

async function testDetailedContent() {
  console.log('🔍 Detailed content analysis...\n');

  try {
    // Test 1: Get all tours without search
    console.log('1️⃣ Getting all tours...');
    const toursUrl = `${BASE_URL}/content_types/tour/entries?environment=${CONTENTSTACK_ENVIRONMENT}&limit=5`;
    
    const toursResponse = await fetch(toursUrl, {
      headers: {
        'api_key': CONTENTSTACK_API_KEY,
        'access_token': CONTENTSTACK_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (toursResponse.ok) {
      const toursData = await toursResponse.json();
      const tours = toursData.entries || [];
      
      console.log(`✅ Found ${tours.length} tours`);
      
      tours.forEach((tour, index) => {
        console.log(`\n   Tour ${index + 1}:`);
        console.log(`     Title: ${tour.title}`);
        console.log(`     Description: ${tour.description || 'No description'}`);
        console.log(`     Country: ${tour.country || 'No country'}`);
        console.log(`     Price: ${tour.price || 'No price'}`);
        console.log(`     Duration: ${tour.duration || 'No duration'}`);
        console.log(`     Tags: ${tour.tags ? tour.tags.join(', ') : 'No tags'}`);
      });
    } else {
      console.log(`❌ Tours error: ${toursResponse.status} ${toursResponse.statusText}`);
    }

    // Test 2: Get all FAQs without search
    console.log('\n2️⃣ Getting all FAQs...');
    const faqsUrl = `${BASE_URL}/content_types/faqs/entries?environment=${CONTENTSTACK_ENVIRONMENT}&limit=5`;
    
    const faqsResponse = await fetch(faqsUrl, {
      headers: {
        'api_key': CONTENTSTACK_API_KEY,
        'access_token': CONTENTSTACK_TOKEN,
        'Content-Type': 'application/json'
      }
    });

    if (faqsResponse.ok) {
      const faqsData = await faqsResponse.json();
      const faqs = faqsData.entries || [];
      
      console.log(`✅ Found ${faqs.length} FAQs`);
      
      faqs.forEach((faq, index) => {
        console.log(`\n   FAQ ${index + 1}:`);
        console.log(`     Question: ${faq.question}`);
        console.log(`     Answer: ${faq.answers || 'No answer'}`);
        console.log(`     Tags: ${faq.tags ? faq.tags.join(', ') : 'No tags'}`);
      });
    } else {
      console.log(`❌ FAQs error: ${faqsResponse.status} ${faqsResponse.statusText}`);
    }

    // Test 3: Test search with different queries
    console.log('\n3️⃣ Testing search queries...');
    
    const searchQueries = ['swiss', 'alps', 'mountain', 'travel', 'tour'];
    
    for (const query of searchQueries) {
      console.log(`\n   Searching for "${query}" in tours...`);
      
      const searchUrl = `${BASE_URL}/content_types/tour/entries?environment=${CONTENTSTACK_ENVIRONMENT}&query={"title":{"$regex":"${query}","$options":"i"}}&limit=3`;
      
      const searchResponse = await fetch(searchUrl, {
        headers: {
          'api_key': CONTENTSTACK_API_KEY,
          'access_token': CONTENTSTACK_TOKEN,
          'Content-Type': 'application/json'
        }
      });

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        const results = searchData.entries || [];
        console.log(`     Results: ${results.length}`);
        
        if (results.length > 0) {
          results.forEach((result, index) => {
            console.log(`       ${index + 1}. ${result.title}`);
          });
        }
      } else {
        console.log(`     Error: ${searchResponse.status}`);
      }
    }

    console.log('\n🎉 Detailed content analysis complete!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testDetailedContent().catch(console.error);


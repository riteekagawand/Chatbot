#!/usr/bin/env node

/**
 * Test the searchAllContent function directly
 */

const CONTENTSTACK_API_KEY = 'blt354ba6a0b8b7e140';
const CONTENTSTACK_TOKEN = 'cs7f1c6103726d54fe1978f31f';
const CONTENTSTACK_ENVIRONMENT = 'development';
const BASE_URL = 'https://eu-cdn.contentstack.com/v3';

class ContentstackService {
  constructor(credentials) {
    this.apiKey = credentials.apiKey;
    this.deliveryToken = credentials.deliveryToken;
    this.environment = credentials.environment || 'development';
    this.baseUrl = BASE_URL;
  }

  async searchContent(query) {
    try {
      const contentType = query.contentType;
      const searchQuery = query.query || '';
      const limit = query.limit || 10;
      
      let url = `${this.baseUrl}/content_types/${contentType}/entries?environment=${this.environment}&limit=${limit}`;
      
      if (searchQuery) {
        const queryStr = JSON.stringify({"title":{"$regex":searchQuery,"$options":"i"}});
        url += `&query=${encodeURIComponent(queryStr)}`;
      }

      console.log(`Searching ${contentType} with query "${searchQuery}": ${url}`);

      const response = await fetch(url, {
        headers: {
          'api_key': this.apiKey,
          'access_token': this.deliveryToken,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Contentstack API error: ${response.statusText}`);
      }

      const data = await response.json();
      
      const results = data.entries?.map((entry) => ({
        uid: entry.uid,
        title: entry.title || entry.question || 'Untitled',
        content: this.extractContent(entry, contentType),
        contentType: contentType,
        metadata: {
          ...entry,
          url: entry.url || `/${contentType}/${entry.uid}`
        }
      })) || [];

      console.log(`Found ${results.length} results for ${contentType}`);
      return results;

    } catch (error) {
      console.error(`Error searching ${query.contentType}:`, error);
      throw error;
    }
  }

  async searchAllContent(query, contentTypes = ['tour', 'faqs']) {
    console.log(`\n🔍 searchAllContent called with query: "${query}", contentTypes: [${contentTypes.join(', ')}]`);
    
    const allResults = [];
    
    for (const contentType of contentTypes) {
      try {
        console.log(`\nSearching ${contentType}...`);
        const results = await this.searchContent({
          contentType,
          query,
          limit: 5
        });
        console.log(`Results for ${contentType}: ${results.length}`);
        allResults.push(...results);
      } catch (error) {
        console.error(`Error searching ${contentType}:`, error.message);
        // Continue with other content types
      }
    }
    
    console.log(`\nTotal results: ${allResults.length}`);
    return allResults;
  }

  extractContent(entry, contentType) {
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
}

async function testSearchAll() {
  console.log('🧪 Testing searchAllContent function...\n');

  try {
    const service = new ContentstackService({
      apiKey: CONTENTSTACK_API_KEY,
      deliveryToken: CONTENTSTACK_TOKEN,
      environment: CONTENTSTACK_ENVIRONMENT
    });

    // Test with "swiss" query
    const results = await service.searchAllContent('swiss', ['tour', 'faqs']);
    
    console.log('\n🎉 Final results:');
    console.log(`Total results: ${results.length}`);
    
    results.forEach((result, index) => {
      console.log(`\n${index + 1}. ${result.title} (${result.contentType})`);
      console.log(`   Content: ${result.content.substring(0, 100)}...`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run the test
testSearchAll().catch(console.error);


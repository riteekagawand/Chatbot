// Test script for the chatbot API with mock data (bypassing LLM)
async function testChatbotWithMockData() {
  const testMessage = "What is the price of Swiss Alps Adventure tour?";
  
  try {
    console.log('🤖 Testing chatbot with mock data for message:', testMessage);
    
    // Simulate the search logic from the API
    const { searchMockTours } = require('./packages/chat-bot-demo/lib/mockTourData.js');
    
    // Check if this is a tour-related query
    const isTourQuery = /\b(tour|trip|travel|visit|explore|adventure|journey|excursion|destination|vacation|holiday|swiss|alps|price|cost)\b/i.test(testMessage);
    
    console.log('Is tour query:', isTourQuery);
    
    if (isTourQuery) {
      console.log('Searching mock data...');
      // Extract key terms from the message for better searching
      const keyTerms = testMessage.toLowerCase().match(/\b(swiss|alps|adventure|tour|price|cost|matterhorn|jungfraujoch|zermatt|interlaken)\b/g) || [];
      console.log('Key terms found:', keyTerms);
      
      let mockResults = [];
      if (keyTerms.length > 0) {
        // Search with the first key term that might match
        const searchTerm = keyTerms.find(term => ['swiss', 'alps', 'adventure', 'tour'].includes(term)) || keyTerms[0];
        console.log('Searching with term:', searchTerm);
        mockResults = searchMockTours(searchTerm);
      } else {
        // Fallback to searching the whole message
        mockResults = searchMockTours(testMessage);
      }
      
      console.log('Found', mockResults.length, 'mock tour results');
      
      if (mockResults.length > 0) {
        console.log('\n✅ Mock Data Response:');
        console.log('==================');
        
        mockResults.forEach((tour, index) => {
          console.log(`${index + 1}. ${tour.title}`);
          console.log(`   Price: ${tour.price}`);
          console.log(`   Location: ${tour.location}`);
          console.log(`   Duration: ${tour.duration}`);
          console.log(`   Difficulty: ${tour.difficulty}`);
          console.log(`   Highlights: ${tour.highlights.join(', ')}`);
          console.log(`   Included: ${tour.included.join(', ')}`);
          console.log(`   Requirements: ${tour.requirements}`);
          console.log(`   Best Season: ${tour.season}`);
          console.log('');
        });
        
        console.log('This is what the chatbot would return when Contentstack is not available!');
        console.log('==================');
      } else {
        console.log('No mock results found');
      }
    } else {
      console.log('Not a tour query, would use general LLM response');
    }
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Run the test
testChatbotWithMockData();

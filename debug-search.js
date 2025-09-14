// Debug the search function
const { searchMockTours, mockTours } = require('./packages/chat-bot-demo/lib/mockTourData.js');

const testMessage = "What is the price of Swiss Alps Adventure tour?";

console.log('Test message:', testMessage);
console.log('Available tours:', mockTours.map(t => t.title));

// Test different search terms
const searchTerms = ['Swiss', 'Alps', 'Swiss Alps', 'adventure', 'price', 'Swiss Alps Adventure'];

searchTerms.forEach(term => {
  console.log(`\nSearching for "${term}":`);
  const results = searchMockTours(term);
  console.log(`Found ${results.length} results:`, results.map(r => r.title));
});

// Test the regex
const isTourQuery = /\b(tour|trip|travel|visit|explore|adventure|journey|excursion|destination|vacation|holiday|swiss|alps|price|cost)\b/i.test(testMessage);
console.log('\nIs tour query:', isTourQuery);

// Test individual words
const words = testMessage.toLowerCase().split(' ');
console.log('\nIndividual words:', words);

words.forEach(word => {
  const results = searchMockTours(word);
  console.log(`Word "${word}": ${results.length} results`);
});

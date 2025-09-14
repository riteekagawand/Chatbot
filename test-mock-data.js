// Test script to verify mock tour data is working
const { searchMockTours, getTourByTitle } = require('./packages/chat-bot-demo/lib/mockTourData.js');

async function testMockData() {
  console.log('🏔️ Testing mock tour data...');
  
  // Test 1: Search for Swiss Alps
  console.log('\n1. Searching for "Swiss Alps"...');
  const swissResults = searchMockTours('Swiss Alps');
  console.log('Found', swissResults.length, 'results:');
  swissResults.forEach((tour, index) => {
    console.log(`${index + 1}. ${tour.title}`);
    console.log(`   Price: ${tour.price}`);
    console.log(`   Location: ${tour.location}`);
    console.log(`   Duration: ${tour.duration}`);
    console.log('');
  });
  
  // Test 2: Search for "adventure"
  console.log('\n2. Searching for "adventure"...');
  const adventureResults = searchMockTours('adventure');
  console.log('Found', adventureResults.length, 'results:');
  adventureResults.forEach((tour, index) => {
    console.log(`${index + 1}. ${tour.title}`);
    console.log(`   Price: ${tour.price}`);
    console.log('');
  });
  
  // Test 3: Get specific tour by title
  console.log('\n3. Getting "Swiss Alps Adventure Tour"...');
  const specificTour = getTourByTitle('Swiss Alps Adventure Tour');
  if (specificTour) {
    console.log('✅ Found specific tour:');
    console.log('Title:', specificTour.title);
    console.log('Price:', specificTour.price);
    console.log('Location:', specificTour.location);
    console.log('Duration:', specificTour.duration);
    console.log('Difficulty:', specificTour.difficulty);
    console.log('Highlights:', specificTour.highlights.join(', '));
    console.log('Included:', specificTour.included.join(', '));
    console.log('Requirements:', specificTour.requirements);
    console.log('Best Season:', specificTour.season);
  } else {
    console.log('❌ Tour not found');
  }
}

// Run the test
testMockData().catch(console.error);

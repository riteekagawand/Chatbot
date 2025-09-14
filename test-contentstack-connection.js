// Test script to verify Contentstack connection and create sample tour data
// Using built-in fetch (Node.js 18+)

async function testContentstackConnection() {
  // Your Contentstack credentials from the demo page
  const apiKey = 'blt354ba6a0b8b7e140';
  const deliveryToken = 'cs7f1c6103726d54fe1978f31f';
  const environment = 'development'; // Match the environment selected in Contentstack
  
  console.log('🔍 Testing Contentstack connection...');
  console.log('API Key:', apiKey.substring(0, 10) + '...');
  console.log('Environment:', environment);
  
  try {
    // Test 1: Check if content types exist
    console.log('\n1. Checking content types...');
    const contentTypesUrl = `https://eu-cdn.contentstack.com/v3/content_types?environment=${environment}`;
    const contentTypesResponse = await fetch(contentTypesUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    if (contentTypesResponse.ok) {
      const contentTypesData = await contentTypesResponse.json();
      console.log('✅ Content types found:', contentTypesData.content_types?.map(ct => ct.uid) || []);
      
      // Check if 'tour' content type exists
      const hasTourContentType = contentTypesData.content_types?.some(ct => ct.uid === 'tour');
      if (!hasTourContentType) {
        console.log('❌ No "tour" content type found. You need to create it in Contentstack CMS.');
        console.log('   Go to: https://app.contentstack.com/ and create a "tour" content type with these fields:');
        console.log('   - title (Single Line Textbox)');
        console.log('   - description (Richtext)');
        console.log('   - location (Single Line Textbox)');
        console.log('   - price (Single Line Textbox)');
        console.log('   - duration (Single Line Textbox)');
        console.log('   - difficulty (Single Line Textbox)');
        console.log('   - highlights (Modular Blocks or Multi Line Textbox)');
        console.log('   - included (Multi Line Textbox)');
        console.log('   - requirements (Multi Line Textbox)');
        console.log('   - season (Single Line Textbox)');
        return;
      }
    } else {
      console.log('❌ Content types error:', contentTypesResponse.status, await contentTypesResponse.text());
      return;
    }
    
    // Test 2: Check existing tour entries
    console.log('\n2. Checking existing tour entries...');
    const tourUrl = `https://eu-cdn.contentstack.com/v3/content_types/tour/entries?environment=${environment}&limit=10`;
    const tourResponse = await fetch(tourUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    if (tourResponse.ok) {
      const tourData = await tourResponse.json();
      console.log('✅ Tour entries found:', tourData.entries?.length || 0);
      
      if (tourData.entries?.length > 0) {
        console.log('\n📋 Existing tours:');
        tourData.entries.forEach((tour, index) => {
          console.log(`${index + 1}. ${tour.title || 'Untitled'}`);
          console.log(`   Price: ${tour.price || 'Not set'}`);
          console.log(`   Location: ${tour.location || 'Not set'}`);
          console.log(`   Description: ${tour.description?.substring(0, 100) || 'Not set'}...`);
          console.log('');
        });
        
        // Check if Swiss Alps tour exists
        const swissAlpsTour = tourData.entries.find(tour => 
          tour.title && tour.title.toLowerCase().includes('swiss') && 
          tour.title.toLowerCase().includes('alps')
        );
        
        if (swissAlpsTour) {
          console.log('🎉 Found Swiss Alps tour!');
          console.log('   Title:', swissAlpsTour.title);
          console.log('   Price:', swissAlpsTour.price || 'Not set');
          console.log('   Location:', swissAlpsTour.location || 'Not set');
        } else {
          console.log('❌ No Swiss Alps Adventure tour found in your database.');
          console.log('   You need to create this tour in Contentstack CMS.');
        }
      } else {
        console.log('❌ No tour entries found. You need to create some tours in Contentstack CMS.');
      }
    } else {
      console.log('❌ Tour entries error:', tourResponse.status, await tourResponse.text());
    }
    
    // Test 3: Search for Swiss Alps specifically
    console.log('\n3. Searching for Swiss Alps tours...');
    const searchUrl = `https://eu-cdn.contentstack.com/v3/content_types/tour/entries?environment=${environment}&limit=5&query={"title":{"$regex":"Swiss","$options":"i"}}`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    if (searchResponse.ok) {
      const searchData = await searchResponse.json();
      console.log('✅ Swiss Alps search results:', searchData.entries?.length || 0);
      
      if (searchData.entries?.length > 0) {
        console.log('\n🏔️ Swiss Alps tours found:');
        searchData.entries.forEach((tour, index) => {
          console.log(`${index + 1}. ${tour.title}`);
          console.log(`   Price: ${tour.price || 'Not set'}`);
          console.log(`   Location: ${tour.location || 'Not set'}`);
        });
      } else {
        console.log('❌ No Swiss Alps tours found in search results.');
      }
    } else {
      console.log('❌ Swiss Alps search error:', searchResponse.status, await searchResponse.text());
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testContentstackConnection();

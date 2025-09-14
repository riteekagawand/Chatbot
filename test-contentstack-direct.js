// Direct test of Contentstack API with the exact credentials from the demo
async function testContentstackDirect() {
  const apiKey = 'blt354ba6a0b8b7e140';
  const deliveryToken = 'cs7f1c6103726d54fe1978f31f';
  const environment = 'development';
  
  console.log('🔍 Testing Contentstack API directly...');
  console.log('API Key:', apiKey.substring(0, 10) + '...');
  console.log('Environment:', environment);
  
  try {
    // Test 1: Get content types
    console.log('\n1. Getting content types...');
    const contentTypesUrl = `https://eu-cdn.contentstack.com/v3/content_types?environment=${environment}`;
    const contentTypesResponse = await fetch(contentTypesUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Content types response status:', contentTypesResponse.status);
    
    if (contentTypesResponse.ok) {
      const contentTypesData = await contentTypesResponse.json();
      console.log('✅ Content types found:', contentTypesData.content_types?.map(ct => ct.uid) || []);
      
      // Check if 'tour' content type exists
      const hasTourContentType = contentTypesData.content_types?.some(ct => ct.uid === 'tour');
      if (hasTourContentType) {
        console.log('✅ "tour" content type exists');
        
        // Test 2: Get tour entries
        console.log('\n2. Getting tour entries...');
        const tourUrl = `https://eu-cdn.contentstack.com/v3/content_types/tour/entries?environment=${environment}&limit=10`;
        const tourResponse = await fetch(tourUrl, {
          headers: {
            'api_key': apiKey,
            'access_token': deliveryToken,
            'Content-Type': 'application/json'
          }
        });
        
        console.log('Tour entries response status:', tourResponse.status);
        
        if (tourResponse.ok) {
          const tourData = await tourResponse.json();
          console.log('✅ Tour entries found:', tourData.entries?.length || 0);
          
          if (tourData.entries?.length > 0) {
            console.log('\n📋 Existing tours:');
            tourData.entries.forEach((tour, index) => {
              console.log(`${index + 1}. ${tour.title || 'Untitled'}`);
              console.log(`   UID: ${tour.uid}`);
              console.log(`   Price: ${tour.price || 'Not set'}`);
              console.log(`   Location: ${tour.location || 'Not set'}`);
              console.log(`   Description: ${tour.description?.substring(0, 100) || 'Not set'}...`);
              console.log('');
            });
          } else {
            console.log('❌ No tour entries found. You need to create tours in Contentstack CMS.');
            console.log('\n📝 To create a Swiss Alps Adventure tour:');
            console.log('1. Go to https://app.contentstack.com/');
            console.log('2. Navigate to your "Tourism Portal" stack');
            console.log('3. Go to Content > Tour');
            console.log('4. Create a new entry with these fields:');
            console.log('   - Title: "Swiss Alps Adventure Tour"');
            console.log('   - Price: "€1,299 per person"');
            console.log('   - Location: "Swiss Alps, Switzerland"');
            console.log('   - Description: "Experience the breathtaking beauty..."');
            console.log('   - Duration: "7 days / 6 nights"');
            console.log('   - Difficulty: "Moderate to Challenging"');
            console.log('   - Highlights: ["Matterhorn views", "Jungfraujoch", ...]');
            console.log('   - Included: ["Accommodation", "Meals", ...]');
            console.log('   - Requirements: "Good physical condition..."');
            console.log('   - Season: "May to October"');
            console.log('5. Publish the entry');
          }
        } else {
          const errorText = await tourResponse.text();
          console.log('❌ Tour entries error:', tourResponse.status, errorText);
        }
        
      } else {
        console.log('❌ No "tour" content type found. You need to create it in Contentstack CMS.');
        console.log('\n📝 To create the tour content type:');
        console.log('1. Go to https://app.contentstack.com/');
        console.log('2. Navigate to your "Tourism Portal" stack');
        console.log('3. Go to Content Types > Create New');
        console.log('4. Create a content type called "tour" with these fields:');
        console.log('   - title (Single Line Textbox)');
        console.log('   - description (Richtext)');
        console.log('   - location (Single Line Textbox)');
        console.log('   - price (Single Line Textbox)');
        console.log('   - duration (Single Line Textbox)');
        console.log('   - difficulty (Single Line Textbox)');
        console.log('   - highlights (Multi Line Textbox)');
        console.log('   - included (Multi Line Textbox)');
        console.log('   - requirements (Multi Line Textbox)');
        console.log('   - season (Single Line Textbox)');
        console.log('5. Save and publish the content type');
      }
      
    } else {
      const errorText = await contentTypesResponse.text();
      console.log('❌ Content types error:', contentTypesResponse.status, errorText);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testContentstackDirect();

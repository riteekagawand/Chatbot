// Test the API and show server logs
async function testAPIWithLogs() {
  const testMessage = "What is the price of Swiss Alps Adventure tour?";
  
  try {
    console.log('🤖 Testing API with server logs for:', testMessage);
    console.log('Make sure to check the server terminal for debug output...\n');
    
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: testMessage,
        llmProvider: 'openai',
        llmApiKey: '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',
        llmModel: 'gpt-3.5-turbo',
        // Add Contentstack credentials
        contentstackApiKey: 'blt354ba6a0b8b7e140',
        contentstackToken: 'cs7f1c6103726d54fe1978f31f',
        contentstackEnvironment: 'development',
        contentTypes: ['tour', 'faq', 'blog']
      })
    });
    
    console.log('API Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:', response.status, errorText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ API Response:');
    console.log('==================');
    console.log(data.content);
    console.log('==================');
    
    console.log('\n📝 Check the server terminal for debug output showing:');
    console.log('- Contentstack credentials check');
    console.log('- Contentstack service initialization');
    console.log('- Search results');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
  }
}

// Run the test
testAPIWithLogs();

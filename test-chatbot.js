// Test script for the chatbot API
async function testChatbot() {
  const testMessage = "What is the price of Swiss Alps Adventure tour?";
  
  try {
    console.log('🤖 Testing chatbot with message:', testMessage);
    
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: testMessage,
        llmProvider: 'openai',
        llmApiKey: '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',
        llmModel: 'gpt-3.5-turbo'
      })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ API Error:', response.status, errorText);
      return;
    }
    
    const data = await response.json();
    console.log('✅ Chatbot Response:');
    console.log('==================');
    console.log(data.content);
    console.log('==================');
    
  } catch (error) {
    console.log('❌ Test failed:', error.message);
    console.log('Make sure the server is running on http://localhost:3001');
  }
}

// Run the test
testChatbot();

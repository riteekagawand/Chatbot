// Simple Chatbot API for your website
// Add this to your existing website project

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Contentstack configuration
const CONTENTSTACK_CONFIG = {
    apiKey: 'blt354ba6a0b8b7e140',
    deliveryToken: 'cs7f1c6103726d54fe1978f31f',
    environment: 'development',
    baseUrl: 'https://eu-cdn.contentstack.com/v3'
};

// Simple chatbot endpoint
app.post('/api/chatbot', async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        // Search Contentstack for relevant content
        const contentstackResults = await searchContentstack(message);
        
        // Create a simple response based on the content
        const response = createResponse(message, contentstackResults);
        
        res.json({
            content: response,
            results: contentstackResults,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ 
            error: 'Sorry, I encountered an error. Please try again.',
            details: error.message 
        });
    }
});

// Search Contentstack function
async function searchContentstack(query) {
    const results = [];
    
    try {
        // Search tours
        const toursUrl = `${CONTENTSTACK_CONFIG.baseUrl}/content_types/tour/entries?environment=${CONTENTSTACK_CONFIG.environment}&limit=5`;
        const toursResponse = await fetch(toursUrl, {
            headers: {
                'api_key': CONTENTSTACK_CONFIG.apiKey,
                'access_token': CONTENTSTACK_CONFIG.deliveryToken,
                'Content-Type': 'application/json'
            }
        });
        
        if (toursResponse.ok) {
            const toursData = await toursResponse.json();
            results.push(...(toursData.entries || []));
        }
        
        // Search FAQs
        const faqsUrl = `${CONTENTSTACK_CONFIG.baseUrl}/content_types/faqs/entries?environment=${CONTENTSTACK_CONFIG.environment}&limit=5`;
        const faqsResponse = await fetch(faqsUrl, {
            headers: {
                'api_key': CONTENTSTACK_CONFIG.apiKey,
                'access_token': CONTENTSTACK_CONFIG.deliveryToken,
                'Content-Type': 'application/json'
            }
        });
        
        if (faqsResponse.ok) {
            const faqsData = await faqsResponse.json();
            results.push(...(faqsData.entries || []));
        }
        
    } catch (error) {
        console.error('Contentstack search error:', error);
    }
    
    return results;
}

// Create response based on content
function createResponse(message, results) {
    const lowerMessage = message.toLowerCase();
    
    // Check if asking about tours
    if (lowerMessage.includes('tour') || lowerMessage.includes('travel') || lowerMessage.includes('trip')) {
        const tours = results.filter(item => item.content_type === 'tour' || item.uid?.startsWith('blt'));
        
        if (tours.length > 0) {
            let response = `I found ${tours.length} tour(s) that might interest you:\n\n`;
            tours.slice(0, 3).forEach((tour, index) => {
                response += `${index + 1}. **${tour.title}**\n`;
                if (tour.description) response += `   ${tour.description}\n`;
                if (tour.country) response += `   Country: ${tour.country}\n`;
                if (tour.price) response += `   Price: $${tour.price}\n`;
                if (tour.duration) response += `   Duration: ${tour.duration}\n\n`;
            });
            return response;
        }
    }
    
    // Check if asking about FAQs
    if (lowerMessage.includes('faq') || lowerMessage.includes('question') || lowerMessage.includes('help')) {
        const faqs = results.filter(item => item.question || item.answers);
        
        if (faqs.length > 0) {
            let response = `Here are some frequently asked questions:\n\n`;
            faqs.slice(0, 3).forEach((faq, index) => {
                response += `${index + 1}. **${faq.question || faq.title}**\n`;
                if (faq.answers) response += `   ${faq.answers}\n\n`;
            });
            return response;
        }
    }
    
    // General response
    if (results.length > 0) {
        return `I found some relevant information in our database. We have ${results.length} items that might help answer your question. Could you be more specific about what you're looking for?`;
    }
    
    return `I'm here to help with information about our tours and travel services. You can ask me about:\n\n• Available tours and destinations\n• Pricing and duration\n• Frequently asked questions\n• Travel planning assistance\n\nWhat would you like to know?`;
}

// Health check endpoint
app.get('/api/chatbot/health', (req, res) => {
    res.json({ 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        message: 'Chatbot API is running'
    });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Chatbot API running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/chatbot/health`);
    console.log(`Chat endpoint: http://localhost:${PORT}/api/chatbot`);
});

module.exports = app;

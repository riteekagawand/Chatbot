import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    console.log('Testing Contentstack API connection...');
    
    // Test basic Contentstack API call
    const apiKey = 'blt354ba6a0b8b7e140';
    const deliveryToken = 'cs7f1c6103726d54fe1978f31f';
    const environment = 'development';
    const baseUrl = 'https://eu-cdn.contentstack.com/v3';
    
    // First, try to get content types
    const contentTypesUrl = `${baseUrl}/content_types?environment=${environment}`;
    console.log('Fetching content types from:', contentTypesUrl);
    
    const response = await fetch(contentTypesUrl, {
      headers: {
        'api_key': apiKey,
        'access_token': deliveryToken,
        'Content-Type': 'application/json'
      }
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Contentstack API error:', errorText);
      return NextResponse.json({
        error: `Contentstack API error: ${response.status} ${response.statusText}`,
        details: errorText,
        url: contentTypesUrl
      }, { status: 500 });
    }

    const data = await response.json();
    console.log('Contentstack response:', JSON.stringify(data, null, 2));

    return NextResponse.json({
      success: true,
      contentTypes: data.content_types?.map((ct: any) => ({
        uid: ct.uid,
        title: ct.title,
        schema: ct.schema
      })) || [],
      totalTypes: data.content_types?.length || 0,
      rawResponse: data
    });

  } catch (error: any) {
    console.error('Test Contentstack error:', error);
    return NextResponse.json({
      error: error.message || 'Failed to test Contentstack',
      stack: error.stack
    }, { status: 500 });
  }
}

"use client"
import { useState } from 'react'

export default function TestContentstack() {
  const [apiKey, setApiKey] = useState('')
  const [deliveryToken, setDeliveryToken] = useState('')
  const [environment, setEnvironment] = useState('development')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    if (!apiKey || !deliveryToken) {
      setResult('Please enter both API Key and Delivery Token')
      return
    }

    setLoading(true)
    setResult('Testing connection...')

    try {
      const response = await fetch('/api/test-contentstack', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey,
          deliveryToken,
          environment
        }),
      })

      const data = await response.json()
      
      if (response.ok) {
        setResult(`✅ Success! Found ${data.entries?.length || 0} tour entries:\n\n${JSON.stringify(data, null, 2)}`)
      } else {
        setResult(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setResult(`❌ Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Test Contentstack Connection</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Key (starts with blt...)
            </label>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="blt_your_api_key_here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Token (starts with cs...)
            </label>
            <input
              type="password"
              value={deliveryToken}
              onChange={(e) => setDeliveryToken(e.target.value)}
              placeholder="cs_your_delivery_token_here"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Environment
            </label>
            <select
              value={environment}
              onChange={(e) => setEnvironment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="development">Development</option>
              <option value="production">Production</option>
            </select>
          </div>

          <button
            onClick={testConnection}
            disabled={loading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Testing...' : 'Test Connection'}
          </button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

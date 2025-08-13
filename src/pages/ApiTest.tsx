import React, { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function ApiTest() {
  const [healthResult, setHealthResult] = useState('')
  const [humanizeResult, setHumanizeResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testHealth = async () => {
    setLoading(true)
    try {
      // Test both direct API and proxied API
      const directResponse = await fetch('http://localhost:3001/health')
      const directData = await directResponse.json()
      
      // Try proxy (might fail due to CORS or config issue)
      let proxyResult = 'Failed to connect via proxy'
      try {
        const proxyResponse = await fetch('/api/health')
        const proxyData = await proxyResponse.json()
        proxyResult = `Proxy: ${proxyData.status} at ${proxyData.timestamp}`
      } catch (proxyError) {
        proxyResult = `Proxy failed: ${proxyError.message}`
      }
      
      setHealthResult(`
Direct API: ${directData.status} at ${directData.timestamp}
${proxyResult}
      `)
    } catch (error) {
      setHealthResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  const testHumanize = async () => {
    setLoading(true)
    try {
      const testData = {
        text: "This is a test of the AI text humanization system functionality.",
        style: "CASUAL",
        length: "PRESERVE"
      }

      // Test direct API call
      const response = await fetch('http://localhost:3001/humanize/quick', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testData)
      })

      if (response.ok) {
        const data = await response.json()
        setHumanizeResult(`Success: ${JSON.stringify(data, null, 2)}`)
      } else {
        setHumanizeResult(`Error: ${response.status} ${response.statusText}`)
      }
    } catch (error) {
      setHumanizeResult(`Error: ${error.message}`)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">API Test Page</h1>
      
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Health Check Test</h2>
          <Button onClick={testHealth} disabled={loading}>
            Test Health Endpoint
          </Button>
          {healthResult && (
            <pre className="mt-4 p-4 bg-gray-800 rounded text-sm whitespace-pre-wrap">
              {healthResult}
            </pre>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Humanization Test</h2>
          <Button onClick={testHumanize} disabled={loading}>
            Test Humanize Endpoint
          </Button>
          {humanizeResult && (
            <pre className="mt-4 p-4 bg-gray-800 rounded text-sm whitespace-pre-wrap">
              {humanizeResult}
            </pre>
          )}
        </div>

        <div className="text-sm text-gray-400">
          <p><strong>Note:</strong> This test page helps verify API functionality.</p>
          <p>Direct API calls are made to http://localhost:3001</p>
          <p>Proxy calls are made to /api/* (may need CORS configuration)</p>
        </div>
      </div>
    </div>
  )
}
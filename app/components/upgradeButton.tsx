'use client'

import { useState } from 'react'

const UpgradeButton = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpgrade = async () => {
    setLoading(true)
    setError('')
    
    try {
      console.log('Sending request to /api/mollie')
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.checkoutUrl) {
        console.log('Redirecting to:', data.checkoutUrl)
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating payment:', error)
      setError('Failed to process payment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleUpgrade}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing...' : 'Upgrade to Premium'}
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default UpgradeButton
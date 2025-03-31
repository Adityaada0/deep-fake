import React from 'react'

function Contact() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">We'll be back soon!</h1>
      <p className="text-lg text-gray-600 mb-8">
        We're currently performing some maintenance. We'll be back up shortly. Thanks for your patience.
      </p>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75 mx-auto"></div>
    </div>
  </div>

  )
}

export default Contact
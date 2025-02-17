// src/app/components/BackButton.tsx
'use client'

export default function BackButton() {
  const handleBack = () => {
    window.location.href = '/index.html'
  }

  return (
    <button
      onClick={handleBack}
      className="fixed top-4 left-4 px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors"
    >
      ← Back to Main
    </button>
  )
}
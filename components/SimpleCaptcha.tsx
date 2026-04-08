'use client'

import { useState, useEffect } from 'react'

interface SimpleCaptchaProps {
  onVerify: (isValid: boolean) => void
}

export default function SimpleCaptcha({ onVerify }: SimpleCaptchaProps) {
  const [num1] = useState(Math.floor(Math.random() * 10) + 1)
  const [num2] = useState(Math.floor(Math.random() * 10) + 1)
  const [answer, setAnswer] = useState('')
  const [startTime] = useState(Date.now())

  useEffect(() => {
    const correctAnswer = num1 + num2
    const isCorrect = parseInt(answer) === correctAnswer
    const timeTaken = Date.now() - startTime
    
    // Vérifier que l'utilisateur a pris au moins 3 secondes (anti-bot)
    const isHuman = timeTaken > 3000
    
    onVerify(isCorrect && isHuman && answer !== '')
  }, [answer, num1, num2, startTime, onVerify])

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Vérification anti-spam *
      </label>
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-gray-900">
          {num1} + {num2} =
        </span>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
          placeholder="?"
          required
        />
      </div>
      <p className="text-xs text-gray-500">
        Résolvez cette simple addition pour prouver que vous n'êtes pas un robot
      </p>
      
      {/* Honeypot field - caché pour les humains, visible pour les bots */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="absolute opacity-0 pointer-events-none"
        aria-hidden="true"
      />
    </div>
  )
}

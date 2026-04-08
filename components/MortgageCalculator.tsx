'use client'

import { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Shield, Info } from 'lucide-react'

interface MortgageCalculatorProps {
  initialAmount?: number
}

export default function MortgageCalculator({ initialAmount = 250000 }: MortgageCalculatorProps) {
  const [amount, setAmount] = useState(initialAmount) // Montant emprunté
  const [duration, setDuration] = useState(20) // Durée en années
  const [rate, setRate] = useState(3.5) // Taux d'intérêt
  const [insurance, setInsurance] = useState(0.36) // Taux d'assurance

  // Calculs
  const [monthlyPayment, setMonthlyPayment] = useState(0)
  const [monthlyInsurance, setMonthlyInsurance] = useState(0)
  const [totalCost, setTotalCost] = useState(0)
  const [totalInsuranceCost, setTotalInsuranceCost] = useState(0)
  const [totalInterest, setTotalInterest] = useState(0)

  useEffect(() => {
    setAmount(initialAmount)
  }, [initialAmount])

  useEffect(() => {
    calculateMortgage()
  }, [amount, duration, rate, insurance])

  const calculateMortgage = () => {
    const monthlyRate = rate / 100 / 12
    const numberOfPayments = duration * 12

    // Calcul de la mensualité (hors assurance)
    let monthly = 0
    if (monthlyRate === 0) {
      monthly = amount / numberOfPayments
    } else {
      monthly = (amount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
                (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    }

    // Calcul de l'assurance mensuelle
    const insuranceMonthly = (amount * (insurance / 100)) / 12

    // Totaux
    const totalPayment = (monthly + insuranceMonthly) * numberOfPayments
    const totalIns = insuranceMonthly * numberOfPayments
    const totalInt = (monthly * numberOfPayments) - amount

    setMonthlyPayment(monthly)
    setMonthlyInsurance(insuranceMonthly)
    setTotalCost(totalPayment)
    setTotalInsuranceCost(totalIns)
    setTotalInterest(totalInt)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatCurrencyDecimal = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  return (
    <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 md:p-12 border-2" style={{ borderColor: '#41A09C' }}>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: '#E6F7F7' }}>
          <Calculator className="w-8 h-8" style={{ color: '#41A09C' }} />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Calculez les mensualités de{' '}
          <span className="font-['Playfair_Display'] italic" style={{ color: '#41A09C' }}>
            votre prêt immobilier
          </span>
        </h2>
        <p className="text-xl text-gray-700 font-semibold">
          Estimez votre capacité d'emprunt en temps réel
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Curseurs */}
        <div className="space-y-8">
          {/* Montant emprunté */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg font-bold text-gray-900">Montant emprunté</label>
              <span className="text-2xl font-bold" style={{ color: '#41A09C' }}>
                {formatCurrency(amount)}
              </span>
            </div>
            <input
              type="range"
              min="50000"
              max="1000000"
              step="10000"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #41A09C 0%, #41A09C ${((amount - 50000) / (1000000 - 50000)) * 100}%, #e5e7eb ${((amount - 50000) / (1000000 - 50000)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>50 000 €</span>
              <span>1 000 000 €</span>
            </div>
          </div>

          {/* Durée */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg font-bold text-gray-900">Durée du prêt</label>
              <span className="text-2xl font-bold" style={{ color: '#41A09C' }}>
                {duration} ans
              </span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              step="1"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #55E0FF 0%, #55E0FF ${((duration - 5) / (30 - 5)) * 100}%, #e5e7eb ${((duration - 5) / (30 - 5)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>5 ans</span>
              <span>30 ans</span>
            </div>
          </div>

          {/* Taux d'intérêt */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg font-bold text-gray-900">Taux d'intérêt</label>
              <span className="text-2xl font-bold" style={{ color: '#41A09C' }}>
                {rate.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #41A09C 0%, #41A09C ${((rate - 0.5) / (6 - 0.5)) * 100}%, #e5e7eb ${((rate - 0.5) / (6 - 0.5)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0.5 %</span>
              <span>6 %</span>
            </div>
          </div>

          {/* Taux d'assurance */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-lg font-bold text-gray-900">Taux d'assurance</label>
              <span className="text-2xl font-bold" style={{ color: '#41A09C' }}>
                {insurance.toFixed(2)} %
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              className="w-full h-3 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #55E0FF 0%, #55E0FF ${((insurance - 0) / (1 - 0)) * 100}%, #e5e7eb ${((insurance - 0) / (1 - 0)) * 100}%, #e5e7eb 100%)`
              }}
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>0 %</span>
              <span>1 %</span>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          {/* Mensualité principale */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#55E0FF' }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6F7F7' }}>
                <TrendingUp className="w-6 h-6" style={{ color: '#41A09C' }} />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-medium">Votre mensualité</p>
                <p className="text-4xl font-bold" style={{ color: '#41A09C' }}>
                  {formatCurrencyDecimal(monthlyPayment + monthlyInsurance)}
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                dont assurance : <span className="font-bold text-gray-900">{formatCurrencyDecimal(monthlyInsurance)}</span> /mois
              </p>
            </div>
          </div>

          {/* Récapitulatif */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: '#41A09C' }} />
              Récapitulatif
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Montant du prêt</span>
                <span className="font-bold text-gray-900">{formatCurrency(amount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Durée</span>
                <span className="font-bold text-gray-900">{duration} ans ({duration * 12} mois)</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Taux nominal</span>
                <span className="font-bold text-gray-900">{rate.toFixed(2)} %</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700">Coût total du crédit</span>
                <span className="font-bold" style={{ color: '#41A09C' }}>{formatCurrency(totalCost - amount)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-sm">dont intérêts</span>
                <span className="font-semibold text-gray-700 text-sm">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-gray-700 text-sm">dont assurance</span>
                <span className="font-semibold text-gray-700 text-sm">{formatCurrency(totalInsuranceCost)}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg px-3 mt-2">
                <span className="font-bold text-gray-900">Montant total dû</span>
                <span className="text-xl font-bold" style={{ color: '#41A09C' }}>{formatCurrency(totalCost)}</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="flex gap-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-900">
                <p className="font-semibold mb-1">Simulation indicative</p>
                <p>Ces calculs sont donnés à titre indicatif. Pour une offre personnalisée, contactez nos conseillers.</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full"
              style={{ backgroundColor: '#55E0FF', color: 'white', textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}
            >
              Être accompagné par un expert
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #41A09C;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: 3px solid #41A09C;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          transition: all 0.2s ease;
        }

        .slider::-moz-range-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  )
}

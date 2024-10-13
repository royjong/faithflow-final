"use client"

import { useState } from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Sparkles, Zap, X } from "lucide-react"

export function PremiumUpgradeModal() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleUpgrade = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { checkoutUrl } = await response.json()
      if (checkoutUrl) {
        window.location.href = checkoutUrl
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const closeModal = () => setIsOpen(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-auto bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white border-none hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 px-4 py-2 text-sm md:text-base"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade naar Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md mx-auto p-0 bg-white rounded-2xl shadow-2xl overflow-hidden border-0">
        <div className="relative">
          <div className="w-full h-64 bg-gradient-to-br from-[#60c4ff] to-blue-600 flex flex-col items-center justify-center px-6">
            <Image
              src="/faithflow.png"
              alt="FaithFlow Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <h2 className="text-3xl font-extrabold text-white mb-2 text-shadow text-center">
              Ontgrendel Premium
            </h2>
            <p className="text-blue-100 text-lg mb-4 text-center">
              Verrijk je spirituele reis met onbeperkte toegang
            </p>
            <div className="bg-white rounded-full py-2 px-6 inline-block shadow-lg">
              <span className="text-4xl font-bold text-[#60c4ff]">€7,50</span>
              <span className="text-lg text-gray-600 ml-1">/ maand</span>
            </div>
          </div>
          <button
            className="absolute top-2 right-2 text-white hover:text-gray-200 focus:outline-none"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="px-6 py-6 bg-gray-50">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium voordelen:</h3>
          <ul className="space-y-3">
            {[
              "Alle gebedscategorieën",
              "Exclusieve meditaties",
              "Dagelijkse inspiratie",
              "Persoonlijke gebedstracker"
            ].map((benefit: string, index: number) => (
              <li
                key={index}
                className="flex items-center bg-white rounded-lg p-3 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="bg-[#60c4ff] rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white px-6 py-4 border-t border-gray-100">
          <Button 
            className="w-full bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white text-lg font-semibold py-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              "Laden..."
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5" />
                Upgrade nu naar Premium
              </>
            )}
          </Button>
          <p className="text-center text-sm text-gray-600 mt-3 font-medium">
            30 dagen niet-goed-geld-terug garantie
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
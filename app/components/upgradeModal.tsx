"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Check, Sparkles, Zap } from "lucide-react"
import Image from 'next/image'

export function PremiumUpgradeModal() {
  const [isLoading, setIsLoading] = useState(false)

  const handleUpgrade = async () => {
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
      // You might want to show an error message to the user here
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full sm:w-auto bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white border-none hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade naar Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[90vw] md:max-w-[550px] p-0 bg-gradient-to-br from-blue-50 to-[#e0f3ff] rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-36 sm:h-48 bg-gradient-to-r from-[#60c4ff] to-blue-600"></div>
          <Image
            src="/faithflow-logo-white.png"
            alt="FaithFlow Logo"
            width={60}
            height={60}
            className="absolute top-4 left-4 z-10 w-12 h-12 sm:w-16 sm:h-16"
          />
          <DialogHeader className="relative z-10 pt-12 sm:pt-16 pb-6 sm:pb-8 px-4 sm:px-8 text-center">
            <DialogTitle className="text-3xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-3 text-shadow">
              Ontgrendel Premium
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-lg sm:text-xl mb-4 sm:mb-6">
              Verrijk je spirituele reis met onbeperkte toegang
            </DialogDescription>
            <div className="bg-white rounded-full py-2 sm:py-3 px-6 sm:px-8 inline-block shadow-lg">
              <span className="text-4xl sm:text-5xl font-bold text-[#60c4ff]">€7,50</span>
              <span className="text-lg sm:text-xl text-gray-600 ml-2">/ maand</span>
            </div>
          </DialogHeader>
        </div>
        <div className="px-4 sm:px-8 py-6 sm:py-8">
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">Premium voordelen:</h3>
          <ul className="space-y-3 sm:space-y-4">
            {[
              "Alle gebedscategorieën",
              "Exclusieve meditaties",
              "Dagelijkse inspiratie",
              "Persoonlijke gebedstracker"
            ].map((benefit, index) => (
              <li key={index} className="flex items-center bg-white rounded-lg p-2 sm:p-3 shadow-sm">
                <div className="bg-[#60c4ff] rounded-full p-1 mr-3 sm:mr-4">
                  <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <span className="text-gray-700 text-base sm:text-lg">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white px-4 sm:px-8 py-4 sm:py-6 border-t border-gray-100">
          <Button 
            className="w-full bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white text-lg sm:text-xl font-semibold py-4 sm:py-6 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              "Laden..."
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                Upgrade nu naar Premium
              </>
            )}
          </Button>
          <p className="text-center text-xs sm:text-sm text-gray-600 mt-3 sm:mt-4 font-medium">
            30 dagen niet-goed-geld-terug garantie
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
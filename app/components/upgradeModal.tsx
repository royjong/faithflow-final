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
import { Check, Sparkles, Zap, X } from "lucide-react" // Import X for close icon
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
          className="w-auto bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white border-none hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 px-4 py-2 text-sm md:text-base"
        >
          <Sparkles className="mr-2 h-4 w-4" />
          Upgrade naar Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 max-w-md mx-auto p-0 bg-gradient-to-br from-blue-50 to-[#e0f3ff] rounded-2xl shadow-2xl overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-32 md:h-40 bg-gradient-to-r from-[#60c4ff] to-blue-600"></div>
          <Image
            src="/faithflow.png"
            alt="FaithFlow Logo"
            width={48}
            height={48}
            className="absolute top-4 left-4 z-10 w-10 h-10 md:w-12 md:h-12"
          />
          <DialogHeader className="relative z-10 pt-10 md:pt-14 pb-6 px-4 md:px-6 text-center">
            <DialogTitle className="text-2xl md:text-3xl font-extrabold text-white mb-2 text-shadow">
              Ontgrendel Premium
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-base md:text-lg mb-4">
              Verrijk je spirituele reis met onbeperkte toegang
            </DialogDescription>
            <div className="bg-white rounded-full py-2 px-4 md:px-6 inline-block shadow-lg">
              <span className="text-3xl md:text-4xl font-bold text-[#60c4ff]">€7,50</span>
              <span className="text-base md:text-lg text-gray-600 ml-1">/ maand</span>
            </div>
          </DialogHeader>
        </div>
        <div className="px-4 md:px-6 py-6">
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">Premium voordelen:</h3>
          <ul className="space-y-3">
            {[
              "Alle gebedscategorieën",
              "Exclusieve meditaties",
              "Dagelijkse inspiratie",
              "Persoonlijke gebedstracker"
            ].map((benefit, index) => (
              <li key={index} className="flex items-center bg-white rounded-lg p-2 shadow-sm">
                <div className="bg-[#60c4ff] rounded-full p-1 mr-3">
                  <Check className="h-3 w-3 md:h-4 md:w-4 text-white" />
                </div>
                <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white px-4 md:px-6 py-4 border-t border-gray-100">
          <Button 
            className="w-full bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white text-base md:text-lg font-semibold py-3 md:py-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              "Laden..."
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4 md:h-5 md:w-5" />
                Upgrade nu naar Premium
              </>
            )}
          </Button>
          <p className="text-center text-xs md:text-sm text-gray-600 mt-3 font-medium">
            30 dagen niet-goed-geld-terug garantie
          </p>
        </div>
        {/* Close Button */}
        <Button 
          variant="link" 
          className="absolute top-2 right-2" 
          onClick={() => { /* Logic to close modal */ }}
        >
          <X className="h-5 w-5 text-gray-700" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}

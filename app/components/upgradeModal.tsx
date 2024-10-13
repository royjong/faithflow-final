"use client"

import { useState } from "react"
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
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
          className="w-auto bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white border-none hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 px-3 py-2 text-sm md:px-4 md:py-2 md:text-base"
          onClick={() => setIsOpen(true)}
        >
          <Sparkles className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
          Upgrade naar Premium
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90vw] max-w-md md:max-w-lg lg:max-w-xl mx-auto p-0 bg-white rounded-2xl shadow-2xl overflow-hidden border-0">
        <div className="relative bg-gradient-to-br from-[#60c4ff] to-blue-600 p-6 md:p-8">
          <div className="flex items-center justify-between mb-4">
            <Image
              src="/faithflow.png"
              alt="FaithFlow Logo"
              width={50}
              height={50}
              className="w-12 h-12 md:w-14 md:h-14"
            />
            <Badge className="bg-green-500 hover:bg-green-600 text-white text-xs md:text-sm px-2 py-1">
              50% gedoneerd aan KWF
            </Badge>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-2 text-shadow">
            Probeer 7 dagen gratis
          </h2>
          <p className="text-blue-100 text-base md:text-lg mb-4">
            Versterk je geloof en groei dichter naar God met volledige toegang.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 inline-block">
            <span className="text-white text-xl md:text-2xl font-bold">€7,50 / maand</span>
            <span className="text-blue-100 text-sm md:text-base ml-2">na proefperiode</span>
          </div>
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white focus:outline-none transition-colors"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 md:p-8 bg-gray-50">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">Premium voordelen:</h3>
          <ul className="space-y-3">
            {[
              "Alle gebedscategorieën",
              "Exclusieve meditaties",
              "Dagelijkse inspiratie",
              "Persoonlijke gebedstracker"
            ].map((benefit: string, index: number) => (
              <li
                key={index}
                className="flex items-center bg-white rounded-lg p-3 md:p-4 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="bg-[#60c4ff] rounded-full p-1 mr-3">
                  <Check className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <span className="text-base md:text-lg text-gray-700">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white px-6 py-4 md:px-8 md:py-6 border-t border-gray-100">
          <Button 
            className="w-full bg-gradient-to-r from-[#60c4ff] to-blue-600 text-white text-lg md:text-xl font-semibold py-3 md:py-4 rounded-lg hover:from-blue-500 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center"
            onClick={handleUpgrade}
            disabled={isLoading}
          >
            {isLoading ? (
              "Laden..."
            ) : (
              <>
                <Zap className="mr-2 h-5 w-5 md:h-6 md:w-6" />
                Start je gratis proefperiode
              </>
            )}
          </Button>
          <p className="text-center text-sm md:text-base text-gray-600 mt-3 font-medium">
            Maandelijks opzegbaar – Geen verplichtingen, alleen zegeningen!
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
// pages/contact.tsx (Contact page in the same style as the privacy page)
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/app/components/Header';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Footer from '@/app/components/footer';

export default function Contact() {
  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-[80px] md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Neem contact met ons op
          </h1>
          <p className="text-md md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Heb je vragen, opmerkingen of hulp nodig? We horen graag van je! Neem contact met ons op via een van de onderstaande opties of vul het contactformulier in.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Contactgegevens</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Je kunt ons bereiken via de volgende contactmogelijkheden:
            </p>

            <div className="flex items-start">
              <Mail className="text-blue-600 w-6 h-6 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">E-mail</h3>
                <p className="text-lg text-gray-600">
                  <a href="mailto:info@spiritsounds.com" className="text-blue-600 hover:underline">info@spiritsounds.com</a>
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="text-blue-600 w-6 h-6 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Telefoon</h3>
                <p className="text-lg text-gray-600">+31 6 43441206</p>
              </div>
            </div>

            <div className="flex items-start">
              <MapPin className="text-blue-600 w-6 h-6 mt-1" />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">Adres</h3>
                <p className="text-lg text-gray-600">9601BH, Hoogezand, Midden-Groningen.</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">Stuur ons een bericht</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-900">Naam</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
                  placeholder="Je naam"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-900">E-mail</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
                  placeholder="Je e-mailadres"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-900">Bericht</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-600 focus:ring focus:ring-blue-600 focus:ring-opacity-50"
                  placeholder="Typ hier je bericht"
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-blue-600 text-white hover:bg-blue-700 transition py-4 px-8"
                type="submit"
              >
                Verstuur bericht
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Map or CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Kom langs bij ons kantoor</h2>
          <p className="text-xl mb-10">
            Wil je ons liever persoonlijk ontmoeten? Kom gerust langs ons kantoor op de SpiritSounds Straat.
          </p>
          <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 transition shadow-lg text-lg py-6 px-12 group">
            <Link href="/directions" className="flex items-center justify-center">
              Routebeschrijving <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
     <Footer /> 
    </main>
  );
}

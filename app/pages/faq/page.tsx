"use client"; 

// pages/faq.tsx (FAQ page in the same style as the contact and privacy pages)
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/footer';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "Wat is SpiritSounds en hoe werkt het?",
      answer:
        "SpiritSounds is een platform waar gebruikers een breed scala aan spirituele en meditatiemuziek kunnen ontdekken en streamen. Onze missie is om je te helpen ontspannen, mediteren en je innerlijke rust te vinden door muziek."
    },
    {
      question: "Hoe kan ik een account aanmaken?",
      answer:
        "Je kunt een account aanmaken door op de knop 'Registreren' te klikken in de rechterbovenhoek van onze website. Vul je gegevens in en bevestig je e-mail om toegang te krijgen tot alle functies van SpiritSounds."
    },
    {
      question: "Wat zijn de abonnementsopties?",
      answer:
        "We bieden zowel een gratis versie als een premium-abonnement aan. De gratis versie geeft toegang tot een beperkte selectie muziek, terwijl de premium-versie onbeperkte toegang biedt zonder advertenties."
    },
    {
      question: "Hoe kan ik mijn abonnement opzeggen?",
      answer:
        "Je kunt je abonnement op elk moment opzeggen via je accountinstellingen. Na het opzeggen blijft je premium-abonnement actief tot het einde van de factureringscyclus."
    },
    {
      question: "Biedt SpiritSounds muziek voor therapeutische doeleinden?",
      answer:
        "Onze muziekcollectie is speciaal samengesteld om te helpen bij meditatie, ontspanning en spirituele groei, maar is geen vervanging voor medische of psychologische therapie. Raadpleeg altijd een professional voor medische kwesties."
    },
    {
      question: "Kan ik de muziek offline beluisteren?",
      answer:
        "Ja, met een premium-abonnement kun je muziek downloaden en offline luisteren via onze mobiele app."
    }
  ];

  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-[80px] md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Veelgestelde vragen (FAQ)
          </h1>
          <p className="text-md md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Heb je vragen over ons platform? Bekijk hieronder de antwoorden op de meest gestelde vragen.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md shadow-sm p-4"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center text-left text-lg font-medium text-gray-900"
              >
                {faq.question}
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-blue-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Staat je vraag er niet tussen?
          </h2>
          <p className="text-xl mb-10">
            Neem gerust contact met ons op en ons team helpt je graag verder!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-50 transition"
          >
            Contacteer ons
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer /> 
    </main>
  );
}

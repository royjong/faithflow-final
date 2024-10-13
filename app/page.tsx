import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headphones, Book, Heart, Play, Star, Users, Zap, Check, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from './components/Header'
import AudioPlayer from './components/audioPlayer'
import prisma from './lib/db'

export default async function Home() {
  const randomPrayer = await prisma.prayer.findFirst({
    orderBy: { id: 'asc' }
  });

  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
                Versterk je geloof met <span className="text-[#60c4ff] relative">
                  SpiritSounds
                  <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#60c4ff] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-10 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Heb je moeite met bidden? Ontdek 100+ audio opgnomen geleide gebeden en christelijke meditaties op SpiritSounds
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                <Button size="lg" className="w-full sm:w-auto bg-[#60c4ff] text-white hover:bg-blue-600 transition shadow-lg text-lg py-6 px-8">
                  <Link href="/api/auth/login" className="flex items-center justify-center">
                    Probeer 7 dagen gratis
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#60c4ff] text-[#60c4ff] hover:bg-blue-50 transition shadow-lg text-lg py-6 px-8">
                  <Link href="/learn-more" className="flex items-center justify-center">
                    Ontdek meer
                    <Play className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
                <div className="relative">
                  <Image 
                    src="https://i.ibb.co/61PNTC9/Scherm-afbeelding-2024-10-10-om-04-35-10.png" 
                    alt="SpiritSounds App Showcase" 
                    width={600} 
                    height={400} 
                    className="rounded-2xl shadow-2xl w-full h-auto"
                  />
                  {randomPrayer && (
                    <div className="absolute -bottom-10 -left-10 bg-white p-4 md:p-6 rounded-2xl shadow-xl w-full max-w-sm transform hover:scale-105 transition-transform duration-300">
                      <h3 className="text-base md:text-lg font-semibold mb-2 truncate">{randomPrayer.title}</h3>
                      <AudioPlayer audioSrc={randomPrayer.audioUrl} compact={true} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Ontdek de kracht van <span className="text-[#60c4ff]">SpiritSounds</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { icon: Headphones, title: "Persoonlijke Gebedsbegeleiding", description: "Laat je inspireren door stemmen die je helpen focussen op wat echt belangrijk is." },
              { icon: Heart, title: "Diepgaande Meditaties", description: "Vind innerlijke rust en versterk je band met God door zorgvuldig samengestelde christelijke meditaties." },
              { icon: Book, title: "Interactieve Bijbelstudies", description: "Verrijk je kennis en inzicht in de Schrift met onze boeiende audio-begeleide Bijbelstudies." }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group bg-blue-50 rounded-lg p-8 transition-all duration-300 hover:bg-blue-100 hover:shadow-xl">
                <div className="bg-[#60c4ff] p-5 rounded-full mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-base text-gray-600">{feature.description}</p>
                <Button variant="link" className="mt-4 text-[#60c4ff] hover:text-blue-700">
                  Lees meer <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Transformerende <span className="text-yellow-300">Ervaringen</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Anna B.", quote: "SpiritSounds heeft mijn gebedsleven compleet getransformeerd. Ik voel me elke dag dichter bij God." },
              { name: "Martijn V.", quote: "De geleide meditaties helpen me om rust te vinden in mijn drukke leven. Een echte zegen!" },
              { name: "Lisa K.", quote: "De Bijbelstudies zijn diepgaand en inzichtelijk. Ik leer elke dag iets nieuws over mijn geloof." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white text-gray-900 p-6 rounded-lg shadow-md transition-transform hover:-translate-y-2 duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                <p className="font-semibold text-[#60c4ff]">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Users, value: "100,000+", label: "Geïnspireerde Gebruikers" },
              { icon: Headphones, value: "500+", label: "Unieke Spirituele Ervaringen" },
              { icon: Zap, value: "1M+", label: "Minuten van Verdieping" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="bg-[#60c4ff] p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="h-12 w-12 text-white" />
                </div>
                <h3 className="text-4xl font-bold mb-2 text-[#60c4ff]">{stat.value}</h3>
                <p className="text-lg text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Investeer in <span className="text-[#60c4ff]">Jouw Spirituele Groei</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ontdekker",
                price: "€4,99",
                features: [
                  "Toegang tot 100+ inspirerende gebeden",
                  "Dagelijkse meditaties voor innerlijke rust",
                  "Basis Bijbelstudies voor verdieping",
                  "Mobiele app voor onderweg"
                ]
              },
              {
                name: "Groeier",
                price: "€9,99",
                features: [
                  "Alles van Ontdekker",
                  "Onbeperkte toegang tot premium content",
                  "Exclusieve geleide meditaties",
                  "Persoonlijke gebedsplanner",
                  "Offline luisteren voor flexibiliteit"
                ]
              },
              {
                name: "Familiebond",
                price: "€14,99",
                features: [
                  "Alles van Groeier",
                  "Tot 6 individuele profielen",
                  "Speciaal ontwikkelde gezinscontent",
                  "Ouderlijk toezicht voor veiligheid",
                  "Gedeelde gebedsdoelen voor verbinding"
                ]
              }
            ].map((plan, index) => (
              <div key={index} className="bg-white rounded-lg shadow-xl overflow-hidden transition-transform hover:-translate-y-2 duration-300">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{plan.name}</h3>
                  <p className="text-4xl font-bold text-[#60c4ff] mb-6">{plan.price}<span className="text-base font-normal text-gray-600">/maand</span></p>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-5 w-5 text-green-500 mr-2" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-[#60c4ff] text-white hover:bg-blue-600 transition py-6 text-lg font-semibold">
                    Start je reis met {plan.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Klaar voor een Diepere Connectie?</h2>
          <p className="text-xl mb-10">Ontdek de kracht van begeleide gebeden en meditaties. Transformeer je spirituele reis vandaag nog met SpiritSounds.</p>
          <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 transition shadow-lg text-lg py-6 px-12 group">
            <Link href="/api/auth/login" className="flex items-center justify-center">
              Begin Je Gratis Proefperiode
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Image src='/faithflow.png' width={40} height={40} alt='SpiritSounds logo' className="w-10 h-10" />
                <span className="text-xl font-bold text-white">SpiritSounds</span>
              </Link>
              <p className="text-sm">Versterk je gebed, verdiep je geloof, elke dag opnieuw.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Ontdek</h3>
              <ul className="space-y-2">
                <li><Link href="/gebeden" className="hover:text-[#60c4ff] transition">Gebeden</Link></li>
                <li><Link href="/meditaties" className="hover:text-[#60c4ff] transition">Meditaties</Link></li>
                <li><Link href="/bijbelstudies" className="hover:text-[#60c4ff] transition">Bijbelstudies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Ondersteuning</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-[#60c4ff] transition">Veelgestelde vragen</Link></li>
                <li><Link href="/contact" className="hover:text-[#60c4ff] transition">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[#60c4ff] transition">Privacybeleid</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Volg ons</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#60c4ff]">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#60c4ff]">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-[#60c4ff]">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 mt-8 text-center">
            <p>&copy; 2024 SpiritSounds. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
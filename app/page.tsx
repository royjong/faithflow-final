import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headphones, Book, Heart, Play } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Header from './components/Header'
import AudioPlayer from './components/audioPlayer'
import prisma from './lib/db'

export default async function Home() {
  const randomPrayer = await prisma.prayer.findFirst({
    orderBy: { id: 'asc' }
  });

  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900">
      
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-semibold mb-6 leading-tight tracking-tight text-gray-900">
               Beluister 100+ <span className="text-[#60c4ff]"> christelijke meditaties & gebeden</span> met
               PrayStream
              </h1>
              <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl">
                Ontdek honderden begeleide gebeden en meditaties voor elke gelegenheid, en verdiep je spirituele reis.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" className="w-full sm:w-auto bg-[#60c4ff] text-white hover:bg-blue-600 transition shadow-lg">
                  <Link href="/api/auth/login" className="flex items-center justify-center">
                    Start gratis proefperiode
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#60c4ff] text-[#60c4ff] hover:bg-blue-50 transition shadow-lg">
                  <Link href="/learn-more" className="flex items-center justify-center">
                    Bekijk Bibliotheek
                    <Play className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
              <div className="relative w-full max-w-lg mx-auto">
                <Image 
                  src="https://i.ibb.co/61PNTC9/Scherm-afbeelding-2024-10-10-om-04-35-10.png" 
                  alt="FaithFlow App Showcase" 
                  width={600} 
                  height={400} 
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                {randomPrayer && (
                  <div className="absolute -bottom-10 -left-10 bg-white p-4 md:p-6 rounded-2xl shadow-xl w-full max-w-sm">
                    <h3 className="text-base md:text-lg font-semibold mb-2 truncate">{randomPrayer.title}</h3>
                    <AudioPlayer audioSrc={randomPrayer.audioUrl} compact={true} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 md:mb-16 text-gray-900">Wat is FaithFlow</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { icon: Headphones, title: "Geleid bidden", description: "Laat je leiden door inspirerende stemmen die je helpen je gedachten te richten." },
              { icon: Heart, title: "Geleide meditaties", description: "Vind rust en verbinding met God door zorgvuldig samengestelde christelijke meditaties." },
              { icon: Book, title: "Bijbelstudie", description: "Verdiep je kennis van de Schrift met onze audio-begeleide Bijbelstudies." }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="bg-[#60c4ff] p-3 md:p-4 rounded-full mb-4 md:mb-6">
                  <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-white" />
                </div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#60c4ff] text-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Klaar om je gebedsleven te verdiepen?</h2>
          <p className="text-lg md:text-xl mb-8 md:mb-10">Begin vandaag nog met FaithFlow en ontdek de kracht van begeleide gebeden en meditaties.</p>
          <Button size="lg" className="w-full sm:w-auto bg-white text-[#60c4ff] hover:bg-gray-100 transition shadow-lg">
            <Link href="/api/auth/login" className="flex items-center justify-center">
              Start je gratis proefperiode
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <Link href="/" className="flex items-center space-x-2">
                <Image src='/faithflow.png' width={40} height={40} alt='FaithFlow logo' className="w-10 h-10" />
                <span className="text-xl font-bold text-gray-900">FaithFlow</span>
              </Link>
              <p className="mt-2 text-sm">Versterk je gebed, verdiep je geloof.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Navigatie</h3>
              <ul className="space-y-2">
                <li><Link href="/gebeden" className="hover:text-[#60c4ff] transition">Gebeden</Link></li>
                <li><Link href="/meditaties" className="hover:text-[#60c4ff] transition">Meditaties</Link></li>
                <li><Link href="/bijbelstudies" className="hover:text-[#60c4ff] transition">Bijbelstudies</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Ondersteuning</h3>
              <ul className="space-y-2">
                <li><Link href="/faq" className="hover:text-[#60c4ff] transition">FAQ</Link></li>
                <li><Link href="/contact" className="hover:text-[#60c4ff] transition">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-[#60c4ff] transition">Privacybeleid</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900">Volg ons</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-[#60c4ff] transition">Facebook</a>
                <a href="#" className="text-gray-400 hover:text-[#60c4ff] transition">Twitter</a>
                <a href="#" className="text-gray-400 hover:text-[#60c4ff] transition">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} PrayStream. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}
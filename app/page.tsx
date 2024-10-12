import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Headphones, Book, Heart, Play, Star, Users, Zap } from 'lucide-react'
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
      <div className="absolute top-0 -z-10 h-full w-full bg-gradient-to-b from-blue-50 to-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[300px] w-[300px] md:h-[500px] md:w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
                Beluister 100+ <span className="text-[#60c4ff]">christelijke meditaties & gebeden</span> met SpiritSounds
              </h1>
              <p className="text-lg md:text-xl mb-10 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Ontdek honderden begeleide gebeden en meditaties voor elke gelegenheid, en verdiep je spirituele reis.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
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
                  alt="SpiritSounds App Showcase" 
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
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Wat is SpiritSounds</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {[
              { icon: Headphones, title: "Geleid bidden", description: "Laat je leiden door inspirerende stemmen die je helpen je gedachten te richten." },
              { icon: Heart, title: "Geleide meditaties", description: "Vind rust en verbinding met God door zorgvuldig samengestelde christelijke meditaties." },
              { icon: Book, title: "Bijbelstudie", description: "Verdiep je kennis van de Schrift met onze audio-begeleide Bijbelstudies." }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                <div className="bg-[#60c4ff] p-5 rounded-full mb-6 transition-all duration-300 group-hover:shadow-lg group-hover:scale-110">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-gray-900">{feature.title}</h3>
                <p className="text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">Wat onze gebruikers zeggen</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Anna B.", quote: "SpiritSounds heeft mijn gebedsleven compleet getransformeerd. Ik voel me elke dag dichter bij God." },
              { name: "Martijn V.", quote: "De geleide meditaties helpen me om rust te vinden in mijn drukke leven. Een echte zegen!" },
              { name: "Lisa K.", quote: "De Bijbelstudies zijn diepgaand en inzichtelijk. Ik leer elke dag iets nieuws over mijn geloof." }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                  <Star className="h-5 w-5 text-yellow-400" />
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#60c4ff] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Users, value: "100,000+", label: "Actieve gebruikers" },
              { icon: Headphones, value: "500+", label: "Unieke gebeden & meditaties" },
              { icon: Zap, value: "1M+", label: "Minuten beluisterd" }
            ].map((stat, index) => (
              <div key={index} className="flex flex-col items-center">
                <stat.icon className="h-12 w-12 mb-4" />
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-lg">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Klaar om je gebedsleven te verdiepen?</h2>
          <p className="text-xl mb-10">Begin vandaag nog met SpiritSounds en ontdek de kracht van begeleide gebeden en meditaties.</p>
          <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 transition shadow-lg text-lg py-3 px-8">
            <Link href="/api/auth/login" className="flex items-center justify-center">
              Start je gratis proefperiode
              <ArrowRight className="ml-2 h-5 w-5" />
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
              <p className="text-sm">Versterk je gebed, verdiep je geloof.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Navigatie</h3>
              <ul className="space-y-2">
                <li><Link href="/gebeden" className="hover:text-[#60c4ff] transition">Gebeden</Link></li>
                <li><Link href="/meditaties" className="hover:text-[#60c4ff] transition">Meditaties</Link></li>
                <li><Link href="/bijbelstudies" className="hover:text-[#60c4ff] transition">Bijbelstudies</Link></li>
              </ul>
            </div>
            </div>
            </div>
            </footer>
            </main>
  )
}
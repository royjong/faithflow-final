// pages/index.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Headphones, Book, Heart, Play, Star, Users, Zap, Check, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from './components/Header';
import prisma from './lib/db';
import Footer from './components/footer';
import Head from 'next/head';

export default async function Home() {
  const randomPrayer = await prisma.prayer.findFirst({
    orderBy: { id: 'asc' }
  });

  return (
    <>
      <Head>
        <title>SpiritSounds - Christelijke Meditaties en Gebeden</title>
        <meta name="description" content="Versterk je gebed en groei in geloof met SpiritSounds. Ontdek 100+ begeleide christelijke meditaties en gebeden." />
        <meta name="keywords" content="Christelijke meditaties, gebeden, geloof, inspiratie, SpiritSounds" />
      </Head>
      <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-blue-50 via-white to-blue-50">
        <Header />
        
        {/* Hero Section */}
        <section className="relative py-[120px] md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
                <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
                  Versterk je gebed en groei in geloof met <span className="text-[#60c4ff] relative">
                    SpiritSounds
                    <svg className="absolute w-full h-3 -bottom-2 left-0 text-[#60c4ff] opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                  </span>
                </h1>
                <p className="text-md md:text-xl mb-10 text-gray-600 max-w-2xl mx-auto lg:mx-0">
                  Vind kracht en inspiratie in <b>100+</b> begeleide gebeden en christelijke meditaties, speciaal ontworpen om je geloofsleven te verdiepen.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center lg:justify-start">
                  <Button size="lg" className="w-full sm:w-auto bg-[#009bf9] text-white hover:bg-[#003366] transition shadow-lg text-lg py-6 px-8" asChild>
                    <Link href="/api/auth/register" className="flex items-center justify-center ">
                      Start je 7-daagse gratis proefperiode
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-[#60c4ff] text-[#60c4ff] hover:bg-blue-50 transition shadow-lg text-lg py-6 px-8">
                    <Link href="/learn-more" className="flex items-center justify-center">
                      Leer meer over SpiritSounds
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
                      alt="SpiritSounds App Showcase - Christelijke Meditaties" 
                      width={600} 
                      height={400} 
                      className="rounded-2xl shadow-2xl w-full h-auto"
                    />
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
                { icon: Headphones, title: "Persoonlijke Gebedsbegeleiding", description: "Laat je leiden in gebed met inspirerende stemmen die je helpen om dichter bij God te komen." },
                { icon: Heart, title: "Diepgaande Meditaties", description: "Kom tot rust in de aanwezigheid van God en versterk je relatie met Hem door opbouwende, op geloof gebaseerde meditaties." },
                { icon: Book, title: "Interactieve Bijbelstudies", description: "Verdiep je kennis van de Bijbel met onze boeiende, audio-geleide Bijbelstudies, speciaal gemaakt om je geloof te verrijken." }
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "Anna B.", quote: "SpiritSounds heeft mijn gebedsleven compleet getransformeerd. Ik voel me elke dag dichter bij God." },
                { name: "Martijn V.", quote: "De geleide meditaties helpen me om rust te vinden in mijn drukke leven. Een echte zegen!" },
                { name: "Lisa K.", quote: "De Bijbelstudies zijn diepgaand en inzichtelijk. Ik leer elke dag iets nieuws over mijn geloof." }
              ].map((testimonial, index) => (
                <div key={index} className="bg-white text-gray-900 p-6 rounded-lg shadow-md transition-transform hover:-translate-y-2 duration-300">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-base italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold">{testimonial.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Ben je klaar om te beginnen?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Meld je aan voor onze 7-daagse gratis proefperiode en ervaar de kracht van Christelijke meditaties.
            </p>
            <Button size="lg" className="bg-[#009bf9] text-white hover:bg-[#003366] transition shadow-lg text-lg py-6 px-8" asChild>
              <Link href="/api/auth/register" className="flex items-center justify-center">
                Start je proefperiode <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}

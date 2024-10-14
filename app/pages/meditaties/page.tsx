// pages/meditaties.tsx (Meditation page with explanation on guided meditation)
import Footer from "@/app/components/footer";
import Header from "@/app/components/Header";

export default function Meditaties() {
  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-[80px] md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Geleide Meditaties
          </h1>
          <p className="text-md md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Ervaar diepe ontspanning en mindfulness met onze geleide meditaties. Laat je begeleiden op je pad naar 
            innerlijke rust en balans met zorgvuldig samengestelde sessies, afgestemd op jouw behoeften.
          </p>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Wat is Geleide Meditatie?
          </h2>
          <p className="text-lg text-gray-700 text-center">
            Geleide meditatie is een vorm van meditatie waarbij je wordt begeleid door een instructeur of stem die je 
            helpt om je geest te kalmeren en te focussen. Onze app biedt een breed scala aan meditaties, afgestemd op 
            verschillende behoeften en ervaringen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-purple-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-purple-600">
                Waarom Geleide Meditatie?
              </h3>
              <p className="mt-4 text-gray-700">
                Geleide meditatie kan je helpen om stress te verminderen, meer bewust te leven, en een diepere verbinding 
                met jezelf te voelen. Het is ideaal voor zowel beginners als gevorderden die behoefte hebben aan een 
                gestructureerde aanpak om tot rust te komen.
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-purple-600">
                Hoe werkt het op SpiritSounds?
              </h3>
              <p className="mt-4 text-gray-700">
                Via onze app kun je eenvoudig toegang krijgen tot verschillende geleide meditaties. Kies een sessie die 
                past bij je gemoedstoestand of behoefte, zoals meditaties voor ontspanning, focus, of slaap. De stem of 
                muziek helpt je om je geest tot rust te brengen en aanwezig te zijn in het moment.
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-purple-600">
                Meditaties voor Elke Gelegenheid
              </h3>
              <p className="mt-4 text-gray-700">
                Of je nu behoefte hebt aan meer focus tijdens het werken, stress wilt verminderen, of beter wilt slapen, 
                SpiritSounds biedt meditaties voor elk moment van de dag. Onze sessies zijn ontworpen om je te helpen in 
                balans te komen, ongeacht je omgeving.
              </p>
            </div>

            <div className="p-6 bg-purple-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-purple-600">
                Begin Je Meditatieve Reis
              </h3>
              <p className="mt-4 text-gray-700">
                Begin vandaag met mediteren via onze app. Selecteer een meditatie en laat je begeleiden door een kalmerende 
                stem of rustgevende muziek. Met onze app heb je de vrijheid om overal en op elk moment je meditaties te 
                doen, zelfs offline als je premium-gebruiker bent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start vandaag met geleide meditaties
          </h2>
          <p className="text-xl mb-10">
            Sluit je aan bij duizenden die rust, focus en balans hebben gevonden met SpiritSounds. Begin je reis naar 
            innerlijke rust en mindfulness.
          </p>
          <a
            href="/download"
            className="inline-block bg-white text-purple-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-purple-50 transition"
          >
            Download de app
          </a>
        </div>
      </section>

      {/* Footer */}
      <Footer /> 
    </main>
  );
}

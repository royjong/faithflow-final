// pages/gebeden.tsx (Prayer page with explanation on guided prayer)
import Footer from "@/app/components/footer";
import Header from "@/app/components/Header";

export default function Gebeden() {
  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-[80px] md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Geleid Bidden
          </h1>
          <p className="text-md md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            Ontdek innerlijke rust en diepe verbinding door geleid gebed. Onze app biedt een verscheidenheid aan gebeden
            voor verschillende gelegenheden, allemaal ontworpen om je te ondersteunen op je spirituele reis.
          </p>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Wat is Geleid Bidden?
          </h2>
          <p className="text-lg text-gray-700 text-center">
            Geleid bidden is een vorm van gebed waarbij je door middel van gesproken begeleiding wordt geholpen om
            dieper te bidden en te mediteren. Onze app biedt een breed scala aan gebeden en meditaties, geleid door
            ervaren spirituele leraren, die je helpen om je gebedsleven te verdiepen.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-12">
            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-600">
                Waarom Geleid Bidden?
              </h3>
              <p className="mt-4 text-gray-700">
                Geleid bidden kan je helpen om je gedachten te richten en de afleiding van alledag los te laten. Het
                biedt structuur en begeleiding, vooral als je nieuw bent met bidden of op zoek bent naar een nieuwe
                manier om met God of je innerlijke zelf in contact te komen.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-600">
                Hoe werkt het op SpiritSounds?
              </h3>
              <p className="mt-4 text-gray-700">
                Via onze app kun je eenvoudig geleid gebeden beluisteren. Kies een gebed dat past bij jouw behoeften,
                zoals ochtendgebeden, avondgebeden, of specifieke thema's zoals dankbaarheid, vergeving, of innerlijke
                rust. De gesproken begeleiding helpt je om je volledig te concentreren en dieper te bidden.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-600">
                Gebeden voor Elke Gelegenheid
              </h3>
              <p className="mt-4 text-gray-700">
                Of je nu behoefte hebt aan troost, wijsheid, kracht, of gewoon een moment van stilte, SpiritSounds biedt
                een gebed voor elke gelegenheid. Onze collectie is zorgvuldig samengesteld om je te helpen bij zowel
                vreugdevolle als uitdagende momenten.
              </p>
            </div>

            <div className="p-6 bg-blue-50 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-blue-600">
                Begin Je Reis Vandaag
              </h3>
              <p className="mt-4 text-gray-700">
                Het enige wat je hoeft te doen is onze app openen, een gebed selecteren en jezelf laten begeleiden. Je
                kunt bidden waar en wanneer je wilt, met de mogelijkheid om zelfs offline gebeden te beluisteren als je
                premium-gebruiker bent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start vandaag met geleid bidden
          </h2>
          <p className="text-xl mb-10">
            Sluit je aan bij duizenden anderen die de kracht van geleid bidden hebben ontdekt op SpiritSounds. Vind
            innerlijke rust en spirituele groei.
          </p>
          <a
            href="/download"
            className="inline-block bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-lg hover:bg-blue-50 transition"
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

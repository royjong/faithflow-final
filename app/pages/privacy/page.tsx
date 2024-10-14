// pages/privacy.tsx (Full Privacy Policy page)
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Header from '@/app/components/Header';
import { ArrowRight } from 'lucide-react';
import Footer from '@/app/components/footer';

export default function Privacy() {
  return (
    <main className="flex flex-col w-full min-h-screen text-gray-900 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-[80px] md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight tracking-tight text-gray-900">
            Privacybeleid
          </h1>
          <p className="text-md md:text-xl mb-10 text-gray-600 max-w-3xl mx-auto">
            We hechten veel waarde aan de privacy van onze gebruikers. Dit beleid legt uit hoe we jouw persoonsgegevens verzamelen, gebruiken en beschermen.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">1. Inleiding</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Dit privacybeleid beschrijft hoe SpiritSounds (de "Website", "wij", "ons") omgaat met de informatie die we verzamelen van gebruikers ("jij", "gebruikers") bij het gebruik van onze diensten. Door gebruik te maken van onze Website, stem je in met het verzamelen en gebruik van informatie zoals beschreven in dit beleid.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">2. Welke gegevens verzamelen we?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Wij verzamelen verschillende soorten informatie om onze diensten te kunnen leveren en verbeteren:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
            <li><strong>Persoonsgegevens:</strong> Zoals je naam, e-mailadres, telefoonnummer en adres wanneer je je aanmeldt voor een account of een aankoop doet.</li>
            <li><strong>Gebruiksgegevens:</strong> Informatie over hoe je onze Website gebruikt, zoals je IP-adres, browserinformatie, tijd van toegang en bezochte pagina's.</li>
            <li><strong>Cookies en vergelijkbare technologieën:</strong> We gebruiken cookies om je ervaring te verbeteren en het gebruik van onze diensten te analyseren.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">3. Hoe gebruiken we jouw gegevens?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            De verzamelde informatie wordt voor de volgende doeleinden gebruikt:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
            <li>Het leveren en beheren van onze diensten.</li>
            <li>Het verwerken van betalingen en bestellingen.</li>
            <li>Het verbeteren van de gebruikservaring en functionaliteiten van de Website.</li>
            <li>Het analyseren van gebruiksstatistieken om de Website te optimaliseren.</li>
            <li>Het communiceren met gebruikers voor ondersteuning of marketing (met toestemming).</li>
          </ul>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">4. Met wie delen we jouw gegevens?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Wij delen jouw persoonsgegevens niet met derden, behalve in de volgende gevallen:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
            <li>Wanneer het nodig is om een dienst te leveren (bijvoorbeeld betalingsverwerkers).</li>
            <li>Om te voldoen aan wettelijke verplichtingen.</li>
            <li>Met jouw expliciete toestemming.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">5. Hoe beschermen we jouw gegevens?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We nemen de beveiliging van jouw gegevens serieus. We hebben technische en organisatorische maatregelen getroffen om jouw gegevens te beschermen tegen ongeautoriseerde toegang, verlies of misbruik. Bijvoorbeeld:
          </p>
          <ul className="list-disc list-inside text-lg text-gray-600 mb-6">
            <li>Encryptie van gevoelige gegevens (zoals betalingsinformatie).</li>
            <li>Regelmatige beveiligingscontroles en updates van onze systemen.</li>
            <li>Toegang tot persoonsgegevens is beperkt tot geautoriseerde medewerkers.</li>
          </ul>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">6. Jouw rechten</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Je hebt het recht om jouw persoonsgegevens in te zien, te corrigeren of te verwijderen. Je kunt ook bezwaar maken tegen de verwerking van jouw gegevens of vragen om beperking van de verwerking. Neem contact met ons op als je gebruik wilt maken van deze rechten.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">7. Hoe lang bewaren we jouw gegevens?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Wij bewaren jouw persoonsgegevens niet langer dan nodig is voor de doeleinden waarvoor we ze hebben verzameld, tenzij we wettelijk verplicht zijn om ze langer te bewaren. 
          </p>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">8. Cookies en trackingtechnologieën</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Wij gebruiken cookies en soortgelijke technologieën om onze Website te laten functioneren, om het gebruik van de Website te analyseren en om gepersonaliseerde advertenties te tonen. Je kunt het gebruik van cookies beheren via je browserinstellingen.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">9. Wijzigingen in ons privacybeleid</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            We kunnen dit privacybeleid van tijd tot tijd wijzigen om te voldoen aan wettelijke vereisten of om wijzigingen in onze bedrijfsvoering weer te geven. Wij raden je aan om dit beleid regelmatig door te lezen. Wij zullen je op de hoogte stellen van belangrijke wijzigingen via de Website of per e-mail.
          </p>

          <h2 className="text-2xl font-bold mb-6 text-gray-900">10. Contact</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Als je vragen hebt over dit privacybeleid of jouw rechten, neem dan contact met ons op via:
          </p>
          <p className="text-lg text-gray-600">
            SpiritSounds<br />
            E-mail: <a href="mailto:privacy@spiritsounds.com" className="text-blue-600 hover:underline">roy@spiritsounds.com</a><br />
            Adres: Stationsweg 31, Hoogezand
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Vragen over ons privacybeleid?</h2>
          <p className="text-xl mb-10">
            Neem gerust contact met ons op als je meer wilt weten over hoe wij met jouw gegevens omgaan.
          </p>
          <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-blue-50 transition shadow-lg text-lg py-6 px-12 group">
            <Link href="/contact" className="flex items-center justify-center">
              Neem contact op <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </section>
      <Footer /> 
    
    </main>
  );
}

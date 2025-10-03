import { siteContent } from '../content/siteContent';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <img 
              src="/images/logo/logo.png" 
              alt={siteContent.company.name}
              className="h-8 w-auto"
            />
            <a 
              href="/"
              className="text-[#2c5f2d] hover:text-[#ff6b35] transition-colors font-medium"
            >
              ← Zpět na hlavní stránku
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-[#2c5f2d] mb-8">
            Obchodní podmínky
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Účinnost od:</strong> {new Date().toLocaleDateString('cs-CZ')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">1. Základní ustanovení</h2>
              <p className="text-gray-700 mb-4">
                Tyto obchodní podmínky upravují vztah mezi společností {siteContent.company.name} a zákazníky 
                při poskytování stavebních služeb v oblasti energeticky úsporných domů.
              </p>
              <p className="text-gray-700">
                Poskytováním služeb souhlasíte s těmito obchodními podmínkami.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">2. Poskytované služby</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Návrh a projektování energeticky úsporných domů</li>
                <li>Kompletní výstavba pasivních a nízkoenergetických domů</li>
                <li>Realizace hrubé stavby</li>
                <li>Kompletní rekonstrukce domů</li>
                <li>Poradenství v oblasti energetických úspor</li>
                <li>Zprostředkování a administrace dotací</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">3. Ceny a platby</h2>
              <p className="text-gray-700 mb-4">
                Ceny služeb jsou uvedeny v jednotlivých nabídkách a kalkulacích. Všechny ceny jsou uvedeny 
                včetně DPH, pokud není uvedeno jinak.
              </p>
              <p className="text-gray-700 mb-4">
                Platby se provádějí podle předem dohodnutého harmonogramu. Při neplacení v termínu 
                si vyhrazujeme právo pozastavit práce.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">4. Záruky</h2>
              <p className="text-gray-700 mb-4">
                Na provedené práce poskytujeme záruku 5 let. Záruka se nevztahuje na škody způsobené 
                nesprávným užíváním, přírodními katastrofami nebo zásahy třetích osob.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">5. Odpovědnost</h2>
              <p className="text-gray-700 mb-4">
                Společnost {siteContent.company.name} odpovídá za škody způsobené porušením smlouvy 
                v rozsahu předvídatelných škod.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">6. Řešení sporů</h2>
              <p className="text-gray-700 mb-4">
                V případě sporů se strany pokusí dosáhnout dohody. Pokud se nedohodnou, 
                budou spory řešeny před příslušným soudem České republiky.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">7. Kontaktní údaje</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Společnost:</strong> {siteContent.company.name}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Adresa:</strong> {siteContent.company.address}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Telefon:</strong> {siteContent.company.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {siteContent.company.email}
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Tyto obchodní podmínky jsou platné od {new Date().toLocaleDateString('cs-CZ')} a 
                mohou být kdykoli změněny. Aktuální verze je vždy dostupná na našich webových stránkách.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2c5f2d] text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} {siteContent.company.name}. Všechna práva vyhrazena.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;

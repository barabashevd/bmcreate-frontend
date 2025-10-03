import { siteContent } from '../content/siteContent';

const PrivacyPolicy = () => {
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
            Ochrana osobních údajů
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Účinnost od:</strong> {new Date().toLocaleDateString('cs-CZ')}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">1. Správce osobních údajů</h2>
              <div className="bg-gray-50 p-6 rounded-lg mb-4">
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
              <p className="text-gray-700">
                Jako správce osobních údajů zpracováváme vaše osobní údaje v souladu s Nařízením GDPR 
                a zákonem č. 110/2019 Sb., o zpracování osobních údajů.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">2. Jaké údaje zpracováváme</h2>
              <p className="text-gray-700 mb-4">
                V rámci poskytování našich služeb zpracováváme následující kategorie osobních údajů:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li><strong>Identifikační údaje:</strong> jméno, příjmení, titul</li>
                <li><strong>Kontaktní údaje:</strong> adresa, telefon, email</li>
                <li><strong>Údaje o nemovitosti:</strong> adresa nemovitosti, technické parametry</li>
                <li><strong>Finanční údaje:</strong> údaje potřebné pro fakturaci a platební styk</li>
                <li><strong>Technické údaje:</strong> IP adresa, cookies, údaje o používání webu</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">3. Účel zpracování</h2>
              <p className="text-gray-700 mb-4">
                Vaše osobní údaje zpracováváme za účelem:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Poskytování stavebních služeb a poradenství</li>
                <li>Komunikace s vámi ohledně projektů a služeb</li>
                <li>Vytváření nabídek a kalkulací</li>
                <li>Fakturace a platebního styku</li>
                <li>Plnění zákonných povinností</li>
                <li>Zlepšování našich služeb</li>
                <li>Marketingové komunikace (pouze s vaším souhlasem)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">4. Právní základ zpracování</h2>
              <p className="text-gray-700 mb-4">
                Vaše osobní údaje zpracováváme na základě:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Plnění smlouvy:</strong> pro poskytování služeb, které jste si objednali</li>
                <li><strong>Oprávněný zájem:</strong> pro zlepšování služeb a komunikaci</li>
                <li><strong>Souhlas:</strong> pro marketingovou komunikaci</li>
                <li><strong>Zákonná povinnost:</strong> pro daňové a účetní účely</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">5. Doba uchování údajů</h2>
              <p className="text-gray-700 mb-4">
                Osobní údaje uchováváme pouze po dobu nezbytně nutnou:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Údaje ze smluv:</strong> 10 let od ukončení smlouvy</li>
                <li><strong>Daňové doklady:</strong> 10 let od vystavení</li>
                <li><strong>Marketingové údaje:</strong> do odvolání souhlasu</li>
                <li><strong>Technické údaje:</strong> maximálně 2 roky</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">6. Vaše práva</h2>
              <p className="text-gray-700 mb-4">
                Máte následující práva v souvislosti se zpracováním vašich osobních údajů:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>Právo na přístup:</strong> zjistit, jaké údaje o vás zpracováváme</li>
                <li><strong>Právo na opravu:</strong> opravit nepřesné nebo neúplné údaje</li>
                <li><strong>Právo na výmaz:</strong> požádat o smazání vašich údajů</li>
                <li><strong>Právo na omezení:</strong> omezit zpracování vašich údajů</li>
                <li><strong>Právo na přenositelnost:</strong> získat údaje ve strukturovaném formátu</li>
                <li><strong>Právo vznést námitku:</strong> proti zpracování na základě oprávněného zájmu</li>
                <li><strong>Právo na odvolání souhlasu:</strong> kdykoli odvolat váš souhlas</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">7. Sdílení údajů</h2>
              <p className="text-gray-700 mb-4">
                Vaše osobní údaje můžeme sdílet s:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Subdodavateli a partnery pro realizaci projektů</li>
                <li>Úřady a institucemi, pokud to vyžaduje zákon</li>
                <li>Poskytovateli technických služeb (hosting, účetnictví)</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Nikdy neprodáváme vaše osobní údaje třetím stranám.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">8. Kontakt pro ochranu údajů</h2>
              <p className="text-gray-700 mb-4">
                Pro jakékoli dotazy ohledně zpracování osobních údajů nás kontaktujte:
              </p>
              <div className="bg-green-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-2">
                  <strong>Email:</strong> {siteContent.company.email}
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Telefon:</strong> {siteContent.company.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Adresa:</strong> {siteContent.company.address}
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-[#2c5f2d] mb-4">9. Reklamace</h2>
              <p className="text-gray-700 mb-4">
                Máte právo podat stížnost u Úřadu pro ochranu osobních údajů:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Úřad pro ochranu osobních údajů</strong><br />
                  Pplk. Sochora 27, 170 00 Praha 7<br />
                  Tel.: +420 234 665 111<br />
                  Email: posta@uoou.cz
                </p>
              </div>
            </section>

            <div className="border-t pt-6 mt-8">
              <p className="text-sm text-gray-500">
                Tato zásada ochrany osobních údajů je platná od {new Date().toLocaleDateString('cs-CZ')} 
                a může být kdykoli aktualizována. Aktuální verze je vždy dostupná na našich webových stránkách.
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

export default PrivacyPolicy;

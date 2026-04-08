import { FileText, AlertCircle, Scale, Shield, UserCheck, CheckCircle } from 'lucide-react'

export const metadata = {
  title: 'Conditions Générales d\'Utilisation - BBF Immobilier',
  description: 'Conditions générales d\'utilisation du site BBF - Bulle Immobilière',
}

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-cyan-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Conditions Générales <span className="font-['Playfair_Display'] italic">d'Utilisation</span>
          </h1>
          <p className="text-xl text-white/90">
            Règles d'utilisation du site
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="mb-12">
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                <p className="text-gray-700 leading-relaxed">
                  Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation du site internet de BBF – Bulle Immobilière, Business et Foncier. En accédant à ce site, vous acceptez sans réserve les présentes CGU.
                </p>
              </div>
            </div>

            {/* Objet */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Objet du site</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Le site www.bbf-immobilier.com a pour objet de :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Présenter les services de l'agence BBF</li>
                  <li>Diffuser des annonces immobilières (vente, location longue durée, location saisonnière)</li>
                  <li>Permettre aux utilisateurs de prendre contact avec l'agence</li>
                  <li>Proposer des services de gestion immobilière et de conseil</li>
                </ul>
              </div>
            </div>

            {/* Accès au site */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Accès au site</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">L'accès au site est gratuit et ouvert à tous les utilisateurs disposant d'un accès internet.</p>
                <p className="text-gray-700 mb-4">BBF se réserve le droit de :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Modifier, suspendre ou interrompre l'accès au site à tout moment</li>
                  <li>Refuser l'accès au site en cas d'utilisation frauduleuse ou abusive</li>
                  <li>Mettre à jour le contenu sans préavis</li>
                </ul>
              </div>
            </div>

            {/* Utilisation du site */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Utilisation du site</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Vous vous engagez à :</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span>Utiliser le site de manière loyale et conforme à sa destination</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span>Fournir des informations exactes et à jour</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span>Ne pas porter atteinte aux droits de propriété intellectuelle de BBF</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">✓</span>
                      <span>Ne pas diffuser de contenu illicite, diffamatoire ou contraire aux bonnes mœurs</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white border-2 border-red-200 p-6 rounded-xl">
                  <h3 className="font-bold text-red-600 mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Il est strictement interdit de :
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">✗</span>
                      <span>Extraire, copier ou utiliser les données du site à des fins commerciales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">✗</span>
                      <span>Tenter d'accéder de manière non autorisée au système informatique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-600 font-bold mt-1">✗</span>
                      <span>Diffuser des virus ou tout code malveillant</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Propriété intellectuelle */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Propriété intellectuelle</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">L'ensemble du contenu du site (textes, images, logos, vidéos, structure, design) est la propriété exclusive de BBF ou de ses partenaires.</p>
                <p className="text-gray-700 mb-4">Toute reproduction, représentation, modification, publication ou adaptation totale ou partielle du site est strictement interdite sans autorisation écrite préalable de BBF.</p>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-700">Les marques, logos et signes distinctifs reproduits sur le site sont la propriété de BBF. Toute utilisation non autorisée constitue une contrefaçon passible de sanctions pénales.</p>
                </div>
              </div>
            </div>

            {/* Responsabilité */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Limitation de responsabilité</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">BBF s'efforce de fournir des informations exactes et à jour, mais ne peut garantir :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>L'exactitude, la précision ou l'exhaustivité des informations</li>
                  <li>La disponibilité permanente du site (maintenance, pannes techniques)</li>
                  <li>L'absence d'erreurs ou de virus</li>
                </ul>
                <p className="text-gray-700 mb-4">BBF ne saurait être tenu responsable :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Des dommages directs ou indirects résultant de l'utilisation du site</li>
                  <li>Des interruptions de service</li>
                  <li>Du contenu des sites tiers vers lesquels le site pourrait renvoyer</li>
                </ul>
              </div>
            </div>

            {/* Données personnelles */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Données personnelles</h2>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-3">Les données personnelles collectées via le site sont traitées conformément à notre Politique de Confidentialité et au RGPD.</p>
                <p className="text-gray-700">Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-cyan-600 hover:underline font-semibold">Politique de Confidentialité</a>.</p>
              </div>
            </div>

            {/* Liens hypertextes */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Liens hypertextes</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Le site peut contenir des liens vers des sites tiers. BBF n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.</p>
                <p className="text-gray-700">La création de liens hypertextes vers le site de BBF nécessite une autorisation écrite préalable.</p>
              </div>
            </div>

            {/* Modification des CGU */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Modification des CGU</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700">BBF se réserve le droit de modifier les présentes CGU à tout moment. Les modifications entrent en vigueur dès leur publication sur le site. Il est conseillé de consulter régulièrement cette page.</p>
              </div>
            </div>

            {/* Droit applicable */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Droit applicable et juridiction</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Les présentes CGU sont régies par le droit français.</p>
                <p className="text-gray-700">En cas de litige, et après tentative de résolution amiable, les tribunaux français seront seuls compétents.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Contact</h3>
              <p className="text-gray-700 mb-3">Pour toute question concernant ces CGU, contactez-nous :</p>
              <p className="text-gray-700">📧 <strong>contact@bbf-immobilier.com</strong></p>
              <p className="text-gray-700">📞 <strong>+596 596 00 74 20</strong></p>
              <p className="text-gray-700 mt-2">BBF – Bulle Immobilière, Business et Foncier</p>
              <p className="text-gray-700">Quartier Baudelle – 97211 RIVIÈRE-PILOTE</p>
            </div>

            {/* Date */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">Dernière mise à jour : Mars 2026</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

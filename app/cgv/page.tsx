import { ShoppingCart, FileText, CreditCard, Truck, RotateCcw, Shield, AlertTriangle, Scale } from 'lucide-react'

export const metadata = {
  title: 'Conditions Générales de Vente - BBF Immobilier',
  description: 'Conditions générales de vente des prestations BBF - Bulle Immobilière',
}

export default function CGVPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-cyan-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Conditions Générales <span className="font-['Playfair_Display'] italic">de Vente</span>
          </h1>
          <p className="text-xl text-white/90">
            Prestations immobilières
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
                  Les présentes Conditions Générales de Vente (CGV) s'appliquent à toutes les prestations de services proposées par BBF – Bulle Immobilière, Business et Foncier. Toute commande implique l'acceptation sans réserve des présentes CGV.
                </p>
              </div>
            </div>

            {/* Prestations */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Prestations proposées</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Services immobiliers</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">•</span>
                      <span>Transaction immobilière (vente, achat)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">•</span>
                      <span>Location longue durée et saisonnière</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">•</span>
                      <span>Gestion locative (annuelle et touristique)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">•</span>
                      <span>Estimation immobilière</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-cyan-600 font-bold mt-1">•</span>
                      <span>Conseil en investissement immobilier</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Tarifs et honoraires */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Tarifs et honoraires</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Les honoraires de BBF sont fixés selon la nature de la prestation :</p>
                <ul className="space-y-3 text-gray-700 mb-4">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Transaction (vente) :</strong> Pourcentage du prix de vente, précisé dans le mandat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Location longue durée :</strong> Honoraires équivalents à un mois de loyer hors charges (répartis selon la loi)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Gestion locative :</strong> Pourcentage mensuel des loyers perçus</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Location saisonnière :</strong> Commission sur chaque réservation</span>
                  </li>
                </ul>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">Les tarifs sont indiqués TTC et peuvent être révisés. Les tarifs applicables sont ceux en vigueur au jour de la signature du mandat ou du contrat.</p>
                </div>
              </div>
            </div>

            {/* Modalités de paiement */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Modalités de paiement</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Les honoraires sont payables :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Par virement bancaire</li>
                  <li>Par chèque à l'ordre de BBF</li>
                  <li>Par carte bancaire (selon les prestations)</li>
                </ul>
                <p className="text-gray-700 mb-4"><strong>Délai de paiement :</strong></p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Transaction : À la signature de l'acte authentique</li>
                  <li>Location : Selon les modalités légales</li>
                  <li>Gestion locative : Mensuellement, après encaissement des loyers</li>
                </ul>
              </div>
            </div>

            {/* Mandat */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Mandat de vente ou de location</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Mandat simple</h3>
                  <p className="text-gray-700">Le propriétaire peut confier la vente ou la location à plusieurs agences et vendre/louer lui-même. Les honoraires ne sont dus qu'en cas de transaction réalisée par BBF.</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Mandat exclusif</h3>
                  <p className="text-gray-700 mb-3">Le propriétaire confie la vente ou la location exclusivement à BBF. En contrepartie, BBF s'engage à une commercialisation active et prioritaire.</p>
                  <div className="bg-white p-4 rounded-lg mt-3">
                    <p className="text-sm text-gray-700"><strong>Avantage :</strong> Mandat résiliable sous 30 jours si les engagements de BBF ne sont pas respectés.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Obligations de BBF */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Obligations de BBF</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">BBF s'engage à :</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Exercer son activité avec professionnalisme et diligence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Respecter la confidentialité des informations communiquées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Fournir des informations exactes et vérifiées</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Assurer un suivi régulier des dossiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Respecter les obligations légales et réglementaires</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Obligations du client */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Obligations du client</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Le client s'engage à :</p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Fournir des informations exactes et complètes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Communiquer tous les documents nécessaires</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Informer BBF de toute modification concernant le bien ou sa situation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Respecter les termes du mandat signé</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span>Régler les honoraires selon les modalités convenues</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rétractation et résiliation */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <RotateCcw className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Rétractation et résiliation</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4"><strong>Droit de rétractation :</strong></p>
                <p className="text-gray-700 mb-4">Conformément à la législation en vigueur, le client dispose d'un délai de rétractation de 14 jours à compter de la signature du mandat (pour les contrats conclus à distance ou hors établissement).</p>
                <p className="text-gray-700 mb-4"><strong>Résiliation du mandat :</strong></p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Mandat simple : Résiliable à tout moment par lettre recommandée</li>
                  <li>Mandat exclusif : Résiliable sous 30 jours si engagements non respectés, sinon selon durée convenue</li>
                </ul>
              </div>
            </div>

            {/* Responsabilité */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Limitation de responsabilité</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">BBF ne saurait être tenu responsable :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                  <li>Des informations erronées fournies par le client</li>
                  <li>De l'inexécution d'une transaction du fait d'un tiers</li>
                  <li>Des vices cachés du bien (sauf manquement à son devoir de conseil)</li>
                  <li>Des cas de force majeure</li>
                </ul>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">BBF dispose d'une assurance Responsabilité Civile Professionnelle couvrant les dommages éventuels dans le cadre de son activité.</p>
                </div>
              </div>
            </div>

            {/* Réclamations */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Réclamations</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Toute réclamation doit être adressée par écrit à :</p>
                <p className="text-gray-700 mb-2"><strong>BBF – Bulle Immobilière, Business et Foncier</strong></p>
                <p className="text-gray-700 mb-2">Quartier Baudelle – 97211 RIVIÈRE-PILOTE</p>
                <p className="text-gray-700 mb-4">📧 contact@bbf-immobilier.com</p>
                <p className="text-gray-700 mb-2">Délais de réponse :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Accusé de réception : 10 jours ouvrés</li>
                  <li>Réponse définitive : 60 jours maximum</li>
                </ul>
              </div>
            </div>

            {/* Médiation */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Médiation</h2>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                <p className="text-gray-700 mb-3">En cas de litige non résolu à l'amiable, vous pouvez recourir gratuitement à un médiateur de la consommation :</p>
                <p className="font-bold text-gray-900">CNPM – Médiation – Consommation</p>
                <p className="text-gray-700">27 Avenue de la Libération – 42400 SAINT-CHAMOND</p>
                <p className="text-gray-700 mt-2">🖥 <a href="https://www.cnpm-mediation.org" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">www.cnpm-mediation.org</a></p>
              </div>
            </div>

            {/* Droit applicable */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Droit applicable</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700">Les présentes CGV sont soumises au droit français. En cas de litige, et après échec de la médiation, les tribunaux français seront seuls compétents.</p>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Contact</h3>
              <p className="text-gray-700 mb-3">Pour toute question concernant ces CGV :</p>
              <p className="text-gray-700">📧 <strong>contact@bbf-immobilier.com</strong></p>
              <p className="text-gray-700">📞 <strong>+596 596 00 74 20</strong></p>
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

import { Shield, FileText, Lock, Scale, Mail, Phone, MapPin } from 'lucide-react'

export const metadata = {
  title: 'Mentions Légales - BBF Immobilier',
  description: 'Mentions légales et informations réglementaires de BBF - Bulle Immobilière, Business et Foncier',
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-cyan-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mentions <span className="font-['Playfair_Display'] italic">Légales</span>
          </h1>
          <p className="text-xl text-white/90">
            Informations Réglementaires
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Identité */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Identité de l'entreprise</h2>
              </div>
              <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-4">BBF – Bulle immobilière, Business & Foncier</h3>
                <p className="text-gray-700 mb-2">SAS au capital variable</p>
                <p className="text-gray-700 mb-2">Immatriculée au RCS de Fort-de-France n° 949 886 667</p>
                <p className="text-gray-700 mb-2">Code NAF : 6831Z – Activités des agences immobilières</p>
                <p className="text-gray-700 mb-4">Siège social : Quartier Baudelle, 97211 Rivière-Pilote, Martinique</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5" style={{ color: '#41A09C' }} />
                    <a href="mailto:prestations.touristiques@bbf-immobilier.com" className="text-gray-700 hover:text-cyan-600">prestations.touristiques@bbf-immobilier.com</a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-5 h-5" style={{ color: '#41A09C' }} />
                    <span className="text-gray-700">+596 696 00 74 20 / +596 696 02 45 21</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Professionnelle */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Carte Professionnelle</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">🔹</span>
                    <p className="text-gray-700"><strong>Carte T</strong> (Transaction sur immeubles et fonds de commerce)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">🔹</span>
                    <p className="text-gray-700"><strong>Carte G</strong> (Gestion immobilière)</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold">🔹</span>
                    <p className="text-gray-700"><strong>Mention :</strong> Prestations touristiques</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Carte professionnelle n° <strong>97212023000000003</strong>, délivrée par la Chambre de Commerce et d'Industrie de Fort-de-France, sans perception de fonds. Activités contrôlables par la DGCCRF (Direction Générale de la Concurrence, de la Consommation et de la Répression des Fraudes).
                  </p>
                </div>
              </div>
            </div>

            {/* Garanties & Assurances */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Garanties & Assurances</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-cyan-600 font-bold">🔹</span>
                    <h3 className="font-bold text-gray-900">Assurance Responsabilité Civile Professionnelle</h3>
                  </div>
                  <p className="text-gray-700 ml-6">
                    Souscrite auprès de <strong>MMA IARD</strong>, 14 boulevard Marie et Alexandre Oyon – 72030 Le Mans Cedex 9
                  </p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <div className="flex items-start gap-2 mb-2">
                    <span className="text-cyan-600 font-bold">🔹</span>
                    <h3 className="font-bold text-gray-900">Garantie Financière</h3>
                  </div>
                  <p className="text-gray-700 ml-6">
                    Assurée par <strong>MMA IARD</strong>, pour un montant de <strong>40 000 €</strong> - Sans perception de fonds
                  </p>
                </div>
              </div>
            </div>

            {/* RGPD */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Données personnelles – RGPD</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl space-y-4">
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Responsable du traitement :</p>
                  <p className="text-gray-700">Arielle RUFIL</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Finalité :</p>
                  <p className="text-gray-700">Gestion des dossiers clients, suivi contractuel, réservation, gestion comptable, communication liée à nos prestations</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Durée de conservation :</p>
                  <p className="text-gray-700">5 ans après la fin des prestations ou contrats</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Transfert :</p>
                  <p className="text-gray-700">Aucun transfert de données hors UE</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Droits :</p>
                  <p className="text-gray-700">Droit d'accès, de rectification, d'effacement, de limitation, d'opposition, de portabilité (conformément au RGPD)</p>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg mt-4">
                  <p className="font-semibold text-gray-900 mb-2">✉ Pour toute demande, écrire à :</p>
                  <p className="text-gray-700 font-bold">BBF – Bulle Immobilière, Business et Foncier</p>
                  <p className="text-gray-700">Société immatriculée au RSAC de Fort-de-France</p>
                  <p className="text-gray-700 mt-2">Siège social : Quartier Baudelle – 97211 RIVIÈRE-PILOTE</p>
                  <p className="text-gray-700 mt-2">📧 contact@bbf-immobilier.com</p>
                </div>
              </div>
            </div>

            {/* Médiation */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Scale className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Réclamations – Médiation</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">En cas de litige ou réclamation, nous nous engageons à :</p>
                <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
                  <li>Accuser réception sous <strong>10 jours ouvrés</strong></li>
                  <li>Fournir une réponse sous <strong>60 jours</strong></li>
                </ul>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2">Si aucun accord n'est trouvé, vous pouvez contacter :</p>
                  <p className="font-bold text-gray-900">CNPM – Médiation – Consommation</p>
                  <p className="text-gray-700">27 Avenue de la Libération – 42400 SAINT-CHAMOND</p>
                  <p className="text-gray-700 mt-2">🖥 <a href="https://www.cnpm-mediation.org" target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">www.cnpm-mediation.org</a></p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

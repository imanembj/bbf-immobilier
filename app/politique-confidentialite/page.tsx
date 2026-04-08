import { Lock, Shield, Eye, Database, UserCheck, FileText } from 'lucide-react'

export const metadata = {
  title: 'Politique de Confidentialité - BBF Immobilier',
  description: 'Politique de confidentialité et protection des données personnelles de BBF - Bulle Immobilière',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-cyan-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 relative w-full text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Politique de <span className="font-['Playfair_Display'] italic">Confidentialité</span>
          </h1>
          <p className="text-xl text-white/90">
            Protection de vos données personnelles
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
                  BBF – Bulle Immobilière, Business et Foncier s'engage à protéger la vie privée de ses clients et utilisateurs. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
                </p>
              </div>
            </div>

            {/* Responsable du traitement */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <UserCheck className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Responsable du traitement</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-2"><strong>BBF – Bulle Immobilière, Business et Foncier</strong></p>
                <p className="text-gray-700 mb-2">Siège social : Quartier Baudelle – 97211 RIVIÈRE-PILOTE</p>
                <p className="text-gray-700 mb-2">Email : contact@bbf-immobilier.com</p>
                <p className="text-gray-700">Téléphone : +596 596 00 74 20</p>
              </div>
            </div>

            {/* Données collectées */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Données collectées</h2>
              </div>
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Données d'identification</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Nom, prénom</li>
                    <li>Adresse postale</li>
                    <li>Adresse email</li>
                    <li>Numéro de téléphone</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Données de transaction</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Informations sur les biens recherchés ou proposés</li>
                    <li>Historique des demandes et réservations</li>
                    <li>Documents contractuels</li>
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
                  <h3 className="font-bold text-gray-900 mb-3">Données de navigation</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Adresse IP</li>
                    <li>Pages visitées</li>
                    <li>Cookies (avec votre consentement)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Finalités */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Finalités du traitement</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Vos données sont collectées pour :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Gérer vos demandes de contact et de renseignements</li>
                  <li>Traiter vos réservations et transactions immobilières</li>
                  <li>Assurer le suivi de nos prestations</li>
                  <li>Vous envoyer des informations sur nos services (avec votre consentement)</li>
                  <li>Respecter nos obligations légales et réglementaires</li>
                  <li>Améliorer nos services et notre site web</li>
                </ul>
              </div>
            </div>

            {/* Durée de conservation */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Durée de conservation</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Données clients :</strong> 5 ans après la fin de la relation contractuelle</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Données prospects :</strong> 3 ans à compter du dernier contact</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">🔹</span>
                    <span><strong>Documents comptables :</strong> 10 ans conformément aux obligations légales</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Vos droits */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Vos droits</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="space-y-3 text-gray-700 mb-6">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span><strong>Droit d'accès :</strong> Obtenir une copie de vos données personnelles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span><strong>Droit de rectification :</strong> Corriger vos données inexactes ou incomplètes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span><strong>Droit à l'effacement :</strong> Demander la suppression de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span><strong>Droit à la limitation :</strong> Limiter le traitement de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span><strong>Droit d'opposition :</strong> Vous opposer au traitement de vos données</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-600 font-bold mt-1">✓</span>
                    <span><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</span>
                  </li>
                </ul>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg">
                  <p className="font-semibold text-gray-900 mb-2">Pour exercer vos droits :</p>
                  <p className="text-gray-700">Envoyez un email à <strong>contact@bbf-immobilier.com</strong></p>
                  <p className="text-gray-700 mt-2">Ou écrivez à : BBF, Quartier Baudelle – 97211 RIVIÈRE-PILOTE</p>
                  <p className="text-sm text-gray-600 mt-3">Nous vous répondrons dans un délai de 30 jours maximum.</p>
                </div>
              </div>
            </div>

            {/* Sécurité */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Lock className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Sécurité des données</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données :</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>Chiffrement des données sensibles</li>
                  <li>Accès restreint aux données personnelles</li>
                  <li>Sauvegardes régulières</li>
                  <li>Formation de notre personnel à la protection des données</li>
                  <li>Aucun transfert de données hors de l'Union Européenne</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#55E0FF' }}>
                  <Database className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Cookies</h2>
              </div>
              <div className="bg-white border-2 border-gray-200 p-6 rounded-xl">
                <p className="text-gray-700 mb-4">Notre site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez à tout moment gérer vos préférences de cookies via les paramètres de votre navigateur.</p>
                <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-gray-700">Types de cookies utilisés : cookies techniques (nécessaires au fonctionnement du site) et cookies analytiques (avec votre consentement).</p>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-6 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-3">Questions ou réclamations</h3>
              <p className="text-gray-700 mb-3">Pour toute question concernant cette politique de confidentialité ou pour exercer vos droits, contactez-nous :</p>
              <p className="text-gray-700">📧 <strong>contact@bbf-immobilier.com</strong></p>
              <p className="text-gray-700 mt-2">Vous avez également le droit de déposer une plainte auprès de la CNIL (Commission Nationale de l'Informatique et des Libertés).</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

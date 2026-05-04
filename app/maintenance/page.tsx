export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="bg-white rounded-2xl shadow-2xl p-12">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Site Temporairement Indisponible
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Notre site est actuellement en maintenance. Nous serons de retour très bientôt.
          </p>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <p className="text-gray-700">
              Pour toute urgence, veuillez nous contacter directement :
            </p>
            <p className="text-blue-600 font-semibold mt-2">
              📧 assist.bbf@gmail.com
            </p>
            <p className="text-blue-600 font-semibold mt-1">
              📱 +596 696 00 74 20
            </p>
            <p className="text-blue-600 font-semibold mt-1">
              📱 +596 696 02 45 21
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

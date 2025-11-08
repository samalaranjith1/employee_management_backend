import type { FC } from "react";

interface DashboardProps {
  userName: string;
}

const Dashboard: FC<DashboardProps> = ({ userName }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <h2 className="text-3xl font-bold mb-2">Welcome back, {userName}!</h2>
          <p className="text-blue-100">
            Here's what's happening with your health today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Appointments</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">3</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Prescriptions</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">2</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Health Score</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">85%</p>
              </div>
              <div className="bg-purple-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">Messages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">5</p>
              </div>
              <div className="bg-pink-100 rounded-full p-3">
                <svg
                  className="w-6 h-6 text-pink-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Upcoming Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Upcoming Appointments
              </h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded-r-lg hover:shadow-md transition duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Dr. Sarah Johnson - General Checkup
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Monday, Nov 11, 2025 at 10:00 AM
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-green-600 bg-green-50 p-4 rounded-r-lg hover:shadow-md transition duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Dr. Michael Chen - Cardiology
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Wednesday, Nov 13, 2025 at 2:30 PM
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
                      Confirmed
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-purple-600 bg-purple-50 p-4 rounded-r-lg hover:shadow-md transition duration-300">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">
                        Dr. Emily Rodriguez - Dermatology
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        Friday, Nov 15, 2025 at 4:00 PM
                      </p>
                    </div>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded-full">
                      Pending
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Health Articles */}
            <div className="bg-white rounded-xl shadow-md p-6 mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Recommended Health Articles
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      10 Tips for Better Sleep
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Learn how to improve your sleep quality naturally...
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition duration-300 cursor-pointer">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-lg"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Heart Health Essentials
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Everything you need to know about maintaining a healthy heart...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md hover:shadow-lg">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    Book Appointment
                  </div>
                </button>

                <button className="w-full text-left px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-300">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    Message Doctor
                  </div>
                </button>

                <button className="w-full text-left px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition duration-300">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    View Records
                  </div>
                </button>
              </div>
            </div>

            {/* Health Tips */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Health Tip</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-800 font-medium">
                      Stay Hydrated
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Drink at least 8 glasses of water daily to maintain optimal health.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


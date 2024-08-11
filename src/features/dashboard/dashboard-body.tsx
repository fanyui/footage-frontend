'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { getDashboardData } from '@/src/api';


const DasboardBody: React.FC = () => {

  const { data: session } = useSession();
  const user = session?.user;

  const [dashboardData, setDashboardData] = useState<Object>({});

  useEffect(() => {
    (async () => {
      setDashboardData(await getDashboardData())
    })()
  }, [])

  console.log(dashboardData)
  return (


    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Dashboard Overview */}
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {/* Card: Uploaded Videos */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276a1 1 0 011.447.894v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 16.106v-6.764a1 1 0 011.447-.894L9 10m0 0v10m0-10l6-3" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Uploaded Videos</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{dashboardData.videos}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Detected Events */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Detected Events</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{dashboardData.detectedEvents}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: Unresolved Alerts */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-1.414-1.414A2 2 0 0015.536 4L13 6.536l-3.536-3.536a2 2 0 00-2.828 0l-1.414 1.414a2 2 0 000 2.828L8.464 13l-3.536 3.536a2 2 0 000 2.828l1.414 1.414a2 2 0 002.828 0L13 17.464l3.536 3.536a2 2 0 002.828 0l1.414-1.414a2 2 0 000-2.828L17.536 13l3.536-3.536a2 2 0 000-2.828z" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Suspects </dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">{dashboardData.suspects}</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            {/* Card: System Status */}
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-6a3 3 0 013-3h6m-9 6v-6a3 3 0 013-3h6m-9 9a3 3 0 013 3v6m0-9h6a3 3 0 013-3v-6" />
                    </svg>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Status</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">OK</div>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Additional Content Can Go Here */}

          <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Video</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Uploaded By</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Upload Date</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboardData?.footage?.map((video) => (
                      <tr key={video.id}>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{video.geminiDisplayName}</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{video.uploadedBy}</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{new Date(video.uploadDate).toLocaleString()}</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm">{video.geminiState || 'Pending'}</td>
                        <td className="px-6 py-4 border-b border-gray-300 text-sm">
                          <Link href={`/dashboard/detail/${video.id}`} className="text-blue-500 hover:text-blue-700">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DasboardBody;




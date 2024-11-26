import React from "react";

const Dashboard = () => {
  return (
    <section className="h-screen w-full flex justify-center py-12 px-12">
      <div className="w-full rounded-lg shadow-lg border border-gray-300 py-4 px-4">
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">
            User Dashboard
          </h3>
          <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
            Personal details and information.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Dingus Dongus
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm/6 font-medium text-gray-900">
                User Status:
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                Admin/No?
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm/6 font-medium text-gray-900">
                Email address
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                margotfoster@example.com
              </dd>
            </div>
            <div className="bg-white px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-3">
              <dt className="text-sm/6 font-medium text-gray-900">Password</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                *********
                <button className="ml-20 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  Change Password
                </button>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;

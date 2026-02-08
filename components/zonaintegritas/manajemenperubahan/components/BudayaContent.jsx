import React from 'react';

const BudayaContent = ({ content }) => {
  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat data budaya organisasi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
      <div className="text-center">
        <div className="w-20 h-20 mx-auto bg-orange-100 rounded-full flex items-center justify-center mb-6">
          <svg className="w-10 h-10 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Pola Pikir dan Budaya Kerja</h3>
        <p className="text-gray-600 max-w-lg mx-auto mb-6">
          Halaman ini sedang dalam pengembangan. Data Pola Pikir dan Budaya Kerja akan segera tersedia.
        </p>
        <div className="inline-flex items-center px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Coming Soon
        </div>
      </div>
    </div>
  );
};

export default BudayaContent;
// components/zonaintegritas/components/BenturankepentinganContent.jsx
"use client";

import React from 'react';

const BenturankepentinganContent = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 border border-amber-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Benturan Kepentingan</h2>
            <p className="text-sm text-gray-600">Pencegahan dan pengelolaan konflik kepentingan</p>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700">
            Sistem pengelolaan benturan kepentingan bertujuan untuk mencegah terjadinya 
            konflik antara kepentingan pribadi dengan tugas dan tanggung jawab sebagai 
            pegawai Badan POM, serta menjaga objektivitas dalam pengambilan keputusan.
          </p>
        </div>
      </div>

      {/* Poster Section */}
      <div className="text-center py-12">
        <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <p className="font-medium text-gray-600 mb-2">Poster belum tersedia</p>
        <p className="text-sm text-gray-500">
          Poster informasi benturan kepentingan akan ditampilkan di sini
        </p>
      </div>

      {/* Informasi */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Prinsip Pengelolaan Benturan Kepentingan</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Transparansi dalam pengambilan keputusan</span>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Pelaporan potensi benturan kepentingan</span>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Penghindaran konflik kepentingan</span>
          </div>
          
          <div className="flex items-start">
            <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg className="w-3 h-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-gray-700">Pengelolaan konflik yang terjadi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenturankepentinganContent;
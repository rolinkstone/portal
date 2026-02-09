// components/zonaintegritas/components/WbsContent.jsx
"use client";

import React from 'react';
import { wbsPrinciples } from '../content/wbs';

const WbsContent = () => {
  return (
    <div className="space-y-6">
      {/* Hero Section WBS */}
      <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Whistleblowing System (WBS)</h2>
            <p className="text-sm text-gray-600">Sistem pelaporan pelanggaran terintegrasi</p>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700 mb-4">
            Sistem pelaporan yang memberikan kesempatan kepada seluruh pegawai dan masyarakat 
            untuk melaporkan dugaan penyimpangan, penyalahgunaan wewenang, atau tindakan 
            tidak terpuji di lingkungan Badan POM secara aman dan terpercaya.
          </p>
        </div>
      </div>

      {/* Prinsip-prinsip WBS */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Prinsip Utama WBS</h3>
        <div className="space-y-3">
          {wbsPrinciples.map((principle, index) => (
            <div key={index} className="flex items-start">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-700">{principle}</span>
            </div>
          ))}
        </div>
      </div>

     
    </div>
  );
};

export default WbsContent;
// components/zonaintegritas/components/MonevinovasiContent.jsx
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { monevinovasiData } from '../content/monevinovasi';

const MonevinovasiContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('semua');
  const [filterTahun, setFilterTahun] = useState('semua');
  const itemsPerPage = 10;

  // Get unique tahun untuk filter
  const tahunOptions = useMemo(() => {
    const tahun = [...new Set(monevinovasiData.map(item => item.tahun))].sort((a, b) => b - a);
    return ['semua', ...tahun];
  }, []);

  // Get unique status untuk filter
  const statusOptions = useMemo(() => {
    const status = [...new Set(monevinovasiData.map(item => item.status))];
    return ['semua', ...status];
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    let result = monevinovasiData;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        return (
          item.judul?.toLowerCase().includes(query) ||
          item.deskripsi?.toLowerCase().includes(query) ||
          item.layanan?.toLowerCase().includes(query) ||
          item.tahun?.includes(query)
        );
      });
    }
    
    // Apply status filter
    if (filterStatus !== 'semua') {
      result = result.filter(item => item.status === filterStatus);
    }
    
    // Apply tahun filter
    if (filterTahun !== 'semua') {
      result = result.filter(item => item.tahun === filterTahun);
    }
    
    return result;
  }, [searchQuery, filterStatus, filterTahun]);

  // Reset page saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus, filterTahun]);

  // Pagination data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Fungsi pagination
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilterStatus('semua');
    setFilterTahun('semua');
  };

  // Fungsi untuk mendapatkan warna status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Berjalan':
        return 'bg-blue-50 text-blue-800 border border-blue-300';
      case 'Selesai':
        return 'bg-green-50 text-green-800 border border-green-300';
      case 'Dalam Evaluasi':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-300';
      case 'Rekomendasi':
        return 'bg-purple-50 text-purple-800 border border-purple-300';
      case 'Ditolak':
        return 'bg-red-50 text-red-800 border border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Fungsi untuk mendapatkan warna layanan
  const getLayananColor = (layanan) => {
    switch (layanan) {
      case 'Digital':
        return 'bg-indigo-50 text-indigo-800 border border-indigo-300';
      case 'Administrasi':
        return 'bg-teal-50 text-teal-800 border border-teal-300';
      case 'Konsultasi':
        return 'bg-cyan-50 text-cyan-800 border border-cyan-300';
      case 'Pengawasan':
        return 'bg-amber-50 text-amber-800 border border-amber-300';
      case 'Publikasi':
        return 'bg-pink-50 text-pink-800 border border-pink-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Fungsi untuk handle aksi
  const handleView = (item) => {
    alert(`Detail Monev Inovasi:\n\nJudul: ${item.judul}\nLayanan: ${item.layanan}\nStatus: ${item.status}\nTahun: ${item.tahun}\nIndikator: ${item.indikator}\nDeskripsi: ${item.deskripsi}`);
  };

  const handleDownload = (item) => {
    alert(`Mengunduh laporan: ${item.file}`);
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-6 border border-violet-100">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">Monitoring & Evaluasi Inovasi Layanan</h2>
            <p className="text-sm text-gray-600">Pemantauan dan penilaian inovasi pelayanan publik</p>
          </div>
        </div>
        
        <div className="prose prose-sm max-w-none">
          <p className="text-gray-700">
            Sistem monitoring dan evaluasi inovasi layanan publik bertujuan untuk memantau, 
            mengevaluasi, dan meningkatkan kualitas inovasi pelayanan yang diterapkan, 
            serta mengukur dampaknya terhadap kepuasan masyarakat dan efisiensi layanan.
          </p>
        </div>
      </div>

      {/* Filter dan Search Bar */}
      <div className="bg-white rounded-xl shadow border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Cari inovasi layanan..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === 'semua' ? 'Semua Status' : status}
                </option>
              ))}
            </select>
            
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
            >
              {tahunOptions.map((tahun) => (
                <option key={tahun} value={tahun}>
                  {tahun === 'semua' ? 'Semua Tahun' : tahun}
                </option>
              ))}
            </select>
            
            <button
              onClick={clearSearch}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Filter Info */}
        {(searchQuery || filterStatus !== 'semua' || filterTahun !== 'semua') && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{filteredData.length}</span> inovasi ditemukan
              {searchQuery && ` untuk "${searchQuery}"`}
              {filterStatus !== 'semua' && ` • Status: ${filterStatus}`}
              {filterTahun !== 'semua' && ` • Tahun: ${filterTahun}`}
            </div>
          </div>
        )}
      </div>

      {/* Tabel Monev Inovasi */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl mr-3">📈</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Monitoring & Evaluasi Inovasi</h3>
                <p className="text-sm text-gray-600">Balai Besar POM di Palangka Raya</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              {filteredData.length > 0 ? `Halaman ${currentPage} dari ${totalPages}` : 'Data Kosong'}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                  NO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  INOVASI LAYANAN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-32">
                  TAHUN
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-48">
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.length > 0 ? (
                paginatedData.map((item, index) => {
                  const displayNumber = (currentPage - 1) * itemsPerPage + index + 1;
                  
                  return (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                        {displayNumber}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <div className="text-sm font-semibold text-gray-900">{item.judul}</div>
                          <div className="text-xs text-gray-500 mt-1">{item.deskripsi}</div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getLayananColor(item.layanan)}`}>
                              {item.layanan}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          {item.indikator && (
                            <div className="text-xs text-gray-600 mt-2 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              Indikator: {item.indikator}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-violet-700">{item.tahun}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            onClick={() => handleView(item)}
                            className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Detail
                          </button>
                          <button
                            onClick={() => handleDownload(item)}
                            className="px-4 py-2 text-sm font-medium text-violet-700 bg-violet-50 hover:bg-violet-100 rounded-lg border border-violet-200 transition-colors flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Laporan
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="text-gray-400">
                      <svg className="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      <p className="font-medium text-gray-600 mb-2">Belum ada data monitoring & evaluasi inovasi</p>
                      <p className="text-sm text-gray-500">
                        Data monitoring dan evaluasi inovasi layanan akan ditampilkan di sini setelah tersedia
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredData.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold">{Math.min((currentPage - 1) * itemsPerPage + 1, filteredData.length)}</span> -{' '}
                <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> dari{' '}
                <span className="font-semibold">{filteredData.length}</span> inovasi
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                    currentPage === 1
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Sebelumnya
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageClick(page)}
                      className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg ${
                        currentPage === page
                          ? 'bg-violet-600 text-white font-medium'
                          : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-500">...</span>
                      <button
                        onClick={() => handlePageClick(totalPages)}
                        className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg ${
                          currentPage === totalPages
                            ? 'bg-violet-600 text-white font-medium'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-lg flex items-center ${
                    currentPage === totalPages
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Selanjutnya
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonevinovasiContent;
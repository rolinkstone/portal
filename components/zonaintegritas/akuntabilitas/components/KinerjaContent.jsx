// components/zonaintegritas/akuntabilitas/components/KinerjaContent.jsx
"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { kinerjaData, kinerjaContent } from '../content/kinerja';

const KinerjaContent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('semua');
  const [filterTahun, setFilterTahun] = useState('semua');
  const [filterUnit, setFilterUnit] = useState('semua');
  const itemsPerPage = 10;

  // Get unique tahun untuk filter
  const tahunOptions = useMemo(() => {
    const tahun = [...new Set(kinerjaData.map(item => item.tahun))].sort((a, b) => b - a);
    return ['semua', ...tahun];
  }, []);

  // Get unique tipe untuk filter
  const typeOptions = useMemo(() => {
    const types = [...new Set(kinerjaData.map(item => item.tipe))];
    return ['semua', ...types];
  }, []);

  // Get unique unit untuk filter
  const unitOptions = useMemo(() => {
    const units = [...new Set(kinerjaData.map(item => item.unit))];
    return ['semua', ...units];
  }, []);

  // Filter data
  const filteredData = useMemo(() => {
    let result = kinerjaData;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(item => {
        return (
          item.judul?.toLowerCase().includes(query) ||
          item.deskripsi?.toLowerCase().includes(query) ||
          item.kode?.toLowerCase().includes(query) ||
          item.unit?.toLowerCase().includes(query) ||
          item.tahun?.includes(query)
        );
      });
    }
    
    // Apply tipe filter
    if (filterType !== 'semua') {
      result = result.filter(item => item.tipe === filterType);
    }
    
    // Apply tahun filter
    if (filterTahun !== 'semua') {
      result = result.filter(item => item.tahun === filterTahun);
    }
    
    // Apply unit filter
    if (filterUnit !== 'semua') {
      result = result.filter(item => item.unit === filterUnit);
    }
    
    return result;
  }, [searchQuery, filterType, filterTahun, filterUnit]);

  // Reset page saat filter berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterType, filterTahun, filterUnit]);

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
    setFilterType('semua');
    setFilterTahun('semua');
    setFilterUnit('semua');
  };

  // Fungsi untuk mendapatkan warna tipe
  const getTypeColor = (tipe) => {
    switch (tipe) {
      case 'IKU':
        return 'bg-purple-50 text-purple-800 border border-purple-300';
      case 'IKK':
        return 'bg-indigo-50 text-indigo-800 border border-indigo-300';
      case 'Output':
        return 'bg-cyan-50 text-cyan-800 border border-cyan-300';
      case 'Outcome':
        return 'bg-pink-50 text-pink-800 border border-pink-300';
      case 'Impact':
        return 'bg-rose-50 text-rose-800 border border-rose-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Fungsi untuk mendapatkan warna status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Aktif':
        return 'bg-green-50 text-green-800 border border-green-300';
      case 'Revisi':
        return 'bg-yellow-50 text-yellow-800 border border-yellow-300';
      case 'Arsip':
        return 'bg-gray-100 text-gray-800 border border-gray-300';
      case 'Draft':
        return 'bg-blue-50 text-blue-800 border border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-300';
    }
  };

  // Fungsi untuk handle aksi
  const handleView = (item) => {
    alert(`Detail Indikator Kinerja:\n\nKode: ${item.kode}\nJudul: ${item.judul}\nTipe: ${item.tipe}\nUnit: ${item.unit}\nTahun: ${item.tahun}\nTarget: ${item.target}\nSatuan: ${item.satuan}`);
  };

  const handleDownload = (item) => {
    alert(`Mengunduh dokumen: ${item.file}\nFormat: ${item.format}`);
  };

  return (
    <div className="space-y-6">
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
                placeholder="Cari kode, judul, atau deskripsi indikator..."
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {typeOptions.map((tipe) => (
                <option key={tipe} value={tipe}>
                  {tipe === 'semua' ? 'Semua Tipe' : tipe}
                </option>
              ))}
            </select>
            
            <select
              value={filterUnit}
              onChange={(e) => setFilterUnit(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {unitOptions.map((unit) => (
                <option key={unit} value={unit}>
                  {unit === 'semua' ? 'Semua Unit' : unit}
                </option>
              ))}
            </select>
            
            <select
              value={filterTahun}
              onChange={(e) => setFilterTahun(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        {(searchQuery || filterType !== 'semua' || filterTahun !== 'semua' || filterUnit !== 'semua') && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{filteredData.length}</span> indikator ditemukan
                {searchQuery && ` untuk "${searchQuery}"`}
                {filterType !== 'semua' && ` • Tipe: ${filterType}`}
                {filterUnit !== 'semua' && ` • Unit: ${filterUnit}`}
                {filterTahun !== 'semua' && ` • Tahun: ${filterTahun}`}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tabel Kinerja */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-xl mr-3">🎯</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Daftar Indikator Kinerja</h3>
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
                  INDIKATOR KINERJA
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
                          <div className="flex items-start justify-between">
                            <div>
                              <div className="text-sm font-semibold text-gray-900">{item.judul}</div>
                              <div className="text-xs text-gray-500 mt-1">{item.deskripsi}</div>
                            </div>
                            <span className="text-xs font-mono bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {item.kode}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(item.tipe)}`}>
                              {item.tipe}
                            </span>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800">
                              {item.unit}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                              {item.status}
                            </span>
                          </div>
                          {item.target && (
                            <div className="mt-2 text-xs text-gray-600">
                              <span className="font-medium">Target: </span>
                              {item.target} {item.satuan}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-3 py-2 text-sm font-medium bg-blue-50 text-blue-700 rounded-lg border border-blue-200 inline-block">
                          {item.tahun}
                        </span>
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
                            className="px-4 py-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 rounded-lg border border-purple-200 transition-colors flex items-center justify-center"
                          >
                            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Dokumen
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      <p className="font-medium text-gray-600 mb-2">Belum ada data indikator kinerja</p>
                      <p className="text-sm text-gray-500 mb-4">
                        Data indikator kinerja akan ditampilkan di sini setelah tersedia
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
                <span className="font-semibold">{filteredData.length}</span> indikator
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
                          ? 'bg-purple-600 text-white font-medium'
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
                            ? 'bg-purple-600 text-white font-medium'
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

export default KinerjaContent;
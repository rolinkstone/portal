// components/zonaintegritas/manajemensdm/components/PrestasiContent.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { achievements, prestasiContent, calculateAchievementStats } from '../content/prestasi';

const PrestasiContent = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'tahun',
    direction: 'descending' // default sort by tahun descending (terbaru)
  });
  const itemsPerPage = 10;

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat data prestasi...</p>
        </div>
      </div>
    );
  }

  // Fungsi untuk sorting
  const sortAchievements = (achievementsArray) => {
    const sortedArray = [...achievementsArray];
    
    sortedArray.sort((a, b) => {
      if (sortConfig.key === 'tahun') {
        // Sort by tahun (descending by default)
        if (a.tahun < b.tahun) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a.tahun > b.tahun) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else if (sortConfig.key === 'nama') {
        // Sort by name
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else if (sortConfig.key === 'tingkat') {
        // Sort by tingkat (Internasional > Nasional > Regional)
        const tingkatOrder = { 'Internasional': 3, 'Nasional': 2, 'Regional': 1 };
        const orderA = tingkatOrder[a.tingkat] || 0;
        const orderB = tingkatOrder[b.tingkat] || 0;
        if (orderA < orderB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (orderA > orderB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else if (sortConfig.key === 'kategori') {
        // Sort by kategori
        const kategoriA = a.kategori.toLowerCase();
        const kategoriB = b.kategori.toLowerCase();
        if (kategoriA < kategoriB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (kategoriA > kategoriB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      }
      return 0;
    });
    
    return sortedArray;
  };

  // Filter achievements berdasarkan search query
  const filteredAchievements = useMemo(() => {
    let result = achievements;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(achievement => {
        return (
          achievement.name.toLowerCase().includes(query) ||
          achievement.prestasi.toLowerCase().includes(query) ||
          achievement.jabatan.toLowerCase().includes(query) ||
          achievement.kategori.toLowerCase().includes(query) ||
          achievement.tingkat.toLowerCase().includes(query)
        );
      });
    }
    
    // Apply sorting
    return sortAchievements(result);
  }, [searchQuery, sortConfig]);

  // Reset ke halaman 1 ketika search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortConfig]);

  // Fungsi pagination
  const getAchievementsByPage = (page = 1, itemsPerPage = 10, achievementsArray = achievements) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      data: achievementsArray.slice(startIndex, endIndex),
      currentPage: page,
      totalPages: Math.ceil(achievementsArray.length / itemsPerPage),
      totalItems: achievementsArray.length,
      itemsPerPage
    };
  };

  // Data pagination untuk filtered achievements
  const paginationData = getAchievementsByPage(currentPage, itemsPerPage, filteredAchievements);
  const { data: displayedAchievements, totalPages, totalItems } = paginationData;
  
  // Data statistik dinamis
  const stats = calculateAchievementStats();
  const heroStats = prestasiContent.heroStats();

  // Fungsi untuk handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Fungsi untuk mendapatkan sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return (
        <svg className="w-3 h-3 ml-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'ascending') {
      return (
        <svg className="w-3 h-3 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    return (
      <svg className="w-3 h-3 ml-1 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

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
  };

  return (
    <div className="space-y-6">
      {/* Statistik Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {heroStats.map((stat, index) => (
          <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 text-white shadow-lg`}>
            <div className="flex items-center">
              <span className="text-2xl mr-3">{stat.icon}</span>
              <div>
                <p className="text-sm opacity-90">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
            </div>
            <p className="text-xs opacity-90 mt-2">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Tabel Data Prestasi */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Tabel dengan Search */}
        <div className="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="text-xl mr-3">🏆</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Daftar Prestasi Pegawai</h3>
                <p className="text-sm text-gray-600">Rekap pencapaian dan penghargaan</p>
              </div>
            </div>
            
            <div className="w-full md:w-auto">
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
                  placeholder="Cari nama, prestasi, atau kategori..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 focus:outline-none"
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
              
              {/* Info Pencarian */}
              {searchQuery && (
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Ditemukan <span className="font-semibold text-yellow-600">{filteredAchievements.length}</span> hasil untuk "<span className="font-medium">{searchQuery}"</span>
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-sm text-yellow-600 hover:text-yellow-800"
                  >
                    Hapus pencarian
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabel */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NO
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('nama')}
                >
                  <div className="flex items-center">
                    NAMA PEGAWAI
                    {getSortIcon('nama')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRESTASI
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('tingkat')}
                >
                  <div className="flex items-center">
                    TINGKAT
                    {getSortIcon('tingkat')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('tahun')}
                >
                  <div className="flex items-center">
                    TAHUN
                    {getSortIcon('tahun')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('kategori')}
                >
                  <div className="flex items-center">
                    KATEGORI
                    {getSortIcon('kategori')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedAchievements.length > 0 ? (
                displayedAchievements.map((achievement, index) => {
                  // Hitung nomor urut berdasarkan halaman
                  const displayNumber = (currentPage - 1) * itemsPerPage + index + 1;
                  
                  return (
                    <tr key={achievement.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                        {displayNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{achievement.name}</div>
                        <div className="text-xs text-gray-500 mt-1">{achievement.jabatan}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">{achievement.prestasi}</div>
                        <div className="text-xs text-gray-500 mt-1">{achievement.penyelenggara}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          achievement.tingkat === 'Internasional' 
                            ? 'bg-blue-100 text-blue-800' 
                            : achievement.tingkat === 'Nasional'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {achievement.tingkat}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        {achievement.tahun}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          achievement.kategori === 'Penghargaan'
                            ? 'bg-yellow-100 text-yellow-800'
                            : achievement.kategori === 'Sertifikasi'
                            ? 'bg-blue-100 text-blue-800'
                            : achievement.kategori === 'Publikasi'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-purple-100 text-purple-800'
                        }`}>
                          {achievement.kategori}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-12 text-center">
                    <div className="text-gray-400">
                      <div className="text-4xl mb-4">📊</div>
                      <p className="font-medium text-gray-600 mb-1">Belum ada data prestasi</p>
                      <p className="text-sm text-gray-500">
                        {searchQuery 
                          ? `Tidak ada hasil untuk "${searchQuery}"`
                          : "Data prestasi pegawai akan ditambahkan kemudian"}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="mt-3 text-sm text-yellow-600 hover:text-yellow-800"
                        >
                          Tampilkan semua data
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - hanya tampil jika ada data */}
        {displayedAchievements.length > 0 && totalPages > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-semibold">
                  {Math.min(currentPage * itemsPerPage, filteredAchievements.length)}
                </span> dari <span className="font-semibold">{filteredAchievements.length}</span> prestasi
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button 
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${
                    currentPage === 1
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </button>
                
                {/* Page Numbers */}
                <div className="flex items-center space-x-1">
                  {[...Array(Math.min(5, totalPages))].map((_, index) => {
                    const pageNumber = index + 1;
                    const isCurrent = pageNumber === currentPage;
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageClick(pageNumber)}
                        className={`w-8 h-8 text-sm rounded-md flex items-center justify-center ${
                          isCurrent
                            ? 'bg-yellow-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  
                  {/* Ellipsis jika lebih dari 5 halaman */}
                  {totalPages > 5 && (
                    <>
                      <span className="px-2 text-gray-500">...</span>
                      <button
                        onClick={() => handlePageClick(totalPages)}
                        className={`w-8 h-8 text-sm rounded-md flex items-center justify-center ${
                          totalPages === currentPage
                            ? 'bg-yellow-600 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-100'
                        }`}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                {/* Next Button */}
                <button 
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 text-sm rounded-md flex items-center ${
                    currentPage === totalPages
                      ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Next
                  <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Page Info */}
            <div className="mt-2 text-center text-xs text-gray-500">
              Halaman <span className="font-semibold">{currentPage}</span> dari <span className="font-semibold">{totalPages}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrestasiContent;
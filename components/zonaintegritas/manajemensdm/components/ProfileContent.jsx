// components/zonaintegritas/manajemensdm/components/ProfileContent.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { 
  employees, 
  calculateStats, 
  profileContent 
} from '../content/profile';

const ProfileContent = ({ content }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'id', // default sort by ID
    direction: 'ascending'
  });
  const itemsPerPage = 10;

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat data SDM...</p>
        </div>
      </div>
    );
  }

  // Fungsi untuk sorting
  const sortEmployees = (employeesArray) => {
    const sortedArray = [...employeesArray];
    
    sortedArray.sort((a, b) => {
      if (sortConfig.key === 'name') {
        // Sort by name
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (nameA > nameB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else if (sortConfig.key === 'pangkat') {
        // Sort by pangkat
        const pangkatA = a.pangkat.toLowerCase();
        const pangkatB = b.pangkat.toLowerCase();
        if (pangkatA < pangkatB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (pangkatA > pangkatB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else if (sortConfig.key === 'tipe') {
        // Sort by tipe
        const tipeA = a.tipe.toLowerCase();
        const tipeB = b.tipe.toLowerCase();
        if (tipeA < tipeB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (tipeA > tipeB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else if (sortConfig.key === 'jabatan') {
        // Sort by jabatan
        const jabatanA = a.jabatan.toLowerCase();
        const jabatanB = b.jabatan.toLowerCase();
        if (jabatanA < jabatanB) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (jabatanA > jabatanB) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      } else {
        // Default sort by ID
        if (a.id < b.id) return sortConfig.direction === 'ascending' ? -1 : 1;
        if (a.id > b.id) return sortConfig.direction === 'ascending' ? 1 : -1;
        return 0;
      }
    });
    
    return sortedArray;
  };

  // Filter employees berdasarkan search query
  const filteredEmployees = useMemo(() => {
    let result = employees;
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(employee => {
        return (
          employee.name.toLowerCase().includes(query) ||
          employee.jabatan.toLowerCase().includes(query) ||
          employee.pangkat.toLowerCase().includes(query) ||
          employee.tipe.toLowerCase().includes(query)
        );
      });
    }
    
    // Apply sorting
    return sortEmployees(result);
  }, [searchQuery, sortConfig]);

  // Reset ke halaman 1 ketika search berubah
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, sortConfig]);

  // Fungsi pagination
  const getEmployeesByPage = (page = 1, itemsPerPage = 10, employeeArray = employees) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return {
      data: employeeArray.slice(startIndex, endIndex),
      currentPage: page,
      totalPages: Math.ceil(employeeArray.length / itemsPerPage),
      totalItems: employeeArray.length,
      itemsPerPage
    };
  };

  // Data pagination untuk filtered employees
  const paginationData = getEmployeesByPage(currentPage, itemsPerPage, filteredEmployees);
  const { data: displayedEmployees, totalPages, totalItems } = paginationData;
  
  // Data statistik dinamis
  const stats = calculateStats();
  const heroStats = profileContent.heroStats();

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

  // Highlight text untuk search results
  const highlightMatch = (text, search) => {
    if (!search.trim()) return text;
    
    const regex = new RegExp(`(${search})`, 'gi');
    return text.replace(regex, '<span class="bg-yellow-200 font-semibold">$1</span>');
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

      {/* Tabel Data Pegawai */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* Header Tabel dengan Search */}
        <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="text-xl mr-3">👥</span>
              <div>
                <h3 className="text-lg font-bold text-gray-800">Daftar Pegawai</h3>
                <p className="text-sm text-gray-600">Balai Besar POM di Palangka Raya</p>
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
                  placeholder="Cari nama atau jabatan..."
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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
                    Ditemukan <span className="font-semibold text-blue-600">{filteredEmployees.length}</span> hasil untuk "<span className="font-medium">{searchQuery}"</span>
                  </p>
                  <button
                    onClick={clearSearch}
                    className="text-sm text-blue-600 hover:text-blue-800"
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
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    NAMA
                    {getSortIcon('name')}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  L/P
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('pangkat')}
                >
                  <div className="flex items-center">
                    PANGKAT
                    {getSortIcon('pangkat')}
                </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('tipe')}
                >
                  <div className="flex items-center">
                    TIPE
                    {getSortIcon('tipe')}
                  </div>
                </th>
                <th 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('jabatan')}
                >
                  <div className="flex items-center">
                    JABATAN
                    {getSortIcon('jabatan')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {displayedEmployees.length > 0 ? (
                displayedEmployees.map((employee, index) => {
                  // Hitung nomor urut berdasarkan halaman
                  const displayNumber = (currentPage - 1) * itemsPerPage + index + 1;
                  
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center font-medium text-gray-900">
                        {displayNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-gray-900">
                          {searchQuery && employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                            <span dangerouslySetInnerHTML={{ 
                              __html: highlightMatch(employee.name, searchQuery) 
                            }} />
                          ) : (
                            employee.name
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${
                          employee.gender === 'L' 
                            ? 'bg-blue-100 text-blue-800' 
                            : 'bg-pink-100 text-pink-800'
                        }`}>
                          {employee.gender}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        {searchQuery && employee.pangkat.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                          <span dangerouslySetInnerHTML={{ 
                            __html: highlightMatch(employee.pangkat, searchQuery) 
                          }} />
                        ) : (
                          employee.pangkat
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          employee.tipe === 'Fungsional' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {searchQuery && employee.tipe.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                            <span dangerouslySetInnerHTML={{ 
                              __html: highlightMatch(employee.tipe, searchQuery) 
                            }} />
                          ) : (
                            employee.tipe
                          )}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-700">
                        {searchQuery && employee.jabatan.toLowerCase().includes(searchQuery.toLowerCase()) ? (
                          <span dangerouslySetInnerHTML={{ 
                            __html: highlightMatch(employee.jabatan, searchQuery) 
                          }} />
                        ) : (
                          employee.jabatan
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center">
                    <div className="text-gray-400">
                      <svg className="h-12 w-12 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="font-medium text-gray-600 mb-1">Data tidak ditemukan</p>
                      <p className="text-sm text-gray-500">
                        {searchQuery ? `Tidak ada hasil untuk "${searchQuery}"` : "Tidak ada data pegawai"}
                      </p>
                      {searchQuery && (
                        <button
                          onClick={clearSearch}
                          className="mt-3 text-sm text-blue-600 hover:text-blue-800"
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
        {displayedEmployees.length > 0 && totalPages > 0 && (
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-600">
                Menampilkan <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> - <span className="font-semibold">
                  {Math.min(currentPage * itemsPerPage, filteredEmployees.length)}
                </span> dari <span className="font-semibold">{filteredEmployees.length}</span> pegawai
                {searchQuery && (
                  <span className="ml-2 text-blue-600">
                    (Diurutkan berdasarkan {sortConfig.key} {sortConfig.direction === 'ascending' ? '↑' : '↓'})
                  </span>
                )}
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
                            ? 'bg-blue-600 text-white'
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
                            ? 'bg-blue-600 text-white'
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
              {sortConfig.key !== 'id' && (
                <span className="ml-2 text-blue-600">
                  • Diurutkan berdasarkan {sortConfig.key} 
                  ({sortConfig.direction === 'ascending' ? 'A-Z' : 'Z-A'})
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
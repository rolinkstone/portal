import React, { useState } from 'react';

const DokumenContent = ({ content }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('Semua');
  const [filterStatus, setFilterStatus] = useState('Semua');

  if (!content) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Memuat data dokumen...</p>
        </div>
      </div>
    );
  }

  // Filter data
  const filteredItems = content.sections[0]?.items?.filter(item => {
    const matchesSearch = searchTerm === '' || 
      item.judul.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'Semua' || item.tahun === filterYear;
    const matchesStatus = filterStatus === 'Semua' || item.status === filterStatus;
    
    return matchesSearch && matchesYear && matchesStatus;
  }) || [];

  // Get unique years and statuses for filters
  const years = ['Semua', ...new Set(content.sections[0]?.items?.map(item => item.tahun) || [])];
  const statuses = ['Semua', ...new Set(content.sections[0]?.items?.map(item => item.status) || [])];

  const getStatusColor = (status) => {
    const colors = {
      'Aktif': 'bg-green-100 text-green-800',
      'Final': 'bg-blue-100 text-blue-800',
      'Template': 'bg-purple-100 text-purple-800',
      'Draft': 'bg-yellow-100 text-yellow-800',
      'Revisi': 'bg-amber-100 text-amber-800',
      'Arsip': 'bg-gray-100 text-gray-800',
      'Publish': 'bg-emerald-100 text-emerald-800',
      'Confidential': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getFormatColor = (format) => {
    const colors = {
      'PDF': 'bg-red-50 text-red-700 border-red-200',
      'DOCX': 'bg-blue-50 text-blue-700 border-blue-200',
      'XLSX': 'bg-green-50 text-green-700 border-green-200',
      'PPTX': 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return colors[format] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="mb-2">
          
          <p className="text-gray-600 mt-1">{content.subtitle}</p>
        </div>
        
        {/* Stats */}
        {content.sections[1] && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {content.sections[1].items.map((stat, index) => (
              <div key={index} className={`bg-gradient-to-br from-${stat.color}-50 to-white p-4 rounded-lg border border-${stat.color}-200`}>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari dokumen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {years.map((year, index) => (
                <option key={`year-${year}-${index}`} value={year}>
                  {year}
                </option>
              ))}
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map((status, index) => (
                <option key={`status-${status}-${index}`} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{content.sections[0]?.title}</h2>
          <p className="text-sm text-gray-600 mt-1">{content.sections[0]?.description}</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul Dokumen</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tahun</th>
        
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-700 font-medium">
                      {item.id}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.judul}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.kategori}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {item.tahun}
                    </span>
                  </td>
                 
                  
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => console.log(`Downloading ${item.judul}`)}
                      className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada dokumen ditemukan</h3>
            <p className="text-gray-500">Coba ubah kriteria pencarian atau filter</p>
          </div>
        )}
        
        {/* Table Footer */}
        {filteredItems.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-700">
                Menampilkan <span className="font-medium">{filteredItems.length}</span> dari <span className="font-medium">{content.sections[0]?.items?.length || 0}</span> dokumen
              </p>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
                  Sebelumnya
                </button>
                <button className="px-3 py-1 rounded-lg border border-gray-300 text-sm hover:bg-gray-50 transition-colors">
                  Selanjutnya
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DokumenContent;
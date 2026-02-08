import React from 'react';

const ProfileContent = ({ content }) => {
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

  // Data pegawai dari yang Anda berikan
  const employees = [
    { id: 1, nip: "199205222025211023", name: "Fauzan Abdullah, S.Kom", gender: "L", pangkat: "IX", tipe: "Pelaksana", jabatan: "Penata Layanan Operasional" },
    { id: 2, nip: "198106112006042004", name: "Nurfadilla, S.Si, Apt", gender: "P", pangkat: "IV/a", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Madya" },
    { id: 3, nip: "198907032015022003", name: "Nila Murdiana, S.Si.", gender: "P", pangkat: "III/c", tipe: "Fungsional", jabatan: "Pengawas Farmasi dan Makanan Ahli Muda" },
    // ... tambahkan semua data pegawai di sini
  ];

  // Hitung statistik
  const totalPegawai = employees.length;
  const lakiLaki = employees.filter(e => e.gender === "L").length;
  const perempuan = employees.filter(e => e.gender === "P").length;
  const fungsional = employees.filter(e => e.tipe === "Fungsional").length;
  const pelaksana = employees.filter(e => e.tipe === "Pelaksana").length;

  return (
    <div className="space-y-6">
      {/* Statistik Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">👥</span>
            <div>
              <p className="text-sm opacity-90">Total Pegawai</p>
              <p className="text-2xl font-bold mt-1">{totalPegawai}</p>
            </div>
          </div>
          <p className="text-sm opacity-90">Seluruh unit organisasi</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">♂️</span>
            <div>
              <p className="text-sm opacity-90">Laki-laki</p>
              <p className="text-2xl font-bold mt-1">{lakiLaki}</p>
            </div>
          </div>
          <p className="text-sm opacity-90">{((lakiLaki / totalPegawai) * 100).toFixed(1)}% dari total</p>
        </div>

        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">♀️</span>
            <div>
              <p className="text-sm opacity-90">Perempuan</p>
              <p className="text-2xl font-bold mt-1">{perempuan}</p>
            </div>
          </div>
          <p className="text-sm opacity-90">{((perempuan / totalPegawai) * 100).toFixed(1)}% dari total</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center mb-3">
            <span className="text-2xl mr-3">🏛️</span>
            <div>
              <p className="text-sm opacity-90">Fungsional</p>
              <p className="text-2xl font-bold mt-1">{fungsional}</p>
            </div>
          </div>
          <p className="text-sm opacity-90">Jabatan fungsional</p>
        </div>
      </div>

      {/* Tabel Data Pegawai */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-2xl mr-4">📋</span>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Daftar Pegawai</h3>
                <p className="text-gray-600 mt-1">Balai Besar POM di Palangka Raya</p>
              </div>
            </div>
            <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              {totalPegawai} Pegawai
            </span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NO</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIP</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Lengkap</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L/P</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pangkat Akhir</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipe Pegawai</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Jabatan</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {employee.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {employee.nip}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${employee.gender === 'L' ? 'bg-blue-100 text-blue-800' : 'bg-pink-100 text-pink-800'}`}>
                      {employee.gender === 'L' ? 'L' : 'P'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.pangkat}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${employee.tipe === 'Fungsional' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {employee.tipe}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {employee.jabatan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Menampilkan {employees.length} dari {employees.length} pegawai
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
import React from 'react';

const TimContent = ({ content }) => {
  if (!content) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Data tim sedang dimuat...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      {content.heroStats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {content.heroStats.map((stat, index) => (
            <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}>
              <div className="mb-3">
                <p className="text-sm opacity-90 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Render Sections */}
      {content.sections && content.sections.map((section, sectionIndex) => {
        switch (section.type) {
          case 'grid':
            return (
              <div key={sectionIndex} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="mb-4">
                        <h4 className="font-bold text-gray-800 text-lg mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {item.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                            <p className="font-semibold text-gray-800">{stat.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'cards':
            return (
              <div key={sectionIndex} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <h4 className="font-bold text-gray-800 text-lg mb-4">{item.title}</h4>
                      <p className="text-sm text-gray-700 mb-4">{item.tugas}</p>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Koordinator</p>
                          <p className="text-sm font-medium text-gray-800">{item.koordinator}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Jumlah Anggota</p>
                          <p className="text-sm font-medium text-gray-800">{item.anggota} orang</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'detailed':
            return (
              <div key={sectionIndex} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>
                
                {section.teams.map((team, teamIndex) => (
                  <div key={teamIndex} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 text-xl font-bold">
                          {teamIndex + 1}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-gray-800">{team.name}</h4>
                          <div className="mt-1">
                            <p className="text-sm text-gray-600">Koordinator</p>
                            <p className="text-sm font-medium text-gray-800">{team.coordinator}</p>
                          </div>
                        </div>
                      </div>
                      <span className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                        {team.members.length} anggota
                      </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Anggota */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Anggota Tim</h5>
                        <ul className="space-y-2">
                          {team.members.map((member, idx) => (
                            <li key={idx} className="text-sm text-gray-700 pl-2 border-l-2 border-blue-500 py-1">
                              {member}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tugas */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Tugas Pokok</h5>
                        <ul className="space-y-2">
                          {team.tugas.slice(0, 3).map((tugas, idx) => (
                            <li key={idx} className="text-sm text-gray-700 flex items-start">
                              <span className="text-green-500 mr-2 mt-1">✓</span>
                              {tugas}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Program Kerja & IKU */}
                      <div>
                        <h5 className="font-semibold text-gray-800 mb-3">Program Kerja & IKU</h5>
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-2">Program Kerja:</p>
                            <div className="flex flex-wrap gap-2">
                              {team.programKerja.slice(0, 2).map((program, idx) => (
                                <span key={idx} className="inline-block text-xs px-3 py-1 bg-gray-100 text-gray-700 rounded">
                                  {program}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600 mb-2">IKU:</p>
                            <div className="flex flex-wrap gap-2">
                              {team.iku.map((iku, idx) => (
                                <span key={idx} className="inline-block text-xs px-3 py-1 bg-green-100 text-green-700 rounded">
                                  {iku}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            );

          case 'evaluator':
            return (
              <div key={sectionIndex} className="bg-gradient-to-br from-teal-50 to-white rounded-xl p-6 border border-teal-200 shadow-sm">
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{section.title}</h3>
                  <p className="text-gray-600">{section.description}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">Struktur Tim</h4>
                    <div className="space-y-4">
                      <div className="p-3 bg-white rounded-lg border border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Koordinator</p>
                        <p className="font-medium text-gray-800">{section.evaluator.coordinator}</p>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 mb-2">Anggota:</p>
                        <div className="space-y-2">
                          {section.evaluator.members.map((member, idx) => (
                            <div key={idx} className="flex items-center text-sm text-gray-700 bg-gray-50 p-3 rounded">
                              <span className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium mr-3">
                                {idx + 1}
                              </span>
                              {member}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-800 mb-4">Tugas & Program Kerja</h4>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Tugas Pokok:</p>
                        <ul className="space-y-2">
                          {section.evaluator.tugas.slice(0, 3).map((tugas, idx) => (
                            <li key={idx} className="text-sm text-gray-700 pl-2 border-l-2 border-teal-500 py-1">
                              {tugas}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Program Kerja:</p>
                        <div className="flex flex-wrap gap-2">
                          {section.evaluator.programKerja.map((program, idx) => (
                            <span key={idx} className="inline-block text-xs px-3 py-1 bg-teal-100 text-teal-700 rounded">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default TimContent;
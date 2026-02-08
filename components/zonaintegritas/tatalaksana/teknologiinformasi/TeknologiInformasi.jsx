"use client";

import { useState } from "react";
import Navbar from "../../../Navbar";
import { menuItems } from "./content/menuItems";
import { kinerjaContent } from "./content/kinerja";
import KinerjaContent from "./components/KinerjaContent";

export default function TeknologiInformasi() {
  const [activeMenu, setActiveMenu] = useState("kinerja");

  const contentMap = {
    kinerja: kinerjaContent
  };

  const currentContent = contentMap[activeMenu] || kinerjaContent;

  // Fungsi render konten dinamis
  const renderContent = () => {
    switch (activeMenu) {
      case "kinerja":
        return <KinerjaContent content={currentContent} />;

      
      
      default:
        return (
          <div className="space-y-8">
            {/* Hero Stats Section (jika ada) */}
            {currentContent.heroStats && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentContent.heroStats.map((stat, index) => (
                  <div key={index} className={`bg-gradient-to-br ${stat.color} rounded-xl p-6 text-white shadow-lg`}>
                    <div className="flex items-center mb-3">
                      <span className="text-2xl mr-3">{stat.icon}</span>
                      <div>
                        <p className="text-sm opacity-90">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm opacity-90">{stat.change}</span>
                      <span className="text-sm px-2 py-1 bg-white/20 rounded-full">
                        {stat.changeType === "increase" ? "📈" : 
                         stat.changeType === "progress" ? "⚡" : 
                         stat.changeType === "info" ? "ℹ️" : "💰"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Main Content Sections */}
            {currentContent.sections && currentContent.sections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {section.title && (
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-200">
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">{section.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800">{section.title}</h3>
                    </div>
                    {section.description && (
                      <p className="text-gray-600 mt-2 ml-10">{section.description}</p>
                    )}
                  </div>
                )}
                
                <div className="p-6">
                  {/* Render content based on type */}
                  {section.type === "grid" && section.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-gradient-to-b from-white to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200">
                          {item.icon && <div className="text-3xl mb-4">{item.icon}</div>}
                          {item.title && <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>}
                          {item.description && <p className="text-gray-600 mb-4">{item.description}</p>}
                          {item.stats && (
                            <div className="space-y-2">
                              {item.stats.map((stat, statIndex) => (
                                <div key={statIndex} className="flex justify-between items-center">
                                  <span className="text-sm text-gray-600">{stat.label}</span>
                                  <span className="font-medium">{stat.value}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === "list" && section.items && (
                    <div className="space-y-4">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start p-4 bg-gray-50 rounded-lg">
                          <span className="text-blue-500 mr-3 text-lg">•</span>
                          <div className="flex-1">
                            <p className="text-gray-800">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.type === "timeline" && section.items && (
                    <div className="relative">
                      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                      <div className="space-y-8">
                        {section.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center z-10 mr-6">
                              <span className="text-lg font-bold text-blue-700">{item.year}</span>
                            </div>
                            <div className="flex-1">
                              <div className="p-4 rounded-lg bg-white border border-gray-200">
                                <h4 className="font-bold text-gray-800 mb-2">{item.phase}</h4>
                                <ul className="space-y-2">
                                  {item.activities.map((activity, actIndex) => (
                                    <li key={actIndex} className="flex items-center text-gray-700">
                                      <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                      </svg>
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {section.type === "table" && section.items && (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            {section.headers.map((header, headerIndex) => (
                              <th key={headerIndex} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {section.items.map((row, rowIndex) => (
                            <tr key={rowIndex} className="hover:bg-gray-50">
                              {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {section.type === "cards" && section.items && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {section.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-200">
                          <div className="flex items-center mb-4">
                            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center text-xl mr-4">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-800">{item.title}</h4>
                              <p className="text-sm text-gray-600">{item.subtitle}</p>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-4">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${item.statusClass}`}>
                              {item.status}
                            </span>
                            <span className="text-sm text-gray-500">{item.date}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      
      {/* HERO SECTION */}
     <section className="bg-gradient-to-br from-[#0A1A2F] via-[#0F2A4A] to-[#1E429F] py-16 lg:py-24 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 tracking-tight">
            Pemanfaatan Teknologi Informasi
          </h1>
          <p className="text-lg lg:text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Mengoptimalkan inovasi digital untuk meningkatkan efisiensi, transparansi, dan akuntabilitas dalam pelayanan publik Badan POM
          </p>
        </div>
      </div>
    </section>

      {/* MAIN CONTENT */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* SIDEBAR MENU */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-800">Pemanfaatan TI</h2>
                  <p className="text-sm text-gray-600 mt-1">Pilih detail untuk melihat</p>
                </div>
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveMenu(item.id)}
                      className={`w-full text-left flex items-center p-4 rounded-xl mb-2 transition-all duration-200 ${
                        activeMenu === item.id
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                          : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      }`}
                    >
                      <span className="text-xl mr-3">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                      {activeMenu === item.id && (
                        <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN CONTENT AREA */}
            <div className="lg:w-3/4">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
                {/* CONTENT HEADER */}
                <div className="p-8 bg-gradient-to-r from-gray-50 to-white border-b border-gray-200">
                  <div className="flex items-center">
                    <span className="text-3xl mr-4">{currentContent.icon}</span>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                        {currentContent.title}
                       
                      </h2>
                      <p className="text-gray-600 mt-2">{currentContent.description}</p>
                    </div>
                  </div>
                </div>

                {/* CONTENT BODY */}
                <div className="p-8">
                  {renderContent()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
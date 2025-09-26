// src/components/admin/AdminTabs.tsx
"use client";

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminTabs = ({ activeTab, setActiveTab }: AdminTabsProps) => {
  const tabs = [
    "Program Sawit",
    "Kelola Destinasi",
    "Negara",
    "Provinsi",
    "Kontak",
  ];

  return (
    <div className="flex border-b border-white/20 mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`relative py-3 px-6 text-lg font-medium transition-all duration-300 transform ${
            activeTab === tab.toLowerCase()
              ? "text-white border-b-2 border-white shadow-lg scale-105"
              : "text-white/70 hover:text-white hover:scale-105 hover:bg-white/10"
          } rounded-t-lg hover:shadow-xl backdrop-blur-sm`}
        >
          <span className="relative z-10">{tab}</span>
          {activeTab === tab.toLowerCase() && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-t-lg blur-sm"></div>
          )}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;

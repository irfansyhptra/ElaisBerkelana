// src/components/admin/AdminTabs.tsx
"use client";

interface AdminTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const AdminTabs = ({ activeTab, setActiveTab }: AdminTabsProps) => {
  const tabs = ["Destinasi", "Negara", "Provinsi", "Kontak"];

  return (
    <div className="flex border-b mb-8">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab.toLowerCase())}
          className={`py-2 px-6 text-lg transition-colors duration-300 ${
            activeTab === tab.toLowerCase()
              ? "border-b-2 border-brand-green text-brand-green font-semibold"
              : "text-gray-500 hover:text-brand-green"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AdminTabs;

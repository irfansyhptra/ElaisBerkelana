// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import AdminTabs from "@/components/admin/AdminTabs";
import DestinationForm from "@/components/admin/DestinationForm";
import CountryForm from "@/components/admin/CountryForm";
import ProvinceForm from "@/components/admin/ProvinceForm";
import ContactsManager from "@/components/admin/ContactsManager";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("destinasi");

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Admin Dashboard
        </h1>

        <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="max-w-4xl mx-auto mt-8">
          {activeTab === "destinasi" && <DestinationForm />}
          {activeTab === "negara" && <CountryForm />}
          {activeTab === "provinsi" && <ProvinceForm />}
          {activeTab === "kontak" && <ContactsManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

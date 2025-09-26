// src/app/admin/page.tsx
"use client";

import { useState } from "react";
import AdminTabs from "@/components/admin/AdminTabs";
import PalmOilDestinationForm from "@/components/admin/PalmOilDestinationForm";
import OptimizedDestinationManager from "@/components/admin/OptimizedDestinationManager";
import CountryForm from "@/components/admin/CountryForm";
import ProvinceForm from "@/components/admin/ProvinceForm";
import ContactsManager from "@/components/admin/ContactsManager";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("program sawit");

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: "url('/hero-background.png')",
          }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-24">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            Admin Dashboard
          </h1>

          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="max-w-6xl mx-auto mt-8 ">
            {activeTab=== "program sawit" && <PalmOilDestinationForm />}
            {activeTab === "kelola destinasi" && (
              <OptimizedDestinationManager />
            )}
            {activeTab === "negara" && <CountryForm />}
            {activeTab === "provinsi" && <ProvinceForm />}
            {activeTab === "kontak" && <ContactsManager />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

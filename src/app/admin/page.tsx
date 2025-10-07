// src/app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminTabs from "@/components/admin/AdminTabs";
import DualLanguageDestinationManager from "@/components/admin/DualLanguageDestinationManager";
import OptimizedDestinationManager from "@/components/admin/OptimizedDestinationManager";
import CountryForm from "@/components/admin/CountryForm";
import ProvinceForm from "@/components/admin/ProvinceForm";
import ContactsManager from "@/components/admin/ContactsManager";
import { LogOut, User, Clock } from "lucide-react";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("program sawit");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginTime, setLoginTime] = useState<string>("");

  // Check login status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem("adminLoggedIn") === "true";
      const storedLoginTime = localStorage.getItem("adminLoginTime");

      setIsLoggedIn(loggedIn);
      if (storedLoginTime) {
        setLoginTime(storedLoginTime);
      }
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    const currentTime = new Date().toISOString();
    setLoginTime(currentTime);
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("adminLoggedIn");
      localStorage.removeItem("adminLoginTime");
      setIsLoggedIn(false);
      setLoginTime("");
    }
  };

  const getLoginDuration = () => {
    if (!loginTime) return "";

    const loginDate = new Date(loginTime);
    const now = new Date();
    const diffMs = now.getTime() - loginDate.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else {
      const diffHours = Math.floor(diffMins / 60);
      return `${diffHours} hours ago`;
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-amber-500 mx-auto mb-4" />
          <p className="text-white text-lg">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  // Show admin dashboard if logged in
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
          {/* Modern Header with Language Indicator */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Admin Dashboard
              </h1>
              <p className="text-amber-200 text-sm">
                🌍 Dual Language System: Indonesia 🇮🇩 & English 🇬🇧
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Admin Info */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 text-white text-sm">
                  <User className="h-4 w-4" />
                  <span className="font-medium">Admin</span>
                  {loginTime && (
                    <>
                      <span className="text-amber-200">•</span>
                      <Clock className="h-4 w-4 text-amber-200" />
                      <span className="text-amber-200 text-xs">
                        {getLoginDuration()}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="bg-red-500/90 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition-all flex items-center gap-2 backdrop-blur-md border border-red-400/20"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Contextual Tip */}
          {activeTab === "program sawit" && (
            <div className="mb-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg px-6 py-3">
              <p className="text-white text-sm font-medium">
                💡 Tip: Create separate forms for each language
              </p>
            </div>
          )}

          <AdminTabs activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="max-w-6xl mx-auto mt-8">
            {activeTab === "program sawit" && (
              <DualLanguageDestinationManager />
            )}
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

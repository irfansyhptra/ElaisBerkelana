// src/components/admin/DualLanguageDestinationManager.tsx
"use client";

import { useState } from "react";
import PalmOilDestinationForm from "./PalmOilDestinationForm";

type LanguageMode = "id" | "en";

export default function DualLanguageDestinationManager() {
  const [activeLanguage, setActiveLanguage] = useState<LanguageMode>("id");
  const [idFormComplete, setIdFormComplete] = useState(false);
  const [enFormComplete, setEnFormComplete] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Language Selector with Modern Toggle */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Dual Language Destination Form
            </h2>
            <p className="text-gray-600 text-sm">
              Create separate forms for Indonesia 🇮🇩 and English 🇬🇧 versions
            </p>
          </div>

          {/* Language Toggle Switch */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveLanguage("id")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeLanguage === "id"
                    ? "bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">🇮🇩</span>
                <span>Indonesia</span>
                {idFormComplete && (
                  <span className="text-green-400 text-lg">✓</span>
                )}
              </button>

              <button
                onClick={() => setActiveLanguage("en")}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center gap-2 ${
                  activeLanguage === "en"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                <span className="text-xl">🇬🇧</span>
                <span>English</span>
                {enFormComplete && (
                  <span className="text-green-400 text-lg">✓</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-blue-600 text-xl">💡</span>
            <div className="text-sm">
              <p className="font-medium text-blue-900 mb-1">
                How Dual Language System Works:
              </p>
              <ul className="text-blue-700 space-y-1">
                <li>
                  • <strong>Indonesia Form 🇮🇩:</strong> Create destination in
                  Bahasa Indonesia (saved to regular destination model)
                </li>
                <li>
                  • <strong>English Form 🇬🇧:</strong> Create duplicate with
                  English content (saved as separate destination)
                </li>
                <li>
                  • Both forms are independent and won&apos;t conflict with each
                  other
                </li>
                <li>
                  • Use{" "}
                  <kbd className="px-2 py-0.5 bg-white border rounded">
                    slug
                  </kbd>{" "}
                  suffix like <code className="bg-white px-1 rounded">-en</code>{" "}
                  for English version
                </li>
                <li>
                  • After saving both, you can link them via{" "}
                  <code className="bg-white px-1 rounded">translationOf</code>{" "}
                  field
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="mt-4 flex items-center gap-4">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              idFormComplete
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-lg">🇮🇩</span>
            <span className="text-sm font-medium">
              Indonesia: {idFormComplete ? "Complete ✓" : "Not Created"}
            </span>
          </div>

          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              enFormComplete
                ? "bg-green-100 text-green-800"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            <span className="text-lg">🇬🇧</span>
            <span className="text-sm font-medium">
              English: {enFormComplete ? "Complete ✓" : "Not Created"}
            </span>
          </div>
        </div>
      </div>

      {/* Form Container with Language Context */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {/* Active Language Header */}
        <div
          className={`mb-6 p-4 rounded-lg border-l-4 ${
            activeLanguage === "id"
              ? "bg-amber-50 border-amber-600"
              : "bg-blue-50 border-blue-600"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">
                {activeLanguage === "id" ? "🇮🇩" : "🇬🇧"}
              </span>
              <div>
                <h3
                  className={`text-xl font-bold ${
                    activeLanguage === "id" ? "text-amber-900" : "text-blue-900"
                  }`}
                >
                  {activeLanguage === "id"
                    ? "Form Bahasa Indonesia"
                    : "English Form"}
                </h3>
                <p
                  className={`text-sm ${
                    activeLanguage === "id" ? "text-amber-700" : "text-blue-700"
                  }`}
                >
                  {activeLanguage === "id"
                    ? "Isi form dalam Bahasa Indonesia untuk versi lokal"
                    : "Fill the form in English for international version"}
                </p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="text-right">
              <p
                className={`text-xs font-medium ${
                  activeLanguage === "id" ? "text-amber-800" : "text-blue-800"
                }`}
              >
                {activeLanguage === "id" ? (
                  <>
                    💡 Gunakan slug normal:{" "}
                    <code className="bg-white px-2 py-0.5 rounded">
                      desa-tanjung-paku
                    </code>
                  </>
                ) : (
                  <>
                    💡 Add suffix to slug:{" "}
                    <code className="bg-white px-2 py-0.5 rounded">
                      desa-tanjung-paku-en
                    </code>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Render Active Form */}
        <div
          key={activeLanguage}
          className="animate-fadeIn"
          style={{
            animation: "fadeIn 0.3s ease-in-out",
          }}
        >
          {activeLanguage === "id" ? (
            <PalmOilDestinationForm
              onSuccess={() => {
                setIdFormComplete(true);
                alert(
                  "✅ Destinasi Indonesia berhasil dibuat!\n\n" +
                    "Selanjutnya:\n" +
                    "1. Switch ke tab English 🇬🇧\n" +
                    "2. Buat versi English dengan slug berbeda (tambahkan -en)\n" +
                    "3. Isi konten dalam bahasa Inggris"
                );
              }}
            />
          ) : (
            <div>
              {/* English Form Warning */}
              <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-600 text-xl">⚠️</span>
                  <div className="text-sm">
                    <p className="font-medium text-yellow-900 mb-2">
                      Important: English Form Guidelines
                    </p>
                    <ul className="text-yellow-800 space-y-1">
                      <li>
                        • Use different slug (e.g., add{" "}
                        <code className="bg-white px-1 rounded">-en</code>{" "}
                        suffix)
                      </li>
                      <li>• Translate all content to English</li>
                      <li>
                        • Use same images/videos if available, or provide
                        English versions
                      </li>
                      <li>
                        • After saving, note the ID to link with Indonesian
                        version
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <PalmOilDestinationForm
                onSuccess={() => {
                  setEnFormComplete(true);
                  alert(
                    "✅ English Destination Created Successfully!\n\n" +
                      "Next Steps:\n" +
                      "1. Both Indonesian 🇮🇩 and English 🇬🇧 versions are now created\n" +
                      "2. You can link them via admin panel later\n" +
                      "3. Users will see appropriate version based on language preference"
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

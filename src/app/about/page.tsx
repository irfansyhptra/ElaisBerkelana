// src/app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen relative">
      {/* Full page background image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/hero-background.png"
          alt="About Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content with glassmorphism */}
      <div className="relative z-10 pt-32 pb-16">
        <div className="w-full px-8 lg:px-16 xl:px-20">
          {/* Page title */}
          <div className="text-center mb-16">
            <div className="glass-card max-w-4xl mx-auto">
              <h1 className="title-large text-white mb-4">
                {t("about.title")}
              </h1>
              <p className="text-xl text-white/90">{t("about.subtitle")}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            <div className="glass-card h-fit">
              <h2 className="title-medium text-white mb-6">
                {t("about.welcome.title")}
              </h2>
              <div className="space-y-4 text-white/90">
                <p>{t("about.welcome.description1")}</p>
                <p>{t("about.welcome.description2")}</p>
                <p>{t("about.welcome.description3")}</p>
              </div>
              <div className="mt-8">
                <Link href="/destinations" className="btn-primary inline-block">
                  {t("about.welcome.cta")}
                </Link>
              </div>
            </div>

            <div className="glass-card h-fit">
              <h3 className="title-medium text-white mb-6">
                {t("about.focus.title")}
              </h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <span className="text-blue-400 text-2xl">👥</span>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {t("about.values.socialImpact.title")}
                    </h4>
                    <p className="text-white/80">
                      {t("about.values.socialImpact.description")}
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-green-400 text-2xl">�</span>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {t("about.values.environment.title")}
                    </h4>
                    <p className="text-white/80">
                      {t("about.values.environment.description")}
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <span className="text-amber-400 text-2xl">💰</span>
                  <div>
                    <h4 className="font-semibold text-white text-lg">
                      {t("about.values.economicEmpowerment.title")}
                    </h4>
                    <p className="text-white/80">
                      {t("about.values.economicEmpowerment.description")}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Sparkles, Target, Users, Award } from "lucide-react";

export default function AboutSection() {
  const t = useTranslations("aboutPage");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#0b0b0b]">
      {/* Hero Section - Minimalist & Clean */}
      <div className="relative pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div
            className={`transition-all duration-1000 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {/* Small badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800 mb-8">
              <Sparkles className="w-4 h-4 text-[#EA3C23]" />
              <span
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("badge")}
              </span>
            </div>

            {/* Main heading - Extra large typography */}
            <h2
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-black dark:text-white mb-8 max-w-5xl leading-[1.1]"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              {t("title")}
            </h2>

            {/* Subtitle */}
            <p
              className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed"
              style={{ fontFamily: "Montserrat, sans-serif", fontWeight: 400 }}
            >
              {t("p1")}
            </p>
          </div>
        </div>
      </div>

      {/* Bento Grid Section */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-24">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Large card - spans 2 columns */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-8 sm:p-12 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EA3C23]/10 mb-6">
                <Target className="w-6 h-6 text-[#EA3C23]" />
              </div>
              <h3
                className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("missionTitle")}
              </h3>
              <p
                className="text-base sm:text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("p2")}
              </p>
            </div>
          </div>

          {/* Square card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EA3C23]/10 mb-6">
                <Users className="w-6 h-6 text-[#EA3C23]" />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("teamCardTitle")}
              </h3>
              <p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("p3")}
              </p>
            </div>
          </div>

          {/* Square card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-[#0b0b0b] p-8 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300">
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#EA3C23]/10 mb-6">
                <Award className="w-6 h-6 text-[#EA3C23]" />
              </div>
              <h3
                className="text-xl sm:text-2xl font-bold text-black dark:text-white mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("approachTitle")}
              </h3>
              <p
                className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("p4")}
              </p>
            </div>
          </div>

          {/* Wide card - spans 2 columns */}
          <div className="lg:col-span-2 group relative overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-[#EA3C23]/5 to-white dark:from-[#EA3C23]/10 dark:to-[#0b0b0b] p-8 sm:p-12 hover:border-[#EA3C23]/30 transition-all duration-300">
            <div className="relative z-10">
              <h3
                className="text-2xl sm:text-3xl font-bold text-black dark:text-white mb-4"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                {t("whyUsTitle")}
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#EA3C23] mt-2" />
                    <div>
                      <p
                        className="font-semibold text-black dark:text-white mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("experience")}
                      </p>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("experienceDesc")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#EA3C23] mt-2" />
                    <div>
                      <p
                        className="font-semibold text-black dark:text-white mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("individualApproach")}
                      </p>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("individualApproachDesc")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#EA3C23] mt-2" />
                    <div>
                      <p
                        className="font-semibold text-black dark:text-white mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("quality")}
                      </p>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("qualityDesc")}
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#EA3C23] mt-2" />
                    <div>
                      <p
                        className="font-semibold text-black dark:text-white mb-1"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("modernTech")}
                      </p>
                      <p
                        className="text-sm text-gray-600 dark:text-gray-400"
                        style={{ fontFamily: "Montserrat, sans-serif" }}
                      >
                        {t("modernTechDesc")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section - Clean & Minimal */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pb-32">
        <div
          className={`transition-all duration-1000 delay-400 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="mb-12">
            <h2
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-black dark:text-white mb-4"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 900,
                letterSpacing: "-0.02em",
              }}
            >
              {t("faqTitle")}
            </h2>
            <p
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400"
              style={{ fontFamily: "Montserrat, sans-serif" }}
            >
              {t("faqSubtitle")}
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-gray-200 dark:border-gray-800 rounded-2xl px-6 bg-white dark:bg-[#0b0b0b] hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200"
              >
                <AccordionTrigger
                  className="text-left text-base sm:text-lg font-semibold hover:text-[#EA3C23] transition-colors py-6 hover:no-underline"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {t(`faq.q${i}`)}
                </AccordionTrigger>
                <AccordionContent
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-400 pb-6 leading-relaxed"
                  style={{ fontFamily: "Montserrat, sans-serif" }}
                >
                  {t(`faq.a${i}`)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

"use client";

import { FC, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import BounceCards from "./BounceCards";

const CasesHeroBounce: FC = () => {
  const t = useTranslations("cases");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Адаптивные параметры для мобильных и десктопа
  const containerWidth = isMobile ? 360 : 700;
  const containerHeight = isMobile ? 220 : 360;

  // Адаптивные трансформации для разных размеров экрана
  const transformStyles = isMobile
    ? [
        'rotate(10deg) translate(-90px)',
        'rotate(5deg) translate(-45px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(45px)',
        'rotate(2deg) translate(90px)'
      ]
    : [
        'rotate(10deg) translate(-170px)',
        'rotate(5deg) translate(-85px)',
        'rotate(-3deg)',
        'rotate(-10deg) translate(85px)',
        'rotate(2deg) translate(170px)'
      ];

  return (
    <section className="w-screen bg-white dark:bg-[#0b0b0b] relative z-10 overflow-hidden">
      <div className="container-max-width py-10 px-4 sm:px-6 md:px-0 flex flex-col items-center text-center gap-6">
        <h1
          className="font-bold text-black dark:text-white text-3xl sm:text-4xl md:text-5xl"
          style={{
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: 0
          }}
        >
          {t("ourWorks")}
        </h1>

        <p
          className="text-black/80 dark:text-white/80 max-w-[56rem] text-base sm:text-lg md:text-xl px-4 sm:px-0"
          style={{
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.35,
            letterSpacing: "0.01em"
          }}
        >
          {t("subtitle")}
        </p>

        <div className="mt-2 w-full px-2 sm:px-4 md:px-0">
          <BounceCards
            className="mx-auto"
            containerWidth={containerWidth}
            containerHeight={containerHeight}
            enableHover={!isMobile}
            transformStyles={transformStyles}
            images={[
              "https://rlcpynwvpgubxvsuvkew.supabase.co/storage/v1/object/public/Cases/Light%20Box/Eba.jpg",
              "https://rlcpynwvpgubxvsuvkew.supabase.co/storage/v1/object/public/Cases/instalations/maib%20-%20instalatii-1.jpg",
              "https://rlcpynwvpgubxvsuvkew.supabase.co/storage/v1/object/public/Cases/Expo/Barbie%20XO%20-%20Expo%20Stand.jpg",
              "https://rlcpynwvpgubxvsuvkew.supabase.co/storage/v1/object/public/Cases/images/EBA.jpg",
              "https://rlcpynwvpgubxvsuvkew.supabase.co/storage/v1/object/public/Cases/images/smartdata.jpg"
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default CasesHeroBounce;
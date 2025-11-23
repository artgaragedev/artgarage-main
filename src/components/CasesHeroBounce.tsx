"use client";

import { FC } from "react";
import { useTranslations } from "next-intl";
import BounceCards from "./BounceCards";

const CasesHeroBounce: FC = () => {
  const t = useTranslations("cases");

  return (
    <section className="w-screen bg-white dark:bg-[#0b0b0b] relative z-10">
      <div className="container-max-width py-10 px-2 sm:px-0 flex flex-col items-center text-center gap-6">
        <h1
          className="font-bold text-black dark:text-white"
          style={{
            fontSize: "2.2rem",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            margin: 0
          }}
        >
          {t("ourWorks")}
        </h1>

        <p
          className="text-black/80 dark:text-white/80 max-w-[56rem]"
          style={{
            fontFamily: "Montserrat, sans-serif",
            fontSize: "1.2rem",
            lineHeight: 1.35,
            letterSpacing: "0.01em"
          }}
        >
          {t("subtitle")}
        </p>

        <div className="mt-2">
          <BounceCards
            className="mx-auto"
            containerWidth={700}
            containerHeight={360}
            enableHover={true}
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
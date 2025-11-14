"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type TeamMember = {
  name: string;
  roleKey: "designer" | "engineer" | "technician" | "projectManager";
  photo: string; // path under /public/Team
};

const team: TeamMember[] = [
  { name: "Catea", roleKey: "designer", photo: "/Team/Catea.jpg" },
  { name: "Elvira", roleKey: "engineer", photo: "/Team/Elvira.jpg" },
  { name: "Iana", roleKey: "technician", photo: "/Team/Iana.jpg" },
  { name: "Jenea", roleKey: "projectManager", photo: "/Team/Jenea.jpg" },
  { name: "Milena", roleKey: "designer", photo: "/Team/Milena.jpg" },
];

export default function AboutSection() {
  const t = useTranslations("aboutPage");

  return (
    <div className="max-w-[1280px] mx-auto px-4 space-y-8">
      <Card className="overflow-hidden rounded-2xl border bg-background/60 backdrop-blur">
        <CardHeader className="pb-4">
          <CardTitle className="text-3xl font-semibold tracking-tight">{t("title")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-foreground">
              {t("p1")}
            </p>
            <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
              <p className="leading-relaxed">{t("p2")}</p>
              <p className="leading-relaxed">{t("p3")}</p>
            </div>
            <p className="leading-relaxed text-muted-foreground">{t("p4")}</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card className="rounded-2xl border bg-background/60 backdrop-blur">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-semibold">{t("teamTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member) => (
              <Card
                key={member.name}
                className="group overflow-hidden rounded-xl border bg-background/70 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative">
                      <Avatar className="h-28 w-28 shadow-sm ring-2 ring-primary/25">
                        <AvatarImage src={member.photo} alt={member.name} />
                        <AvatarFallback>
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="pointer-events-none absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition bg-gradient-to-br from-primary/20 to-sky-400/20" />
                    </div>
                    <div className="mt-4 space-y-1">
                      <div className="text-base font-semibold tracking-tight">{member.name}</div>
                      <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-muted-foreground bg-muted/40">
                        {t(`roles.${member.roleKey}`)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{t("faqTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>{t("faq.q1")}</AccordionTrigger>
              <AccordionContent>{t("faq.a1")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>{t("faq.q2")}</AccordionTrigger>
              <AccordionContent>{t("faq.a2")}</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>{t("faq.q3")}</AccordionTrigger>
              <AccordionContent>{t("faq.a3")}</AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
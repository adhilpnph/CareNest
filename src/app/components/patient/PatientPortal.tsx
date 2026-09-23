"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AdminLogin } from "../admin/AdminLogin";
import { ContactSection } from "../ContactSection";
import { Header } from "../Header";
import { HeroSection } from "../HeroSection";
import { PatientApiSection } from "./PatientApiSection";
import { ServicesSection } from "../ServicesSection";
import { AssistantSidebar } from "../shared/AssistantSidebar";
import { highlights } from "../../data";
import { enterAsPatient } from "../../store/authSlice";
import type { AppDispatch } from "../../store";

export function PatientPortal() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);

  useEffect(() => {
    dispatch(enterAsPatient());
  }, [dispatch]);

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-5 text-stone-700 sm:px-6 lg:px-8">
      <Header onAdminSignIn={() => setIsAdminLoginOpen(true)} />
      {isAdminLoginOpen && (
        <AdminLogin onClose={() => setIsAdminLoginOpen(false)} />
      )}
      <HeroSection highlights={highlights} />
      <ServicesSection />
      <PatientApiSection />
      <ContactSection />
      <AssistantSidebar />
    </main>
  );
}

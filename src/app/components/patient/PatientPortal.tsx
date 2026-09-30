"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AdminLogin } from "../admin/AdminLogin";
import { ContactSection } from "../shared/ContactSection";
import { Header } from "../shared/Header";
import { HeroSection } from "../shared/HeroSection";
import { PatientApiSection } from "./PatientApiSection";
import { ServicesSection } from "../shared/ServicesSection";
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
    <main className="page-enter mx-auto max-w-[1240px] px-4 pb-20 pt-3 sm:px-6 lg:px-9">
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

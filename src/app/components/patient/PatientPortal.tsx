"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AdminLogin } from "../admin/AdminLogin";
import { ContactSection } from "../ContactSection";
import { DepartmentsSection } from "../DepartmentsSection";
import { DoctorModal } from "../DoctorModal";
import { Header } from "../Header";
import { HeroSection } from "../HeroSection";
import { ServicesSection } from "../ServicesSection";
import { departments, highlights } from "../../data";
import { enterAsPatient } from "../../store/authSlice";
import type { AppDispatch } from "../../store";
import type { Department } from "../../types";

export function PatientPortal() {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(
    departments[0]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(enterAsPatient());
  }, [dispatch]);

  const openDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setActiveIndex(0);
    setIsModalOpen(true);
  };

  const nextDoctor = () => {
    setActiveIndex((previous) =>
      (previous + 1) % selectedDepartment.doctors.length
    );
  };

  const previousDoctor = () => {
    setActiveIndex(
      (previous) =>
        (previous - 1 + selectedDepartment.doctors.length) %
        selectedDepartment.doctors.length
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-5 text-stone-700 sm:px-6 lg:px-8">
      <Header onAdminSignIn={() => setIsAdminLoginOpen(true)} />
      {isAdminLoginOpen && (
        <AdminLogin onClose={() => setIsAdminLoginOpen(false)} />
      )}
      <HeroSection highlights={highlights} />
      <ServicesSection />
      <DepartmentsSection
        departments={departments}
        onOpenDepartment={openDepartment}
      />
      <ContactSection />
      <DoctorModal
        department={selectedDepartment}
        currentIndex={activeIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onNext={nextDoctor}
        onPrevious={previousDoctor}
      />
    </main>
  );
}

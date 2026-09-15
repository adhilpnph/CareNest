"use client";

import { useState } from "react";
import { ContactSection } from "./components/ContactSection";
import { DepartmentsSection } from "./components/DepartmentsSection";
import { DoctorModal } from "./components/DoctorModal";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { ServicesSection } from "./components/ServicesSection";
import { departments, highlights } from "./data";
import { Department } from "./types";

export default function Home() {
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(
    departments[0]
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDepartment = (department: Department) => {
    setSelectedDepartment(department);
    setActiveIndex(0);
    setIsModalOpen(true);
  };

  const nextDoctor = () => {
    setActiveIndex((prev) => (prev + 1) % selectedDepartment.doctors.length);
  };

  const previousDoctor = () => {
    setActiveIndex(
      (prev) =>
        (prev - 1 + selectedDepartment.doctors.length) %
        selectedDepartment.doctors.length
    );
  };

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-5 text-stone-700 sm:px-6 lg:px-8">
      <Header />
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

"use client";

import { useState, useEffect, useCallback } from "react";
import { useGetDepartmentsQuery, useGetDoctorsQuery } from "../../store/careNestApi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Icon } from "../ui/IconGlyph";

export function DepartmentCarousel() {
  const departments = useGetDepartmentsQuery();
  const doctors = useGetDoctorsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const departmentList = departments.data ?? [];
  const doctorList = doctors.data ?? [];

  const goNext = useCallback(() => {
    if (isTransitioning || departmentList.length <= 1) return;
    setDirection("right");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i + 1) % departmentList.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, departmentList.length]);

  const goPrevious = useCallback(() => {
    if (isTransitioning || departmentList.length <= 1) return;
    setDirection("left");
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((i) => (i - 1 + departmentList.length) % departmentList.length);
      setIsTransitioning(false);
    }, 300);
  }, [isTransitioning, departmentList.length]);

  useEffect(() => {
    const interval = setInterval(goNext, 5000);
    return () => clearInterval(interval);
  }, [goNext]);

  if (departments.isLoading || doctors.isLoading) {
    return (
      <div className="flex items-center gap-2 text-sm text-[#85828d]" role="status">
        <span className="size-3 animate-spin rounded-full border-2 border-[#ddd8ed] border-t-[#7969bd]" />
        Loading care directory...
      </div>
    );
  }

  if (departments.isError || doctors.isError) {
    return <p className="text-sm text-[#b74b4b]">The care directory is unavailable right now.</p>;
  }

  if (departmentList.length === 0) {
    return <p className="text-sm text-[#85828d]">No departments available.</p>;
  }

  const currentDepartment = departmentList[currentIndex];
  const departmentDoctors = doctorList.filter((d) => d.department_id === currentDepartment.id);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-3 uppercase tracking-[0.12em]">Live care directory</Badge>
          <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.055em] text-[#292830] sm:text-[40px]">
            Meet our departments and doctors
          </h2>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" size="icon" onClick={goPrevious} aria-label="Previous department" className="size-11 rounded-full border-2 border-[#e5e4e8] bg-white shadow-sm transition-all hover:border-[#7969bd] hover:bg-[#f5f2fc]">
            <Icon name="arrow-left" className="size-5 text-[#7969bd]" />
          </Button>
          <Button type="button" variant="outline" size="icon" onClick={goNext} aria-label="Next department" className="size-11 rounded-full border-2 border-[#e5e4e8] bg-white shadow-sm transition-all hover:border-[#7969bd] hover:bg-[#f5f2fc]">
            <Icon name="arrow-right" className="size-5 text-[#7969bd]" />
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-[#e9e8ec] bg-white shadow-[0_1px_2px_rgba(24,24,28,0.025)]">
        <div
          className={`flex transition-transform duration-300 ease-in-out ${isTransitioning ? (direction === "right" ? "-translate-x-full" : "translate-x-full") : "translate-x-0"}`}
        >
          <div className="w-full flex-shrink-0 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.03em] text-[#302f36]">{currentDepartment.name}</h3>
                <p className="mt-1 text-sm leading-6 text-[#898691]">{currentDepartment.description}</p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f5f3fa] text-[#7969bd]">
                <Icon name="heart" className="size-[18px]" />
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {departmentDoctors.length === 0 ? (
                <p className="text-sm text-[#898691]">No doctors in this department yet.</p>
              ) : (
                departmentDoctors.map((doctor) => (
                  <div key={doctor.id} className="flex items-center gap-3 rounded-xl border border-[#efedf3] bg-[#fcfbfd] p-3 transition-colors hover:border-[#ddd9e8] hover:bg-white">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-[#e8e4f0] bg-gradient-to-br from-[#f3f0fa] to-[#e7e3f0]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src="/doctor-avatar.png"
                        alt={doctor.name}
                        className="size-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#302f36]">{doctor.name}</p>
                      <p className="truncate text-xs text-[#898691]">{doctor.specialty}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {doctor.experience_years != null && (
                        <Badge variant="outline" className="px-2 py-0.5 text-[10px]">{doctor.experience_years} years</Badge>
                      )}
                      <Badge variant="success" className="px-2 py-0.5 text-[10px]">
                        <span className="size-1.5 rounded-full bg-[#58a273]" />
                        Available
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-[#f0eef2] px-5 py-3">
          <span className="text-xs font-medium text-[#9b98a3]">
            {currentDepartment.name} -- {currentIndex + 1} of {departmentList.length}
          </span>
          <div className="flex gap-1.5">
            {departmentList.map((dept, i) => (
              <button
                key={dept.id}
                type="button"
                onClick={() => {
                  if (i !== currentIndex) {
                    setDirection(i > currentIndex ? "right" : "left");
                    setCurrentIndex(i);
                  }
                }}
                aria-label={`Go to ${dept.name}`}
                className={`h-2 rounded-full transition-all duration-300 ${i === currentIndex ? "w-6 bg-[#7969bd]" : "w-2 bg-[#e0dce8] hover:bg-[#c5bedd]"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

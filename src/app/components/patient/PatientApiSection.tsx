"use client";

import { useCreateAppointmentMutation, useGetDoctorsQuery } from "../../store/careNestApi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Icon } from "../ui/IconGlyph";
import { DepartmentCarousel } from "./DepartmentCarousel";

export function PatientApiSection() {
  const doctors = useGetDoctorsQuery();
  const [createAppointment, result] = useCreateAppointmentMutation();

  const submitAppointment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createAppointment({
      patient_name: String(form.get("patient_name")),
      patient_email: String(form.get("patient_email")),
      scheduled_at: String(form.get("scheduled_at")),
      doctor_id: Number(form.get("doctor_id")),
    });
  };

  return (
    <section id="departments" className="grid scroll-mt-28 gap-5 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_.95fr]">
      <div className="min-w-0">
        <DepartmentCarousel />
      </div>

      <Card id="appointments" className="h-fit overflow-hidden lg:sticky lg:top-28 scroll-mt-28">
        <div className="border-b border-[#efedf2] bg-gradient-to-br from-[#faf9fd] to-white px-5 py-5 sm:px-6">
          <div className="flex items-center justify-between">
            <Badge variant="accent" className="uppercase tracking-[0.11em]">Appointments</Badge>
            <Icon name="clock" className="size-4 text-[#9b91c2]" />
          </div>
          <h2 className="mt-3 text-[25px] font-semibold tracking-[-0.05em] text-[#292830]">Request a visit</h2>
          <p className="mt-1 text-[13px] text-[#898691]">Choose a clinician and a time that works for you.</p>
        </div>

        <form onSubmit={submitAppointment} className="grid gap-4 p-5 sm:p-6">
          <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
            Your name
            <Input name="patient_name" placeholder="Your name" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
            Email address
            <Input name="patient_email" type="email" placeholder="Your email" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
            Preferred date and time (hospital local)
            <Input name="scheduled_at" type="datetime-local" required />
          </label>
          <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
            Doctor
            <Select name="doctor_id" required defaultValue="">
              <option value="" disabled>Choose a doctor</option>
              {doctors.data?.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name} · {doctor.specialty}</option>
              ))}
            </Select>
          </label>
          <Button type="submit" disabled={result.isLoading} className="mt-1 w-full">
            {result.isLoading ? "Sending..." : "Request appointment"}
            {!result.isLoading && <Icon name="arrow-right" className="size-4" />}
          </Button>
          {result.isSuccess && <p role="status" className="text-sm text-[#3b8057]">Your appointment request was received.</p>}
          {result.isError && <p role="alert" className="text-sm text-[#b74b4b]">We could not create that appointment. Check the details and try again.</p>}
        </form>
      </Card>
    </section>
  );
}

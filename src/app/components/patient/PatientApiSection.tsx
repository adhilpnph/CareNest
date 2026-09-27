"use client";

import {
  useCreateAppointmentMutation,
  useGetDepartmentsQuery,
  useGetDoctorsQuery,
} from "../../store/careNestApi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Input, Select } from "../ui/input";
import { Icon } from "../ui/IconGlyph";

export function PatientApiSection() {
  const departments = useGetDepartmentsQuery();
  const doctors = useGetDoctorsQuery();
  const [createAppointment, result] = useCreateAppointmentMutation();

  const submitAppointment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    await createAppointment({
      patient_name: String(form.get("patient_name")),
      patient_email: String(form.get("patient_email")),
      scheduled_at: new Date(String(form.get("scheduled_at"))).toISOString(),
      doctor_id: Number(form.get("doctor_id")),
    });
  };

  return (
    <section className="grid scroll-mt-28 gap-5 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_.95fr]">
      <div className="min-w-0">
        <Badge variant="outline" className="mb-3 uppercase tracking-[0.12em]">Live care directory</Badge>
        <h2 className="max-w-xl text-3xl font-semibold tracking-[-0.055em] text-[#292830] sm:text-[40px]">
          Meet our departments and doctors
        </h2>

        {(departments.isLoading || doctors.isLoading) && (
          <p className="mt-5 flex items-center gap-2 text-sm text-[#85828d]" role="status">
            <span className="size-3 animate-spin rounded-full border-2 border-[#ddd8ed] border-t-[#7969bd]" />
            Loading care directory...
          </p>
        )}
        {(departments.isError || doctors.isError) && (
          <p className="mt-5 text-sm text-[#b74b4b]">The care directory is unavailable right now.</p>
        )}

        <div className="mt-6 space-y-2.5">
          {departments.data?.map((department, index) => (
          <Card key={department.id} className="animate-rise p-4 transition-all duration-200 hover:border-[#ddd9e8] hover:shadow-[0_8px_22px_rgba(42,37,62,0.04)] sm:p-5" style={{ animationDelay: `${index * 65}ms` }}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-[14px] font-semibold tracking-[-0.02em] text-[#302f36]">{department.name}</h3>
                  <p className="mt-1 text-[12px] leading-5 text-[#898691]">{department.description}</p>
                </div>
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#f5f3fa] text-[#8172bd]">
                  <Icon name="plus" className="size-4" />
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {doctors.data?.filter((doctor) => doctor.department_id === department.id).map((doctor) => (
                  <Badge key={doctor.id} variant="outline" className="px-2.5 py-1 text-[10px]">
                    {doctor.name} <span className="text-[#b5b2bc]">·</span> {doctor.specialty}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="h-fit overflow-hidden lg:sticky lg:top-28">
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
            Preferred date and time
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

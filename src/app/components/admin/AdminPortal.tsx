"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import type { AppDispatch } from "../../store";
import {
  type Appointment,
  type Department,
  type Doctor,
  type Prescription,
  useCreateAppointmentMutation,
  useCreateDepartmentMutation,
  useCreateDoctorMutation,
  useCreatePrescriptionMutation,
  useDeleteAppointmentMutation,
  useDeleteDepartmentMutation,
  useDeleteDoctorMutation,
  useDeletePrescriptionMutation,
  useGetAppointmentsQuery,
  useGetDepartmentsQuery,
  useGetDoctorsQuery,
  useGetPrescriptionsQuery,
  useLogoutMutation,
  useUpdateAppointmentMutation,
  useUpdateDepartmentMutation,
  useUpdateDoctorMutation,
  useUpdatePrescriptionMutation,
} from "../../store/careNestApi";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select } from "../ui/select";
import { Icon } from "../ui/IconGlyph";
import { CrudSection } from "../shared/CrudSection";

type EditTarget =
  | { type: "department"; item: Department }
  | { type: "doctor"; item: Doctor }
  | { type: "appointment"; item: Appointment }
  | { type: "prescription"; item: Prescription };

function formatDateTime(value: string) {
  return value.slice(0, 16);
}

function displayDateTime(value: string) {
  return value.replace("T", " ").slice(0, 16);
}

const formClass = "grid gap-3";

export function AdminPortal() {
  const dispatch = useDispatch<AppDispatch>();
  const [logoutRequest] = useLogoutMutation();
  const [editing, setEditing] = useState<EditTarget | null>(null);
  const departments = useGetDepartmentsQuery();
  const doctors = useGetDoctorsQuery();
  const appointments = useGetAppointmentsQuery();
  const prescriptions = useGetPrescriptionsQuery();
  const [createDepartment, departmentCreate] = useCreateDepartmentMutation();
  const [updateDepartment, departmentUpdate] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const [createDoctor, doctorCreate] = useCreateDoctorMutation();
  const [updateDoctor, doctorUpdate] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();
  const [createAppointment, appointmentCreate] = useCreateAppointmentMutation();
  const [updateAppointment, appointmentUpdate] = useUpdateAppointmentMutation();
  const [deleteAppointment] = useDeleteAppointmentMutation();
  const [createPrescription, prescriptionCreate] = useCreatePrescriptionMutation();
  const [updatePrescription, prescriptionUpdate] = useUpdatePrescriptionMutation();
  const [deletePrescription] = useDeletePrescriptionMutation();

  const selectRecord = (target: EditTarget) => setEditing(target);
  const closeEditor = () => setEditing(null);
  const isEditing = (type: EditTarget["type"], id: number) => editing?.type === type && editing.item.id === id;

  const submitDepartment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { name: String(form.get("name")), description: String(form.get("description")) };
    if (editing?.type === "department") {
      await updateDepartment({ id: editing.item.id, changes: payload }).unwrap();
      closeEditor();
    } else await createDepartment(payload);
  };

  const submitDoctor = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const experience = String(form.get("experience_years") ?? "").trim();
    const payload = {
      name: String(form.get("name")),
      specialty: String(form.get("specialty")),
      email: String(form.get("email")),
      department_id: Number(form.get("department_id")),
      experience_years: experience ? Number(experience) : null,
      working_hours: `${String(form.get("workday_start"))}-${String(form.get("workday_end"))}`,
      slot_minutes: Number(form.get("slot_minutes")),
    };
    if (editing?.type === "doctor") {
      await updateDoctor({ id: editing.item.id, changes: payload }).unwrap();
      closeEditor();
    } else await createDoctor(payload);
  };

  const submitAppointment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { patient_name: String(form.get("patient_name")), patient_email: String(form.get("patient_email")), scheduled_at: String(form.get("scheduled_at")), doctor_id: Number(form.get("doctor_id")) };
    if (editing?.type === "appointment") {
      await updateAppointment({ id: editing.item.id, changes: payload }).unwrap();
      closeEditor();
    } else await createAppointment(payload);
  };

  const submitPrescription = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { patient_name: String(form.get("patient_name")), patient_email: String(form.get("patient_email")), medication: String(form.get("medication")), dosage: String(form.get("dosage")), instructions: String(form.get("instructions")), appointment_id: Number(form.get("appointment_id")) || null };
    if (editing?.type === "prescription") {
      await updatePrescription({ id: editing.item.id, changes: payload }).unwrap();
      closeEditor();
    } else await createPrescription(payload);
  };

  const editingLabel = editing ? `${editing.type} #${editing.item.id}` : "";
  const departmentEditId = editing?.type === "department" ? editing.item.id : "new";
  const doctorEditId = editing?.type === "doctor" ? editing.item.id : "new";
  const doctorHours = editing?.type === "doctor"
    ? (editing.item.working_hours ?? "09:00-17:00").split("-", 2)
    : ["09:00", "17:00"];
  const appointmentEditId = editing?.type === "appointment" ? editing.item.id : "new";
  const prescriptionEditId = editing?.type === "prescription" ? editing.item.id : "new";

  return (
    <main className="page-enter mx-auto max-w-[1240px] px-4 pb-20 pt-6 sm:px-6 lg:px-9">
      <header className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-[#e9e7ec] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-8 place-items-center rounded-lg bg-[#292730] text-white">
              <Icon name="heart" className="size-4" />
            </span>
            <Badge variant="outline" className="uppercase tracking-[0.12em]">Admin portal</Badge>
          </div>
          <h1 className="mt-4 text-3xl font-semibold tracking-[-0.06em] text-[#292830] sm:text-[40px]">CareNest operations</h1>
          <p className="mt-2 text-sm text-[#85828d]">Manage live departments, clinicians, appointments, and prescriptions.</p>
        </div>
        <Button type="button" variant="outline" onClick={async () => { await logoutRequest().unwrap(); dispatch(logout()); }}>
          Sign out
          <Icon name="arrow-right" className="size-4" />
        </Button>
      </header>

      {editing && (
        <div role="status" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-[#e3dff0] bg-[#f6f4fb] px-4 py-3 text-[13px] text-[#615784]">
          <span>You are currently updating <strong>{editingLabel}</strong>. The form is populated with its existing details.</span>
          <Button type="button" variant="ghost" size="sm" onClick={closeEditor}>Cancel update</Button>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <CrudSection
          title="Departments"
          items={departments.data}
          isLoading={departments.isLoading}
          error={departmentCreate.error || departmentUpdate.error || departments.error}
          editingId={editing?.type === "department" ? editing.item.id : null}
          onSelect={(item) => selectRecord({ type: "department", item })}
          onDelete={deleteDepartment}
          columns={[
            { render: (d) => <strong className="text-[#403e47]">{d.name}</strong> },
            { render: (d) => <span className="text-[#8a8792]">{d.description}</span> },
          ]}
          form={
            <form key={`department-${departmentEditId}`} onSubmit={submitDepartment} className={formClass}>
              <Input name="name" defaultValue={editing?.type === "department" ? editing.item.name : ""} placeholder="Department name" required />
              <Input name="description" defaultValue={editing?.type === "department" ? editing.item.description : ""} placeholder="Description" required />
              <Button type="submit" disabled={departmentCreate.isLoading || departmentUpdate.isLoading}>{editing?.type === "department" ? "Save department update" : "Add department"}</Button>
            </form>
          }
        />

        <CrudSection
          title="Doctors"
          items={doctors.data}
          isLoading={doctors.isLoading}
          error={doctorCreate.error || doctorUpdate.error || doctors.error}
          editingId={editing?.type === "doctor" ? editing.item.id : null}
          onSelect={(item) => selectRecord({ type: "doctor", item })}
          onDelete={deleteDoctor}
          columns={[
            { render: (d) => <strong className="text-[#403e47]">{d.name}</strong> },
            { render: (d) => <span className="text-[#8a8792]">{d.specialty} · {d.experience_years ?? "Experience not listed"} years · {d.working_hours ?? "09:00-17:00"} · {d.slot_minutes ?? 30} min · {d.email}</span> },
          ]}
          form={
            <form key={`doctor-${doctorEditId}`} onSubmit={submitDoctor} className={formClass}>
              <Input name="name" defaultValue={editing?.type === "doctor" ? editing.item.name : ""} placeholder="Doctor name" required />
              <Input name="specialty" defaultValue={editing?.type === "doctor" ? editing.item.specialty : ""} placeholder="Specialty" required />
              <Input name="email" type="email" defaultValue={editing?.type === "doctor" ? editing.item.email : ""} placeholder="Email" required />
              <Input name="experience_years" type="number" min="0" max="80" defaultValue={editing?.type === "doctor" ? editing.item.experience_years ?? "" : ""} placeholder="Experience in years" />
              <div className="grid grid-cols-2 gap-3">
                <Input name="workday_start" type="time" defaultValue={doctorHours[0]} aria-label="Doctor working hours start in hospital local time" required />
                <Input name="workday_end" type="time" defaultValue={doctorHours[1]} aria-label="Doctor working hours end in hospital local time" required />
              </div>
              <p className="-mt-2 text-xs text-[#8a8792]">Daily hospital-local hours; slots repeat for the chosen appointment length.</p>
              <Input name="slot_minutes" type="number" min="5" max="240" defaultValue={editing?.type === "doctor" ? editing.item.slot_minutes ?? 30 : 30} placeholder="Appointment length in minutes" required />
              <Select name="department_id" required defaultValue={editing?.type === "doctor" ? editing.item.department_id : ""}>
                <option value="" disabled>Choose department</option>
                {departments.data?.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
              </Select>
              <Button type="submit" disabled={doctorCreate.isLoading || doctorUpdate.isLoading}>{editing?.type === "doctor" ? "Save doctor update" : "Add doctor"}</Button>
            </form>
          }
        />

        <CrudSection
          title="Appointments"
          items={appointments.data}
          isLoading={appointments.isLoading}
          error={appointmentCreate.error || appointmentUpdate.error || appointments.error}
          editingId={editing?.type === "appointment" ? editing.item.id : null}
          onSelect={(item) => selectRecord({ type: "appointment", item })}
          onDelete={deleteAppointment}
          columns={[
            { render: (a) => <strong className="text-[#403e47]">{a.patient_name}</strong> },
            { render: (a) => <span className="text-[#8a8792]">{displayDateTime(a.scheduled_at_local)} hospital local · {a.status}</span> },
          ]}
          form={
            <form key={`appointment-${appointmentEditId}`} onSubmit={submitAppointment} className={formClass}>
              <Input name="patient_name" defaultValue={editing?.type === "appointment" ? editing.item.patient_name : ""} placeholder="Patient name" required />
              <Input name="patient_email" type="email" defaultValue={editing?.type === "appointment" ? editing.item.patient_email : ""} placeholder="Patient email" required />
              <label className="grid gap-1.5 text-[11px] font-medium text-[#67656f]">
                Appointment date and time (hospital local)
                <Input name="scheduled_at" type="datetime-local" defaultValue={editing?.type === "appointment" ? formatDateTime(editing.item.scheduled_at_local) : ""} required />
              </label>
              <Select name="doctor_id" required defaultValue={editing?.type === "appointment" ? editing.item.doctor_id : ""}>
                <option value="" disabled>Choose doctor</option>
                {doctors.data?.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)}
              </Select>
              <Button type="submit" disabled={appointmentCreate.isLoading || appointmentUpdate.isLoading}>{editing?.type === "appointment" ? "Save appointment update" : "Add appointment"}</Button>
            </form>
          }
        />

        <CrudSection
          title="Prescriptions"
          items={prescriptions.data}
          isLoading={prescriptions.isLoading}
          error={prescriptionCreate.error || prescriptionUpdate.error || prescriptions.error}
          editingId={editing?.type === "prescription" ? editing.item.id : null}
          onSelect={(item) => selectRecord({ type: "prescription", item })}
          onDelete={deletePrescription}
          columns={[
            { render: (p) => <strong className="text-[#403e47]">{p.patient_name}</strong> },
            { render: (p) => <span className="text-[#8a8792]">{p.medication} · {p.dosage}</span> },
          ]}
          form={
            <form key={`prescription-${prescriptionEditId}`} onSubmit={submitPrescription} className={formClass}>
              <Input name="patient_name" defaultValue={editing?.type === "prescription" ? editing.item.patient_name : ""} placeholder="Patient name" required />
              <Input name="patient_email" type="email" defaultValue={editing?.type === "prescription" ? editing.item.patient_email : ""} placeholder="Patient email" required />
              <Input name="medication" defaultValue={editing?.type === "prescription" ? editing.item.medication : ""} placeholder="Medication" required />
              <Input name="dosage" defaultValue={editing?.type === "prescription" ? editing.item.dosage : ""} placeholder="Dosage" required />
              <Input name="instructions" defaultValue={editing?.type === "prescription" ? editing.item.instructions : ""} placeholder="Instructions" required />
              <Input name="appointment_id" type="number" defaultValue={editing?.type === "prescription" && editing.item.appointment_id ? editing.item.appointment_id : ""} placeholder="Appointment ID (optional)" />
              <Button type="submit" disabled={prescriptionCreate.isLoading || prescriptionUpdate.isLoading}>{editing?.type === "prescription" ? "Save prescription update" : "Create prescription"}</Button>
            </form>
          }
        />
      </div>
    </main>
  );
}

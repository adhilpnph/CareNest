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
import { Input, Select } from "../ui/input";
import { Icon } from "../ui/IconGlyph";

type EditTarget =
  | { type: "department"; item: Department }
  | { type: "doctor"; item: Doctor }
  | { type: "appointment"; item: Appointment }
  | { type: "prescription"; item: Prescription };

function ErrorMessage({ error }: { error: unknown }) {
  return error ? <p role="alert" className="mt-3 text-sm text-[#b74b4b]">Request failed. Try again.</p> : null;
}

function LoadingMessage({ loading }: { loading: boolean }) {
  return loading ? <p role="status" className="mt-3 text-xs text-[#96939e]">Loading...</p> : null;
}

function formatDateTime(value: string) {
  return value.slice(0, 16);
}

const formClass = "grid gap-3";
const rowClass = "group flex cursor-pointer items-center justify-between gap-3 border-t border-[#f0eef2] py-3 text-[12px] transition-colors hover:bg-[#faf9fc]";

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
    const payload = { name: String(form.get("name")), specialty: String(form.get("specialty")), email: String(form.get("email")), department_id: Number(form.get("department_id")) };
    if (editing?.type === "doctor") {
      await updateDoctor({ id: editing.item.id, changes: payload }).unwrap();
      closeEditor();
    } else await createDoctor(payload);
  };

  const submitAppointment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const payload = { patient_name: String(form.get("patient_name")), patient_email: String(form.get("patient_email")), scheduled_at: new Date(String(form.get("scheduled_at"))).toISOString(), doctor_id: Number(form.get("doctor_id")) };
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
        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b border-[#f0eef2] py-4">
            <CardTitle className="text-base">Departments</CardTitle>
            {departments.data && <Badge variant="outline">{departments.data.length}</Badge>}
          </CardHeader>
          <CardContent className="pt-4">
            <form key={`department-${departmentEditId}`} onSubmit={submitDepartment} className={formClass}>
              <Input name="name" defaultValue={editing?.type === "department" ? editing.item.name : ""} placeholder="Department name" required />
              <Input name="description" defaultValue={editing?.type === "department" ? editing.item.description : ""} placeholder="Description" required />
              <Button type="submit" disabled={departmentCreate.isLoading || departmentUpdate.isLoading}>{editing?.type === "department" ? "Save department update" : "Add department"}</Button>
            </form>
            <LoadingMessage loading={departments.isLoading} />
            <ErrorMessage error={departmentCreate.error || departmentUpdate.error || departments.error} />
            <div className="mt-5">
              {departments.data?.map((department) => (
                <div key={department.id} className={`${rowClass} ${isEditing("department", department.id) ? "bg-[#f8f6fc]" : ""}`} onClick={() => selectRecord({ type: "department", item: department })}>
                  <span className="min-w-0 truncate"><strong className="text-[#403e47]">{department.name}</strong><br /><span className="text-[#8a8792]">{department.description}</span></span>
                  <span className="flex shrink-0 gap-1">
                    <Button type="button" variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "department", item: department }); }}>Update</Button>
                    <Button type="button" variant="destructive" size="sm" onClick={(event) => { event.stopPropagation(); deleteDepartment(department.id); }}>Delete</Button>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b border-[#f0eef2] py-4">
            <CardTitle className="text-base">Doctors</CardTitle>
            {doctors.data && <Badge variant="outline">{doctors.data.length}</Badge>}
          </CardHeader>
          <CardContent className="pt-4">
            <form key={`doctor-${doctorEditId}`} onSubmit={submitDoctor} className={formClass}>
              <Input name="name" defaultValue={editing?.type === "doctor" ? editing.item.name : ""} placeholder="Doctor name" required />
              <Input name="specialty" defaultValue={editing?.type === "doctor" ? editing.item.specialty : ""} placeholder="Specialty" required />
              <Input name="email" type="email" defaultValue={editing?.type === "doctor" ? editing.item.email : ""} placeholder="Email" required />
              <Select name="department_id" required defaultValue={editing?.type === "doctor" ? editing.item.department_id : ""}>
                <option value="" disabled>Choose department</option>
                {departments.data?.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}
              </Select>
              <Button type="submit" disabled={doctorCreate.isLoading || doctorUpdate.isLoading}>{editing?.type === "doctor" ? "Save doctor update" : "Add doctor"}</Button>
            </form>
            <LoadingMessage loading={doctors.isLoading} />
            <ErrorMessage error={doctorCreate.error || doctorUpdate.error || doctors.error} />
            <div className="mt-5">
              {doctors.data?.map((doctor) => (
                <div key={doctor.id} className={`${rowClass} ${isEditing("doctor", doctor.id) ? "bg-[#f8f6fc]" : ""}`} onClick={() => selectRecord({ type: "doctor", item: doctor })}>
                  <span className="min-w-0 truncate"><strong className="text-[#403e47]">{doctor.name}</strong><br /><span className="text-[#8a8792]">{doctor.specialty} · {doctor.email}</span></span>
                  <span className="flex shrink-0 gap-1">
                    <Button type="button" variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "doctor", item: doctor }); }}>Update</Button>
                    <Button type="button" variant="destructive" size="sm" onClick={(event) => { event.stopPropagation(); deleteDoctor(doctor.id); }}>Delete</Button>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b border-[#f0eef2] py-4">
            <CardTitle className="text-base">Appointments</CardTitle>
            {appointments.data && <Badge variant="outline">{appointments.data.length}</Badge>}
          </CardHeader>
          <CardContent className="pt-4">
            <form key={`appointment-${appointmentEditId}`} onSubmit={submitAppointment} className={formClass}>
              <Input name="patient_name" defaultValue={editing?.type === "appointment" ? editing.item.patient_name : ""} placeholder="Patient name" required />
              <Input name="patient_email" type="email" defaultValue={editing?.type === "appointment" ? editing.item.patient_email : ""} placeholder="Patient email" required />
              <Input name="scheduled_at" type="datetime-local" defaultValue={editing?.type === "appointment" ? formatDateTime(editing.item.scheduled_at) : ""} required />
              <Select name="doctor_id" required defaultValue={editing?.type === "appointment" ? editing.item.doctor_id : ""}>
                <option value="" disabled>Choose doctor</option>
                {doctors.data?.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)}
              </Select>
              <Button type="submit" disabled={appointmentCreate.isLoading || appointmentUpdate.isLoading}>{editing?.type === "appointment" ? "Save appointment update" : "Add appointment"}</Button>
            </form>
            <LoadingMessage loading={appointments.isLoading} />
            <ErrorMessage error={appointmentCreate.error || appointmentUpdate.error || appointments.error} />
            <div className="mt-5">
              {appointments.data?.map((appointment) => (
                <div key={appointment.id} className={`${rowClass} ${isEditing("appointment", appointment.id) ? "bg-[#f8f6fc]" : ""}`} onClick={() => selectRecord({ type: "appointment", item: appointment })}>
                  <span className="min-w-0 truncate"><strong className="text-[#403e47]">{appointment.patient_name}</strong><br /><span className="text-[#8a8792]">{appointment.scheduled_at} · {appointment.status}</span></span>
                  <span className="flex shrink-0 gap-1">
                    <Button type="button" variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "appointment", item: appointment }); }}>Update</Button>
                    <Button type="button" variant="destructive" size="sm" onClick={(event) => { event.stopPropagation(); deleteAppointment(appointment.id); }}>Delete</Button>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden">
          <CardHeader className="flex-row items-center justify-between border-b border-[#f0eef2] py-4">
            <CardTitle className="text-base">Prescriptions</CardTitle>
            {prescriptions.data && <Badge variant="outline">{prescriptions.data.length}</Badge>}
          </CardHeader>
          <CardContent className="pt-4">
            <form key={`prescription-${prescriptionEditId}`} onSubmit={submitPrescription} className={formClass}>
              <Input name="patient_name" defaultValue={editing?.type === "prescription" ? editing.item.patient_name : ""} placeholder="Patient name" required />
              <Input name="patient_email" type="email" defaultValue={editing?.type === "prescription" ? editing.item.patient_email : ""} placeholder="Patient email" required />
              <Input name="medication" defaultValue={editing?.type === "prescription" ? editing.item.medication : ""} placeholder="Medication" required />
              <Input name="dosage" defaultValue={editing?.type === "prescription" ? editing.item.dosage : ""} placeholder="Dosage" required />
              <Input name="instructions" defaultValue={editing?.type === "prescription" ? editing.item.instructions : ""} placeholder="Instructions" required />
              <Input name="appointment_id" type="number" defaultValue={editing?.type === "prescription" && editing.item.appointment_id ? editing.item.appointment_id : ""} placeholder="Appointment ID (optional)" />
              <Button type="submit" disabled={prescriptionCreate.isLoading || prescriptionUpdate.isLoading}>{editing?.type === "prescription" ? "Save prescription update" : "Create prescription"}</Button>
            </form>
            <LoadingMessage loading={prescriptions.isLoading} />
            <ErrorMessage error={prescriptionCreate.error || prescriptionUpdate.error || prescriptions.error} />
            <div className="mt-5">
              {prescriptions.data?.map((prescription) => (
                <div key={prescription.id} className={`${rowClass} ${isEditing("prescription", prescription.id) ? "bg-[#f8f6fc]" : ""}`} onClick={() => selectRecord({ type: "prescription", item: prescription })}>
                  <span className="min-w-0 truncate"><strong className="text-[#403e47]">{prescription.patient_name}</strong><br /><span className="text-[#8a8792]">{prescription.medication} · {prescription.dosage}</span></span>
                  <span className="flex shrink-0 gap-1">
                    <Button type="button" variant="ghost" size="sm" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "prescription", item: prescription }); }}>Update</Button>
                    <Button type="button" variant="destructive" size="sm" onClick={(event) => { event.stopPropagation(); deletePrescription(prescription.id); }}>Delete</Button>
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

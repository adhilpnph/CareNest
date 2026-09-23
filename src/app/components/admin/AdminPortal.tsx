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

const inputClass = "rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-stone-700";
const buttonClass = "rounded-full bg-stone-900 px-4 py-2 text-sm font-medium text-white hover:bg-stone-700";
type EditTarget =
  | { type: "department"; item: Department }
  | { type: "doctor"; item: Doctor }
  | { type: "appointment"; item: Appointment }
  | { type: "prescription"; item: Prescription };

function ErrorMessage({ error }: { error: unknown }) {
  return error ? <p className="text-sm text-red-700">Request failed. Try again.</p> : null;
}

function LoadingMessage({ loading }: { loading: boolean }) {
  return loading ? <p className="text-sm text-stone-500">Loading...</p> : null;
}

function formatDateTime(value: string) {
  return value.slice(0, 16);
}

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
    <main className="mx-auto max-w-6xl px-4 pb-20 pt-5 text-stone-700 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Admin portal</span>
          <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-stone-900">CareNest operations</h1>
          <p className="mt-3 text-sm text-stone-600">Manage live departments, clinicians, appointments, and prescriptions.</p>
        </div>
        <button type="button" onClick={async () => { await logoutRequest().unwrap(); dispatch(logout()); }} className={buttonClass}>Sign out</button>
      </header>

      {editing && (
        <div role="status" className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-stone-400 bg-stone-200 px-4 py-3 text-sm text-stone-800">
          <span>You are currently updating <strong>{editingLabel}</strong>. The form is populated with its existing details.</span>
          <button type="button" onClick={closeEditor} className="font-semibold underline">Cancel update</button>
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[24px] border border-stone-300 bg-white/80 p-5">
          <h2 className="mb-4 text-xl font-bold text-stone-900">Departments</h2>
          <form key={`department-${departmentEditId}`} onSubmit={submitDepartment} className="grid gap-3">
            <input name="name" defaultValue={editing?.type === "department" ? editing.item.name : ""} placeholder="Department name" required className={inputClass} />
            <input name="description" defaultValue={editing?.type === "department" ? editing.item.description : ""} placeholder="Description" required className={inputClass} />
            <button className={buttonClass} disabled={departmentCreate.isLoading || departmentUpdate.isLoading}>{editing?.type === "department" ? "Save department update" : "Add department"}</button>
          </form>
          <LoadingMessage loading={departments.isLoading} />
          <ErrorMessage error={departmentCreate.error || departmentUpdate.error || departments.error} />
          <div className="mt-5 space-y-2">
            {departments.data?.map((department) => <div key={department.id} className={`flex cursor-pointer items-center justify-between gap-3 border-t border-stone-200 pt-3 text-sm ${isEditing("department", department.id) ? "bg-stone-100" : ""}`} onClick={() => selectRecord({ type: "department", item: department })}>
              <span><strong>{department.name}</strong><br />{department.description}</span>
              <span className="flex gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "department", item: department }); }} className="text-stone-500 hover:text-stone-900">Update</button><button type="button" onClick={(event) => { event.stopPropagation(); deleteDepartment(department.id); }} className="text-red-700">Delete</button></span>
            </div>)}
          </div>
        </section>

        <section className="rounded-[24px] border border-stone-300 bg-white/80 p-5">
          <h2 className="mb-4 text-xl font-bold text-stone-900">Doctors</h2>
          <form key={`doctor-${doctorEditId}`} onSubmit={submitDoctor} className="grid gap-3">
            <input name="name" defaultValue={editing?.type === "doctor" ? editing.item.name : ""} placeholder="Doctor name" required className={inputClass} />
            <input name="specialty" defaultValue={editing?.type === "doctor" ? editing.item.specialty : ""} placeholder="Specialty" required className={inputClass} />
            <input name="email" type="email" defaultValue={editing?.type === "doctor" ? editing.item.email : ""} placeholder="Email" required className={inputClass} />
            <select name="department_id" required defaultValue={editing?.type === "doctor" ? editing.item.department_id : ""} className={inputClass}><option value="" disabled>Choose department</option>{departments.data?.map((department) => <option key={department.id} value={department.id}>{department.name}</option>)}</select>
            <button className={buttonClass} disabled={doctorCreate.isLoading || doctorUpdate.isLoading}>{editing?.type === "doctor" ? "Save doctor update" : "Add doctor"}</button>
          </form>
          <LoadingMessage loading={doctors.isLoading} />
          <ErrorMessage error={doctorCreate.error || doctorUpdate.error || doctors.error} />
          <div className="mt-5 space-y-2">{doctors.data?.map((doctor) => <div key={doctor.id} className={`flex cursor-pointer items-center justify-between gap-3 border-t border-stone-200 pt-3 text-sm ${isEditing("doctor", doctor.id) ? "bg-stone-100" : ""}`} onClick={() => selectRecord({ type: "doctor", item: doctor })}><span><strong>{doctor.name}</strong><br />{doctor.specialty} · {doctor.email}</span><span className="flex gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "doctor", item: doctor }); }} className="text-stone-500 hover:text-stone-900">Update</button><button type="button" onClick={(event) => { event.stopPropagation(); deleteDoctor(doctor.id); }} className="text-red-700">Delete</button></span></div>)}</div>
        </section>

        <section className="rounded-[24px] border border-stone-300 bg-white/80 p-5">
          <h2 className="mb-4 text-xl font-bold text-stone-900">Appointments</h2>
          <form key={`appointment-${appointmentEditId}`} onSubmit={submitAppointment} className="grid gap-3">
            <input name="patient_name" defaultValue={editing?.type === "appointment" ? editing.item.patient_name : ""} placeholder="Patient name" required className={inputClass} />
            <input name="patient_email" type="email" defaultValue={editing?.type === "appointment" ? editing.item.patient_email : ""} placeholder="Patient email" required className={inputClass} />
            <input name="scheduled_at" type="datetime-local" defaultValue={editing?.type === "appointment" ? formatDateTime(editing.item.scheduled_at) : ""} required className={inputClass} />
            <select name="doctor_id" required defaultValue={editing?.type === "appointment" ? editing.item.doctor_id : ""} className={inputClass}><option value="" disabled>Choose doctor</option>{doctors.data?.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name}</option>)}</select>
            <button className={buttonClass} disabled={appointmentCreate.isLoading || appointmentUpdate.isLoading}>{editing?.type === "appointment" ? "Save appointment update" : "Add appointment"}</button>
          </form>
          <LoadingMessage loading={appointments.isLoading} />
          <ErrorMessage error={appointmentCreate.error || appointmentUpdate.error || appointments.error} />
          <div className="mt-5 space-y-2">{appointments.data?.map((appointment) => <div key={appointment.id} className={`flex cursor-pointer items-center justify-between gap-3 border-t border-stone-200 pt-3 text-sm ${isEditing("appointment", appointment.id) ? "bg-stone-100" : ""}`} onClick={() => selectRecord({ type: "appointment", item: appointment })}><span><strong>{appointment.patient_name}</strong><br />{appointment.scheduled_at} · {appointment.status}</span><span className="flex gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "appointment", item: appointment }); }} className="text-stone-500 hover:text-stone-900">Update</button><button type="button" onClick={(event) => { event.stopPropagation(); deleteAppointment(appointment.id); }} className="text-red-700">Delete</button></span></div>)}</div>
        </section>

        <section className="rounded-[24px] border border-stone-300 bg-white/80 p-5">
          <h2 className="mb-4 text-xl font-bold text-stone-900">Prescriptions</h2>
          <form key={`prescription-${prescriptionEditId}`} onSubmit={submitPrescription} className="grid gap-3">
            <input name="patient_name" defaultValue={editing?.type === "prescription" ? editing.item.patient_name : ""} placeholder="Patient name" required className={inputClass} />
            <input name="patient_email" type="email" defaultValue={editing?.type === "prescription" ? editing.item.patient_email : ""} placeholder="Patient email" required className={inputClass} />
            <input name="medication" defaultValue={editing?.type === "prescription" ? editing.item.medication : ""} placeholder="Medication" required className={inputClass} />
            <input name="dosage" defaultValue={editing?.type === "prescription" ? editing.item.dosage : ""} placeholder="Dosage" required className={inputClass} />
            <input name="instructions" defaultValue={editing?.type === "prescription" ? editing.item.instructions : ""} placeholder="Instructions" required className={inputClass} />
            <input name="appointment_id" type="number" defaultValue={editing?.type === "prescription" && editing.item.appointment_id ? editing.item.appointment_id : ""} placeholder="Appointment ID (optional)" className={inputClass} />
            <button className={buttonClass} disabled={prescriptionCreate.isLoading || prescriptionUpdate.isLoading}>{editing?.type === "prescription" ? "Save prescription update" : "Create prescription"}</button>
          </form>
          <LoadingMessage loading={prescriptions.isLoading} />
          <ErrorMessage error={prescriptionCreate.error || prescriptionUpdate.error || prescriptions.error} />
          <div className="mt-5 space-y-2">{prescriptions.data?.map((prescription) => <div key={prescription.id} className={`flex cursor-pointer items-center justify-between gap-3 border-t border-stone-200 pt-3 text-sm ${isEditing("prescription", prescription.id) ? "bg-stone-100" : ""}`} onClick={() => selectRecord({ type: "prescription", item: prescription })}><span><strong>{prescription.patient_name}</strong><br />{prescription.medication} · {prescription.dosage}</span><span className="flex gap-2"><button type="button" onClick={(event) => { event.stopPropagation(); selectRecord({ type: "prescription", item: prescription }); }} className="text-stone-500 hover:text-stone-900">Update</button><button type="button" onClick={(event) => { event.stopPropagation(); deletePrescription(prescription.id); }} className="text-red-700">Delete</button></span></div>)}</div>
        </section>
      </div>
    </main>
  );
}

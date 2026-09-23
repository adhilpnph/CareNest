import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from ".";

export type Department = {
  id: number;
  name: string;
  description: string;
};

export type Doctor = {
  id: number;
  name: string;
  specialty: string;
  email: string;
  department_id: number;
};

export type Appointment = {
  id: number;
  patient_name: string;
  patient_email: string;
  scheduled_at: string;
  status: string;
  doctor_id: number;
};

export type Prescription = {
  id: number;
  patient_name: string;
  patient_email: string;
  medication: string;
  dosage: string;
  instructions: string;
  appointment_id: number | null;
};

export type AssistantMessage = {
  role: "user" | "assistant";
  content: string;
};

export type AppointmentUpdate = {
  success: boolean;
  appointment_id: number | null;
  doctor_id: number;
  slot_start: string;
  detail: string;
};

export type AssistantChatResponse = {
  reply: string;
  appointment_update: AppointmentUpdate | null;
  history: AssistantMessage[];
};

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000",
  prepareHeaders: (headers, { getState }) => {
    const role = (getState() as RootState).auth.role;
    headers.set("X-Role", role);
    return headers;
  },
});

export const careNestApi = createApi({
  reducerPath: "careNestApi",
  baseQuery,
  tagTypes: ["Departments", "Doctors", "Appointments", "Prescriptions"],
  endpoints: (builder) => ({
    getDepartments: builder.query<Department[], void>({
      query: () => "/departments",
      providesTags: ["Departments"],
    }),
    createDepartment: builder.mutation<Department, Omit<Department, "id">>({
      query: (body) => ({ url: "/departments", method: "POST", body }),
      invalidatesTags: ["Departments"],
    }),
    updateDepartment: builder.mutation<
      Department,
      { id: number; changes: Partial<Omit<Department, "id">> }
    >({
      query: ({ id, changes }) => ({
        url: `/departments/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Departments"],
    }),
    deleteDepartment: builder.mutation<void, number>({
      query: (id) => ({ url: `/departments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Departments"],
    }),
    getDoctors: builder.query<Doctor[], void>({
      query: () => "/doctors",
      providesTags: ["Doctors"],
    }),
    createDoctor: builder.mutation<Doctor, Omit<Doctor, "id">>({
      query: (body) => ({ url: "/doctors", method: "POST", body }),
      invalidatesTags: ["Doctors"],
    }),
    updateDoctor: builder.mutation<
      Doctor,
      { id: number; changes: Partial<Omit<Doctor, "id">> }
    >({
      query: ({ id, changes }) => ({
        url: `/doctors/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Doctors"],
    }),
    deleteDoctor: builder.mutation<void, number>({
      query: (id) => ({ url: `/doctors/${id}`, method: "DELETE" }),
      invalidatesTags: ["Doctors"],
    }),
    getAppointments: builder.query<Appointment[], void>({
      query: () => "/appointments",
      providesTags: ["Appointments"],
    }),
    createAppointment: builder.mutation<
      Appointment,
      Omit<Appointment, "id" | "status"> & { status?: string }
    >({
      query: (body) => ({ url: "/appointments", method: "POST", body }),
      invalidatesTags: ["Appointments"],
    }),
    updateAppointment: builder.mutation<
      Appointment,
      { id: number; changes: Partial<Omit<Appointment, "id">> }
    >({
      query: ({ id, changes }) => ({
        url: `/appointments/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Appointments"],
    }),
    deleteAppointment: builder.mutation<void, number>({
      query: (id) => ({ url: `/appointments/${id}`, method: "DELETE" }),
      invalidatesTags: ["Appointments"],
    }),
    getPrescriptions: builder.query<Prescription[], void>({
      query: () => "/prescriptions",
      providesTags: ["Prescriptions"],
    }),
    createPrescription: builder.mutation<
      Prescription,
      Omit<Prescription, "id">
    >({
      query: (body) => ({ url: "/prescriptions", method: "POST", body }),
      invalidatesTags: ["Prescriptions"],
    }),
    updatePrescription: builder.mutation<
      Prescription,
      { id: number; changes: Partial<Omit<Prescription, "id">> }
    >({
      query: ({ id, changes }) => ({
        url: `/prescriptions/${id}`,
        method: "PATCH",
        body: changes,
      }),
      invalidatesTags: ["Prescriptions"],
    }),
    deletePrescription: builder.mutation<void, number>({
      query: (id) => ({ url: `/prescriptions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Prescriptions"],
    }),
    assistantChat: builder.mutation<
      AssistantChatResponse,
      {
        message: string;
        history: AssistantMessage[];
        patient_name: string;
        patient_email: string;
      }
    >({
      query: (body) => ({ url: "/assistant/chat", method: "POST", body }),
      invalidatesTags: (result) =>
        result?.appointment_update?.success ? ["Appointments"] : [],
    }),
  }),
});

export const {
  useGetDepartmentsQuery,
  useCreateDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
  useGetDoctorsQuery,
  useCreateDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
  useGetAppointmentsQuery,
  useCreateAppointmentMutation,
  useUpdateAppointmentMutation,
  useDeleteAppointmentMutation,
  useGetPrescriptionsQuery,
  useCreatePrescriptionMutation,
  useUpdatePrescriptionMutation,
  useDeletePrescriptionMutation,
  useAssistantChatMutation,
} = careNestApi;
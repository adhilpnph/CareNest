"use client";

import {
  useCreateAppointmentMutation,
  useGetDepartmentsQuery,
  useGetDoctorsQuery,
} from "../../store/careNestApi";

const inputClass = "rounded-xl border border-stone-300 bg-stone-50 px-3 py-2 text-sm outline-none focus:border-stone-700";

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
    <section className="grid gap-5 pt-20 lg:grid-cols-2">
      <div>
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Live care directory</span>
        <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-stone-900">Meet our departments and doctors</h2>
        {(departments.isLoading || doctors.isLoading) && <p className="mt-5 text-sm text-stone-500">Loading care directory...</p>}
        {(departments.isError || doctors.isError) && <p className="mt-5 text-sm text-red-700">The care directory is unavailable right now.</p>}
        <div className="mt-6 space-y-3">
          {departments.data?.map((department) => (
            <article key={department.id} className="rounded-[20px] border border-stone-300 bg-white/80 p-5">
              <h3 className="font-bold text-stone-900">{department.name}</h3>
              <p className="mt-1 text-sm text-stone-600">{department.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {doctors.data?.filter((doctor) => doctor.department_id === department.id).map((doctor) => (
                  <span key={doctor.id} className="rounded-full border border-stone-300 bg-stone-50 px-3 py-1 text-xs text-stone-600">{doctor.name} · {doctor.specialty}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="rounded-[24px] border border-stone-300 bg-white/80 p-6">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">Appointments</span>
        <h2 className="mt-2 text-3xl font-black tracking-[-0.06em] text-stone-900">Request a visit</h2>
        <form onSubmit={submitAppointment} className="mt-5 grid gap-3">
          <input name="patient_name" placeholder="Your name" required className={inputClass} />
          <input name="patient_email" type="email" placeholder="Your email" required className={inputClass} />
          <input name="scheduled_at" type="datetime-local" required className={inputClass} />
          <select name="doctor_id" required defaultValue="" className={inputClass}>
            <option value="" disabled>Choose a doctor</option>
            {doctors.data?.map((doctor) => <option key={doctor.id} value={doctor.id}>{doctor.name} · {doctor.specialty}</option>)}
          </select>
          <button type="submit" disabled={result.isLoading} className="rounded-full bg-stone-900 px-5 py-3 text-sm font-medium text-white hover:bg-stone-700">{result.isLoading ? "Sending..." : "Request appointment"}</button>
          {result.isSuccess && <p className="text-sm text-green-700">Your appointment request was received.</p>}
          {result.isError && <p className="text-sm text-red-700">We could not create that appointment. Check the details and try again.</p>}
        </form>
      </div>
    </section>
  );
}

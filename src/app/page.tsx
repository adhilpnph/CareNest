"use client";

import { useSelector } from "react-redux";
import { AdminPortal } from "./components/admin/AdminPortal";
import { PatientPortal } from "./components/patient/PatientPortal";
import type { RootState } from "./store";

export default function Home() {
  const role = useSelector((state: RootState) => state.auth.role);

  return role === "ADMIN" ? <AdminPortal /> : <PatientPortal />;
}

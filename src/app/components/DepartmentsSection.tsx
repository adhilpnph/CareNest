import { Department } from "../types";

type DepartmentsSectionProps = {
  departments: Department[];
  onOpenDepartment: (department: Department) => void;
};

export function DepartmentsSection({
  departments,
  onOpenDepartment,
}: DepartmentsSectionProps) {
  return (
    <section id="departments" className="pt-20">
      <div className="mb-7">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
          Departments
        </span>
        <h2 className="mt-2 text-4xl font-black tracking-[-0.06em] text-stone-900">
          Focused expertise under one roof
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {departments.map((department) => (
          <button
            key={department.id}
            type="button"
            onClick={() => onOpenDepartment(department)}
            className={`${department.accent} rounded-[24px] border border-stone-300 p-6 text-left shadow-sm hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]`}
          >
            <span className="mb-4 inline-block text-base font-bold">
              {department.name}
            </span>
            <p className="text-sm leading-6 text-stone-600">
              {department.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}

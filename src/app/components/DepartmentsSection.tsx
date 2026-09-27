import type { Department } from "../types";
import { Badge } from "./ui/badge";
import { Icon } from "./ui/IconGlyph";

type DepartmentsSectionProps = {
  departments: Department[];
  onOpenDepartment: (department: Department) => void;
};

export function DepartmentsSection({ departments, onOpenDepartment }: DepartmentsSectionProps) {
  return (
    <section id="departments" className="scroll-mt-28 pt-14 sm:pt-20">
      <div className="mb-7">
        <Badge variant="outline" className="mb-3 uppercase tracking-[0.12em]">Departments</Badge>
        <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.055em] text-[#292830] sm:text-[40px]">
          Focused expertise under one roof
        </h2>
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {departments.map((department, index) => (
          <button
            key={department.id}
            type="button"
            onClick={() => onOpenDepartment(department)}
            className="group animate-rise rounded-xl border border-[#e9e8ec] bg-white p-5 text-left shadow-[0_1px_2px_rgba(24,24,28,0.025)] transition-all duration-300 hover:-translate-y-1 hover:border-[#dcd8e8] hover:shadow-[0_12px_30px_rgba(42,37,62,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9585dc]"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <span className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-[#f5f3fa] text-[#7969bd]">
                <Icon name="heart" className="size-[18px]" />
              </span>
              <Icon name="arrow-right" className="size-4 text-[#a6a3ad] transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#7969bd]" />
            </span>
            <span className="mt-5 block text-[16px] font-semibold tracking-[-0.025em] text-[#302f36]">{department.name}</span>
            <span className="mt-1.5 block text-[13px] leading-6 text-[#85828d]">{department.description}</span>
            <span className="mt-5 block border-t border-[#f0eef2] pt-3 text-[10px] font-medium uppercase tracking-[0.12em] text-[#9b98a3]">
              {department.doctors.length} specialists
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

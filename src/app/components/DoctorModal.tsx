import type { Department } from "../types";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Icon } from "./ui/IconGlyph";

type DoctorModalProps = {
  department: Department;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
};

export function DoctorModal({
  department,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: DoctorModalProps) {
  if (!isOpen) return null;

  const currentDoctor = department.doctors[currentIndex];

  return (
    <div
      className="animate-overlay fixed inset-0 z-40 grid place-items-center bg-[#22202a]/35 p-4 backdrop-blur-[3px]"
      onClick={onClose}
    >
      <Card
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-department-title"
        className="animate-rise w-full max-w-2xl overflow-hidden border-white/70 shadow-[0_28px_80px_rgba(23,21,33,0.25)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#efedf2] bg-gradient-to-br from-[#faf9fd] to-white p-5 sm:p-6">
          <div>
            <Badge variant="accent" className="uppercase tracking-[0.12em]">Department</Badge>
            <h3 id="doctor-department-title" className="mt-2 text-3xl font-semibold tracking-[-0.06em] text-[#292830]">{department.name}</h3>
          </div>
          <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close department panel">
            <Icon name="close" className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-[40px_1fr_40px] items-center gap-2 p-4 sm:grid-cols-[44px_1fr_44px] sm:gap-4 sm:p-6">
          <Button type="button" variant="outline" size="icon" onClick={onPrevious} aria-label="Previous doctor" className="size-10 rounded-full sm:size-11">
            <Icon name="arrow-left" className="size-4" />
          </Button>

          <div key={currentDoctor.name} className="animate-rise rounded-xl border border-[#eeecf1] bg-[#fcfbfd] p-5 text-center sm:p-7">
            <div className="mx-auto mb-4 grid size-[68px] place-items-center rounded-full border border-[#e8e4f0] bg-gradient-to-br from-[#f3f0fa] to-[#e7e3f0] text-base font-semibold text-[#70629e]">
              {currentDoctor.initials}
            </div>
            <p className="text-xl font-semibold tracking-[-0.04em] text-[#302f36] sm:text-2xl">{currentDoctor.name}</p>
            <p className="mt-1 text-[13px] text-[#817e89]">{currentDoctor.specialty}</p>

            <div className="mx-auto mt-5 flex max-w-sm flex-wrap justify-center gap-2">
              <Badge variant="outline" className="gap-1.5 py-1.5"><Icon name="clock" className="size-3" />{currentDoctor.experience}</Badge>
              <Badge variant="success" className="gap-1.5 py-1.5"><span className="size-1.5 rounded-full bg-[#58a273]" />{currentDoctor.availability}</Badge>
            </div>
          </div>

          <Button type="button" variant="outline" size="icon" onClick={onNext} aria-label="Next doctor" className="size-10 rounded-full sm:size-11">
            <Icon name="arrow-right" className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

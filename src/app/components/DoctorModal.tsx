import { Department } from "../types";

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
      className="fixed inset-0 z-30 grid place-items-center bg-black/25 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-[28px] border border-stone-300 bg-stone-50 p-6 shadow-[0_28px_60px_rgba(0,0,0,0.18)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-stone-500">
              Department
            </span>
            <h3 className="mt-2 text-3xl font-black tracking-[-0.06em] text-stone-900">
              {department.name}
            </h3>
          </div>

          <button
            type="button"
            aria-label="Close department panel"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-full border border-stone-300 bg-white text-2xl text-stone-700 hover:border-stone-500"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-[48px_1fr_48px] items-center gap-4">
          <button
            type="button"
            aria-label="Previous doctor"
            onClick={onPrevious}
            className="grid h-12 w-12 place-items-center rounded-full border border-stone-300 bg-white text-xl text-stone-700 hover:border-stone-500"
          >
            ←
          </button>

          <div className="rounded-[22px] border border-stone-300 bg-white p-6 text-center">
            <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-stone-200 to-stone-300 text-lg font-bold text-stone-800">
              {currentDoctor.initials}
            </div>

            <p className="text-2xl font-bold text-stone-900">{currentDoctor.name}</p>
            <p className="mt-2 text-sm text-stone-600">{currentDoctor.specialty}</p>

            <div className="mt-5 space-y-2 text-sm text-stone-700">
              <p>{currentDoctor.experience}</p>
              <p>{currentDoctor.availability}</p>
            </div>
          </div>

          <button
            type="button"
            aria-label="Next doctor"
            onClick={onNext}
            className="grid h-12 w-12 place-items-center rounded-full border border-stone-300 bg-white text-xl text-stone-700 hover:border-stone-500"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}

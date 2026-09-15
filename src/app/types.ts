export type Doctor = {
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  initials: string;
};

export type Department = {
  id: string;
  name: string;
  description: string;
  accent: string;
  doctors: Doctor[];
};

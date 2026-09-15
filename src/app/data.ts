import { Department } from "./types";
export const departments: Department[] = [
  {
    id: "cardiology",
    name: "Cardiology",
    description: "Heart health and preventive care.",
    accent: "bg-stone-200",
    doctors: [
      {
        name: "Dr. Amina Shah",
        specialty: "Interventional Cardiology",
        experience: "12 years",
        availability: "Today • 3:00 PM",
        initials: "AS",
      },
      {
        name: "Dr. Luca Bennet",
        specialty: "Heart Failure Care",
        experience: "9 years",
        availability: "Tomorrow • 10:30 AM",
        initials: "LB",
      },
      {
        name: "Dr. Sia Romero",
        specialty: "Cardiac Imaging",
        experience: "11 years",
        availability: "Thu • 1:15 PM",
        initials: "SR",
      },
    ],
  },
  {
    id: "neurology",
    name: "Neurology",
    description: "Brain and nerve care for complex conditions.",
    accent: "bg-stone-100",
    doctors: [
      {
        name: "Dr. Ethan Cole",
        specialty: "Neurology",
        experience: "14 years",
        availability: "Today • 4:00 PM",
        initials: "EC",
      },
      {
        name: "Dr. Maya Ross",
        specialty: "Neurovascular Care",
        experience: "10 years",
        availability: "Fri • 9:30 AM",
        initials: "MR",
      },
      {
        name: "Dr. Omar Bell",
        specialty: "Movement Disorders",
        experience: "8 years",
        availability: "Mon • 2:00 PM",
        initials: "OB",
      },
    ],
  },
  {
    id: "pediatrics",
    name: "Pediatrics",
    description: "Compassionate care for growing families.",
    accent: "bg-stone-50",
    doctors: [
      {
        name: "Dr. Nora Hart",
        specialty: "Pediatric Medicine",
        experience: "13 years",
        availability: "Today • 5:30 PM",
        initials: "NH",
      },
      {
        name: "Dr. Jacob Lee",
        specialty: "Child Development",
        experience: "7 years",
        availability: "Wed • 11:00 AM",
        initials: "JL",
      },
      {
        name: "Dr. Lila Green",
        specialty: "General Pediatrics",
        experience: "9 years",
        availability: "Fri • 3:15 PM",
        initials: "LG",
      },
    ],
  },
];

export const highlights = [
  "On-demand care",
  "Primary services",
  "Preventive checkups",
  "Expert clinicians",
];
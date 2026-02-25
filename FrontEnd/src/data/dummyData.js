

export const barbers = [
  { id: 1, name: "Andi" },
  { id: 2, name: "Budi" },
];

export const bookedSlots = {
  1: ["10:00", "11:00"], // barber Andi
  2: ["13:00"]
};

export const allSlots = [
  "10:00", "10:30",
  "11:00", "11:30",
  "12:00", "12:30",
  "13:00", "13:30",
];

export const blockedSlots = {
  1: ["12:00"], // barber Andi
  2: [],
};
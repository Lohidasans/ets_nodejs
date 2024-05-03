const user_type_data = [
  {
    id: 1,
    user_type: "Super Admin",
  },
  {
    id: 2,
    user_type: "Admin",
  },
  {
    id: 3,
    user_type: "Canteen",
  },
  {
    id: 4,
    user_type: "Security",
  },
];

const shift_data = [
  {
    id: 1,
    schedule_time: "Morning",
  },
  {
    id: 2,
    schedule_time: "Afternoon",
  },
  {
    id: 3,
    schedule_time: "Night",
  },
];

const guest_type_data = [
  {
    id: 1,
    guest_type: "Customer",
  },
  {
    id: 2,
    guest_type: "Others",
  },
];

module.exports = {
  user_type_data,
  shift_data,
  guest_type_data,
};

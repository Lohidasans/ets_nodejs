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

const team_type_data = [
  {
    id: 1,
    team_type: "Individual",
  },
  {
    id: 2,
    team_type: "Grouped",
  },
];

const team_data = [
  {
    id: 1,
    team: "Admin",
  },
  {
    id: 2,
    team: "Workshop",
  },
  {
    id: 3,
    team: "Polishing",
  },
  {
    id: 4,
    team: "Security",
  },
  {
    id: 5,
    team: "Canteen",
  },
  {
    id: 6,
    team: "Supervisor",
  },
];

const state_data = [
  {
    id: 1,
    state: "TamilNadu",
  },
  {
    id: 2,
    state: "Karnataka",
  },
];

const employee_category = [
  {
    id: "1",
    category: "permanent"    
  },
  {
    id: "2",
    category: "temporary"
  }
]
module.exports = {
  user_type_data,
  shift_data,
  guest_type_data,
  team_type_data,
  team_data,
  state_data,
  employee_category
};

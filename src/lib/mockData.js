// Mock data for prototype (made-up for demo purposes)
export const salesLineData = {
  labels: [
    "01-01-2025",
    "02-01-2025",
    "03-01-2025",
    "04-01-2025",
    "05-01-2025",
    "06-01-2025",
    "07-01-2025",
    "08-01-2025",
    "09-01-2025",
    "10-01-2025",
    "11-01-2025",
    "12-01-2025",
  ],
  datasets: [
    {
      label: "Bookings",
      data: [120, 150, 180, 170, 220, 260, 300, 320, 280, 310, 330, 360],
      fill: true,
      borderColor: "#7c3aed",
      backgroundColor: "rgba(124,58,237,0.15)",
      tension: 0.3,
      pointRadius: 2,
    },
    {
      label: "Available Units",
      data: [420, 420, 415, 413, 410, 405, 400, 395, 392, 390, 388, 385],
      borderColor: "rgba(75,85,99,0.5)",
      backgroundColor: "rgba(75,85,99,0.12)",
      tension: 0.3,
      pointRadius: 0,
    },
  ],
};

export const revenueBarData = {
  labels: [
    "01-01-2025",
    "02-01-2025",
    "03-01-2025",
    "04-01-2025",
    "05-01-2025",
    "06-01-2025",
  ],
  datasets: [
    {
      label: "Income",
      data: [12000, 14500, 16000, 15000, 18000, 20000],
      backgroundColor: "#10b981",
    },
    {
      label: "Expenses",
      data: [4000, 3500, 4200, 3800, 4100, 3900],
      backgroundColor: "#ef4444",
    },
  ],
};

export const topCountriesDoughnut = {
  labels: ["United Kingdom", "Pakistan", "India", "United States", "Germany"],
  datasets: [
    {
      data: [45, 20, 15, 12, 8],
      backgroundColor: ["#6366f1", "#7c3aed", "#06b6d4", "#f59e0b", "#ef4444"],
    },
  ],
};

export const topChannels = [
  { channel: "Referrals", value: 340 },
  { channel: "Web Search", value: 210 },
  { channel: "Social", value: 180 },
  { channel: "Direct", value: 120 },
  { channel: "Agencies", value: 90 },
];

export const recentActivity = [
  { id: 1, text: "New referral: John Doe", time: "2 hours ago" },
  { id: 2, text: "Booking confirmed: Unit A12", time: "1 day ago" },
  { id: 3, text: "Incident reported: noise complaint", time: "2 days ago" },
];

// Dashboard-specific mock datasets
export const occupancyTrend = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Occupancy %",
      data: [78, 80, 82, 81, 85, 88, 90, 91, 89, 87, 86, 88],
      fill: true,
      borderColor: "#7c3aed",
      backgroundColor: "rgba(124,58,237,0.12)",
      tension: 0.2,
      pointRadius: 2,
    },
  ],
};

export const supportSessionsTrend = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Support Sessions",
      data: [120, 130, 150, 170, 160, 180],
      borderColor: "#06b6d4",
      backgroundColor: "rgba(6,182,212,0.08)",
      tension: 0.2,
    },
  ],
};

export const incidentsTrend = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Safeguarding",
      data: [2, 1, 3, 2, 4, 3],
      backgroundColor: "#ef4444",
    },
    {
      label: "General Incidents",
      data: [6, 5, 8, 7, 9, 6],
      backgroundColor: "#f59e0b",
    },
  ],
};

export const maintenanceBacklog = {
  labels: ["Plumbing", "Electrical", "Heating", "Carpentry", "Other"],
  datasets: [
    {
      label: "Open Jobs",
      data: [5, 3, 8, 4, 2],
      backgroundColor: ["#f97316", "#f43f5e", "#06b6d4", "#7c3aed", "#10b981"],
    },
  ],
};

export const residentRiskDoughnut = {
  labels: ["Low", "Medium", "High"],
  datasets: [
    { data: [60, 30, 10], backgroundColor: ["#10b981", "#f59e0b", "#ef4444"] },
  ],
};

export const referrals = [
  { id: 1, source: "GP", count: 120 },
  { id: 2, source: "Hospital", count: 95 },
  { id: 3, source: "Self-Referral", count: 60 },
  { id: 4, source: "Social Services", count: 40 },
];

export const upcomingInspections = [
  { id: "I-101", property: "Maple House", date: "2025-07-10" },
  { id: "I-102", property: "Oak Lodge", date: "2025-08-02" },
];

export const properties = [
  {
    id: "P-001",
    name: "Maple House",
    address: "12 Maple St, London",
    units: 8,
    occupancy: 7,
  },
  {
    id: "P-002",
    name: "Willow Court",
    address: "3 Willow Rd, Manchester",
    units: 6,
    occupancy: 6,
  },
  {
    id: "P-003",
    name: "Oak Lodge",
    address: "45 Oak Ave, Birmingham",
    units: 10,
    occupancy: 9,
  },
];

export const residents = [
  {
    id: "R-100",
    name: "John Doe",
    dob: "1990-04-12",
    risk: "Low",
    propertyId: "P-001",
  },
  {
    id: "R-101",
    name: "Jane Smith",
    dob: "1985-09-02",
    risk: "Medium",
    propertyId: "P-003",
  },
  {
    id: "R-102",
    name: "Ali Khan",
    dob: "1998-12-22",
    risk: "High",
    propertyId: "P-001",
  },
];

export const jobs = [
  {
    id: "J-900",
    title: "Fix boiler - Maple House",
    priority: "High",
    status: "Open",
    due: "2025-06-12",
  },
  {
    id: "J-901",
    title: "Replace smoke alarm - Oak Lodge",
    priority: "Medium",
    status: "In Progress",
    due: "2025-06-20",
  },
];

export const staff = [
  { id: "S-1", name: "Emma Worker", role: "Support Worker" },
  { id: "S-2", name: "Liam Repair", role: "Maintenance" },
  { id: "S-3", name: "Olivia Admin", role: "Manager" },
];

export const alerts = [
  {
    id: "A-1",
    severity: "Critical",
    text: "Gas safety certificate overdue - Oak Lodge",
    time: "3 days ago",
  },
  {
    id: "A-2",
    severity: "Warning",
    text: "Missing support file - John Doe",
    time: "1 day ago",
  },
];

export default {
  salesLineData,
  revenueBarData,
  topCountriesDoughnut,
  topChannels,
  recentActivity,
  properties,
  residents,
  jobs,
  staff,
  alerts,
};

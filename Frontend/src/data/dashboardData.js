export const dummyUrls = [
  {
    id: "1",
    shortCode: "aX72kQ",
    originalUrl: "https://github.com/abhishek/url-shortener",
    clicks: 1248,
    createdAt: "Aug 06, 2026",
    status: "Active",
  },
  {
    id: "2",
    shortCode: "yt91Lm",
    originalUrl: "https://youtube.com/watch?v=react-course",
    clicks: 873,
    createdAt: "Aug 04, 2026",
    status: "Active",
  },
  {
    id: "3",
    shortCode: "dev42Pk",
    originalUrl: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    clicks: 652,
    createdAt: "Aug 02, 2026",
    status: "Active",
  },
  {
    id: "4",
    shortCode: "job7Rt",
    originalUrl: "https://linkedin.com/jobs/software-engineer",
    clicks: 421,
    createdAt: "Jul 30, 2026",
    status: "Active",
  },
  {
    id: "5",
    shortCode: "doc82N",
    originalUrl: "https://nodejs.org/docs/latest/api/",
    clicks: 318,
    createdAt: "Jul 28, 2026",
    status: "Expired",
  },
  {
    id: "6",
    shortCode: "api11X",
    originalUrl: "https://expressjs.com/",
    clicks: 287,
    createdAt: "Jul 26, 2026",
    status: "Active",
  },
  {
    id: "7",
    shortCode: "db99Qa",
    originalUrl: "https://www.mongodb.com/docs/",
    clicks: 204,
    createdAt: "Jul 22, 2026",
    status: "Active",
  },
];

export const analyticsData = {
  totalClicks: 4003,
  avgDailyClicks: 267,
  mobileTraffic: 42,
  topCountry: "India",

  dailyClicks: [
    { day: "Mon", clicks: 180 },
    { day: "Tue", clicks: 260 },
    { day: "Wed", clicks: 220 },
    { day: "Thu", clicks: 340 },
    { day: "Fri", clicks: 290 },
    { day: "Sat", clicks: 410 },
    { day: "Sun", clicks: 355 },
  ],

  browsers: [
    { name: "Chrome", value: 62 },
    { name: "Safari", value: 18 },
    { name: "Firefox", value: 12 },
    { name: "Edge", value: 8 },
  ],

  devices: [
    { name: "Desktop", value: 58 },
    { name: "Mobile", value: 37 },
    { name: "Tablet", value: 5 },
  ],

  countries: [
    { name: "India", value: 1850 },
    { name: "USA", value: 920 },
    { name: "UK", value: 510 },
    { name: "Canada", value: 340 },
    { name: "Others", value: 383 },
  ],

  recentVisits: [
    { location: "Noida, IN", browser: "Chrome", device: "Desktop", time: "2 min ago" },
    { location: "Delhi, IN", browser: "Safari", device: "Mobile", time: "8 min ago" },
    { location: "Mumbai, IN", browser: "Chrome", device: "Mobile", time: "14 min ago" },
    { location: "New York, US", browser: "Firefox", device: "Desktop", time: "22 min ago" },
    { location: "London, UK", browser: "Edge", device: "Desktop", time: "31 min ago" },
  ],
};

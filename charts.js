/* ── Data ───────────────────────────────────────────────── */
const D = {
  interest:       { Maybe: 225, Yes: 95, No: 80 },
  transport_mode: { Own_Car: 70, Taxi_RideHail: 66, University_Shuttle: 64, RTA_Bus: 59, Metro: 57, Carpool: 45, Sub_Van: 25, Walking_Cycling: 14 },
  gender:         { Male: 199, Female: 195, "Prefer not to say": 6 },
  university:     { MAHE_Dubai: 102, UOWD: 91, RIT_Dubai: 80, Murdoch_Dubai: 74, Other_DIAC: 53 },
  accommodation:  { Sharjah: 74, Al_Barsha: 71, Deira_BurDubai: 69, Downtown_JBR_JLT: 65, Ajman_Northern: 55, Other: 34, On_Campus: 32 },
  level_of_study: { Undergraduate: 265, Postgraduate: 102, Foundation: 33 },
  nationality:    { South_Asian: 166, Arab_NonGCC: 46, Arab_GCC: 43, Southeast_Asian: 42, European_Western: 40, African: 37, Other: 26 },
  pain_points:    { HighCost: 127, LongTime: 364, Unreliable: 72, Safety: 146, Overcrowded: 92, NoLateNight: 135, NoDirectRoute: 118 },
  features:       { LiveTracking: 328, CarpoolMatch: 244, SubscriptionPass: 230, FemaleOnly: 112, PickupHome: 288, InAppSupport: 205, CashlessPayment: 304, RealTimeAlerts: 264, RatingSystem: 272, TimetableInteg: 209 },
  avg_severity:   { Cost: 2.65, Time: 3.78, Unreliable: 2.33, Safety: 2.71, Overcrowded: 2.48, LateNight: 2.69 },
  avg_importance: { Cost: 3.53, Time: 3.48, Safety: 3.94, Comfort: 3.08, Reliability: 3.56, Flexibility: 3.05 },
  pref_modes:     { FixedShuttle: 213, OnDemandShuttle: 227, SubVan: 155, Carpool: 196, RideHail: 182, PublicTransport: 144 },
  app_usage:      { GoogleMaps: 336, WhatsApp: 246, Uber: 228, Careem: 196, UniPortal: 191, RTA: 180 },
  spend_by_mode:  { Taxi_RideHail: 287.5, Own_Car: 208.7, Sub_Van: 130.6, Metro: 113.2, Carpool: 110.9, RTA_Bus: 106.5, University_Shuttle: 81.5, Walking_Cycling: 50.0 },
  commute_by_mode:{ Walking_Cycling: 6.6, University_Shuttle: 81.9, Taxi_RideHail: 94.2, Own_Car: 92.7, RTA_Bus: 95.2, Metro: 96.5, Sub_Van: 96.1, Carpool: 100.7 },
  satisfaction:   { 1: 3, 2: 62, 3: 125, 4: 112, 5: 98 },
  app_comfort:    { 2: 102, 3: 83, 4: 107, 5: 108 },
  ridehail_freq:  { Rarely: 116, "1-2/week": 113, Never: 78, "3-5/week": 67, Daily: 26 },
  days_per_week:  { "5 days": 183, "3-4 days": 133, "6+ days": 45, "1-2 days": 39 },
  interest_by_uni:{
    Yes:   { MAHE_Dubai: 21, Murdoch_Dubai: 18, Other_DIAC: 14, RIT_Dubai: 18, UOWD: 24 },
    Maybe: { MAHE_Dubai: 63, Murdoch_Dubai: 39, Other_DIAC: 26, RIT_Dubai: 47, UOWD: 50 },
    No:    { MAHE_Dubai: 18, Murdoch_Dubai: 17, Other_DIAC: 13, RIT_Dubai: 15, UOWD: 17 }
  },
  spend_buckets:   { "<100": 165, "100–200": 139, "200–300": 56, "300–400": 26, "400+": 14 },
  commute_buckets: { "<20": 32, "20–40": 7, "40–60": 38, "60–80": 58, "80–100": 61, "100–120": 204 },
  kpis: {
    total_respondents: 400,
    avg_monthly_spend: 151.2,
    avg_commute_min: 90.2,
    avg_distance_km: 29.1,
    pct_yes: 23.8,
    pct_maybe: 56.2,
    avg_satisfaction: 3.6,
    avg_willingness_pay: 86.6,
    avg_budget: 165.1,
    avg_nps: 3.5
  }
};

/* ── Palette ────────────────────────────────────────────── */
const BLUE   = '#2a78d6';
const GREEN  = '#1baf7a';
const AMBER  = '#d4a017';
const RED    = '#e34948';
const PURPLE = '#8957e5';
const PINK   = '#e87ba4';
const ORANGE = '#eb6834';
const TEAL   = '#1b9aaf';

const PAL = [BLUE, GREEN, AMBER, RED, PURPLE, PINK, ORANGE, TEAL];

const GRID = 'rgba(255,255,255,0.06)';
const TICK = '#7d8590';

/* ── Chart.js defaults ──────────────────────────────────── */
Chart.defaults.color = TICK;
Chart.defaults.borderColor = GRID;
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif';
Chart.defaults.font.size = 11;

/* ── Helpers ────────────────────────────────────────────── */
const K = o => Object.keys(o);
const V = o => Object.values(o);

function legend(elId, items) {
  const el = document.getElementById(elId);
  if (!el) return;
  el.innerHTML = items.map(([color, label]) =>
    `<span><span class="dot" style="background:${color}"></span>${label}</span>`
  ).join('');
}

function scaleOpts(axis = 'xy') {
  const s = {};
  if (axis.includes('x')) s.x = { grid: { color: GRID }, ticks: { color: TICK } };
  if (axis.includes('y')) s.y = { grid: { color: GRID }, ticks: { color: TICK } };
  return { scales: s };
}

function mkBar(id, labels, data, colors, extra = {}) {
  const isArr = Array.isArray(colors);
  new Chart(document.getElementById(id), {
    type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: isArr ? colors : colors, borderRadius: 4, borderSkipped: 'start' }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      ...scaleOpts('xy'),
      ...extra
    }
  });
}

function mkHBar(id, labels, data, colors, extra = {}) {
  const isArr = Array.isArray(colors);
  new Chart(document.getElementById(id), {
    type: 'bar',
    data: { labels, datasets: [{ data, backgroundColor: isArr ? colors : colors, borderRadius: 4, borderSkipped: 'start' }] },
    options: {
      indexAxis: 'y',
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      ...scaleOpts('xy'),
      ...extra
    }
  });
}

function mkDonut(id, labels, data, colors, cutout = '62%') {
  new Chart(document.getElementById(id), {
    type: 'doughnut',
    data: { labels, datasets: [{ data, backgroundColor: colors, borderWidth: 2, borderColor: '#1c2128' }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      cutout,
      plugins: { legend: { display: false }, tooltip: { callbacks: {
        label: ctx => ` ${ctx.label}: ${ctx.raw} (${Math.round(ctx.raw / 4)}%)`
      }}}
    }
  });
}

function mkRadar(id, labels, data, color) {
  new Chart(document.getElementById(id), {
    type: 'radar',
    data: { labels, datasets: [{ data, backgroundColor: color + '25', borderColor: color, pointBackgroundColor: color, pointRadius: 3, borderWidth: 2 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          min: 0, max: 5, ticks: { stepSize: 1, color: TICK, backdropColor: 'transparent', font: { size: 10 } },
          grid: { color: GRID }, angleLines: { color: GRID },
          pointLabels: { color: TICK, font: { size: 10 } }
        }
      }
    }
  });
}

function mkGroupedBar(id, labels, datasets) {
  new Chart(document.getElementById(id), {
    type: 'bar',
    data: { labels, datasets },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false }, tooltip: { mode: 'index', intersect: false } },
      ...scaleOpts('xy')
    }
  });
}

/* ── KPI Cards ──────────────────────────────────────────── */
const kpiDef = [
  { val: '400',    label: 'Respondents',      color: BLUE,   delta: '61 variables' },
  { val: '23.8%',  label: 'App interest',      color: GREEN,  delta: '95 said Yes' },
  { val: 'AED 151',label: 'Avg monthly spend', color: AMBER,  delta: 'Median ~AED 120' },
  { val: '90 min', label: 'Avg commute',        color: RED,    delta: 'One way' },
  { val: '3.6/5',  label: 'Satisfaction',       color: '#a88ef5', delta: 'Avg score' },
  { val: 'AED 87', label: 'Willingness to pay', color: TEAL,  delta: 'Per month' },
];

const kpiRow = document.getElementById('kpi-row');
kpiDef.forEach(k => {
  const div = document.createElement('div');
  div.className = 'kpi-card';
  div.innerHTML = `
    <div class="kpi-val" style="color:${k.color}">${k.val}</div>
    <div class="kpi-label">${k.label}</div>
    <div class="kpi-delta" style="color:#484f58">${k.delta}</div>
  `;
  kpiRow.appendChild(div);
});

/* ── OVERVIEW charts ────────────────────────────────────── */
legend('leg-interest', [
  [GREEN,  'Maybe 56.3%'],
  [BLUE,   'Yes 23.8%'],
  [RED,    'No 20.0%'],
]);
mkDonut('c-interest', ['Maybe', 'Yes', 'No'], [225, 95, 80], [GREEN, BLUE, RED]);

const unis = ['MAHE', 'UOWD', 'RIT Dubai', 'Murdoch', 'Other DIAC'];
legend('leg-uni', [[GREEN, 'Yes'], [AMBER, 'Maybe'], [RED, 'No']]);
mkGroupedBar('c-int-uni', unis, [
  { label: 'Yes',   data: [21, 24, 18, 18, 14], backgroundColor: GREEN,  borderRadius: 3 },
  { label: 'Maybe', data: [63, 50, 47, 39, 26], backgroundColor: AMBER,  borderRadius: 3 },
  { label: 'No',    data: [18, 17, 15, 17, 13], backgroundColor: RED,    borderRadius: 3 },
]);

mkBar('c-sat',
  ['★', '★★', '★★★', '★★★★', '★★★★★'],
  [3, 62, 125, 112, 98],
  [RED, ORANGE, AMBER, GREEN, '#008300']
);

mkBar('c-spend-b', K(D.spend_buckets), V(D.spend_buckets), BLUE);
mkBar('c-comm-b',  K(D.commute_buckets), V(D.commute_buckets), PURPLE);

/* ── DEMOGRAPHICS charts ────────────────────────────────── */
legend('leg-gender', [[BLUE, 'Male 49.8%'], [PINK, 'Female 48.8%'], ['#484f58', 'Other 1.5%']]);
mkDonut('c-gender', ['Male', 'Female', 'Other'], [199, 195, 6], [BLUE, PINK, '#484f58']);

legend('leg-level', [[BLUE, 'Undergraduate 66.3%'], [GREEN, 'Postgraduate 25.5%'], [AMBER, 'Foundation 8.3%']]);
mkDonut('c-level', ['Undergraduate', 'Postgraduate', 'Foundation'], [265, 102, 33], [BLUE, GREEN, AMBER], '55%');

mkBar('c-uni',
  ['MAHE Dubai', 'UOWD', 'RIT Dubai', 'Murdoch', 'Other DIAC'],
  [102, 91, 80, 74, 53],
  PAL
);

mkBar('c-accom',
  ['Sharjah', 'Al Barsha', 'Deira/BurDubai', 'Downtown/JBR', 'Ajman', 'Other', 'On Campus'],
  [74, 71, 69, 65, 55, 34, 32],
  PURPLE
);

mkHBar('c-nat',
  ['South Asian', 'Arab (Non-GCC)', 'Arab (GCC)', 'Southeast Asian', 'European/W', 'African', 'Other'],
  [166, 46, 43, 42, 40, 37, 26],
  GREEN
);

/* ── TRANSPORT charts ───────────────────────────────────── */
const modeLabels = ['Own car', 'Taxi/Ride-hail', 'Uni shuttle', 'RTA Bus', 'Metro', 'Carpool', 'Sub van', 'Walking'];
mkHBar('c-mode',       modeLabels, [70, 66, 64, 59, 57, 45, 25, 14], PAL);
mkHBar('c-mode-spend', ['Taxi/Ride-hail', 'Own car', 'Sub van', 'Metro', 'Carpool', 'RTA Bus', 'Uni shuttle', 'Walking'],
  [287.5, 208.7, 130.6, 113.2, 110.9, 106.5, 81.5, 50.0], AMBER);
mkBar('c-mode-time',
  ['Walking', 'Shuttle', 'Taxi', 'Own car', 'RTA Bus', 'Metro', 'Sub van', 'Carpool'],
  [6.6, 81.9, 94.2, 92.7, 95.2, 96.5, 96.1, 100.7],
  [GREEN, BLUE, ORANGE, AMBER, TEAL, PURPLE, PINK, RED]
);

legend('leg-days', [[BLUE, '5 days'], [GREEN, '3-4 days'], [AMBER, '6+ days'], [RED, '1-2 days']]);
mkDonut('c-days', ['5 days', '3-4 days', '6+ days', '1-2 days'], [183, 133, 45, 39], [BLUE, GREEN, AMBER, RED]);

/* ── PAIN POINT charts ──────────────────────────────────── */
const PAIN_LABELS = ['Long travel time', 'Safety concerns', 'High cost', 'No late-night', 'No direct route', 'Overcrowded', 'Unreliable'];
const PAIN_VALS   = [364, 146, 127, 135, 118, 92, 72];
const PAIN_COLS   = [RED, ORANGE, AMBER, PURPLE, BLUE, PINK, GREEN];

mkHBar('c-pain', PAIN_LABELS, PAIN_VALS, PAIN_COLS);
mkRadar('c-severity', ['Cost', 'Travel time', 'Unreliable', 'Safety', 'Overcrowded', 'Late night'],
  [2.65, 3.78, 2.33, 2.71, 2.48, 2.69], RED);

// Ranked bar list
const painList = document.getElementById('pain-bars');
const maxP = Math.max(...PAIN_VALS);
PAIN_LABELS.forEach((l, i) => {
  const pct = Math.round(PAIN_VALS[i] / maxP * 100);
  const row = document.createElement('div');
  row.className = 'bar-row';
  row.innerHTML = `
    <div class="bar-name">${l}</div>
    <div class="bar-track">
      <div class="bar-fill" style="width:${pct}%;background:${PAIN_COLS[i]}">${PAIN_VALS[i]}</div>
    </div>
    <div class="bar-count">${PAIN_VALS[i]}</div>
    <div class="bar-pct">${Math.round(PAIN_VALS[i] / 4)}%</div>
  `;
  painList.appendChild(row);
});

/* ── FEATURES charts ────────────────────────────────────── */
mkHBar('c-feat',
  ['Live tracking', 'Cashless pay', 'Home pick-up', 'Rating system', 'Real-time alerts', 'Carpool match', 'Sub pass', 'Timetable integ', 'In-app support', 'Female-only'],
  [328, 304, 288, 272, 264, 244, 230, 209, 205, 112],
  BLUE
);

mkBar('c-pref',
  ['On-demand', 'Fixed shuttle', 'Carpool', 'Ride-hail', 'Sub van', 'Public transit'],
  [227, 213, 196, 182, 155, 144],
  GREEN
);

mkRadar('c-imp', ['Cost', 'Travel time', 'Safety', 'Comfort', 'Reliability', 'Flexibility'],
  [3.53, 3.48, 3.94, 3.08, 3.56, 3.05], BLUE);

mkBar('c-budget', ['<100', '100–200', '200–300', '300–400', '400+', '600+'], [165, 139, 56, 26, 14, 0], PURPLE);

/* ── DIGITAL charts ─────────────────────────────────────── */
mkBar('c-apps',
  ['Google Maps', 'WhatsApp', 'Uber', 'Careem', 'Uni Portal', 'RTA App'],
  [336, 246, 228, 196, 191, 180],
  PAL
);

mkBar('c-rhail',
  ['Rarely', '1-2/week', 'Never', '3-5/week', 'Daily'],
  [116, 113, 78, 67, 26],
  ORANGE
);

mkBar('c-comfort',
  ['Score 2', 'Score 3', 'Score 4', 'Score 5'],
  [102, 83, 107, 108],
  [RED, AMBER, GREEN, BLUE]
);

/* ── Navigation ─────────────────────────────────────────── */
const PAGE_TITLES = {
  overview:     'Overview',
  demographics: 'Demographics',
  transport:    'Transport Patterns',
  pain:         'Pain Points',
  features:     'Features & Preferences',
  digital:      'Digital Behaviour',
};

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    const pg = btn.dataset.page;
    document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('page-' + pg).classList.add('active');
    document.getElementById('page-title').textContent = PAGE_TITLES[pg] || pg;

    // Close sidebar on mobile after nav
    if (window.innerWidth <= 700) {
      document.getElementById('sidebar').classList.remove('open');
    }
  });
});

// Mobile sidebar toggle
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('sidebar').classList.toggle('open');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', e => {
  const sidebar = document.getElementById('sidebar');
  const menuBtn = document.getElementById('menu-btn');
  if (window.innerWidth <= 700 && sidebar.classList.contains('open') &&
      !sidebar.contains(e.target) && e.target !== menuBtn) {
    sidebar.classList.remove('open');
  }
});

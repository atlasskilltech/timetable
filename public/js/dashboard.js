// Global state
let filters = {
  date: new Date().toISOString().split("T")[0],
  program: "all",
  year: "all",
  section: "all",
  faculty: "all",
  room: "all",
  subject: "all",
  day: "all",
  time: "all",
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  initializeFilters();
  loadFilterOptions();
  loadData();
  attachEventListeners();
});

// Initialize filter values
function initializeFilters() {
  document.getElementById("dateFilter").value = filters.date;
}

// Load filter options from API
async function loadFilterOptions() {
  try {
    const response = await fetch("/api/dashboard/filters");
    const data = await response.json();

    if (data.success) {
      populatePrograms(data.data.programs);
      populateYears(data.data.years);
      populateSections(data.data.sections);
      populateFaculties(data.data.faculties);
      populateRooms(data.data.rooms);
      populateSubjects(data.data.subjects);
      populateDays(data.data.days);
      populateTimes(data.data.times);
    }
  } catch (error) {
    console.error("Error loading filter options:", error);
  }
}

function populatePrograms(programs) {
  const select = document.getElementById("programFilter");
  programs.forEach((prog) => {
    const option = document.createElement("option");
    option.value = prog.school_id;
    option.textContent = `${prog.school_code} - ${prog.school_name}`;
    select.appendChild(option);
  });
}






















function populateYears(years) {

  const select = document.getElementById("yearFilter");
   const el = document.getElementById('toggleMultiSelect');
  
  const span = document.createElement('span');
  span.className =
    'text-[#64748b] whitespace-nowrap overflow-hidden text-ellipsis';
  span.textContent = el.dataset.text;

  // -------- svg --------
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');

  svg.classList.add(
    'w-[14px]',
    'h-[14px]',
    'shrink-0',
    'transition-transform',
    'duration-[150ms]',
    'ease-in-out',
    'text-[#94a3b8]',
    'group-[.open]:rotate-180'
  );

  const polyline = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'polyline'
  );
  polyline.setAttribute('points', '6 9 12 15 18 9');

  svg.appendChild(polyline);

  // -------- append --------
  el.appendChild(span);
  el.appendChild(svg);
  years.forEach((year) => {
      
    const option1 = document.createElement("div");
   option1.classList.add(
      "flex",
      "items-center",
      "gap-[8px]",
      "py-[8px]",
      "px-[12px]",
      "cursor-pointer",
      "text-[0.85rem]",
      "transition-colors",
      "duration-[150ms]",
      "ease-in-out",
    );
    option1.dataset.value = year;


    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `dashYearFilter_${year}`;
    checkbox.value = year;
    checkbox.className = "w-[16px] h-[16px] accent-[#10b981] cursor-pointer";
    
    const label = document.createElement("label");
    label.className = `
    flex flex-1 items-center
    cursor-pointer
    whitespace-nowrap overflow-hidden text-ellipsis
    gap-[var(--space-xs)]
    text-[0.7rem] font-[600]
    text-[#94a3b8]
    uppercase tracking-[0.05em]
`;

    label.setAttribute("for", `dashYearFilter_${year}`);
    label.textContent = year;
    option1.appendChild(checkbox);
    option1.appendChild(label);
    

   
    select.appendChild(option1);
  });

  

checkbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    console.log('Selected:', e.target.value);
  } else {
    console.log('Unselected:', e.target.value);
  }
});




  const footer = document.createElement('div');
    footer.className = `
    flex
    gap-[8px]
    py-[8px] px-[12px]
    border-t border-[#e2e8f0]
    bg-[#f1f5f9]
    `;

// Select All button
const selectAllBtn = document.createElement('button');
selectAllBtn.textContent = 'Select All';
selectAllBtn.className = `
  bg-[#10b981] text-white
  flex-1
  py-[4px] px-[8px]
  text-[0.75rem]
  rounded-[4px]
  cursor-pointer
  border-none
  transition-all duration-[150ms] ease-in-out
  leading-none
`;

// Clear button
const clearBtn = document.createElement('button');
clearBtn.textContent = 'Clear';
clearBtn.className = `
  bg-[#ffffff]
  border border-[#e2e8f0]
  text-[#64748b]
  flex-1
  py-[4px] px-[8px]
  text-[0.75rem]
  rounded-[4px]
  cursor-pointer
  transition-all duration-[150ms] ease-in-out
  leading-none
`;

// append buttons into footer
footer.appendChild(selectAllBtn);
footer.appendChild(clearBtn);
select.appendChild(footer);





 selectAllBtn.addEventListener('click', () => {
  select
    .querySelectorAll('input[type="checkbox"]')
    .forEach(cb => cb.checked = true);
});

clearBtn.addEventListener('click', () => {
  select
    .querySelectorAll('input[type="checkbox"]')
    .forEach(cb => cb.checked = false);
});

  
}

function populateSections(sections) {
  const select = document.getElementById("sectionFilter");
  sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.class_id;
    option.textContent = section.class_name;
    select.appendChild(option);
  });
}

function populateFaculties(faculties) {
  const select = document.getElementById("facultyFilter");
  faculties.forEach((faculty) => {
    const option = document.createElement("option");
    option.value = faculty.faculty_id;
    option.textContent = `${faculty.faculty_first_name} ${faculty.faculty_last_name}`;
    select.appendChild(option);
  });
}

function populateRooms(rooms) {
  const select = document.getElementById("roomFilter");
  rooms.forEach((room) => {
    const option = document.createElement("option");
    option.value = room.room_id;
    option.textContent = `${room.room_name} (${room.floor_building} - ${room.floor_name})`;
    select.appendChild(option);
  });
}

function populateSubjects(subjects) {
  const select = document.getElementById("subjectFilter");
  subjects.forEach((subject) => {
    const option = document.createElement("option");
    option.value = subject.subject_id;
    option.textContent = `${subject.subject_code} - ${subject.subject_name}`;
    select.appendChild(option);
  });
}

function populateDays(days) {
  const select = document.getElementById("dayFilter");
  days.forEach((day) => {
    const option = document.createElement("option");
    option.value = day;
    option.textContent = day;
    select.appendChild(option);
  });
}

function populateTimes(times) {
  const select = document.getElementById("timeFilter");
  times.forEach((time) => {
    const option = document.createElement("option");
    option.value = time.value;
    option.textContent = time.label;
    select.appendChild(option);
  });
}

// Load timetable data
async function loadData() {
  showLoading();

  try {
    // Build query string
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== "all") {
        queryParams.append(key, filters[key]);
      }
    });

    const [timetableRes, statsRes] = await Promise.all([
      fetch(`/api/dashboard/timetable?${queryParams}`),
      fetch(`/api/dashboard/stats?${queryParams}`),
    ]);

    const timetableData = await timetableRes.json();
    const statsData = await statsRes.json();

    if (timetableData.success) {
      updateStatistics(statsData.data, timetableData.total);
      renderTimetable(timetableData.data);
    }
  } catch (error) {
    console.error("Error loading data:", error);
    showError("Failed to load timetable data");
  } finally {
    hideLoading();
  }
}

// Update statistics
function updateStatistics(stats, total) {
  document.getElementById("totalScheduled").textContent =
    stats?.total_scheduled || total || 0;
  document.getElementById("totalUnscheduled").textContent =
    stats?.total_unscheduled || 0;
  document.getElementById("totalEvents").textContent = total || 0;
  document.getElementById("generatedDate").textContent =
    new Date().toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
}

// Render timetable cards
function renderTimetable(data) {
  const container = document.getElementById("timetableContainer");
  const emptyState = document.getElementById("emptyState");

  // Check if data is empty
  const hasData =
    Object.keys(data).length > 0 &&
    Object.values(data).some((day) => day.length > 0);

  if (!hasData) {
    container.innerHTML = "";
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  let html = "";

  // Group by day
  Object.keys(data).forEach((dayName) => {
    const classes = data[dayName];
    if (classes.length === 0) return;

    html += `
      <div class="day-section">
        <div class="day-header">
          <div class="day-title">${dayName}</div>
          <div class="day-count">(${classes.length} classes)</div>
        </div>
        <div class="class-cards-grid">
          ${classes.map((cls) => renderClassCard(cls)).join("")}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Render individual class card
function renderClassCard(cls) {
  const schoolId = cls.school_id || "default";
  const schoolCode = cls.school_code || "";
  const facultyName =
    `${cls.faculty_first_name || ""} ${cls.faculty_last_name || ""}`.trim() ||
    "N/A";
  const roomInfo = cls.room_name ? `${cls.room_name}` : "N/A";
  const buildingInfo = cls.floor_building
    ? `${cls.floor_building} - ${cls.floor_name}`
    : "";

  return `
    <div class="class-card" data-school="${schoolId}">
      <div class="card-time">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span class="card-time-value">${cls.start_time} - ${cls.end_time}</span>
      </div>
      
      <div class="card-subject">
        <span class="subject-badge" data-school="${schoolId}">${schoolCode}</span>
        <div class="subject-name">${cls.subject_name || "N/A"}</div>
      </div>
      
      <div class="card-info">
        <div class="card-info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>${facultyName}</span>
        </div>
        
        ${
          cls.class_name
            ? `
        <div class="card-info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <span>${cls.class_name}</span>
        </div>
        `
            : ""
        }
        
        <div class="card-info-row">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span>${roomInfo}${buildingInfo ? " • " + buildingInfo : ""}</span>
        </div>
      </div>
    </div>
  `;
}

// Show loading state
function showLoading() {
  document.getElementById("loadingState").style.display = "block";
  document.getElementById("timetableContainer").style.display = "none";
  document.getElementById("emptyState").style.display = "none";
}

// Hide loading state
function hideLoading() {
  document.getElementById("loadingState").style.display = "none";
  document.getElementById("timetableContainer").style.display = "grid";
}

// Show error message
function showError(message) {
  alert(message);
}

// Attach event listeners
function attachEventListeners() {
  // Date filter
  document.getElementById("dateFilter").addEventListener("change", (e) => {
    filters.date = e.target.value;
    loadData();
  });

  // Program filter
  document.getElementById("programFilter").addEventListener("change", (e) => {
    filters.program = e.target.value;
    loadData();
  });

  // Year filter
  document.getElementById("yearFilter").addEventListener("change", (e) => {
    filters.year = e.target.value;
    loadData();
  });

  // Section filter
  document.getElementById("sectionFilter").addEventListener("change", (e) => {
    filters.section = e.target.value;
    loadData();
  });

  // Faculty filter
  document.getElementById("facultyFilter").addEventListener("change", (e) => {
    filters.faculty = e.target.value;
    loadData();
  });

  // Room filter
  document.getElementById("roomFilter").addEventListener("change", (e) => {
    filters.room = e.target.value;
    loadData();
  });

  // Subject filter
  document.getElementById("subjectFilter").addEventListener("change", (e) => {
    filters.subject = e.target.value;
    loadData();
  });

  // Day filter
  document.getElementById("dayFilter").addEventListener("change", (e) => {
    filters.day = e.target.value;
    loadData();
  });

  // Time filter
  document.getElementById("timeFilter").addEventListener("change", (e) => {
    filters.time = e.target.value;
    loadData();
  });

  // Clear filters
  document.getElementById("clearFilters").addEventListener("click", () => {
    filters = {
      date: new Date().toISOString().split("T")[0],
      program: "all",
      year: "all",
      section: "all",
      faculty: "all",
      room: "all",
      subject: "all",
      day: "all",
      time: "all",
    };

    // Reset all selects
    document.getElementById("dateFilter").value = filters.date;
    document.getElementById("programFilter").value = "all";
    document.getElementById("yearFilter").value = "all";
    document.getElementById("sectionFilter").value = "all";
    document.getElementById("facultyFilter").value = "all";
    document.getElementById("roomFilter").value = "all";
    document.getElementById("subjectFilter").value = "all";
    document.getElementById("dayFilter").value = "all";
    document.getElementById("timeFilter").value = "all";

    loadData();
  });
}

const monthTitle = document.getElementById("month-year");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
updateCalendar();

// Make Calender
function generateCalender(month, year) {
  let firstDay = new Date(year, month, 1).getDay();
  let daysInMonth = new Date(year, month + 1, 0).getDate();
  let calendarBody = document.getElementById("calendar-body");
  calendarBody.innerHTML = "";

  const totalCells = firstDay + daysInMonth;
  const totalRows = Math.ceil(totalCells / 7);

  let date = 1;
  for (let i = 0; i < totalRows; i++) {
    let row = document.createElement("tr");

    for (let j = 0; j < 7; j++) {
      let cell = document.createElement("td");
      if (i === 0 && j < firstDay) {
        cell.innerText = "";
        cell.classList.add("bg-light");
      } else if (date > daysInMonth) {
        cell.innerText = "";
        cell.classList.add("bg-light");
      } else {
        cell.innerText = String(date);
        cell.classList.add("p-3", "border", "cursor-pointer");
        if (
          date === currentDate.getDate() &&
          month === currentMonth &&
          year === currentYear
        ) {
          cell.classList.add("bg-warning", "text-black");
        }
        let capturedDate = date;
        cell.addEventListener("click", function () {
          openEventModal(capturedDate);
        });

        date++;
      }
      row.appendChild(cell);
    }
    calendarBody.appendChild(row);
  }
}

//Navigation
function prevMonth() {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  updateCalendar();
}

function nextMonth() {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  updateCalendar();
}

// Update Calendar
function updateCalendar() {
  monthTitle.textContent = `${monthNames[currentMonth]} ${currentYear}`;
  generateCalender(currentMonth, currentYear);
}

const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

prevMonthBtn.addEventListener("click", prevMonth);
nextMonthBtn.addEventListener("click", nextMonth);

// Modal
function openEventModal(day) {
  const modalLabel = document.getElementById("eventModalLabel");
  modalLabel.innerText = `Add Event for ${day} ${monthNames[currentMonth]} ${currentYear}`;

  const modalError = document.getElementById("error");
  modalError.innerText = "";

  const eventTitle = document.getElementById("eventTitle");
  eventTitle.value = "";

  const modalElement = document.getElementById("eventModal");
  const modal = new bootstrap.Modal(modalElement);
  modal.show();

  const saveEventBtn = document.getElementById("saveEventBtn");

  saveEventBtn.addEventListener("click", function () {
    if (eventTitle.value === "") {
      modalError.innerText = "Field is empty";
    } else {
      modalError.innerText = "";
      modal.hide();
    }
  });
}

// Update Header
function updateTableHeaders() {
  const headers = document.querySelectorAll("th");

  if (window.innerWidth <= 768) {
    headers.forEach((th) => {
      th.textContent = th.getAttribute("data-short");
    });
  } else {
    headers.forEach((th) => {
      th.textContent = th.getAttribute("data-full");
    });
  }
}

window.addEventListener("resize", updateTableHeaders);
document.addEventListener("DOMContentLoaded", updateTableHeaders);

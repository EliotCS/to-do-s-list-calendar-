const Months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let date = new Date();
const currentmonth = document.getElementById("currentmonth");
const years = document.querySelectorAll(".years");
let currentyear = "";
let currentviewmonth = "";

let selectedDateKey = "";
let activeEventId = null;

//FormatedDate into a key  
function FormatedDateKey(year, month, day) {
    const m = String(month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    return `${year}-${m}-${d}`;
}

//Time convertion
function convert12to24(timeStr) {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":");
    
    if (hours === "12") {
        hours = "00";}

    if (modifier === "PM"){
        hours = parseInt(hours, 10) + 12;}


    return `${String(hours).padStart(2, "0")}:${minutes}`;
}

//Creates the grid/days of the calendar
function MonthDisplay() {
    let monthindex = date.getMonth(); 
    currentyear = date.getFullYear();

    currentmonth.textContent = Months[monthindex];
    currentviewmonth = Months[monthindex];

    years.forEach(function(update) {
        update.textContent = currentyear;
    });

    const totaldays = new Date(currentyear, monthindex + 1, 0).getDate();
    const firstDayIndex = new Date(currentyear, monthindex, 1).getDay();
    const prevMonthTotalDays = new Date(currentyear, monthindex, 0).getDate();

    const prevDate = new Date(currentyear, monthindex - 1, 1);
    const prevYear = prevDate.getFullYear();
    const preMonthIndex = prevDate.getMonth();

    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    let days = "";

    // Previous Month Days
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDayNumber = prevMonthTotalDays - i + 1;
        const key = FormatedDateKey(prevYear, preMonthIndex, prevDayNumber);

        const matchingEvents = savedEvents.filter(event => event.date === key);
        const eventsHTML = matchingEvents
            .map(ev => `<div class="event-item" data-id="${ev.id}" style="background-color: ${ev.color || '#00d2ff'};">${ev.name} (${ev.startTime}-${ev.finishTime})</div>`)
            .join("");

        days += `
        <div class="LastmonthNum" data-key="${key}">
            <div class="daysDisplay">${prevDayNumber}</div>
            <div class="DisplayCreatedEvents">${eventsHTML}</div>
        </div>`; 
    }

    // Current Month Days
    for (let i = 1; i <= totaldays; i++) {
        const key = FormatedDateKey(currentyear, monthindex, i);

        const matchingEvents = savedEvents.filter(event => event.date === key);
        const eventsHTML = matchingEvents
            .map(ev => `<div class="event-item" data-id="${ev.id}" style="background-color: ${ev.color || '#00d2ff'};">${ev.name} (${ev.startTime}-${ev.finishTime})</div>`).join("");

        days += `
        <div class="dayscard" data-key="${key}">
            <div class="daysDisplay">${i}</div>
            <div class="DisplayCreatedEvents">${eventsHTML}</div>
        </div>`; 
    }

    document.getElementById("days").innerHTML = days;
}

// Edit/Delete OR Create Event
document.getElementById("days").addEventListener("click", (e) => {
    const eventItem = e.target.closest(".event-item");
    if (eventItem) {
        activeEventId = eventItem.dataset.id;
        const editEventTask = document.getElementById("editEventTask");
        const taskname = document.getElementById("taskname");

        const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
        const currentEvent = savedEvents.find(ev => String(ev.id) === String(activeEventId));
        if (currentEvent) {
            taskname.textContent = currentEvent.name; 
        }

        editEventTask.classList.add("active");
        return;
    }

    const dayCard = e.target.closest(".dayscard, .LastmonthNum");    
    if (!dayCard) return;

    selectedDateKey = dayCard.dataset.key;
    const [year, month, day] = selectedDateKey.split('-');
    const chosenDisplay = document.getElementById("chosenDate");
    chosenDisplay.textContent = `${parseInt(month, 10)}/${parseInt(day, 10)}/${year}`;
    CreateEvent.classList.add("active");
});

// Submit New Event
document.getElementById("submitEvent").addEventListener("click", (e) => {
    e.preventDefault();
    const activity = document.getElementById("Activity");
    const sTime = document.getElementById("Start-Time");
    const fTime = document.getElementById("Finish-Time");

    if (activity.value.trim() && sTime.value && fTime.value) {
        let sHour = parseInt(sTime.value.slice(0, 2), 10);
        const sMin = sTime.value.slice(3, 5);
        let fHour = parseInt(fTime.value.slice(0, 2), 10);
        const fMin = fTime.value.slice(3, 5);

        const smeridiems = sHour >= 12 ? "PM" : "AM";
        const fmeridiems = fHour >= 12 ? "PM" : "AM";

        sHour = (sHour % 12) || 12;
        fHour = (fHour % 12) || 12;

        const forsHour = sHour.toString().padStart(2, "0");
        const forfHour = fHour.toString().padStart(2, "0");

        const formatedStartTime = `${forsHour}:${sMin} ${smeridiems}`;
        const formatedFinalTime = `${forfHour}:${fMin} ${fmeridiems}`;

        EventNoti(true);
        CreateEvent.classList.remove("active");

        const eventColorInput = document.getElementById("eventColor");
        const eventColor = eventColorInput ? eventColorInput.value : "#00d2ff";

        const UserCreatedEvent = {
            id: Date.now(),
            name: activity.value.trim(),
            date: selectedDateKey,
            startTime: formatedStartTime,
            finishTime: formatedFinalTime,
            color: eventColor
        };

        let eventsList = JSON.parse(localStorage.getItem("events")) || [];
        eventsList.push(UserCreatedEvent);
        localStorage.setItem("events", JSON.stringify(eventsList));

        MonthDisplay();

        activity.value = "";
        sTime.value = "";
        fTime.value = "";
    } else {
        EventNoti(false);
    }
});

// Edit Event Button 
document.getElementById("editEvent").addEventListener("click", () => {
    if (!activeEventId) return;

    const savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const currentEvent = savedEvents.find(ev => String(ev.id) === String(activeEventId));

    if (currentEvent) {
        document.getElementById("editActivity").value = currentEvent.name;
        document.getElementById("editStartTime").value = convert12to24(currentEvent.startTime);
        document.getElementById("editFinishTime").value = convert12to24(currentEvent.finishTime);
        document.getElementById("editColor").value = currentEvent.color || "#00d2ff";

        document.getElementById("editActionBtns").style.display = "none";
        document.getElementById("editForm").style.display = "flex";
    }
});

// Confirm Edit
document.getElementById("editForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!activeEventId){
        return;
    }

    const newActivity = document.getElementById("editActivity").value.trim();
    const sTime = document.getElementById("editStartTime").value;
    const fTime = document.getElementById("editFinishTime").value;

    if (!newActivity || !sTime || !fTime){
        return;

        }

    let sHour = parseInt(sTime.slice(0, 2), 10);
    const sMin = sTime.slice(3, 5);
    let fHour = parseInt(fTime.slice(0, 2), 10);
    const fMin = fTime.slice(3, 5);

    const smeridiems = sHour >= 12 ? "PM" : "AM";
    const fmeridiems = fHour >= 12 ? "PM" : "AM";

    sHour = (sHour % 12) || 12;
    fHour = (fHour % 12) || 12;

    const formattedStart = `${String(sHour).padStart(2, "0")}:${sMin} ${smeridiems}`;
    const formattedFinish = `${String(fHour).padStart(2, "0")}:${fMin} ${fmeridiems}`;

    let savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const newColor = document.getElementById("editColor").value;

    savedEvents = savedEvents.map(ev => {
        if (String(ev.id) === String(activeEventId)) {
            return {
                ...ev,
                name: newActivity,
                startTime: formattedStart,
                finishTime: formattedFinish,
                color: newColor
            };
        }
        return ev;
    });

    localStorage.setItem("events", JSON.stringify(savedEvents));

    MonthDisplay();
    resetEditModal();
});

// Delete Event 
document.getElementById("deleteEvent").addEventListener("click", () => {
    if (!activeEventId) return;

    let savedEvents = JSON.parse(localStorage.getItem("events")) || [];
    savedEvents = savedEvents.filter(ev => String(ev.id) !== String(activeEventId));
    localStorage.setItem("events", JSON.stringify(savedEvents));

    MonthDisplay();
    resetEditModal();
});

const CreateEvent = document.getElementById("CreateEvent");

document.getElementById("closeEvent").addEventListener("click", () => {
    CreateEvent.classList.remove("active");
});

document.getElementById("clse-btn").addEventListener("click", resetEditModal);

function resetEditModal() {
    document.getElementById("editEventTask").classList.remove("active");
    document.getElementById("editActionBtns").style.display = "flex";
    document.getElementById("editForm").style.display = "none";
    activeEventId = null;
}

// Drag Popup
function dragCreationEvent() {
    const drag = document.getElementById("drag");
    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    drag.addEventListener("mousedown", e => {
        if (e.target.id === "closeEvent") return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;

        const rect = CreateEvent.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        CreateEvent.style.transform = "none";
        CreateEvent.style.left = `${initialLeft}px`;
        CreateEvent.style.top = `${initialTop}px`;
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        CreateEvent.style.left = `${initialLeft + dx}px`;
        CreateEvent.style.top = `${initialTop + dy}px`;
    });

    document.addEventListener("mouseup", () => {
        if (isDragging) {
            isDragging = false;
            drag.style.cursor = "grab";
        }
    });
}

// Notification 
function EventNoti(vaildation) {
    const noti = document.getElementById("Noti");
    if (vaildation) {
        noti.classList.add("active");
        noti.textContent = "Event Successfully Created";
    } 
    
    else {
        noti.classList.add("active");
        noti.classList.add("error");
        noti.textContent = "Please Enter values";
    }

    setTimeout(() => {
        noti.classList.remove("active");
        noti.classList.remove("error");
    }, 3000);
}

document.getElementById("Next").addEventListener("click", function() {
    date.setMonth(date.getMonth() + 1);
    MonthDisplay();
});

document.getElementById("Previous").addEventListener("click", function() {
    date.setMonth(date.getMonth() - 1);
    MonthDisplay();
});

window.addEventListener("DOMContentLoaded", () => {
    MonthDisplay();
    dragCreationEvent();
});
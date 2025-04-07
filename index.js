document.addEventListener('DOMContentLoaded', function () {
    const menuButton = document.querySelector('.menu-button-img'); // The menu button
    const menuLinks = document.querySelector('.menu-links'); // The menu links (ul)

    // Function to handle screen resizing
    function handleResize() {
        if (window.innerWidth > 767) {
            menuLinks.style.display = 'none'; // Hide menu on large screens
            menuButton.style.display = 'none'; // Hide the hamburger menu icon
        } else {
            menuLinks.style.display = 'none'; // Hide menu on small screens by default
            menuButton.style.display = 'block'; // Show hamburger menu icon
        }
    }

    // Add click event listener to the menu button
    menuButton.addEventListener('click', function () {
        if (menuLinks.style.display === 'none' || menuLinks.style.display === '') {
            menuLinks.style.display = 'flex'; // Show the menu links
        } else {
            menuLinks.style.display = 'none'; // Hide the menu links
        }
    });

    // Call handleResize initially to set the correct state
    handleResize();

    // Add resize event listener to handle window resizing
    window.addEventListener('resize', handleResize);
});
const monthYearElement = document.getElementById('monthyear');
const datesElement = document.getElementById('dates');
const prevBtn = document.getElementById('prevbtn');
const nextBtn = document.getElementById('nextbtn');
const scheduleBtn = document.getElementById('scheduleBtn');
const calendarContainer = document.querySelector('.calender');
const doneBtn = document.getElementById('donebtn');
const formContainer = document.querySelector('.form-container');
const form = document.querySelector('.form-container form');

let currentDate = new Date();
let selectedDate = null; // Stores the selected date

const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    monthYearElement.textContent = monthYearString;

    let datesHTML = '';

    // Previous month's days (inactive)
    for (let i = firstDayIndex; i > 0; i--) {
        const prevDate = new Date(currentYear, currentMonth, 1 - i);
        datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    // Current month's days
    for (let i = 1; i <= totalDays; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
        datesHTML += `<div class="date ${activeClass}" data-date="${i}">${i}</div>`;
    }

    // Next month's days (inactive)
    for (let i = 1; i <= 6 - lastDayIndex; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    datesElement.innerHTML = datesHTML;

    // Disable "Done" button initially
    doneBtn.disabled = true;
    doneBtn.style.opacity = "0.5";

    // Add click event listener to dates
    document.querySelectorAll('.date').forEach(dateEl => {
        const selectedDay = parseInt(dateEl.dataset.date);
        const selectedFullDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), selectedDay);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time for accurate comparison
    
        if (selectedFullDate < today) {
            dateEl.classList.add('disabled'); // Visually disable past dates
            return; // Skip adding event listener
        }
    
        dateEl.addEventListener('click', () => {
            if (!dateEl.classList.contains('disabled')) { // Double check
                if (selectedDate === dateEl) {
                    dateEl.classList.remove('selected');
                    selectedDate = null;
                    doneBtn.disabled = true;
                    doneBtn.style.opacity = "0.5";
                } else {
                    if (selectedDate) selectedDate.classList.remove('selected');
                    dateEl.classList.add('selected');
                    selectedDate = dateEl;
                    doneBtn.disabled = false;
                    doneBtn.style.opacity = "1";
                }
            }
        });
    });
    
};

// Event listeners for navigating months
prevBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    updateCalendar();
});

nextBtn.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    updateCalendar();
});

// Show the calendar when "Schedule a Dental Appointment Now" is clicked
scheduleBtn.addEventListener('click', () => {
    scheduleBtn.style.display = 'none'; // Hide the schedule button
    calendarContainer.style.display = 'block'; // Show the calendar
});

// Hide the calendar and show the form when "Done" is clicked
doneBtn.addEventListener('click', () => {
    if (selectedDate) { // Ensure a date is selected before proceeding
        calendarContainer.style.display = 'none'; // Hide the calendar
        formContainer.style.display = 'block'; // Show the form
    }
});


const thankYouMessage = document.querySelector('.thank-you-message');
const okBtn = document.getElementById('okBtn');
// Initial call
updateCalendar();
// Handle form submission
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent actual form submission

    // Hide form and show custom message instead of an alert
    formContainer.style.display = 'none';
    thankYouMessage.style.display = 'block';
});


// Reset everything when "OK" is clicked
okBtn.addEventListener('click', () => {
    thankYouMessage.style.display = 'none';
    scheduleBtn.style.display = 'block';
    selectedDate = null;
    doneBtn.disabled = true;
    doneBtn.style.opacity = "0.5";
    updateCalendar(); // Refresh calendar to clear selection
});
        

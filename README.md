# to-do-list-calendar
A custom web-based event calendar and task manager application built with HTML, CSS, Vanilla JavaScript, and GitHub Pages.

# JavaScript Event Calendar & To-Do Planner
A functional, responsive web application that provides interactive month-by-month calendar navigation, custom color-tagged event management, draggable modals, smart time conversions, and persistent local storage.

## About
I built this project to deepen my understanding of core JavaScript fundamentals, state management, and complex DOM manipulation. Rather than making a basic static task list, I challenged myself to build a full calendar grid system from scratch. I solved real user-experience problems including dynamic date/month calculation logic, draggable event creation popups, custom event color tags, seamless 12-hour to 24-hour time conversions, and persistent browser storage.

## What I Learned
While building this project, I practiced:
- Managing client-side state and syncing data with browser `localStorage` to perform seamless CRUD (Create, Read, Update, Delete) operations
- Dynamically generating calendar grids by calculating total days in a month, first-day index offsets, and previous month spillover dates
- Aligning complex 7-column layouts perfectly using CSS Grid `gap: 1px` techniques to eliminate duplicate borders
- Implementing mouse event listeners (`mousedown`, `mousemove`, `mouseup`) and bounding rectangles (`getBoundingClientRect()`) to create draggable popup forms
- Working with `<input type="color">` pickers to save user color preferences and dynamically style DOM elements with inline styles
- Parsing and converting time strings between user-friendly 12-hour AM/PM formats and standard HTML5 24-hour time inputs (`input[type="time"]`)
- Utilizing Event Delegation on grid containers (`e.target.closest()`) to handle click events efficiently across dynamically created event chips

## Features
- **Dynamic Calendar Grid** — view exact calendar layouts for any month and year with automated day cell rendering and seamless column alignment
- **Full CRUD Event Management** — click any date cell to create events, view event details, update titles/times/colors, or delete tasks with instant grid updates
- **Custom Color Tagging** — pick custom colors for each event using an integrated color picker to visually categorize tasks
- **Draggable Creation Modal** — interact with a draggable event form popup that can be moved anywhere on the screen for easy editing
- **Expandable Edit & Delete Popup** — click any task chip on the calendar to open an interactive modal with options to edit event details or delete the task
- **Smart Time Conversion** — automatically handles time formatting between standard 12-hour display cards and 24-hour input forms
- **Local Storage Persistence** — saves all created events locally so tasks remain intact across page reloads and browser sessions
- **Glassmorphism UI** — features frosted-glass popups, custom gradient backgrounds, animated toast notifications, and responsive layout scaling

## Technologies Used
- HTML5
- CSS3 (CSS Grid, Flexbox, Animations)
- Vanilla JavaScript (ES6+)
- Browser `localStorage` API

## Purpose
This project is part of my journey mastering vanilla JavaScript and front-end web development. Building a fully custom calendar allowed me to sharpen my logic for date arithmetic, master complex DOM manipulation without reliance on third-party frameworks, and craft an intuitive user interface from scratch.

## Preview
![Calendar App Screenshot](<img width="1917" height="887" alt="Screenshot 2026-10-11 200233" src="https://github.com/user-attachments/assets/aa770eae-8260-4ad6-8af6-352e82ae27f3" />
)

## Live Demo
[View the Live Event Calendar](https://eliotcs.github.io/to-do-s-list-calendar-/)

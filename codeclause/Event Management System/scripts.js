// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const createEventBtn = document.getElementById('create-event-btn');
    const eventsList = document.getElementById('events-list');
    const authSection = document.getElementById('auth-section');
    const dashboardSection = document.getElementById('dashboard-section');

    authForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            authSection.style.display = 'none';
            dashboardSection.style.display = 'block';
            fetchEvents();
        } else {
            alert(data.error);
        }
    });

    createEventBtn.addEventListener('click', async () => {
        const eventName = prompt('Enter event name');
        const eventDescription = prompt('Enter event description');
        const eventDate = prompt('Enter event date (YYYY-MM-DD)');
        const response = await fetch('http://localhost:5000/api/events/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ name: eventName, description: eventDescription, date: eventDate }),
        });
        const data = await response.json();
        if (response.ok) {
            fetchEvents();
        } else {
            alert(data.error);
        }
    });

    async function fetchEvents() {
        const response = await fetch('http://localhost:5000/api/events', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const events = await response.json();
        eventsList.innerHTML = events.map(event => `<div><h3>${event.name}</h3><p>${event.description}</p><p>${new Date(event.date).toLocaleDateString()}</p></div>`).join('');
    }
});

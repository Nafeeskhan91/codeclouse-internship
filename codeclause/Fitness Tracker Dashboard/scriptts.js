// scripts.js

// Sample data
const stepsData = [5000, 10000, 12000, 8000, 15000, 11000, 13000];
const caloriesData = [2000, 2200, 2500, 2100, 2300, 2400, 2600];
const labels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Steps Chart
const stepsCtx = document.getElementById('stepsChart').getContext('2d');
const stepsChart = new Chart(stepsCtx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Steps',
            data: stepsData,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Calories Chart
const caloriesCtx = document.getElementById('caloriesChart').getContext('2d');
const caloriesChart = new Chart(caloriesCtx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: 'Calories',
            data: caloriesData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

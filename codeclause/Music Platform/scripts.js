// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const authForm = document.getElementById('auth-form');
    const uploadForm = document.getElementById('upload-form');
    const musicList = document.getElementById('music-list');
    const authSection = document.getElementById('auth-section');
    const uploadSection = document.getElementById('upload-section');
    const librarySection = document.getElementById('library-section');

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
            uploadSection.style.display = 'block';
            librarySection.style.display = 'block';
            fetchMusic();
        } else {
            alert(data.error);
        }
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const artist = document.getElementById('artist').value;
        const file = document.getElementById('file').files[0];
        const formData = new FormData();
        formData.append('title', title);
        formData.append('artist', artist);
        formData.append('file', file);
        const response = await fetch('http://localhost:5000/api/music/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: formData,
        });
        const data = await response.json();
        if (response.ok) {
            fetchMusic();
        } else {
            alert(data.error);
        }
    });

    async function fetchMusic() {
        const response = await fetch('http://localhost:5000/api/music', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const music = await response.json();
        musicList.innerHTML = music.map(m => `
            <div class="music-item">
                <h3>${m.title} by ${m.artist}</h3>
                <audio controls>
                    <source src="http://localhost:5000/${m.filePath}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
        `).join('');
    }
});

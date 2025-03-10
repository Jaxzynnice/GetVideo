// Toggle Dark Mode
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Toggle Language
const languageSelect = document.getElementById('languageSelect');
languageSelect.addEventListener('change', () => {
    const selectedLanguage = languageSelect.value;
    if (selectedLanguage === 'id') {
        window.location.href = '/id.html';
    } else {
        window.location.href = '/index.html';
    }
});

// Update Lifetime
const lifetimeElement = document.getElementById('lifetime');
function updateLifetime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    lifetimeElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateLifetime, 1000);

// Get IP Address
fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ipAddress').textContent = data.ip;
    });

// Battery Status
if ('getBattery' in navigator) {
    navigator.getBattery().then(battery => {
        const batteryStatus = document.getElementById('batteryStatus');
        batteryStatus.textContent = `${Math.floor(battery.level * 100)}%`;

        battery.addEventListener('levelchange', () => {
            batteryStatus.textContent = `${Math.floor(battery.level * 100)}%`;
        });
    });
}

// FAQ Dropdown
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Fetch Server Status
fetch('https://velyn.vercel.app/api/status')
    .then(response => response.json())
    .then(data => {
        document.getElementById('uptime').textContent = data.uptime;
        document.getElementById('totalRequests').textContent = data.totalRequests;
        document.getElementById('memoryUsage').textContent = data.memoryUsage;
        document.getElementById('diskUsage').textContent = data.diskUsage;
    });

// Paste URL
document.getElementById('pasteBtn').addEventListener('click', async () => {
    try {
        const text = await navigator.clipboard.readText();
        document.getElementById('videoUrl').value = text;
    } catch (err) {
        alert('Failed to paste URL');
    }
});

// Toggle Navbar
const navbarToggle = document.querySelector('.navbar-toggle');
const navLinks = document.querySelector('.nav-links');

navbarToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
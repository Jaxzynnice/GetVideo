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

// Update Time
const timeElement = document.getElementById('time');
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
}
setInterval(updateTime, 1000);

// Get IP Address and Country
fetch('https://ipinfo.io/json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('ipAddress').textContent = data.ip;
        document.getElementById('country').textContent = data.country;
    });

// FAQ Dropdown
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
    });
});

// Fetch Server Status
fetch('/api/status')
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

// Scroll to Top Button
const toTopBtn = document.getElementById('toTopBtn');
window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        toTopBtn.style.display = 'block';
    } else {
        toTopBtn.style.display = 'none';
    }
});

toTopBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// Animate on Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach(el => observer.observe(el));
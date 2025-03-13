document.addEventListener('DOMContentLoaded', () => {
    // Toggle Dark Mode
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            document.querySelector('.navbar').classList.toggle('dark-mode');
            themeToggle.innerHTML = document.body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // Toggle Language
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', () => {
            const selectedLanguage = languageSelect.value;
            if (selectedLanguage === 'id') {
                window.location.href = '/id.html';
            } else {
                window.location.href = '/index.html';
            }
        });
    }

    // Form Logic
    const pasteBtn = document.getElementById('pasteBtn');
    const videoUrlInput = document.getElementById('videoUrl');
    const downloadBtn = document.getElementById('downloadBtn');

    if (pasteBtn && videoUrlInput && downloadBtn) {
        pasteBtn.addEventListener('click', async () => {
            try {
                const text = await navigator.clipboard.readText();
                videoUrlInput.value = text;
                pasteBtn.innerHTML = '<i class="fas fa-times"></i> Clear';
                pasteBtn.onclick = () => {
                    videoUrlInput.value = '';
                    pasteBtn.innerHTML = '<i class="fas fa-paste"></i> Paste';
                };
            } catch (err) {
                alert('Failed to paste URL');
            }
        });

        videoUrlInput.addEventListener('input', () => {
            if (videoUrlInput.value.trim() === '') {
                downloadBtn.disabled = true;
            } else {
                downloadBtn.disabled = false;
            }
        });

        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const url = videoUrlInput.value.trim();
            if (!url.startsWith('http')) {
                alert('URL Invalid');
                return;
            }

            const supportedSites = ['youtube', 'facebook', 'instagram', 'capcut', 'spotify', 'soundcloud', 'tiktok', 'douyin', 'twitter', 'threads'];
            const isSupported = supportedSites.some(site => url.includes(site));
            if (!isSupported) {
                alert('URL Not Supported');
                return;
            }

            // Proceed with download using api.agatz.xyz
            fetch(`https://api.agatz.xyz/api/tiktok?url=${url}`)
                .then(response => response.json())
                .then(data => {
                    if (data.url) {
                        window.open(data.url, '_blank');
                    } else {
                        alert('Failed to download video');
                    }
                })
                .catch(err => {
                    alert('Failed to download video');
                });
        });
    }

    // FAQ Dropdown
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems) {
        faqItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    }

    // Update Time
    const timeElement = document.getElementById('time');
    if (timeElement) {
        function updateTime() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
        setInterval(updateTime, 1000);
    }

    // Get IP Address and Country
    const ipAddressElement = document.getElementById('ipAddress');
    const countryElement = document.getElementById('country');
    if (ipAddressElement && countryElement) {
        fetch('https://ipinfo.io/json')
            .then(response => response.json())
            .then(data => {
                ipAddressElement.textContent = data.ip;
                countryElement.textContent = data.country;
            });
    }

    // Scroll to Top Button
    const toTopBtn = document.getElementById('toTopBtn');
    if (toTopBtn) {
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
    }
});
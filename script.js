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

            // Proceed with download
            alert('Downloading...');
        });
    }

    // Other functions remain unchanged
});
const express = require('express');
const os = require('os');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/status', (req, res) => {
    const uptime = os.uptime();
    const totalMem = os.totalmem();
    const freeMem = os.freemem();
    const usedMem = totalMem - freeMem;
    const diskUsage = require('diskusage').checkSync('/');

    res.json({
        uptime: formatUptime(uptime),
        totalRequests: '12,146',
        memoryUsage: `${formatSize(usedMem)} / ${formatSize(totalMem)}`,
        diskUsage: `${formatSize(diskUsage.used)} / ${formatSize(diskUsage.total)}`
    });
});

function formatUptime(seconds) {
    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    return `${days}d ${hours}h ${minutes}m ${secs}s`;
}

function formatSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
    return (Math.round(bytes / Math.pow(1024, i) * 100) / 100) + ' ' + sizes[i];
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
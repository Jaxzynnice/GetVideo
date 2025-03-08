const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint untuk memproses URL video
app.post('/download', async (req, res) => {
    const { url } = req.body;
    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const header = () => ({
            'Content-Type': 'application/x-www-form-urlencoded',
            'authority': 'retatube.com',
            'accept': '*/*',
            'accept-language': 'id-ID,id;q=0.9',
            'hx-current-url': 'https://retatube.com/',
            'hx-request': 'true',
            'hx-target': 'aio-parse-result',
            'hx-trigger': 'search-btn',
            'origin': 'https://retatube.com',
            'referer': 'https://retatube.com/',
            'user-agent': 'Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Mobile Safari/537.36',
        });

        const response = await axios.get('https://retatube.com/api/v1/aio/index?s=retatube.com', {
            headers: header()
        });
        const $ = cheerio.load(response.data);
        const prefix = $('input[name="prefix"]').val() || 'ctmsVx0cYcXR1YmUuY29tMTc0MDI1MzYxOAO0O0OO0O0O';

        const searchResponse = await axios.post('https://retatube.com/api/v1/aio/search', `prefix=${encodeURIComponent(prefix)}&vid=${encodeURIComponent(url)}`, {
            headers: header()
        });
        const $$ = cheerio.load(searchResponse.data);

        const title = $$('#text-786685718 p').eq(0).text().replace('Title：', '').trim();
        const owner = $$('#text-786685718 p').eq(1).text().replace('Owner：', '').trim();
        const thumb = $$('.icon-inner img').attr('src');
        const video = $$('#col-1098044499 a').eq(0).attr('href');
        const audio = $$('#col-1098044499 a.custom_green_color').attr('href');

        const results = {
            title,
            owner,
            thumb,
            video,
            audio: audio || null,
        };

        res.json(results);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch video data' });
    }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

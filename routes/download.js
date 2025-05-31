const express = require('express');
const router = express.Router();
const ytdl = require('ytdl-core');
const axios = require('axios');

// YouTube downloader
router.post('/youtube', async (req, res) => {
  try {
    const { url } = req.body;
    
    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }
    
    const info = await ytdl.getInfo(url);
    const title = info.videoDetails.title;
    const thumbnail = info.videoDetails.thumbnails[info.videoDetails.thumbnails.length - 1].url;
    
    const formats = info.formats
      .filter(format => format.hasVideo && format.hasAudio)
      .map(format => ({
        quality: format.qualityLabel,
        url: format.url,
        type: format.mimeType,
        itag: format.itag
      }));
      
    res.json({ 
      success: true,
      title,
      thumbnail,
      formats 
    });
    
  } catch (error) {
    console.error('YouTube download error:', error);
    res.status(500).json({ error: 'Failed to fetch video info' });
  }
});

// Generic video downloader (placeholder for other platforms)
router.post('/generic', async (req, res) => {
  try {
    const { url } = req.body;
    
    // This is a placeholder - you would implement specific logic for other platforms
    res.json({ 
      success: true,
      title: 'Downloaded Video',
      url: url,
      message: 'This is a placeholder for other video platforms'
    });
    
  } catch (error) {
    console.error('Generic download error:', error);
    res.status(500).json({ error: 'Failed to process video URL' });
  }
});

module.exports = router;
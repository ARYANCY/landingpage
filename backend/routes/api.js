const express = require('express');
const router = express.Router();
const { sendWelcomeEmail, sendContactEmail } = require('../services/emailService');

router.get('/user', (req, res) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    res.json({ ok: true, user: req.user });
  } else {
    res.json({ ok: false, user: null });
  }
});

router.post('/user/number', async (req, res) => {
  try {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const { number } = req.body || {};
    if (number === undefined || number === null || String(number).trim() === '') {
      return res.status(400).json({ success: false, message: 'Number is required' });
    }
    const cleaned = String(number).trim();
    const valid = /^\+?[0-9]{7,15}$/.test(cleaned);
    if (!valid) {
      return res.status(400).json({ success: false, message: 'Invalid number format' });
    }
    req.user.number = cleaned;
    await req.user.save();

    return res.json({ success: true, message: 'Number saved', user: req.user });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
  }
});


router.post('/send-welcome', async (req, res) => {
  try {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const result = await sendWelcomeEmail(req.user.email, req.user.name);

    if (result.success) {
      return res.json({
        success: true,
        message: 'Welcome email sent successfully',
        previewUrl: result.previewUrl
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send email',
      error: result.error
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are required'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format'
      });
    }

    const result = await sendContactEmail(name, email, message);

    if (result.success) {
      return res.json({
        success: true,
        message: 'Contact form submitted successfully',
        previewUrl: result.previewUrl
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send contact form',
      error: result.error
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

module.exports = router;

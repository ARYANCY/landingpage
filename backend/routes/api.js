const express = require('express');
const router = express.Router();
const { sendWelcomeEmail, sendContactEmail } = require('../services/emailService');

router.get('/user', (req, res) => {
  if (req.user) {
    res.json({ ok: true, user: req.user });
  } else {
    res.json({ ok: false });
  }
});

// Send welcome email to authenticated user
router.post('/send-welcome', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authenticated' });
    }

    const result = await sendWelcomeEmail(req.user.email, req.user.name);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Welcome email sent successfully',
        previewUrl: result.previewUrl 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send email',
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

// Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and message are required' 
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid email format' 
      });
    }

    const result = await sendContactEmail(name, email, message);
    
    if (result.success) {
      res.json({ 
        success: true, 
        message: 'Contact form submitted successfully',
        previewUrl: result.previewUrl 
      });
    } else {
      res.status(500).json({ 
        success: false, 
        message: 'Failed to send contact form',
        error: result.error 
      });
    }
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: error.message 
    });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const ensureAuth = require('../middlewares/authMiddleware'); 

router.post('/', ensureAuth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const event = new Event({
      name,
      email,
      phone,
      user: req.user._id 
    });
    await event.save();
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('user', 'name email');
    res.json({ success: true, data: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('user', 'name email');
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    await event.deleteOne();
    res.json({ success: true, message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const ensureAuth = require('../middlewares/authMiddleware'); 

router.post('/', ensureAuth, async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const event = new Event({
      name,
      email,
      phone,
      user: req.user._id 
    });

    await event.save();
    res.status(201).json({ success: true, data: event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error: " + err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const events = await Event.find().populate('user', 'name email');
    res.status(200).json({ success: true, data: events });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error: " + err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('user', 'name email');
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }
    res.status(200).json({ success: true, data: event });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error: " + err.message });
  }
});


router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    if (event.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this event' });
    }

    await event.deleteOne();
    res.status(200).json({ success: true, message: 'Event deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server Error: " + err.message });
  }
});

module.exports = router;

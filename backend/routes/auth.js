const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL || ''}/login`,
    session: true
  }),
  (req, res) => res.redirect(`${process.env.CLIENT_URL}/dashboard`)
);

router.get('/logout', (req, res) => {
  req.logout(() => res.redirect(process.env.CLIENT_URL));
});

module.exports = router;

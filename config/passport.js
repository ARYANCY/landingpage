const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `${process.env.SERVER_URL}/auth/google/callback`
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const googleId = profile && profile.id ? profile.id : undefined;
    const displayName = profile && profile.displayName ? profile.displayName : '';
    const email = Array.isArray(profile?.emails) && profile.emails[0] ? profile.emails[0].value : '';
    const avatar = Array.isArray(profile?.photos) && profile.photos[0] ? profile.photos[0].value : '';

    if (!googleId) {
      return done(new Error('Missing Google ID in profile'), null);
    }

    let user = await User.findOne({ googleId });
    let isNewUser = false;
    
    if (!user) {
      user = await User.create({
        googleId,
        name: displayName,
        email,
        avatar
      });
      isNewUser = true;
    }
    
    // Send welcome email for new users
    if (isNewUser && email) {
      try {
        await sendWelcomeEmail(email, displayName);
        console.log(`Welcome email sent to new user: ${email}`);
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the login if email fails
      }
    }
    
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

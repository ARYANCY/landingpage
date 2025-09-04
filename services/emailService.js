const nodemailer = require('nodemailer');

// Create transporter using your Gmail
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS // Use App Password for Gmail
    }
  });
};

const sendEmail = async (to, subject, text, html = null) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER, // Send from your Gmail
      to,
      subject,
      text,
      html: html || text
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    return {
      success: true,
      messageId: info.messageId
    };
  } catch (error) {
    console.error('Email sending failed:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

const sendWelcomeEmail = async (userEmail, userName) => {
  const subject = 'Welcome to CodeFest 2025!';
  const text = `Hi ${userName},\n\nWelcome to CodeFest 2025! We're excited to have you join our coding community.\n\nBest regards,\nThe CodeFest Team`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Welcome to CodeFest 2025!</h2>
      <p>Hi ${userName},</p>
      <p>Welcome to CodeFest 2025! We're excited to have you join our coding community.</p>
      <p>Get ready for an amazing experience with hackathons, workshops, and competitions!</p>
      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 14px;">Best regards,<br>The CodeFest Team</p>
    </div>
  `;
  
  return await sendEmail(userEmail, subject, text, html);
};

const sendContactEmail = async (name, email, message) => {
  const subject = `Contact Form Submission from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
    </div>
  `;
  
  // Send to your Gmail
  const adminEmail = process.env.EMAIL_USER; // Send contact forms to your Gmail
  return await sendEmail(adminEmail, subject, text, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendContactEmail
};

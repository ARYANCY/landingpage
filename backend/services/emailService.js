const nodemailer = require('nodemailer');

const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendEmail = async (to, subject, text, html = null) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_USER,
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
  const text = `Hi ${userName},\n\nWelcome to CodeFest 2025! We're excited to have you join our coding community.\n\nCall us at 7002931730 if you need assistance.\n\nBest regards,\nThe CodeFest Team`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #333;">Welcome to CodeFest 2025!</h2>
      <p>Hi ${userName},</p>
      <p>Welcome to CodeFest 2025! We're thrilled to have you join our coding community. Get ready for hackathons, workshops, and competitions!</p>
      <a href="tel:7002931730" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Call Us: 7002931730</a>
      <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
      <p style="color: #666; font-size: 14px;">Best regards,<br>The CodeFest Team</p>
    </div>
  `;

  return await sendEmail(userEmail, subject, text, html);
};

const sendContactEmail = async (name, email, message) => {
  const subject = `Contact Form Submission from ${name}`;
  const text = `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nCall us at 7002931730 if needed.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
      <h2 style="color: #333;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message}</p>
      <a href="tel:7002931730" style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #4A90E2; color: white; text-decoration: none; border-radius: 6px; font-weight: bold;">Call Us: 7002931730</a>
    </div>
  `;

  const adminEmail = process.env.EMAIL_USER;
  return await sendEmail(adminEmail, subject, text, html);
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendContactEmail
};

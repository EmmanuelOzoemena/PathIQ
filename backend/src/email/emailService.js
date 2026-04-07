const nodemailer = require("nodemailer");
const { generateOTPTemplate, EMAIL_TEMPLATES, generateReEngagementTemplate } = require("./emailTemplate");
require ("dotenv").config();


// ENV CONFIG 
const EMAILUSERNAME = process.env.EMAIL_USERNAME;
const EMAILPASSWORD = process.env.EMAIL_PASSWORD;
console.log("Email Values: ", EMAILUSERNAME, EMAILPASSWORD )

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAILUSERNAME,
        pass: EMAILPASSWORD,
    },
});

// Verify transporter config
transporter.verify((error) => {
    if (error) {
        console.error('Transporter error:', error);
    } else {
        console.log('Transporter is ready to send emails');
    }
});


// Function to send an email
const sendEmail = async ({ to, subject, text, html }) => {
    try {
        await transporter.sendMail({
            from: EMAILUSERNAME,
            to,
            subject,
            text,
            html,
        });
        return true;
    } catch (error) {
        console.error(`Failed to send email to ${to}:`, error);
        return false;
    }
};

// Main function to send OTP email
const sendOTPEmail = async (email, username, type, otp, ) => { 
    const template = EMAIL_TEMPLATES[type] || EMAIL_TEMPLATES.VERIFICATION;
    
    const html = generateOTPTemplate(otp, username, type);

    const success = await sendEmail({
        to: email,
        subject: template.subject, //  using the subject from your templates file!
        html,
    });

    return success; 
};


const sendReEngagementEmail = async (email, username, topic, course) => {
    const html = generateReEngagementTemplate(username, topic, course);
    return await sendEmail({
        to: email,
        subject: "Re-Engagement: Continue Your Learning Journey",
        html,
    });
};

module.exports = { sendOTPEmail, sendReEngagementEmail };

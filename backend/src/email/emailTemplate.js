const EMAIL_TEMPLATES = {
    VERIFICATION: {
        subject: "Verify Your Account",
        title: "Welcome aboard",
        body: "Use the OTP below to verify your account:"
    },
    PASSWORD_RESET: {
        subject: "Reset Your Password",
        title: "Password Reset Request",
        body: "We received a request to reset your password. Use the code below:"
    },
    RESEND_OTP: {
        subject: "Your New OTP Code",
        title: "New OTP Requested",
        body: "Here is your new verification code:"
    }
};

const generateOTPTemplate = (otp, username, type = 'VERIFICATION') => {
    const selectedType = type.toUpperCase();
    const template = EMAIL_TEMPLATES[selectedType] || EMAIL_TEMPLATES.VERIFICATION;
    const greeting = username ? `${template.title}, ${username}!` : `${template.title}!`;

    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #4A90E2;">${greeting}</h2>
            <p>${template.body}</p>
            <div style="background: #f4f4f4; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px;">
                <span style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #222;">${otp}</span>
            </div>
            <p style="font-size: 12px; color: #666;">This OTP is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p>Thanks,<br/><strong>The Team</strong></p>
        </div>
    `;
};

const generateReEngagementTemplate = (username, topic, course) => {
    return `
        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #4A90E2;">Hi ${username}!</h2>
            <p>We noticed you haven't logged in for a while. Login to pickup from where you left off on ${course}!</p>
            <p>Here's a refresher on: <br><strong style="color: #4A90E2">${topic}</strong>!</p>
        </div>
    `;
};

module.exports = { EMAIL_TEMPLATES, generateOTPTemplate, generateReEngagementTemplate };
const crypto = require('crypto');

const generateStudentCode = () => {
    // Generates a random 12-digit unique code for students
    return crypto.randomInt(0, 1000000000000).toString().padStart(12, '0');
};

module.exports = generateStudentCode;
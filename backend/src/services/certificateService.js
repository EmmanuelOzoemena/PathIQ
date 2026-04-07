const Student = require("../models/studentModels");
const Course = require("../models/courseModels");
const crypto = require('crypto');
const { ethers } = require('ethers');



//  Connection setup to the blockchain (using ethers.js)
const provider = new ethers.JsonRpcProvider(process.env.BLOCKCHAIN_RPC_URL);

// Wallet setup
const wallet = new ethers.Wallet(process.env.BLOCKCHAIN_PRIVATE_KEY, provider);

// The Contract Details (Address + ABI)
const contractAddress = process.env.BLOCKCHAIN_CONTRACT_ADDRESS;
const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "certificateHash",
				"type": "bytes32"
			}
		],
		"name": "registerCertificate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "certificateHash",
				"type": "bytes32"
			}
		],
		"name": "verifyCertificate",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

const certificateContract = new ethers.Contract(contractAddress, contractABI, wallet);


class certificateService{
/**
 * Prepares a standardized object for hashing.
 * Consistency is key here!
 */
    async prepareCertificateData (id, courseId, certData) {
    const user = await Student.findById(id)
    const course = await Course.findById(courseId)
    return {
        studentName: user.name,
        studentEmail: user.email,
        courseTitle: course.courseTitle,
        courseCode: course.courseCode,
        issueDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
        issuer: "PathIQ"
    };
};




/**
 * Generates a Keccak256 hash using Ethers.js utilities
 * @param {Object} certData - The certificate details object
 */

async generateCertificateHash(certData) {

    // Convert the object to a consistent JSON string
    const dataString = JSON.stringify(certData);

    // Convert the string to Bytes
    const dataBytes = ethers.toUtf8Bytes(dataString);

    // Hash the bytes using Keccak256
    const hash = ethers.keccak256(dataBytes);

    return hash; 
};



// Generate a unique Certificate ID

async generateCertificateID ( courseId) {
    const course = await Course.findById(courseId)
    const prefix = "PATHIQ"; // Custom prefix for branding
    const coursCode = course.courseCode.toUpperCase(); // Include course code for uniqueness
    const randomStr = crypto.randomBytes(2).toString('hex').toUpperCase(); 
    
    return `${prefix}-${coursCode}-${randomStr}`;
};


// Send Hash to Blockchain
async sendToBlockchain(certHash) {

    try {
        console.log(`Sending Cert to the blockchain...`);

        // Calling the function on the smart contract
        const tx = await certificateContract.registerCertificate(certHash);

        // Wait for the transaction to be "mined" (confirmed)
        const receipt = await tx.wait();

        console.log("Transaction Confirmed!");
        return receipt.hash; // This is the "Transaction ID" (txHash)
    } catch (error) {
        console.error("Blockchain Error:", error);
        throw new Error("Failed to record on blockchain");
    }
};


// Main function to generate the certificate hash for a student and course
async generateCertificate(studentId, courseId) {
    const certData = await this.prepareCertificateData(studentId, courseId);
    const certHash = await this.generateCertificateHash(certData);
    const certID = await this.generateCertificateID(courseId);
    const txHash = await this.sendToBlockchain(certHash);
    const newCertificate = {
        courseId: courseId,
        hash: certHash,
        certicateNo: certID,
        txHash: txHash
    }
    await Student.findByIdAndUpdate(studentId, { $push: { certificate: newCertificate }
    });

    return certID;
}

// Get certificate
async getCertificate(studentId, courseId) {
    const student = await Student.findById(studentId).populate({
            path: 'certificate.courseId',
            select: 'courseTitle courseCode' // Only pull the fields you need
        });;

    if (!student || !student.certificate) {
        throw new Error("Student or certificates not found");
    }

    // 1. Find the specific certificate in the array
    const certificate = student.certificate.find(
        c => c.courseId._id.toString() === courseId.toString() || 
             c.courseId.toString() === courseId.toString()
    );

    if (!certificate) {
        throw new Error("Certificate for this course not found");
    }

    // Convert to a plain object to remove the hash manually
    const certObject = certificate.toObject ? certificate.toObject() : { ...certificate };
    delete certObject.hash && delete certObject.txHash; // Remove the hash so it's hidden from the frontend

    return certObject;
}


    /**
 * VERIFICATION SERVICE
 * Checks the blockchain to see if a certificate is authentic.
 */
async verifyCertificate(certId) { // Only need certId to look it up
    try {
        //  the student and the specific certificate in the array
        const studentDoc = await Student.findOne(
            { "certificate.certicateNo": certId },
            { "certificate.$": 1, "name": 1, "email": 1 } // Get the matched cert and student info
        );

        if (!studentDoc || !studentDoc.certificate || studentDoc.certificate.length === 0) {
            throw new Error("Certificate ID not found in our records.");
        }

        // Access the specific certificate from the returned array
        const certRecord = studentDoc.certificate[0];

        // RE-GENERATE THE DATA OBJECT (Must match issuance exactly!)
        const certData = {
            studentName: studentDoc.name,
            studentEmail: studentDoc.email,
            // Note: If you don't store courseTitle/Code in the cert object, 
            // you'll need to fetch the Course model here too.
            courseTitle: certRecord.courseTitle || "Unknown", 
            courseCode: certRecord.courseCode || "Unknown",
            issueDate: certRecord.issueDate, 
            issuer: "PathIQ"
        };

        // 3. Generate the local hash to compare
        const localHash = await this.generateCertificateHash(certData);

        // 4. CALL THE BLOCKCHAIN
        // Verify the function name 'verifyCertificate' matches your ABI exactly!
        const isValidOnChain = await certificateContract.verifyCertificate(certRecord.hash);

        return {
            verified: isValidOnChain,
            isDataIntegrityValid: (localHash === certRecord.hash),
            blockchainStatus: isValidOnChain ? "Authentic" : "Invalid/Not Found",
            data: certData
        };

    } catch (error) {
        console.error("Verification Error:", error);
        throw new Error(`Verification Failed: ${error.message}`);
    }
}


}
module.exports =  certificateService;
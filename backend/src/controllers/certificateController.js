
const ApiError = require("../middleware/apiError");
const apiResponse = require("../middleware/apiResponse");
const Student = require("../models/studentModels");
const certificateService = require("../services/certificateService");

const certService = new certificateService();

const generateCertificate = async (req, res, next) => {
    try {
        const { studentId, courseId } = req.params;
        const certHash = await certService.generateCertificate(studentId, courseId);
        apiResponse(res, 200, { certHash }, "Certificate generated successfully");
    } catch (err) {
        next(err);
    }
}

const getCertificate = async (req, res, next) => {
    try {
        const { studentId, courseId } = req.params;
        const result = await certService.getCertificate(studentId, courseId);
        apiResponse(res, 200, result, "sucessful")
    } catch(err) {
        next(err)
    }
}

const verifyCertificate = async (req, res, next) => {
    try {
        const { certId } = req.params; // Get ID from URL: /api/verify/PATHIQ-MTH 101-BB29

        const result = await certService.verifyCertificate(certId);

        if (result.verified) {
            apiResponse (res, 200, result, "This certificate is authentic.")
           
        } else {
            apiResponse (res, 401, null, "Warning: Certificate is not valid.")
        }
    } catch (error) {
        next(error)
    }
};

module.exports = {
    generateCertificate,
    getCertificate,
    verifyCertificate
}
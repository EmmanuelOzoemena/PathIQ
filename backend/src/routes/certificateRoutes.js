
const express = require("express");
const certificateRoute = express.Router();
const certificateController = require("../controllers/certificateController");

certificateRoute.post("/:studentId/:courseId/generate-certificate", certificateController.generateCertificate);
certificateRoute.get("/:studentId/:courseId/get-certificate", certificateController.getCertificate);
certificateRoute.post ("/:certId/verify-certificate", certificateController.verifyCertificate)

module.exports = certificateRoute;
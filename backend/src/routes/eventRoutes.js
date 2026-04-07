const express = require("express");
const eventrouter = express.Router();
const EventController = require("../controllers/EventController");
const validateEvent = require("../middleware/Zod/validateEvent");

eventrouter.post("/events", validateEvent, EventController.handleEvent);

module.exports = eventrouter;
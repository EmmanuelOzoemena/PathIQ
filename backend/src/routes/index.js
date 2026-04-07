
const express = require ('express');
const router = express.Router()
const authstudentRoute = require ('./studentRoutes');
const authguardianRoute = require ('./guardianRoutes');
const authadminRoute = require ('./adminRoutes');
const courseRoute = require('./courseRoutes');

const eventrouter = require(`./eventRoutes`);
const socialRoute = require("./socialRoutes");



const defaultRoutes = [
  {
    path: "/auth/student",
    route: authstudentRoute,
  },

  {
    path: "/auth/guardian",
    route: authguardianRoute,
  },

  {
    path: "/auth/admin",
    route: authadminRoute,
  },
  {

    path: "/student/course",
    route: courseRoute,
  },
  {
    path: "/event/grading",
    route: eventrouter
  },
  {
    path: "/oauth",
    route: require("./socialRoutes"),
  },

  {
    path: "/certificate",
    route: require("./certificateRoutes"),
  }

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;



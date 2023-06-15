const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

// Controller news

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([Course.find({}),Course.countDocuments(), Course.countDocumentsDeleted()])
      .then(([courses,courseCount, deletedCount]) =>
        res.render("me/stored-courses", {
          courseCount,
          deletedCount,
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render("me/trash-courses", {
          courses: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();

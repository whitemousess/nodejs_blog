const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

// Controller news

class MeController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    let courseQuery = Course.find({});

    if (req.query.hasOwnProperty("_sort")) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type 
      });
    }

    Promise.all([
      courseQuery,
      Course.countDocuments(),
      Course.countDocumentsDeleted(),
    ])
      .then(([courses, courseCount, deletedCount]) =>
        // res.render("me/stored-courses", {
        //   courseCount,
        //   deletedCount,
        //   courses: multipleMongooseToObject(courses),
        // })        
        res.json({
          courseCount,
          deletedCount,
          data: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }

  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        // res.render("me/trash-courses", {
        //   courses: multipleMongooseToObject(courses),
        // })
        res.json({
          data: multipleMongooseToObject(courses),
        })
      )
      .catch(next);
  }
}

module.exports = new MeController();

const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

// Controller Site

class SiteController {
  // [GET] /
  index(req, res, next ) {
    Course.find({})
      .then((courses) => {
        // res.render('home',{
        //   courses: multipleMongooseToObject(courses)
        // });
        res.json({data: multipleMongooseToObject(courses)})
      })
      .catch(next);

    // res.render('home');

  }

  // [GET] /search
  search(req, res) {
    res.render("search");
  }
}

module.exports = new SiteController();

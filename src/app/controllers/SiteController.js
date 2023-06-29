const Course = require("../models/Course");
const { multipleMongooseToObject } = require("../../util/mongoose");

// Controller Site

class SiteController {
  // [GET] /
  index(req, res, next ) {
    let params = [];
    let objWhere = {};
    params.q = req.query.q
    if(params.q !== '') objWhere.name  = new RegExp(params.q, 'i');

    Course.find(objWhere).sort({_id: -1})
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

  searchCourse(req, res, next) {
    let params = [];
    let objWhere = {};
    params.q = req.body.q
    if(params.q !== '') objWhere.name  = new RegExp(params.q, 'i');

    Course.find(objWhere).sort({_id: -1})
    .then((courses) => {
      // res.render('courses/search',{
      //   courses: multipleMongooseToObject(courses)
      // });
      res.json({data: multipleMongooseToObject(courses)})
    })
    .catch(next);

  }
}

module.exports = new SiteController();

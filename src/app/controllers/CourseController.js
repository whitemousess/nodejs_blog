const Course = require("../models/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  // [GET] /course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) =>
        res.render("courses/show", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  // [GET] /course/create
  create(req, res, next) {
    res.render("courses/create");
  }

  // [POST] /course/store
  store(req, res, next) {
    // res.json(req.body);
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => {});
  }

  // [GET] /course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        // res.render("courses/edit", { course: mongooseToObject(course) })
        res.json({data: course})
        )
      .catch(next);
  }

  // [PUT] /course/:id
  update(req,res,next){
    req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg`;
    Course.updateOne({_id: req.params.id} , req.body)
    .then((course) => {
      // res.redirect ("/me/stored/courses")
      res.json(course);
    })
    .catch(next)
  }

  // [DELETE] /course/:id
  destroy(req,res,next) {
    Course.delete({_id: req.params.id})
    .then((course) => {
      // res.redirect('back')
      res.json({data: course})
    })
    .catch(next)
  }

  // [DELETE] /course/:id/force
  forceDestroy(req,res,next) {
    Course.deleteOne({_id: req.params.id})
    .then(() => {
      res.json({data: course})
    })
    .catch(next)
  }

  // [PATCH] /course/:id/restore
  restore(req, res, next){
    Course.restore({_id: req.params.id})
    .then(() => {
      res.redirect('back')
    })
    .catch(next)
  }

  // [POST] /courses/handle-form-actions
  // used in switch case of many select
  HandleFormActions(req,res,next) {
    switch(req.body.action){
      case 'delete':
        Course.delete({_id: { $in :req.body.courseIds }})
          .then(() => {res.redirect('back')})
          .catch(next)
        break;
      case 'restore':
        Course.restore({_id: { $in :req.body.courseIds }})
          .then(() => {res.redirect('back')})
          .catch(next)
        break;
      case 'forceDestroy':
        Course.deleteMany({_id: { $in :req.body.courseIds }})
          .then(() => {res.redirect('back')})
          .catch(next)
        break;
      default:
      res.json({message: 'Action invalid'})
    }
  }
}

module.exports = new CourseController();

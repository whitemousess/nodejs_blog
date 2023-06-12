class MeController {
  // [GET] /me/stored/courses
 storedCourses(res,req){
  res.render('search')
 }

}

module.exports = new MeController();

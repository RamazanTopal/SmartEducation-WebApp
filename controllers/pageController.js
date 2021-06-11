const Course=require('../models/Course')
const User=require('../models/User')
exports.getIndexPage = async (req, res) => {
  const courses=await Course.find().sort('-createdAt').limit(2)
  const totalCourses=await Course.find().countDocuments();
  const totalStudents=await User.find().countDocuments({role:'student'});
  const totalTeachers=await User.find().countDocuments({role:'teacher'});
    res.status(200).render('index', {
      page_name: 'index',
      courses,
      totalCourses,
      totalStudents,
      totalTeachers
    });
  };
  
  exports.getAboutPage = (req, res) => {
    res.status(200).render('about', {
      page_name: 'about',
    });
  };
  
  exports.getRegisterPage = (req, res) => {
    res.status(200).render('register', {
      page_name: 'register',
    });
  };
  
  exports.getLoginPage = (req, res) => {
    res.status(200).render('login', {
      page_name: 'login',
    });
  };
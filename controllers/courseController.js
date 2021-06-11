const Course=require('../models/Course');
const Category=require('../models/Category');
const User=require('../models/User')
exports.createCourse=async (req,res)=>{
  
    try{
       await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID
      });
      req.flash("success", "We create succesfully");
        res.status(201).redirect('/courses')
    }catch(err){
      req.flash("success", "We don't create succesfully");
      res.status(400).redirect('/courses')
    }
}

exports.getAllCourses=async (req,res)=>{
    const categorySlug=req.query.categories;
    const query = req.query.search;
    const category=await Category.findOne({slug:categorySlug});
    let filter={};
    if(categorySlug){
        filter={category:category._id}
    }
    if(query) {
        filter = {name:query}
    }
    if(!query && !categorySlug) {
        filter.name = "",
        filter.category = null
    }

    const courses = await Course.find({
        $or:[
          {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
          {category: filter.category}
        ]
      }).sort('-createdAt').populate('user');
    const categories=await Category.find();
    try{
        res.render('courses',{
            courses:courses,
            categories:categories,
            page_name:'courses'
        })
    }catch(err){

    }
}

exports.getCourse=async (req,res)=>{
    const course = await Course.findOne({slug: req.params.slug}).populate('user')
    const user=await User.findById(req.session.userID);
    const categories=await Category.find();
    try{
        res.render('course',{
            course:course,
            page_name:'courses',
            user:user,
            categories:categories
        })
    }catch(err){

    }
}

exports.enrollCourse = async (req, res) => {
    try {
      const user = await User.findById(req.session.userID);
      await user.courses.push({_id:req.body.course_id});
      await user.save();
      req.flash("success", "We enroll succesfully");
      res.status(200).redirect('/users/dashboard');
    } catch (error) {
      req.flash("error", "We don't enroll succesfully");
      res.status(200).redirect('/users/dashboard');
    }
};
exports.releaseCourse = async (req, res) => {
    try {    
      const user = await User.findById(req.session.userID);
      await user.courses.pull({_id:req.body.course_id});
      await user.save();
      req.flash("success", "We release succesfully");
      res.status(200).redirect('/users/dashboard');
    } catch (error) {
      req.flash("success", "We don't release succesfully");
      res.status(200).redirect('/users/dashboard');
    }
};
exports.deleteCourse = async (req, res) => {
  try {    

    const course = await Course.findOneAndRemove({slug:req.params.slug})

    req.flash("success", `${course.name} has been removed successfully`);

    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    req.flash("error", `${course.name} has not been removed successfully`);

    res.status(200).redirect('/users/dashboard');
  }
};

exports.updateCourse = async (req, res) => {
  try {    
   
    const course = await Course.findOne({slug:req.params.slug});
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();
    req.flash("success", `${course.name} has been updated successfully`);
    res.status(200).redirect('/users/dashboard');

  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};
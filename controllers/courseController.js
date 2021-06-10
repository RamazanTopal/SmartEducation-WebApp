const Course=require('../models/Course');
const Category=require('../models/Category');

exports.createCourse=async (req,res)=>{
    const course = await Course.create({
        name: req.body.name,
        description: req.body.name,
        category: req.body.category,
        user: req.session.userID
      });
    try{
        res.status(201).redirect('/courses')
    }catch(err){

    }
}

exports.getAllCourses=async (req,res)=>{
    const categorySlug=req.query.categories;
    const category=await Category.findOne({slug:categorySlug});
    let filter={};
    if(categorySlug){
        filter={category:category._id}
    }


    const courses=await Course.find(filter);
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
    try{
        res.render('course',{
            course:course,
            page_name:'courses'
        })
    }catch(err){

    }
}
const Category=require('../models/Category');


exports.createCategory=async (req,res)=>{
    await Category.create(req.body);
    try{
        req.flash("success", "We create succesfully");
        res.redirect('/users/dashboard')
    }catch(err){
      req.flash("error", "We don't create succesfully");
      res.redirect('/users/dashboard')
    }
}

exports.deleteCategory = async (req, res) => {
    try {    
  
      await Category.findByIdAndRemove(req.params.id)
      req.flash("success", "We delete succesfully");
      res.status(200).redirect('/users/dashboard');
  
    } catch (error) {
      req.flash("error", "We don't delete succesfully");
      res.status(400).redirect('/users/dashboard');
    }
  };

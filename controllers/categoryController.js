const Category=require('../models/Category');


exports.createCategory=async (req,res)=>{
    await Category.create(req.body);
    try{
        res.status(201).send('basarili')
    }catch(err){

    }
}

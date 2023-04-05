const Product_Model = require('../models/product-Model')

exports.list_product = async(req,res)=>{
    try{
        // res.send("List Product ok:")
         const count = parseInt(req.params.count);
        console.log("count_product: ",count)
        const product = await Product_Model
                            .find()
                            .limit(count)
                            .populate('category')
                            .sort([["createdAt","desc"]])
        res.send(product)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
exports.create_product = async(req,res)=>{
    try{
        // res.send("create Product ok:")
        console.log(req.body)
        const product = await new Product_Model(req.body).save();
        res.status(201).send("Product Success")
    }catch(err){
        console.log(err)
        res.status(500).send("Create Product Error")
    }
}
exports.read_product = async(req,res)=>{
    try{

        res.send("read Product ok:")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
exports.update_product = async(req,res)=>{
    try{

        res.send("Update Product ok:")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
exports.remove_product = async(req,res)=>{
    try{
        const id = req.params.id
        const deleted = await Product_Model
        .findOneAndRemove({_id: id})
        .exec()
        res.send(deleted)
        // res.send("Remove Product ok:")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
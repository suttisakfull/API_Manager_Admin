const Category_Model = require('../models/category-Model')

exports.list_category = async (req,res) =>{
    try{
      
        // res.send("List category ok:")
        const category = await Category_Model.find({}).exec()
        res.send(category)
       

    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
    // res.send("List category")
};
exports.create_category = async (req,res) =>{
    try{
        // console.log(req.body)
        // res.send("create category ok:")
        const {name} = req.body;
        const category_check = await Category_Model.findOne({name});
        if(category_check){
            return res.status(409).send("category already exist.");
        }
        const category = await new Category_Model({name}).save()
        res.status(201).send("Category success")

    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
    // res.send("create category")
};
exports.read_category = async (req,res) =>{

    try{
   
        // res.send("read category ok:")
        const id = req.params.id;
        const category = await Category_Model.findOne({_id:id});
        res.send(category)
       

    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
    // res.send("read category")
};
exports.update_category = async (req,res) =>{
   try{
    //  res.send("update category")
    // console.log("Data_id:",id)
    // console.log("Data_name:", req.body)
    const id = req.params.id
    const {name} = req.body;
  
    const category = await Category_Model.findOneAndUpdate(
        {
           _id:id
        },{
            name:name
        });
    res.send(category);

   }catch(err){
    console.log(err)
    res.status(500).send(err)
   }
   // res.send("update category")
   
};
exports.remove_category = async (req,res) =>{

    try{
        const id = req.params.id
        const category = await Category_Model.findByIdAndDelete({_id:id})
        res.send(category);
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
    // res.send("remove category")
};

exports.pagination_page_category = async(req,res) =>{
    try{
        const page = parseInt(req.params.page)-1
        const limit = parseInt(req.params.limit)

        const category = await Category_Model.find({

        }) 
            .select({})
            .skip(page*limit)
            .limit(limit)
            .exec();
        if(!category){
            return res.status(500).json({ message: "Internal Server Error" });
        }else{
            Category_Model.countDocuments({

            }).exec((err,count)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.status(200).send({category: category, total: count})
                }
            })
        }

    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }

}
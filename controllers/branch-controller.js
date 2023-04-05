const Branch_Model = require('../models/branch-Model')



exports.list_branch = async(req,res)=>{
    try{

        // res.send("list branch ok:")
        const branch = await Branch_Model.find({}).exec()
        res.send(branch)
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
exports.create_branch = async(req,res)=>{
    try{
        // res.send("create branch ok:")
        const branch = await new Branch_Model(req.body).save();
        res.status(201).send("create branch success:")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
exports.read_branch = async(req,res)=>{
    try{

        res.send("read branch ok:")
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}
exports.update_branch = async(req,res)=>{
    try{
        //  res.send("Update branch ok:")
        const id = req.params.id
        const {name,ba,code} = req.body;
        console.log("id: ",id)
        console.log("req:",req.body)
        const branch = await Branch_Model.findOneAndUpdate(
            {
               _id:id
            },{
                name:name,
                ba:ba,
                code:code
            });
        res.send(branch);


    }catch(err){
        console.log(err)
        res.status(500).send(err)
        
    }
}
exports.Remove_branch = async(req,res)=>{
    try{
        // res.send("Remove branch ok:")
        const id = req.params.id
        const branch = await Branch_Model.findByIdAndDelete({_id:id})
        res.send(branch);
    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }
}


exports.pagination_page_branch = async(req,res) =>{
    try{
        const page = parseInt(req.params.page)-1
        const limit = parseInt(req.params.limit)

        const branch = await Branch_Model.find({

        }) 
            .select({})
            .skip(page*limit)
            .limit(limit)
            .exec();
        if(!branch){
            return res.status(500).json({ message: "Internal Server Error" });
        }else{
            Branch_Model.countDocuments({

            }).exec((err,count)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.status(200).send({branch: branch, total: count})
                }
            })
        }

    }catch(err){
        console.log(err)
        res.status(500).send(err)
    }

}
const Device_Model = require('../models/device-Model')

exports.list_device = async (req, res) => {
    try {

        // res.send("list device ok:")
        const device = await Device_Model
            .find({})
            .select(['title'])
            .populate([
                {
                    path: 'branch',
                    model: 'Branch',
                    // match:{"ba": 1226},
                    select: ['name', 'ba', 'code'],   //Data show
                },
                {
                    path: 'category',
                    model: 'Category',
                    select: ['name']
                }
            ])

        //  .exec((err, data) =>{
        //     console.log(data)
        //  })
        //==============================
        // .exec((err, data) => {
        //     // Will have post.author populated
        //     if (!err) console.log(data);
        //     process.exit(0);
        // });


        //===========================
        // .populate(['branch','category'])
        // .exec((err,order) => {
        //      if(err) throw err;
        //      if(order){
        //         console.log("A: ",order.branch.name);
        //         console.log("B: ",order.category.name);
        //      }
        // })

        res.send(device)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.read_device = async (req, res) => {
    try {

        res.send("read device ok:")
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.create_device = async (req, res) => {
    try {

        // res.send("create device ok:")
        const device = await new Device_Model(req.body).save();
        res.status(201).send("create Device success:")

    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.update_device = async (req, res) => {
    try {

        res.send("update device ok:")
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}
exports.remove_device = async (req, res) => {
    try {

        res.send("remove device ok:")
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

//=================Function Search =============
const handleCategory = async (req, res, category) => {
    let Device = await Device_Model
        .find({category})
        .select(['title'])
        .populate([
            {
                path: 'category',
                model: 'Category',
                select: ['name']
            },
            {
                path: 'branch',
                model: 'Branch',
                // match:{"ba": 1226},
                select: ['name', 'ba', 'code'],   //Data show
            }

        ])
    res.send(Device)
}

const handleBranch = async (req, res, branch) => {
    let Device = await Device_Model
        .find({branch})
        .select(['title'])
        .populate([
            {
                path: 'branch',
                model: 'Branch',
                // match:{"ba": 1226},
                select: ['name', 'ba', 'code'],   //Data show
            },
            {
                path: 'category',
                model: 'Category',
                select: ['name']
            }
        ])
    res.send(Device)
}

exports.searchFilters = async (req, res) => {

    const { category,branch } = req.body
    if (category) {
        console.log("category: ", category)
        await handleCategory(req, res, category);
    }
    if (branch) {
        console.log("branch: ", branch)
        await handleBranch(req, res, branch);
    }


}
const User_Model = require('../models/user-Model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

//====================== Authen Controller ================//

exports.register = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        // console.log("Data register: ", username, password)
        // console.log("ENV: ", process.env.TOKEN_KEY)
        // let users;

        if (!username && username.trim() == "" && !password && password.length > 6) {
            return res.status(400).send("All input is required:")
        }
        //check user already 
        const oldUser = await User_Model.findOne({ username });
        if (oldUser) {
            return res.status(409).send("User already exist.");
        }
        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10)
        // Create user in our database

        // Payload
        const payload = {
            user: {
                user_id: User_Model._id, username
            }
        }
        console.log("Data: ", payload)
        // Create token

        const token = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            {
                expiresIn: "2h"
            }
        );
        const users = await User_Model.create({
            username,
            password: encryptedPassword,
            token: token,

        });
        const userRegistrationInfo = {
            username: users.username,
            verified: users.verified,
        };

        return res.status(201).send("Register Success");

    } catch (err) {
        return next(err);
    }
};
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        // console.log("Data register: ", username, password)
        // console.log("ENV: ", process.env.TOKEN_KEY)
        if (!(username && password)) {
            return res.status(400).send({ result: true, data: "All input is required" })
        }

        var user = await User_Model.findOneAndUpdate({ username }, { new: true });

        if (user) {
            if (!user.status) {
                return res.status(401).send('Please Call Admin User Status Disable ')
            } else {
                const isMatch = await bcrypt.compare(password, user.password)
                if (!isMatch) {
                    return res.status(401).send('Password Invalid')
                }
                const payload = {
                    user: {
                        user_id: user._id,
                        username: user.username,
                        roles: user.roles
                    }
                }
                jwt.sign(payload,
                    process.env.TOKEN_KEY,
                    {
                        expiresIn: "2h"
                    }, (err, token) => {
                        if (err) throw err;
                        //    res.json({token,payload})
                        // console.log("Token_payload: ", token,payload);
                        const userloginationInfo = {
                            username: user.username,
                            accessToken: token,
                            refeshToken: payload
                        };
                        //  res.status(201).json(userloginationInfo)
                        // console.log("Data: ",userloginationInfo)
                        return res.status(201).json({
                            message: "Login Success",
                            // data: userloginationInfo
                            token: token,
                            payload: payload
                        });
                    }
                );


            }


        } else {
            return res.status(401).send('User Not Found')
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
    // try{

    //     console.log("++++++++ Login +++++++++")

    // }catch(err){
    //     return next(err);
    // }

};
exports.currentUser = async (req, res) => {
    try {
        console.log('currentUser:', req.user)
        const user = await User_Model.findOne({ user: req.user.username })
            .select('-password')
            .exec();
        res.send(user);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error !!!")
    }
};
exports.currentAdmin = async (req, res) => {
    console.log('currentUser:', req.user)
    User_Model.findOne({ user: req.user.username })
        .select('-password')
        .exec((err, user) => {
            if (err) throw err;
            //   console.log("Data::",user)
            res.json(user)
        })
};

//====================== CRUD Controller ================//

exports.list_users = async (req, res) => {
    let users;
    try {
        users = await User_Model.find({}).select('-password').exec();
        if (!users) {
            return res.status(500).json({ message: "Internal Server Error" });
        } else {
            // return res.status(200).json({users})
            return res.status(200).send(users)
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
};
exports.read_users = async (req, res) => {
    const id = req.params.id;
    let users;
    try {
        users = await User_Model.findById(id);
        if (!users) {
            return res.status(404).json({ message: "Unable to find user with this ID:" });
        } else {
            return res.status(200).json({ users })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.update_users = async (req, res) => {

    try {
        console.log("Modal: ", req.body.values.password)
        const { id, password } = req.body.values
        // Encrypt user password
        const enPassword = await bcrypt.hash(password, 10)
        console.log(":::", enPassword);

        const user = await User_Model.findOneAndUpdate(
            { _id: id },
            { password: enPassword }
        )

     if(!user){
            return res.status(500).json({message: "Unable to save users"});
           }else{
            return res.status(200).json({message: "Successfully Update "})
           }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.delete_users = async (req, res) => {
    const id = req.params.id;
    let users;
    try {
        users = await User_Model.findByIdAndRemove(id);
        if (!users) {
            return res.status(500).json({ message: "Unable to delete users" });
        } else {
            return res.status(200).json({ message: "Successfully Delete" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.change_status_users = async (req, res) => {
    try {
        //    console.log(req.body)
        const user = await User_Model.findOneAndUpdate(
            { _id: req.body.id },
            { status: req.body.status }
        )
        //     console.log("===== change_status: ===== ");
        //     console.log("user:",user.username,"status:",user.status)
        // res.send(user)
        if (user) {
            console.log("===== change_status: ===== ");
            res.json(
                {
                    user: user.username,
                    status: user.status
                }
            )
        } else {
            res.json({ user: 'false' })
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}
exports.change_roles_users = async (req, res) => {
    try {
        console.log(req.body)
        const user = await User_Model.findOneAndUpdate(
            { _id: req.body.id },
            { roles: req.body.roles }
        )
        console.log("===== change_roles: ===== ");
        res.send(user)

        // if(user){
        //     console.log("===== change_status: ===== ");
        //   res.json(
        //                  { 
        //                    user: user.username,
        //                    status: user.roles
        //                  }
        //          )
        // }else{
        //     res.json({ user: 'false'})
        // }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}
exports.pagination_page_users = async (req,res) =>{
    try {
        //  console.log("::", req.params)
        const page = parseInt(req.params.page)-1
        const limit = parseInt(req.params.limit)
        users = await User_Model.find({
                            //  rols: {$in: ['ADMIN']}
                        })
                        .select({password:0,token:0})
                        .skip(page*limit)
                        .limit(limit)
                        .exec();
        if (!users) {
            return res.status(500).json({ message: "Internal Server Error" });
        } else {
            // return res.status(200).json({users})
            User_Model.countDocuments({
                // rols: {$in: ['ADMIN']}
            }).exec((err,count)=>{
                if(err){
                    console.log(err);
                }else{
                    return res.status(200).send({users: users, total: count})
                }

            })
            // return res.status(200).send(users)
        }


    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}
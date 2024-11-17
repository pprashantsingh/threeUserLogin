let registerModel = require('../model/register')
let bcrypt = require('bcryptjs')


const register = async function(req,res){
    console.log(req.body,"register user")
    const {name,email,password} = req.body
    let hashpassword = await bcrypt.hash(password,10)
    console.log(hashpassword,"hashpassword")
try {
    let data = new registerModel({
        email:email,
        name:name,
        password:hashpassword
    })
    await data.save()
    return res.status(200).json({msg:"succefully user  register"})
} catch (error) {
    return res.status(400).json({msg:"Error registring User",error})
}

   
}

module.exports = {register}
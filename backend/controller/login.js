const register = require('../model/register')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const session = require('../model/session')

async function cleanupExpiredSession(userId) {
    console.log("heck functio call")
    let existSession = await session.find({ userId: userId })
    if (existSession) {
        try {
            for (let data of existSession) {
                console.log(data.token, "data")
                try {
                    let decode = jwt.verify(data.token, "jhdfkjshdfk66kkj")
                    console.log(decode, "decode")
                } catch (error) {
                    await session.deleteOne({ userId: userId })
                }
            }
        } catch (error) {
            console.log(error, "error")
        }
    }
}

const Login = async function (req, res) {
    console.log(req.body, "khfkjgh")
    const existUser = await register.findOne({ email: req.body.email })
    console.log(existUser, "check usr")
    if (existUser) {
        let compairePass = await bcrypt.compare(req.body.password, existUser.password)
        // console.log(existsession.length, "check no of length")
        let val = await cleanupExpiredSession(existUser._id)
        console.log(val, "ndnsdbanbdmansbdmansbdmansbdmansdbamnsdbamsdm")
        let existsession = await session.find({ userId: existUser._id })
        if (!compairePass) {
            res.status(401).send({
                msg: "wrong username and password"
            })
        }

        if (existsession.length >= 3) {
            console.log("check user no.")
            res.status(200).send({ msg: "Already logged in on three devices" })
        }
        else {
            let token = jwt.sign({ _id: existUser._id }, "jhdfkjshdfk66kkj", { expiresIn: '120s' })
            let data = {
                userId: existUser._id,
                token: token
            }
            await session.create(data)
            // .then(() => { console.log("session save successfully") }).catch(err => {
            //     console.log(err, ':error saving session')
            // })
            res.status(200).send({
                token: token,
                userId: existUser._id,
                msg: "login successfully"
            })
        }

    }
    else {
        res.status(401).send({
            msg: "unauthorised access"
        })
    }
}

const Logout = async function (req, res) {
    console.log(req.body, "hgjhghgjhgh")
    await session.deleteOne({ userId: req.body.userId, token: req.body.token })
    res.status(200).send({
        msg: "logout successfully"
    })
}

module.exports = { Login, Logout }
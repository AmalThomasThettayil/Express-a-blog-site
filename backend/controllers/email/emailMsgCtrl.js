const expressAsyncHandler = require('express-async-handler');
const sgMail = require("@sendgrid/mail");
const EmailMsg = require('../../model/EmailMessaging/EmailMessaging');
const Filter = require("bad-words")

const sendEmailMsgCtrl = expressAsyncHandler(async (req, res) => {
    const { to, subject, message } = req.body
    //get the message
    const emailMessage = subject + '' + message
    console.log(emailMessage)
    try {
        // build up msg
        const msg = {
            to,
            subject,
            text: message,
            from: 'amal.thms@gmail.com'
        }
        // // //send message
        // await sgMail.send(msg)
        // //save to our db
        // await EmailMsg.create({
        //     sentBy: req?.user?._id,
        //     from: req?.user?.email,
        //     to,
        //     message,
        //     subject,
        // });
        res.json("Mail send")
    } catch (error) {
        res.json(error)
    }
})
module.exports = { sendEmailMsgCtrl };

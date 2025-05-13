const UserSchema = require('../model/UserSchema');
const bcrypt = require('bcrypt');
const {hash} = require("bcrypt");
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const secret = process.env.SECRET;

const transporter = nodemailer.createTransport({
    host:process.env.EMAIL_HOST,
    port:process.env.EMAIL_PORT,
    secure:false,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

})

const signup = async (req, res) => {

    console.log('Request body:', req.body);

    try {

        const existingUser = await UserSchema.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hash = await bcrypt.hash(req.body.password,10)

        let userSchema = new UserSchema({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash
        });
        await userSchema.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Account creation successful',
            text: `account created successfully for ${req.body.fullName}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json({message: 'User created successfully'});

    } catch (e) {
        return res.status(500).json({message: 'something went wrong', error: e});
    }
}

const login = async (req, res) => {

    console.log('Request body:', req.body);

    try {

        const existingUser = await UserSchema.findOne({ email: req.body.email });

        if (!existingUser) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Hash the password before saving
        const isConfirmed = await bcrypt.compare(req.body.password,existingUser.password)

        if (!isConfirmed) {
            return res.status(401).json({ message: 'password is wrong ...' });
        }

        const token = jwt.sign({userId:existingUser._id,email:existingUser.email,fullName:existingUser.fullName},
            secret,
            {expiresIn:'5h'},
            (err,token) => {
                if (err) {
                    return res.status(500).json({message: 'something went wrong', error: err});
                }
                return res.status(200).json({
                    message: 'User logged in successfully',
                    token: token
                });
            }
        )

        let userSchema = new UserSchema({
            fullName: req.body.fullName,
            email: req.body.email,
            password: hash
        });
        userSchema.save()
            .then(result => res.status(201).json({
                message: 'User created successfully',
            }))
            .catch((error) => {
                return res.status(500).json({message: 'something went wrong', error: error});
            });
    } catch (e) {
        return res.status(500).json({message: 'something went wrong', error: e});
    }
}

module.exports = {
    signup,
    login
}
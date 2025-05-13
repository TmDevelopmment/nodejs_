const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/logout' , (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout failed' });
        }
        res.redirect('/');
    });
});

router.get('/google/callback', passport.authenticate('google'),(req, res) => {
    // Successful authentication, redirect home.
    res.redirect('profile');
});

module.exports = router;

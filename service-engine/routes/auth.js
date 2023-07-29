const express = require('express');
const router = express.Router();
const {getFirestoreDB} = require('../modules/firebase/admin.js');

router.post('/signup', async (req, res) => {
    let data = req.body
    try {
        const db = getFirestoreDB()
        const usersRef = db.collection('users').doc(data.email)
        usersRef.get()
            .then(async (docSnapshot) => {
                if (docSnapshot.exists) {
                    res.status(304).json({
                        status: 'unmodified',
                        response: 'User exists'
                    })
                    return 0
                } else {
                    const ret = await usersRef.set({
                        email: data.email,
                        username: data.username,
                        password: data.password,
                    });
                    res.status(200).json({
                        status: 'success',
                        response: ret
                    })
                }
            });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: error
        })
    }
});

router.post('/login', async (req, res) => {
    let data = req.body;
    try {
        const db = getFirestoreDB()
        const usersRef = db.collection('users').doc(data.email)
        usersRef.get()
            .then(async (docSnapshot) => {
                if (docSnapshot.exists) {
                    if (data.password === docSnapshot.get('password')) {
                        res.status(200).json({
                            status: 'success',
                            response: 'User logged in'
                        })
                    } else {
                        res.status(401).json({
                            status: 'failed',
                            response: 'Unauthorized'
                        })
                        return 0
                    }
                } else {
                    res.json({
                        status: 'failed',
                        response: `User doesn't exist`
                    })
                    return 0
                }
            });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            error: error
        })
    }
});
module.exports = router;

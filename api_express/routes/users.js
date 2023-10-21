const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')

let router = express.Router()

router.get('', (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
})

router.get('/:id', (req, res) => {
    let userId = parseInt(req.params.id)
    if (!userId) {
        return res.status(400).json({ message: 'Missing parameter' })
    }
    User.findOne({ where: { id: userId }, raw: true })
        .then(user => {
            if (user === null) {
                return res.status(404).json({ message: 'This user does not exist' })
            }
            return res.json({ data: user })
        })
        .catch(err => res.status(500).json({ message: "Database error", error: err }))

})

router.put('', async (req, res) => {
    try {
        const { prenom, nom, email, password } = req.body;

        if (!prenom || !nom || !email || !password) {
            return res.status(400).json({ message: 'Missing Data' });
        }
        const existingUser = await User.findOne({ where: { email: email }, raw: true });
        if (existingUser) {
            return res.status(409).json({ message: `The email ${email} is already registered` });
        }

        const hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND));

        req.body.password = hash;
        const newUser = await User.create(req.body);

        res.json({ message: 'User created', data: newUser });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Missing email or password' });
        }

        const user = await User.findOne({ where: { email: email } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.json({ message: 'User signed in', data: user });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


// router.put('', (req, res) => {
//     const { prenom, nom, email, password } = req.body
//     if (!prenom || !nom || !email || !password) {
//         res.status(400).json({ message: `Missing Data,${prenom}, ${nom}` })
//     }
//     User.findOne({ where: { email: email }, raw: true })
//         .then(user => {
//             if (user !== null) {
//                 res.status(409).json({ message: `The ${email} already exists` })
//             }

//             bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_ROUND))
//                 .then(hash => {
//                     req.body.password = hash
//                     User.create(req.body)
//                         .then(user => res.json({ message: 'User created', data: user }))
//                         .catch(err => res.status(500).json({ message: "Database error", error: err }))
//                 })
//                 .catch(err => res.status(500).json({ message: "Hash Process Error", error: err }))
//         })
//         .catch(err => res.status(500).json({ message: "Database error", error: err }))
// })

// router.patch('/:id', (req, res) => {
//     let userId = parseInt(req.params.id)
//     if (!userId) {
//         res.status(400).json({ message: 'Missing parameter' })
//     }
//     User.findOne({ where: { id: userId }, raw: true })
//         .then(user => {
//             if (user === null) {
//                 return res.status(404).json({ message: 'This user does not exist' })
//             }
//             User.update(req.body, { where: {id: userId}})
//             .then(user => res.json({ message: 'User updated'}))
//             .catch(err => res.status(500).json({ message: "Database Error", error: err }))
//         })
//         .catch(err => res.status(500).json({ message: "Database Error", error: err }))

// })

// router.delete('/:id', (req, res) => {
//     let userId = parseInt(req.params.id)
//     if (!userId) {
//         return res.status(400).json({ message: 'Missing parameter' })
//     }
//     User.destroy({ where: {id: userId}, force: true})
//         .then(() => res.status(204).json({}))
//         .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
// })

module.exports = router
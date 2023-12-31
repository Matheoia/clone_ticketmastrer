const express = require('express');
const Place = require('../models/place');

let router = express.Router();

router.get('', (req, res) => {
    Place.findAll()
        .then(places => res.json({ data: places }))
        .catch(err => res.status(500).json({ message: "Database error", error: err }))
})

router.post('/taken', (req, res) => {

    try {

    const { game, section } = req.body;

    if (!game || !section) {
        return res.status(400).json({ message: 'Missing Data' });
    }

    Place.findAll({ where: { game: game, section: section} })
        .then(places => {
            // if (!places || places.length === 0) {
            //     return res.status(404).json({ message: 'No places taken yet' });
            // }
            res.json({ message: 'There are some places taken', data: places });
        })
        // .catch(err => res.status(500).json({ message: "Database error", error: err }));
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})



router.put('', async (req, res) => {
    try {
        const { user_email, game, section, place } = req.body;

        if (!user_email || !game || !section || !place) {
            return res.status(400).json({ message: 'Missing Data' });
        }
        const seatTaken = await Place.findOne({ where: { game: game, section: section, place: place }, raw: true });
        if (seatTaken) {
            return res.status(409).json({ message: `This seat is taken` });
        }

        const newPlace = await Place.create(req.body);

        res.json({ message: 'Place created', data: newPlace });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.post('/search', async (req, res) => {
    try {
        const { user_email } = req.body;

        if (!user_email) {
            return res.status(400).json({ message: 'Missing email' });
        }

        Place.findAll({ where: { user_email: user_email } })
            .then(places => {
                if (!places || places.length === 0) {
                    return res.status(404).json({ message: 'No places yet' });
                }

                res.json({ message: 'There are some places', data: places });
            })
            .catch(err => res.status(500).json({ message: "Database error", error: err }));


    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', err: error });
    }
});


router.delete('/', (req, res) => {

    const { user_email, game, section, place } = req.body;

    if (!user_email || !game || !section || !place) {
        return res.status(400).json({ message: 'Missing Data' });
    }

    Place.destroy({ where: { game: game, section: section, place: place }, force: true })
        .then(() => res.status(204).json({}))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
})


module.exports = router;
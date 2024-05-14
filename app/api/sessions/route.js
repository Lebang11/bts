const Router = require('express');
const router = Router();
const db = require('../../../database/index');


router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

router.get('/', async (req, res) => {
    db.query('SELECT * FROM sessions;', (err, results) => {
        if (err) {
            res.status(400);
            res.send('Error fetching sessions: ' + err.message )
        }
        res.status(200).json(results.rows);
    });
})

router.post('/', async (req, res) => {
    const studentID = req.body.studentID;
    const evaluatorID = req.body.evaluatorID;
    const criteria1 = req.body.criteria1;
    const criteria2 = req.body.criteria2;     
    const criteria3 = req.body.criteria3;     
    const criteria4 = req.body.criteria4;     
    const criteria5 = req.body.criteria5;     



    values
    db.query('SELECT * FROM sessions;', (err, results) => {
        if (err) {
            res.status(400);
            res.send('Error fetching sessions: ' + err.message )
        }
        res.status(200).json(results.rows);
    });
})

module.exports = router;
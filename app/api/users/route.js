const Router = require('express');
const router = Router();
const db = require('../../../database/index');
const { hashPassword } = require('../../../utils/helpers');




router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

router.get('/', async (req, res) => {
    db.query('SELECT * FROM users;', (err, results) => {
        if (err) {
            res.status(400);
            res.send('Error fetching students: ' + err.message )
        }
        res.status(200).json(results.rows);
    })
})

router.post('/', async (req, res) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const phone = req.body.phone;
    const role = req.body.role;
    const password = await hashPassword(req.body.password);

    const userValues = [
        name, surname, email, phone, role, password
    ]
    const gradesValues = [
        0
    ]

    var userResult = await db.query('INSERT INTO users (name, surname, email, phone, role, password) VALUES($1, $2, $3, $4, $5, $6)  RETURNING id;', userValues);
    const userID = userResult.rows[0].id;
    console.log('Created user!' + userID)

    
    if (role == "evaluator") {
        var evaluatorResult = await db.query(`INSERT INTO evaluators (user_id) VALUES (${userID})  RETURNING id;`);
        const evaluatorID = evaluatorResult.rows[0].id;
        console.log('Created evaluator!' + evaluatorID);
        
    } else {
        var gradesResult = await db.query('INSERT INTO grades (total_score) VALUES($1)  RETURNING id;', gradesValues);
        const gradesID = gradesResult.rows[0].id;
        console.log('Created grades!' + gradesID)
    

        var studentResult = await db.query(`INSERT INTO students (user_id, grades_id) VALUES (${userID}, ${gradesID})  RETURNING id;`);
        const studentID = studentResult.rows[0].id;
        console.log('Created student!' + studentID);

    }
    

    res.status(201).send(`${name} ${surname} joined the party!`);

});
module.exports = router;
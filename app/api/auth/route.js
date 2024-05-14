const Router = require('express');
const router = Router();
const db = require('../../../database/index');
const { comparePassword } = require('../../../utils/helpers');




router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

router.get('/', async (req, res) => {
    db.query('SELECT * FROM users;', (err, results) => {
        if (err) {
            res.status(400);
            res.send('Error fetching users: ' + err.message )
        }
        res.status(200).json(results.rows);
    })
})

router.post('/login', async (req, res) => {
    const email = req.body.email;
	const password = req.body.password;

	function getEmail(email) {
		return new Promise(function(resolve, reject) {
			db.query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email], (err, data) => {
				if (err) {
					console.log('Error fetching email from database')
					return reject(err)};
				
				console.log('Email fetched from database: ' + email)
				resolve(data.rows[0]);
			});
		});
	}

	const data = await getEmail(req.body.email);

	if (!data) {
		console.log("Email not found on Database")
		res.status(401);
		res.json({"error": "Email not found"})
		return;
	} 

	const isValid = await comparePassword(password, data.password)
	
	if (!isValid) {
		console.log('Incorrect password from '+ email)
		res.status(401);
		res.json({"error": "Incorrect Password"})
		return;
	} else {
		res.status(200);
		console.log(`Successful Log in: ${req.body.email}`)
		res.json(data);
	}


});
module.exports = router;
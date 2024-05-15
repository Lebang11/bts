const Router = require('express');
const router = Router();
const db = require('../../../database/index');
const { hashPassword } = require('../../../utils/helpers');
import { NextResponse } from 'next/server';




router.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
  });

export async function GET() {
    const data = await db.query('SELECT * FROM users;');

    
    return Response.json(data.rows, {
        status:200
    });
};

export async function POST(req) {
    const body = await req.json();

    const name =body.name;
    const surname =body.surname;
    const email =body.email;
    const phone =body.phone;
    const role =body.role;
    const password = await hashPassword(body.password);

    const userValues = [
        name, surname, email, phone, role, password
    ]
    const gradesValues = [
        0
    ]

    const users = await db.query('SELECT * FROM users;');
    let userExists = false;
    users.rows.map((user) => {
        if (user.email === email) {
            console.log('Account with email already exists');
            userExists = true;
        } 
    })

    if (userExists) {
        return Response.json({error: "User already exists with that email"}, {
            status:406
        })
    }

    


    var userResult = await db.query('INSERT INTO users (name, surname, email, phone, role, password) VALUES($1, $2, $3, $4, $5, $6)  RETURNING *;', userValues);
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
    
    console.log(`${name} ${surname} joined the party!`)
    return Response.json(userResult.rows[0], {
        status:201
    })
};

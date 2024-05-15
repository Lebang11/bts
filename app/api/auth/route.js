import { NextResponse } from 'next/server';

const Router = require('express');
const router = Router();
const db = require('../../../database/index');
const { comparePassword } = require('../../../utils/helpers');
const { NextApiRequest, NextApiResponse } = require('next');

export async function GET(request) {
    const res = new NextResponse();
    const data = await db.query('SELECT * FROM users;');
    return Response.json(data.rows, {
            status: 200
         })
}

export async function POST(req) {
    const body = await req.json();

    const email = body.email;
    const password = body.password;

    function getEmail(email) {
        return new Promise(function(resolve, reject) {
            db.query("SELECT * FROM users WHERE email = $1 LIMIT 1;", [email], (err, data) => {
                if (err) {
                    console.log('Error fetching email from database')
                    return reject(err)};
                
                console.log('Email fetched from database: ' + email)
                resolve(data.rows[0]);
            });
        });
    }

    const data = await getEmail(body.email);

    if (!data) {
        console.log("Email not found on Database")
        
        return Response.json({error:'Email not found'}, {
            status: 401
        });
    } 

    const isValid = await comparePassword(password, data.password)
    
    if (!isValid) {
        console.log('Incorrect password from '+ email)

        return Response.json({error:'Incorrect Password'}, {
            status: 401
        });
    } else {
        console.log(`Successful Log in: ${email}`)
        return Response.json(data, {
            status: 200
        })
    }
}

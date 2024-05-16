const db = require('../../../database/index');


export async function GET(req) {
    const data = await db.query('SELECT * FROM sessions;');
    return Response.json(data, {
        status:200
    });

}

export async function POST(req) {
    const body = await req.json();
    const studentEmail = body.studentEmail;
    const evaluatorEmail = body.evaluatorEmail;
    const criteria1 = body.criteria1;
    const criteria2 = body.criteria2;     
    const criteria3 = body.criteria3;     
    const criteria4 = body.criteria4;     
    const criteria5 = body.criteria5; 
    
    var studentResult = await db.query('SELECT * FROM users WHERE email = $1;', [studentEmail]);
    var evaluatorResult = await db.query('SELECT * FROM users WHERE email = $1;', [evaluatorEmail]);
    console.log('Found student and evaluator emails')

    console.log(studentResult.rows);


    var student = await db.query('SELECT * FROM students WHERE user_id = $1;', [studentResult.rows[0].id]);
    var evaluator = await db.query('SELECT * FROM evaluators WHERE user_id = $1;', [evaluatorResult.rows[0].id]);
    console.log('Found student and evaluator ID');

    console.log(student.rows);
    console.log(evaluator.rows);
    const sessionValues = [
        student.rows[0].grades_id,
        student.rows[0].id,
        evaluator.rows[0].id,
        criteria1,
        criteria2,
        criteria3,
        criteria4,
        criteria5
    ];

    console.log(sessionValues);

    var sessionResult = await db.query('INSERT INTO sessions (grades_id, student_id, evaluator_id, criteria1, criteria2, criteria3, criteria4, criteria5) VALUES($1, $2, $3, $4, $5, $6, $7, $8)  RETURNING *;', sessionValues);

    console.log('Session created successfully')
    return Response.json(sessionResult, {
        status: 201
    })
}
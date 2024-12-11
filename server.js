const express = require('express')
const app = express()
const b = express.urlencoded({ extended: true })

var Students = [
    { id: 0, firstName: 'salah', lastName: 'biyoud', speciality: 'devlopper .net' },
    { id: 1, firstName: 'nak', lastName: 'nado', speciality: 'devlopper Php' },
    { id: 2, firstName: 'Mehdi', lastName: 'bidaw', speciality: 'IPP' },
    { id: 3, firstName: 'Hamith', lastName: 'nak', speciality: 'OP' },
]

app.get('/', (req, res) => {
    res.send('Home Page');
});

app.get('/students', (req, res) => {
    res.send(Students);
});

app.get('/student/:id', (req, res) => {
    let newStudent = Students.find(student => student.id === req.params.id);
    if (newStudent) {
        res.send(newStudent);
    } else {
        res.send("We don't have this student");
    }
});

app.delete('/student/delete/:id', (req, res) => {
    let student = Students.find(student => student.id === req.params.id);
    let positionStudent = Students.indexOf(student);
    Students.splice(positionStudent, 1);
    res.send(Students);
});



app.post('/student/addstudent', (req, res) => {
    let newStudent = {
        id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        speciality: req.body.speciality
    };

    Students.push(newStudent);
    res.send(Students);
});
app.post('/student/update/:id', (req, res) => {
    let student = Students.find(student => student.id === req.params.id);

    if (student) {
        student.firstName = req.body.firstName;
        student.lastName = req.body.lastName;
        student.speciality = req.body.speciality;

        res.send(student);
    } else {
        res.status(404).send("Student not found");
    }
});

app.listen(3000, () => console.log('server run on port 3000'))
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Student = require('./models/Students'); 

const app = express();

// DATABASE CONNECTION
mongoose.connect('mongodb://127.0.0.1:27017/collegeDB')
    .then(() => console.log("✅ Prestige Database Synced with MongoDB Compass"))
    .catch(err => console.error("❌ DB Connection Error:", err));

// SETTINGS & MIDDLEWARE
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => res.render('index'));
app.get('/about', (req, res) => res.render('about'));
app.get('/admissions', (req, res) => res.render('admissions'));
app.get('/contact', (req, res) => res.render('contact'));
app.get('/registration', (req, res) => res.render('registration'));

// COURSES ROUTE - This sends the 'departments' and 'courses' variables to the EJS
app.get('/courses', (req, res) => {
    const departments = [
        { id: 'all', name: 'All Departments' },
        { id: 'cse', name: 'Computer Science' },
        { id: 'me', name: 'Mechanical' }
    ];

    const coursesList = [
        { 
            name: 'B.Tech Computer Science', 
            shortName: 'CSE', 
            department: 'cse', 
            description: 'Focus on software development, AI, and Cloud Computing.',
            duration: '4 Years', 
            seats: 120,
            icon: 'cpu',
            color: 'bg-primary',
            bgLight: '#f0f7ff'
        },
        { 
            name: 'B.Tech Mechanical Engineering', 
            shortName: 'ME', 
            department: 'me', 
            description: 'Study of thermodynamics, robotics, and manufacturing.',
            duration: '4 Years', 
            seats: 60,
            icon: 'settings',
            color: 'bg-danger',
            bgLight: '#fff5f5'
        }
    ];

    res.render('courses', { 
        departments: departments, 
        courses: coursesList 
    });
});

app.get('/faculty', (req, res) => {
    const departments = [ {id:'cse', name:'CSE'}, {id:'me', name:'Mechanical'} ];
    const facultyData = [ 
        {name: "Dr. Arpit Shah", designation: "HOD", department: "cse", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"} 
    ];
    res.render('faculty', { facultyData, departments });
});

app.post('/add-student', async (req, res) => {
    try {
        const newApplication = new Student(req.body);
        await newApplication.save();
        res.redirect('/admin'); 
    } catch (err) {
        res.status(400).send("Registration Error: " + err.message);
    }
});

app.get('/admin', async (req, res) => {
    try {
        const students = await Student.find({}).sort({ appliedAt: -1 });
        res.render('admin', { students });
    } catch (err) {
        res.status(500).send("Admin Panel Error");
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        res.status(500).send("Delete Failed");
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
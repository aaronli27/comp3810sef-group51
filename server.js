/* 
Controllers - express modules
-----------------------------
express-formiddable: https://www.npmjs.com/package/express-formidable
- express-formidable can basically parse form types, including application/x-www-form-urlencoded, application/json, and multipart/form-data.
-----------------------------
fs/promises: https://nodejs.org/zh-tw/learn/manipulating-files/reading-files-with-nodejs
-----------------------------
*/
const express = require('express');
const app = express();
const fs = require('node:fs/promises');
const formidable = require('express-formidable'); 
const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['your-secret-key-here'],
    maxAge: 24 * 60 * 60 * 1000
}));
app.use(formidable());

/* Model - mongodb modules
mongodb ^6.9: https://www.npmjs.com/package/mongodb
*/
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const url = 'mongodb+srv://Aaronli:Aaron@cluster0.fwfuo0a.mongodb.net/';  
const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const dbName = 'project_PTM';

const usersCollection = "users";
const taskCollection = "tasks";

app.set('view engine', 'ejs');

const initializeDatabase = async (db) => {
    // Create indexes
    await db.collection(tasksCollection).createIndex({ username: 1, dueDate: -1 });
    await db.collection(tasksCollection).createIndex({ username: 1, status: 1 });
    await db.collection(tasksCollection).createIndex({ username: 1, priority: 1 });
    await db.collection(usersCollection).createIndex({ username: 1 }, { unique: true });
    await db.collection(usersCollection).createIndex({ email: 1 }, { unique: true });


     const existingUsers = await db.collection(usersCollection).find({}).toArray();
    if (existingUsers.length === 0) {
        const predefinedUsers = [
            {
                username: "Ken",
                email: "Ken@live.hkmu.edu.hk",
                password: "Ken123",
            },
            {
                username: "John", 
                email: "John@live.hkmu.edu.hk",
                password: "John123",
            },
            {
                username: "Mary",
                email: "Mary@live.hkmu.edu.hk", 
                password: "Mary123",
            }
        ];
        
        await db.collection(usersCollection).insertMany(predefinedUsers);
    }

    const authenticateUser = async (req, res, next) => {
    try {
        if (req.session.user) {
            req.user = req.session.user;
            return next();
        }
        
        await client.connect();
        const db = client.db(dbName);
        
        const { username, password } = req.fields || req.query || {};
        
        if (!username || !password) {
            return res.status(200).render('login', { 
                error: null
            });
        }
        
        const user = await db.collection(usersCollection).findOne({ username, password });
        
        if (user) {
            req.session.user = {
                username: user.username,
                email: user.email
            };
            req.user = req.session.user;
            next();
        } else {
            res.status(200).render('login', { 
                error: "Invalid username or password" 
            });
        }
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(500).render('error', { message: "Authentication failed" });
    }
};

const insertDocument = async (db, collectionName, doc) => {
    const collection = db.collection(collectionName);
    const results = await collection.insertOne(doc);
    return results;
};

const findDocument = async (db, collectionName, criteria) => {
    const collection = db.collection(collectionName);
    const findResults = await collection.find(criteria).toArray();
    return findResults;
};

const updateDocument = async (db, collectionName, criteria, updateDoc) => {
    const collection = db.collection(collectionName);
    const updateResults = await collection.updateOne(criteria, {$set : updateDoc});
    return updateResults;
};

const deleteDocument = async (db, collectionName, criteria) => {
    const collection = db.collection(collectionName);
    const deleteResults = await collection.deleteOne(criteria);
    return deleteResults;
};

app.get('/', (req, res) => {
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.status(200).render('login', { 
        error: null,
    });
});

app.post('/login', authenticateUser, (req, res) => {
    res.redirect('/tasks');
});

app.get('/signup', (req, res) => {
    res.status(200).render('signup', { 
        error: null,
        user: null
    });
});

app.post('/signup', async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        
        const { username, email, password, confirmPassword } = req.fields;
        
        // Validation
        if (!username || !email || !password || !confirmPassword) {
            return res.status(200).render('signup', { 
                error: "All fields are required"
            });
        }
        
        if (password !== confirmPassword) {
            return res.status(200).render('signup', { 
                error: "Passwords do not match"
            });
        }
        
        if (password.length < 6) {
            return res.status(200).render('signup', { 
                error: "Password must be at least 6 characters"
            });
        }
        
        // Check if user already exists
        const existingUser = await db.collection(usersCollection).findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });
        
        if (existingUser) {
            return res.status(200).render('signup', { 
                error: "Username or email already exists",
            });
        }
        
        // Create new user
        const newUser = {
            username: username,
            email: email,
            password: password,
            createdAt: new Date()
        };
        
        const result = await insertDocument(db, usersCollection, newUser);

        req.session = null;
        res.redirect('/login');
        
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).render('error', { message: "Signup failed" });
    } finally {
        await client.close();
    }
});

app.get('/logout', (req, res) => {
    req.session = null;
    res.redirect('/login');
});

app.get('/tasks', authenticateUser, async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        
        // Get ALL tasks for this user
        const criteria = { username: req.user.username };
        const tasks = await findDocument(db, tasksCollection, criteria);
        
        res.status(200).render('tasks', { 
            user: req.user,
            tasks: tasks  // Show all task data
        });
    } catch (error) {
        console.error("Tasks error:", error);
        res.status(500).render('error', { message: "Failed to load tasks" });
    } finally {
        await client.close();
    }
});

app.get('/tasks/create', authenticateUser, (req, res) => {
    res.status(200).render('create', { user: req.user });
});

app.post('/tasks/create', authenticateUser, async (req, res) => {
    try {
        await client.connect();
        const db = client.db(dbName);
        
        const newTask = {
            title: req.fields.title,
            description: req.fields.description,
            priority: req.fields.priority,                 //    the level of importance 
            status: req.fields.status || 'To Do',              //    doing,done or ready to do
            dueDate: new Date(req.fields.dueDate),                //     When need or finish it
            category: req.fields.category,                        //      what type of tasks? (work,things to buy)     
            estimatedHours: parseFloat(req.fields.estimatedHours) || 0,         // need how many time to do
            actualHours: 0,            // like 
            createdAt: new Date(),
            username: req.user.username
        };
        
        await insertDocument(db, tasksCollection, newTask);
        res.redirect('/tasks');
    } catch (error) {
        console.error("Create task error:", error);
        res.status(500).render('error', { message: "Failed to create task" });
    } finally {
        await client.close();
    }
});


const PORT = process.env.PORT || 8099;

client.connect().then(async () => {
    const db = client.db(dbName);
    await initializeDatabase(db);
    console.log("Database initialized successfully");
    
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error("Failed to start server:", error);
    process.exit(1);
});


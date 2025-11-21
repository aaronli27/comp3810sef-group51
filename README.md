# Personal Task Manager (Group 51)
**Course:** COMP 3810SEF

**Group Number:** 51

## 1. Project Information
**Project Topic:** Personal Task Manager

An Express.js-based web application that allows user to manage their daily tasks with priorities, categories and due dates. The system supports user authentication and full CRUD operations via both a Web UI and RESTful APIs.

**Group Members:**
* **Student Name 1:** Ngan Chiu Ki (SID: 14226245)


---

## 2. Project File Introduction

The project follows the MVC structure:

* **`server.js`**: The main entry part of the application. It handles:
     * Database connection
     * Express server configuration and middleware
     * Route handling for Login/Signup and Task CRUD operations.
     * RESTful API endpoints implementation.
* **`package.json`**: List the project dependencies:
     * `express`: Web framework
     * `ejs`: Template engine for rendering views
     * `mongodb`: Driver to connect to the MongoDB database
     * `cookie-session`: Handles user authentication sessions
     * `express-formidable`: Parses form data and JSON requests
* **`views/`**: Contain EJS templates for the User Interface:
     * `login.ejs` / `signup.ejs`: Authentication page
     * `tasks.ejs`: The main dashboard displaying the lisy of tasks
     * `create.ejs`: Form ro add new tasks (Create).
     * `error.ejs`: Error display page

---

## 3. Cloud Deployment 

The application is deployed and running on the cloud
**Cloud Server URL:** [https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net](https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net)

---

## 4. Operation Guides

### A. Web UI

User must log in to access the task management features.

**1. Login / Sign Up**
* Open the Cloud URL
* **Sign Up:** Click "Sign up here" to create a new account
* **Login:** You can use your created account or one of the pre-defined test accounts:
    * *Username:* `Ken` / *Password:* `Ken123`
    * *Username:* `John` / *Password:* `John123`

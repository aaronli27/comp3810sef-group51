# Personal Task Manager (Group 51)
**Course:** COMP 3810SEF

**Group Number:** 51

## 1. Project Information
**Project Topic:** Personal Task Manager

An Express.js-based web application that allows user to manage their daily tasks with priorities, categories and due dates. The system supports user authentication and full CRUD operations via both a Web UI and RESTful APIs.

**Group Members:**
* **Student Name:** Ngan Chiu Ki (SID: 14226245)
* **Student Name:** Cheung Cho Kin (SID: 14225979)
* **Student Name:**
* **Student Name:**
* **Student Name:** Ho Yiu Cho Jan (SID: 14112868)


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

**2. Manage Tasks (CRUD)**
* **Create:** Click the `+ Add New Task` link. Fill in the Title, Description, Priority (Low/Medium/High), Status, Due Date and Category. Click "Create Task"
* **Read:**
* **Delete/Update:**
* **Logout:** Click the "Logout" link at the top of the page to end the session

---

### B. RESTful CRUD Services (API Testing)

The server provides public RESTful APIs for managing tasks without session authentication. These can be tested using `CURL` commands in a terminal

**URL:** 'https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net'

#### 1. READ: GET 
* **Method:** `GET`
* **Path:** `/api/tasks`
* **Command:**
    ```bash
    curl -X GET [https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks](https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks)
    ```

#### 2. CREATE: Add a new task
* **Method:** `POST`
* **Path:** `/api/tasks`
* **Command**
    ```bash
    curl -X POST [https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks](https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks) \
    -H "Content-Type: application/json" \
    -d '{"title: "API Demo Task", "description": "Testing from CURL", "priority": "High", "status:" "In Progress", "username": "User"}'
    ```

#### 3. UPDATE: Modify an existing task
* **Method:** `PUT`
* **Path:** `/api/tasks/<TASK_ID>`
* **Command**
    ```bash
    curl -X POST [https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks](https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks) <PASTE_YOUR_ID_HERE>\
    -H "Content-Type: application/json" \
    -d '{"status": "Completed", "description": "Updated status via API"}'
    ```

#### 4. DELETE: Remove a task
* **Method:** `DELETE`
* **Path:** `/api/tasks/<TASK_ID>`
* **Note:** Replace `<TASK_ID>` with the actual `_id` string
* **Command:**
    ```bash
    curl -X DELETE [https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks](https://ptm-group51-akcvcmgwe8e8aah7.germanywestcentral-01.azurewebsites.net/api/tasks/) <PASTE_YOUR_TASK_ID_HERE>
    ```

---

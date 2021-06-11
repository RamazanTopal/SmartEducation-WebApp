# Smart Education Web Application

## About the project
This project was inspired by the udemy site.
There are 3 user roles in this application.
1. Student role:
   Student role can only enroll or exit the course registered
2. Teacher role:
   With the role of teacher, we create, delete or update courses.
3. Admin role:
   With the admin role, we can delete the student or teacher we want from the courses.
   We can also add and delete categories belonging to the courses with the admin role.
## Built With
- Uses Express as the application Framework.
- Manages Sessions using express-session package.
- Passwords are hashed using bcrypt-nodejs package.
- Uses MongoDB, Mongoose .
- We use method-override package for update and delete
- We use flash package for warn users
## Installation
Make sure you have Node.js and npm installed.
 1. Clone or Download the repository
    ```
    git clone https://github.com/RamazanTopal/SmartEducation-WebApp.git
    cd SmartEducation-WebApp
    ```
 2. Install Dependencies
    ```
      npm install
    ```
 3. Start the application
    - To run both frontend and backend server together run : 
     ```
      npm start
    ```
 Your app should now be running on localhost:3000.
## License
Built under MIT license.
  - Version: 1.0.0
  - License: MIT
  - Author: Ramazan Topal

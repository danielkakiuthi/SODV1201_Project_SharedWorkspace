# SODV1201_Project_SharedWorkspace
Course Project of SODV1201 (Introduction to Web Programming)

# Instalation
run `npm install` to install **node_modules** from **package.json**

# Run Code
run `node server.js` to run the node server.

Code should be using port number 3000.

Open the Browser and open `http://localhost:3000` to go to the starting landing page of the project.

If it is the first time that your are running the project, make sure that there are no **.json** files in your **data** folder. This folder will store all the objects or list of objects that will be created when running the program, so even if you restart the server, its previous state should be loaded back the next time  that you run `node server.js` again.


# Using the App
The structure of the App has two distinct types of users: **owners** and **coworkers**, each one with it's own login page. As each type of user has it's own functionalities, you should create one user for each if you want to test functionalities from both types.

**owners** can view|create|edit|delete its own properties, view|create|edit|delete its own workspaces.

**coworkers** can view a list of all available workspaces to rent, and view a list of all workspaces that were rented by himself.
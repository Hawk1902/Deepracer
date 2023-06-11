Deepracer
Description

Deepracer is a cloud-based web application that provides a comprehensive, high-resolution interface for Deepracer training and events. This unified interface offers a combination of high-resolution views and training diagnostics, all designed to exploit the capabilities of the Global Operations Visualization (GOV) Lab's 40-megapixel tiled display wall at RMIT City Campus.

The user interface, created with React.js, features a leaderboard displaying racers' names and the times taken for their Deepracer models to complete races. There's also a section equipped with a form for Deepracer event participants to upload pertinent files (Training CSV, Evaluation CSV, Evaluation Log, Model Name, Fastest Completion Time). Upon hitting the 'Submit' button, this data is sent to the backend, powered by Node.js.

The backend processes this data using a Python script, generating various diagnostic graphs and storing them in the filesystem. This script performs a detailed analysis of process or simulation data provided in CSV format. It generates various plots visualizing different aspects of the data. These include a scatter plot of waypoint crash locations, a color-coded scatter plot of rewards by waypoint, and visualizations of car trajectories and attributes over time. The script utilizes ipywidgets to create an interactive interface for uploading and selecting data files. Furthermore, the script groups and analyses evaluation logs by 'stream', providing a detailed breakdown of each episode. Plots are color-coded to highlight different attributes, such as speed and reward. The script ultimately generates a comprehensive set of visualizations, saved as images, providing insights into the process or simulation being analysed. When participants click on their names on the leaderboard, a request is sent to the backend to retrieve these image files. The images are then displayed on the frontend, providing participants with visual feedback on their performance.

Installation Instructions
Prerequisites
Node.js installed in your system
A code editor (like Visual Studio Code, Sublime Text, Atom etc.)
Steps to Run the Application
Clone the repository to your local machine.
Open the project in your preferred code editor.
Run npm install in the terminal. This will install all the required dependencies for both the frontend and the backend of the application.
To start the frontend server, run npm start.
For the backend, again run npm install and then start the server by running node [filename].

Note: Replace [filename] with the actual main file name for your node.js application.

Usage

To use the Deepracer application:

For frontend:

``HOST=0.0.0.0 npm run start``

``/`` will get you to the leaderboard page. It displays the racers' names and their Deepracer models' completion times. To view your performance graphs on respective pages (below), simply click on your name in the leaderboard.

``/score`` will get you to the score entry page. It will ask for input parameters (Training CSV, Evaluation CSV, Evaluation Log, Model Name, Fastest Completion Time). Upon submission, changes will be reflected on the leaderboard page.

For backend:

``npm run start``


# Workout Buddy
*A Full Stack database-enabled Web Application using **HTML/CSS/JS** and **Node.js/SQLite**. Workout buddy is a web app built to help people design and keep track of workouts. It enables users to create custom workout routines, keep track of progress during a workout and finally, see how much time they spend on workouts.* <br><br>



## Technical Achievements
- **Workout timer**: I customized and incorporated a timer script designed by Daniel Hug (link in scripts/scripts2.js) as part of the app to give the users an ability to track their workout times. The user could also stop and reset the timer. The reset button would also reset the workout progress of the user. 
- **Workout finish alert**: In order to let the user know that they finished their workout, I wrote a simple script to keep track of how many exercises were marked off as "completed" by the user and presented their final "workout time" when all exercises were finished.
- **Two Tab Web App**: Utilized a simple navbar to create two seperate tabs within the web app. One page was for adding new exercises, editing old ones and deleting exercises (if needed), while the other was the "workout tab" where users would keep track of progress.
- **DOM Navigation**: Based on the concepts covered in class, I utilized the idea of navigating through the DOM tree to manipulate certain elements (script2.js line 29, 65)

## Design/Evaluation Achievements
- **Progress Tracking**: I designed a checkbox system in the workout tab so users could keep track of their progress during a workout. This was done to increase the usability of the app.
- **Visual Feedback**: While testing the app (at the gym, during my own workout) I realized that while the checkboxes (mentioned above) were helpful, they did not stimulate any motivational emotions due to the lack of visual feedback about what exercises were completed and what was still left. Based on this, I also designed a few functions to give visual feedback (change of row color) to the user upon marking an exercise as "finished". This was done to add a motivational factor to the app.
- **Use of sidebar for the form**: For this application, I tried to minimize the visual clutter on the main screen by incorporating a sidebar which would statically hold the input form (main screen) and timer (workout screen).

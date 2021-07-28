// init, or what we need to build the results page to begin with
var workout_arr = [];
window.onload = function () {
    read();
}

// save, encode user form input as JSON and call update
document.getElementById('save').addEventListener('click', function(evt) {
    var workout = {};
    workout.id = document.getElementById('id').value;
    workout.exercise = document.getElementById('exercise').value;
    workout.sets = document.getElementById('sets').value;
    workout.reps = document.getElementById('reps').value;
    if(workout.id == ''){
        create( workout );   
    } else{
        update(workout)
    }
    document.getElementById("myForm").reset();
    event.preventDefault();
});

// reads all data from server, and calls build
function read() {
    var request = new XMLHttpRequest();
    request.open('GET', '/read');
    request.responseType = 'json';
    request.onload = function() {
        console.log(request.response)
        workout_arr = request.response;
        build( workout_arr );
    };
    request.send();
}

// builds an html string by looping through movies, adds to #results
function build( workout_arr ) {
  // https://wesbos.com/template-strings-html/
  var results_html = `${
    workout_arr.map(workout =>
      `
       <tr id=${workout.id}>
        <td>${workout.exercise}</td>
        <td>${workout.sets}</td>
        <td>${workout.reps}</td>
        <td><button id="edit_${workout.id}" class="edit_btn" onclick="move_row('${workout.id}')"> Edit </button></td>
        <td><button id="delete_${workout.id}" class="edit_btn" onclick="delete_row('${workout.id}')"> Delete </button></td>
       </tr>
      `
    ).join('')
  }`
  document.getElementById('results').innerHTML = results_html;
}

// moves a row from results to the form, for user editing
function move_row(id) {
    workout_current = workout_arr.filter( function(d){ return d.id === id; } )[0];
    document.getElementById('id').value = workout_current.id;
    document.getElementById('exercise').value = workout_current.exercise;
    document.getElementById('sets').value = workout_current.sets;
    document.getElementById('reps').value = workout_current.reps;
}

// moves a row from results to the form, for user editing
function delete_row(id) {
    workout_current = workout_arr.filter( function(d){ return d.id === id; } )[0];
    del(workout_current)
    document.getElementById("myForm").reset();
}

// updates specific line on the server, based on user input
function update( workout ) {
    var request = new XMLHttpRequest();
    request.open('PUT', '/update');
    request.responseType = 'text';
    request.onload = function() { console.log('done!'); read(); }
    request.send( JSON.stringify(workout) );
}
// TODO
function create(workout) {
    var request = new XMLHttpRequest();
    request.open('PUT', '/create');
    request.responseType = 'text';
    request.onload = function() { console.log('done!'); read(); }
    request.send( JSON.stringify(workout) );
}
// TODO
function del(workout) {
    var request = new XMLHttpRequest();
    request.open('PUT', '/del');
    request.responseType = 'text';
    request.onload = function() { console.log('done!'); read(); }
    request.send( JSON.stringify(workout) );
}
// TO


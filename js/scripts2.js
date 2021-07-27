// init, or what we need to build the results page to begin with
var workout_arr = [];
var finished = 0;
read();


/*// save, encode user form input as JSON and call update
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
});*/

function addtoev() {
    var chks = document.getElementsByTagName("input");
    finished = chks.length
    for (i = 0; i < chks.length; i++) {
        chks[i].addEventListener("click", function(evt) {
        var id = evt.path[2].id;
        var checked = evt.path[0].checked
        if(checked == true){
            finished -= 1
            console.log(finished)
        }else{
            finished += 1
        }
        change_color(id, checked)
        if(finished == 0){
            clearTimeout(t);
            alert("Congrats, you finished your workout in:" + timerLabel.textContent + "!")
        }
        });
        //console.log(evt.path[0].checked); });
    }
    
}

function change_color(id, checked) {
    workout_current = workout_arr.filter( function(d){ return d.id === id; } )[0];
    if(checked == true){
        document.getElementById(id).style.background= "#6B8E23"
    } else{
        document.getElementById(id).style.background= "#99A6B1";
    }
    
    //console.log(workout_current, checked)
}

window.addEventListener("load",function() {
    addtoev();
});

function reset_colors(){
    var trs = document.getElementsByTagName("tr");
    for (i = 1; i < trs.length; i++) {
        document.getElementById(trs[i].id).style.background= "#99A6B1";
    }
    
    var chks = document.getElementsByTagName("input");
    for (i = 0; i < chks.length; i++) {
        chks[i].checked = false;
    }
}


// reads all data from server, and calls build
function read() {
    var request = new XMLHttpRequest();
    request.open('GET', '/read');
    request.responseType = 'json';
    request.onload = function() {
        //console.log(request.response)
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
        <td><input type="checkbox" name="done"></td>
       </tr>
      `
    ).join('')
  }`
  document.getElementById('results').innerHTML = results_html;
}

// TIMER JS
// Credits: Daniel Hug: https://jsfiddle.net/Daniel_Hug/pvk6p/
var timerLabel = document.getElementById('timer'),
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    clear = document.getElementById('clear'),
    seconds = 0, minutes = 0, hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    timerLabel.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}


/* Start button */
start.onclick = timer;

/* Stop button */
stop.onclick = function() {
    clearTimeout(t);
}

/* Clear button */
clear.onclick = function() {
    timerLabel.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    clearTimeout(t);
    reset_colors();
    var chks = document.getElementsByTagName("input");
    finished = chks.length
}
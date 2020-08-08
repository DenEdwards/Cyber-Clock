var background = document.getElementById("background");
var start = document.getElementById("start");
var stop_btn = document.getElementById("stop");
var resume = document.getElementById("resume");
var reset = document.getElementById("reset");
var t;
var pt;
var minutes = 0;
var seconds = 0;
var hours = 0;
var sessions;
var pomo_sec;
var pomo_min;
var break_flag = true;
var flag = false;
var snd = new Audio("ping.mp3");


//clock
function displayTime(){
    let date = new Date();

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let day = days[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();
    let month = months[date.getMonth()];
    let numDay = date.getDate();
    let year = date.getFullYear();

    document.getElementById("clock_day").innerText = day;
    document.getElementById("clock_time").innerText = hours+" : "+minutes+" : "+seconds;
    document.getElementById("clock_year").innerText = month+" "+numDay+", "+year;
}

//Start the timer
function startTimer(){
        seconds++;
        if(seconds === 60){
            minutes++;
            seconds = 0;
        }
        if(minutes === 60){
            hours++;
            minutes = 0;
        }
        document.getElementById("timer").innerText =(hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        time();
}

function time(){
    start.style.display = "none";
    stop_btn.style.display = "block";
    resume.style.display = "none";
    reset.style.display = "block";
    t = setTimeout(startTimer, 1000)
}

/* Stop button */
stop_btn.onclick = function() {
    resume.style.display = "block";
    clearTimeout(t);
}

/* Resume button */
resume.onclick = function() {
    time();
}

/* Reset button */
reset.onclick = function() {
    start.style.display = "block";
    stop_btn.style.display = "none";
    resume.style.display = "none";
    reset.style.display = "none";
    clearTimeout(t);
    document.getElementById("timer").innerText = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}

//Start the Pomo timer////////////////////////////////////
function startPomoTimer(){
    
    pomo_sec--;
    if(pomo_sec === -1){
        pomo_min--;
        pomo_sec = 59;
    }
    if(pomo_min === -1){
        sessions--;

        if(break_flag){
            snd.play();
            alert("This Session is Done!")
            alert("Time For a Break!");
            pomo_sec = 59;
            pomo_min = 4;
            sessions++;
            break_flag = false;
        }else{
            snd.play();
            alert("Your Break's Done!")
            pomo_sec = 59;
            pomo_min = 24;
            break_flag = true;
        }
    }
    if(sessions === 0){
        pomo_sec = 0;
        pomo_min = 0;
        document.getElementById("pom_timer").innerText =(pomo_min ? (pomo_min > 9 ? pomo_min : "0" + pomo_min) : "00") + ":" + (pomo_sec ? (pomo_sec > 9 ? pomo_sec : "0" + pomo_sec) : "00");
        document.getElementById("pom_session").innerText = "Session: "+sessions;
        snd.play();
        alert("You're Finished!")
        flag = false;
        return;
    }else{
        document.getElementById("pom_timer").innerText =(pomo_min ? (pomo_min > 9 ? pomo_min : "0" + pomo_min) : "00") + ":" + (pomo_sec ? (pomo_sec > 9 ? pomo_sec : "0" + pomo_sec) : "00");
        document.getElementById("pom_session").innerText = "Sessions: "+sessions;
        pomoStart();
    }
}

//Pomodoro
function pomoStart(){
    document.getElementById("pom_timer").style.display = "block";
    document.getElementById("pom_session").style.display = "block";
    document.getElementById("input_label").style.display = "none";
    document.getElementById("input").style.display = "none";
    document.getElementById("pomo").style.display = "none";
    if(!flag){
        sessions = document.getElementById("input").value;
        pomo_sec = 59;
        pomo_min = 24;
        flag =true;
    }
    pt = setTimeout(startPomoTimer, 1000)
}

//Matrix Background
var ctx = background.getContext("2d");

//Make the canvas cover the window
background.height = window.innerHeight-50;
background.width = window.innerWidth;

//List of characters
var matrix = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
//Make the string single characters
matrix = matrix.split("");

var font_size = 13;
//Number of columns for the characters coming down
var columns = background.width/font_size; 
//An array of char
var char = [];
//x coordinate
//1 = y co-ordinate of the drop(same for the every one for the first drop)
for(var x = 0; x < columns; x++){
    char[x] = 1; 
}

//Drawing the characters
function draw()
{
    //translucent BG to show trail
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, background.width, background.height);

    //Green text
    ctx.fillStyle = "#00FF41";
    ctx.font = font_size + "px arial";
    //looping over char
    for(var i = 0; i < char.length; i++)
    {
        //a random  character to print
        var text = matrix[Math.floor(Math.random()*matrix.length)];
        ctx.fillText(text, i*font_size, char[i]*font_size);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the char scattered on the Y axis
        if(char[i]*font_size > background.height && Math.random() > 0.975)
            char[i] = 0;

        //incrementing Y coordinate
        char[i]++;
    }
}

setInterval(draw, 35);
setInterval(displayTime, 1);
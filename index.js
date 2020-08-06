var background = document.getElementById("background");

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
document.body.onload = setupCanvas();

function setupCanvas() {

    var canvas = document.getElementById('session7');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        // initialising variables
        var timer;
        var clicker;
        var user;
        var score = 0;
        var highScore = [];
        var reset;

        // drawing the background
        ctx.fillStyle = 'rgb(200,100,255)';
        ctx.rect(100, 100, 100, 100);
        ctx.fill();

        // start the game when the button is pressed
        document.getElementById('changer').addEventListener("click", startGame);

        function startGame() {

            // get the current username
            user = document.getElementById('name').value;

            // use EventListener to run the mousePos function when the canvas is clicked
            clicker = canvas.addEventListener("click", mousePos);

            // set the countdown timer
            timer = window.setTimeout(stopGame, 8000);
        }

        function stopGame() {

            // use removeEventListener to stop the mousePos function from being called on click
            clicker = canvas.removeEventListener("click", mousePos);

            // Push the score and username into the highScore 2d array
            // Need a temp array called UserScore to hold the user and score, then push it to the highscore array which
            // Tallies and sorts each new data set that gets added with each game
            var userScore = [];
            userScore.push(user);
            userScore.push(score);
            highScore.push(userScore);


            // sort from highest score to lowest score. The sort function will automatically do this, however it is only 
            // sorting 2 at a time after converting to strings. This is fine for a list of names but we have both names
            // and integers that have to be sorted. Sort() can parse in extra functions, by using a/b we are getting the
            // sort function to do 1 of 3 things - compare higher, lower or leave as is. We have also indicated we want
            // the scores array to be the one sorted by refercing index[1], we don't want index[0] as these are the userNames
            highScore.sort(function (a, b) { return b[1] - a[1]; });

            // display highscore and username on the canvas. Here we have to choose which array in the array we
            // want to display by referencing the index, note we need 2 because it is multidimensional. 
            // We then use += to increment the table with new rows as
            // new scores and userNames are added to the array 
            var container = document.getElementById("tableOutput");
            var content = "<table><tr><th>UserName</th><th>Score</th></tr>";
            for (var i = 0; i < highScore.length; i++) {
                content += "<tr><td>" + highScore[i][0] + "</td>";
                content += "<td>" + highScore[i][1] + "</td></tr>";
            }
            content += "</table>";
            container.innerHTML = content;

            // print to the console            
            console.clear();
            console.table(highScore);

            // reset the score to allow for a new game
            score = 0;
        }

        function mousePos(e) {

            // test for bounds off the square
            if (e.offsetX > 100 && e.offsetX < 200 && e.offsetY > 100 && e.offsetY < 200) {
                // if they click on the square, increment score
                score++;
                // remove old score from canvas. This is needed so the fillText can show only the current iteration,
                // Otherwise it will just write over the top of the last score on the canvas
                ctx.clearRect(100, 100, canvas.width, canvas.height)
                ctx.fillStyle = 'rgb(200,100,255)';
                ctx.rect(100, 100, 100, 100);
                ctx.fill();
                // display updated score
                ctx.font = "30px Segoe UI";
                ctx.fillText("Your score is: " + score, 100, 300);
            }
        }

        // Reset the Canvas and clear Form Field. Using same canvas properties as the setUpCanvas function
        // Rest the div using remove child function so the table with scores is cleared
        // Rest the Name text field on the DOM for next user
        reset = document.getElementById('reset').addEventListener("click", resetGame);

        function resetGame() {
            ctx.clearRect(100, 100, canvas.width, canvas.height)
            ctx.fillStyle = 'rgb(200,100,255)';
            ctx.rect(100, 100, 100, 100);
            ctx.fill();
            document.getElementById("name").value = "";
            clearDIV = document.getElementById("tableOutput");
            clearDIV.removeChild(clearDIV.lastChild);

        }

    }

}
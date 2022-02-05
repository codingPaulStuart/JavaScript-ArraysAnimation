
//Paul Stuart (000223098) 5JSI - Arrays Assignment 20.9.20

document.body.onload = setupCanvas();

function setupCanvas() {
    var canvas = document.getElementById('assignment');

    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        //create array variables
        var xPositions = [];
        var yPositions = [];
        var colors = [];
        var speed = [];
        var size = [];
        var numFlowers = 20;

        //initialise arrays with 20 objects with random x and y, color, speed and size
        // Push () function allows a value to be passed into the array, the function is applied to the array
        // Such as arrayNameVariable.push(new value)
        for (var i = 0; i < numFlowers; i++) {
            xPositions.push(Math.random() * 500);
            yPositions.push(Math.random() * 500);
            colors.push(randomColor());
            speed.push(randomSpeed());
            size.push(randomSize());
        }

        // add code here to create the flowers on the canvas
        //start drawing the flowers
        window.setInterval(draw, 50);

        function draw() {

            //redraw background 
            ctx.fillStyle = 'rgb(210,200,255)';
            ctx.rect(0, 0, 500, 500);
            ctx.fill();

            //cycle through arrays and use values to draw flowers
            for (var i = 0; i < xPositions.length; i++) {

                //fills with color values from colours array
                ctx.fillStyle = colors[i];

                //draws petals
                ctx.beginPath();
                ctx.arc(xPositions[i] - size[i], yPositions[i] - size[i], size[i] * 1.35, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(xPositions[i] - size[i], yPositions[i] + size[i], size[i] * 1.35, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(xPositions[i] + size[i], yPositions[i] - size[i], size[i] * 1.35, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(xPositions[i] + size[i], yPositions[i] + size[i], size[i] * 1.35, 0, Math.PI * 2, false);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(xPositions[i], yPositions[i], size[i], 0, Math.PI * 2, false);
                ctx.fill();

                //draws centre of flower
                ctx.beginPath();

                //uses a second color
                ctx.fillStyle = colors[i + 1];
                ctx.arc(xPositions[i], yPositions[i], size[i], 0, Math.PI * 2, false);
                ctx.fill();

                //increases the y position of the flowers every loop
                //yPositions[i] += speed[i];

                //if the flower is off the stage
                if (yPositions[i] > 600) {

                    //offsets the y position to a random negative number
                    //instead of just resetting to zero
                    var randomY = Math.random() * -350;
                    yPositions[i] = randomY;
                } else {

                    //if the flower is still on the canvas
                    //increase the y position by the flower speed
                    yPositions[i] += speed[i];
                }
            }
        };

        //generate random color function
        function randomColor() {
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            return "rgb(" + r + "," + g + "," + b + ")";
        };

        //generate random number between 5 and 40
        // Math.floor rounds down to single digit the decimal that javascript random fucntion generates
        // We then specify the range as the first integer (35) and the lower limit (5)
        function randomSize() {
            return Math.floor(Math.random() * 35) + 5;
        }

        //generate the random speed between 1 and 8
        // Math.floor rounds down to single digit the decimal that javascript random fucntion generates
        // We then specify the range as the first integer (7) and the lower limit (1)
        function randomSpeed() {
            return Math.floor(Math.random() * 7) + 1;
        }

        //event listener to run function removeFlower on click of the canvas
        document.getElementById('changer').addEventListener("click", removeFlower);

        function removeFlower() {

            //removes a flower from the arrays on click of button. 
            // Does this with splice, the first integer (0) specifies the position in the array,
            // The second is how many items to be removed (1), and it does this working backward in array; high to low
            // This function is executed on the onClick eventListener identified with the button on the DOM
            xPositions.splice(0, 1);
            yPositions.splice(0, 1);
            colors.splice(0, 1);
            speed.splice(0, 1);
            size.splice(0, 1);
        }
    }
}

// Trouble shooting Errors
/*
Best way to trouble shoot is to make sure the console is open in the internet browser becuase this is the in-built
Javascript engine that executes the code. To check how something should work, it can be typed direct into the console
in the browser.

Errors in code will be highlighted immediatley once the script is executed in the console

Chrome also has an inbuilt debugger to run with the Javascript Engine and allows you to step through the script



*/
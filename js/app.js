// Model


var Model = function () {
    this.onChange = null;
    this.guesses = [];
    this.guessCounter = 0;
    this.mysteryNumber = 0;
};

Model.prototype.computeMysteryNumber = function () {
    this.mysteryNumber = Math.round(randomRange(1, 100));
};


Model.prototype.hotOrCold = function (userGuess) {

    var distance = Math.abs(userGuess - this.mysteryNumber);
    console.log(distance);

    /*Provides 'hot' or 'cold'*/
    if (distance >= 50) {
        console.log('Freezing Cold');
    }
    else if (distance >= 30) {
        console.log('Pretty Cold');
    }
    else if (distance >= 20) {
        console.log('Warmish');
    }
    else if (distance >= 10) {
        console.log('Warm');
    }
    else if (distance > 1) {
        console.log('Hot');
    }
    else if (distance === 0) {
        console.log("There's the answer! Let's play again!");
        $('#guessButton').prop('disabled', true);
    }
};


Model.prototype.checkUserGuess = function (userGuess) {
    if (isNaN(userGuess)) {
        console.log('This is not a number!');
    }
    /*Rejects integers out of range*/
    else if (userGuess < 1 || userGuess > 100) {
        console.log('We can only accept 1-100!');
    }
    else {
        this.hotOrCold(userGuess);
        this.guesses.push(userGuess);
        this.guessCounter += 1;
    }
};


//


/*View 
 -event listener



 */


// Controller 

//


$(document).ready(function () {

    /*--- Display information modal box ---*/
    $(".what").click(function () {
        $(".overlay").fadeIn(1000);

    });

    /*--- Hide information modal box ---*/
    $("a.close").click(function () {
        $(".overlay").fadeOut(1000);
    });

    /*--- Capturing and Storing Number Entered ---*/
    var guesses = 0;
    var computerAnswer = computeRandomAnswer();

//lines 47-51 -- MODEL
    function computeRandomAnswer() {
        var numberGenerated = Math.round(randomRange(1, 100));
        console.log(numberGenerated);
        return numberGenerated;
    }

    $(".new").click(function (event) { //view
        event.preventDefault();
        guesses = 0; // model

//view
        $('#count').text(guesses);
        $('.guessBox').empty();
        $('#feedback').text('Make your Guess!');
        $('#guessButton').prop('disabled', false);
//model
        computerAnswer = computeRandomAnswer();
    });


    $('.hotOrCold').submit(function (event) {
        event.preventDefault();

        //lines 73-115 --VIEW
        var something = parseInt($('#userGuess').val());
        $('#userGuess').closest('form')[0].reset();

        /*Rejects non-integer*/
        if (isNaN(something)) {
            $('#feedback').text('This is not a number!');
            something === "";
        }
        /*Rejects integers out of range*/
        else if (something < 1 || something > 100) {
            $('#feedback').text('We can only accept 1-100!');
        }
        /*Handles valid inputs*/

        else {
            /*Adds entered number into list */

            $('.guessBox').append("<li>" + something + "</li>");
            guesses++
            $('#count').text(guesses);

            var distance = Math.abs(something - computerAnswer);
            console.log(distance);

            /*Provides 'hot' or 'cold'*/
            if (distance >= 50) {
                $('#feedback').text('Freezing Cold');
            }
            else if (distance >= 30) {
                $('#feedback').text('Pretty Cold');
            }
            else if (distance >= 20) {
                $('#feedback').text('Warmish');
            }
            else if (distance >= 10) {
                $('#feedback').text('Warm');
            }
            else if (distance > 1) {
                $('#feedback').text('Hot');
            }
            else if (distance === 0) {
                $('#feedback').text("There's the answer! Let's play again!");
                $('#guessButton').prop('disabled', true);
            }
        }
    });

    function randomRange(min, max) {
        return min + (Math.random() * (max - min))
    }

});
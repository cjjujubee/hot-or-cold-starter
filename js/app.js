
$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

    /*--- Capturing and Storing Number Entered ---*/
  var guesses = 0;
  var computerAnswer = computeRandomAnswer();

  function computeRandomAnswer() {
    return Math.round(randomRange(0, 100));
    console.log(computerAnswer)
  }

  $(".new").click(function(event){
    event.preventDefault();
    guesses = 0;
    $('#count').text(guesses);
    $('.guessBox').empty();
    $('#feedback').text('Make your Guess!');
    computerAnswer = computeRandomAnswer();
  });

  $('.hotOrCold').submit(function(event) {
    event.preventDefault();
    
    var something = parseInt($('#userGuess').val());
    $('#userGuess').closest('form')[0].reset();
    $('.guessBox').append("<li>" + something + "</li>");
    guesses++
    $('#count').text(guesses);
    
    var distance = Math.abs(something - computerAnswer);
    console.log(distance);
    
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
      $('#feedback').text('You got the answer');
    }

     /*Provides feedback*/
    if (isNaN(something)) {
      $('#feedback').text('This is not a number!');

    }
    else if (something < 1 || something > 100) {
      $('#feedback').text('We can only accept 1-100!');

    }

    });


  function randomRange(min, max) {
    return min + (Math.random() * (max - min))
  }



});
$(document).ready(function() {
	quizIntro();

	function quizIntro() {
		$('#classixx')[0].volume = 0.5;
		$('#classixx')[0].play();
		$('.t1').fadeIn(2000, function() {
			$(this).fadeOut(2000, function() {
				$('.t2').css('margin-top', '2em').fadeIn(2000, function() {
					$(this).fadeOut(2000, function() {
						$('.t3').css('margin-top', '4em').fadeIn(2000, function() {
							$(this).fadeOut(2000, function() {
								$('.main-title').css('margin-top', '1em').fadeIn(2000);
								$('.quizButton').fadeIn(2000);
								$('h6').delay(2000).fadeIn(2000);
							});
						});
					});
				});
			});
		});
	}

	// Display quizContent modal box
	$(".quizButton").click(function() {
		$(".quizContent").fadeIn(1000);
		$('#container').fadeOut(1000);
	});

	// Quiz Question Array
	var questions = [{
		question: "What is the largest music festival in the world?",
		choices: ["Summerfest", "Coachella", "Donauinselfest", "Mawazine"],
		questionNumber: 0,
		correctChoice: 2,
		fact: "Answer: Donauinselfest <br> Attendance was near 3.2 million in 2013."
		},
		{
		question: "Being one of the biggest EDM festivals in the world, what city is TommorrowLand located?",
		choices: ["Boom", "Ibiza", "Los Angeles", "Buenos Aires"],
		questionNumber: 1,
		correctChoice: 0,
		fact: "Answer: Boom <br> Most of the 2013 TomorrowLand tickets sold out in one second. Boom."
		},
		{
		question: "What is the longest running music festival in the world?",
		choices: ["Bonnaroo", "Lollapalooza", "Glastonbury", "Warped Tour"],
		questionNumber: 2,
		correctChoice: 3,
		fact: "Answer: Warped Tour <br> Warped Tour started in 1994 and continues to keep going."
		},
		{
		question: "During Coachella 2012, what famous artist was brought back to life in holographic form?",
		choices: ["Michael Jackson", "2pac", "Jimi Hendrix", "Kurt Cobain"],
		questionNumber: 3,
		correctChoice: 1,
		fact: "Answer: 2pac <br> It was reported that the hologram was priced between $100,000 and $400,000."
		},
		{
		question: "Around how much did a 3-day pass to Woodstock cost back in 1969?",
		choices: ["Over $200", "$150", "$100", "Less than $50"],
		questionNumber: 4,
		correctChoice: 3,
		fact: "Answer: Less than $50 <br> Tickets were priced at $18 (That's for 3 days)."
		}
	];

	// Defining Global Variables
	var numberCorrect = 0;
	var currentQuestion = 0;

	// Allowing the Submit Button to take you to the next question
	$(".quizContent").on("click", "#submit", function() {
		if ($("input[type='radio']:checked").val()) {
			updateScore();
			currentQuestion++;
			nextQuestion();
		}
		else {
			alert("You must select an answer!");
		}
	});

	// Allows you to take the quiz over again
	$(".quizContent").on("click", "#retryButton", function() {
		numberCorrect = 0;
		currentQuestion = 0;
		var newQuestion = '<span class="question">' + questions[currentQuestion].question + '</span><div class="multipleChoiceAnswers"><input type="radio" name="option" class="option" value="0"><span class="answer">' + questions[currentQuestion].choices[0] + '</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">' + questions[currentQuestion].choices[1] + '</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">' + questions[currentQuestion].choices[2] + '</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">' + questions[currentQuestion].choices[3] + '</span><br></div><div class="answerButtons"><input type="button" id="submit" value="Submit"><input type="button" id="retryButton" value="Re-Take"></div>';
		$(".quizContent").html(newQuestion);
		$("#lastQuestionFact").html("");
	});

	function updateScore() {
		var answer = $("input[type='radio']:checked").val();
		if (answer == questions[currentQuestion].correctChoice) {
			numberCorrect++;
			$('#correct').fadeIn(2000, function() {
				$(this).delay(2000).fadeOut(2000);
			});
		}
		else {
			$('#incorrect').fadeIn(2000, function() {
				$(this).delay(2000).fadeOut(2000);
			});
		}
	}

	function nextQuestion() {
		var newQuestion, finalScore;
		if (currentQuestion < 5) {
			$(".question").remove();
			$(".multipleChoiceAnswers input").remove();
			$(".multipleChoiceAnswers .answer").remove();
			$("#lastQuestionFact").hide();
			newQuestion = '<span class="question">' + questions[currentQuestion].question + '</span><div class="multipleChoiceAnswers"><input type="radio" name="option" class="option" value="0"><span class="answer">' + questions[currentQuestion].choices[0] + '</span><br><input type="radio" name="option" class="option" value="1"><span class="answer">' + questions[currentQuestion].choices[1] + '</span><br><input type="radio" name="option" class="option" value="2"><span class="answer">' + questions[currentQuestion].choices[2] + '</span><br><input type="radio" name="option" class="option" value="3"><span class="answer">' + questions[currentQuestion].choices[3] + '</span><br></div><div class="answerButtons"><input type="button" id="submit" value="Submit"><input type="button" id="retryButton" value="Re-Take"></div>';
			$(".quizContent").html(newQuestion);
			var lastFact = questions[currentQuestion-1].fact;
            $("#lastQuestionFact").html(lastFact).fadeIn(2000);
		}
		else {
			$(".question").remove();
			$(".multipleChoiceAnswers input").remove();
			$(".multipleChoiceAnswers .answer").remove();
			$("#lastQuestionFact").hide();
			$("#lastQuestionFact").fadeIn(2000);
			$("#submit").css("display", "none");
			$("#retryButton").css("display", "inline");
			var lastFact= questions[currentQuestion-1].fact;
            $("#lastQuestionFact").html(lastFact);
			if (numberCorrect == 1) {
				finalScore = '<div class="final">Congrats on finishing the quiz! You correctly answered ' + numberCorrect + ' question!</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
			else if (numberCorrect > 1 && numberCorrect < 5) {
				finalScore = '<div class="final">Congrats on finishing the quiz! You correctly answered ' + numberCorrect + ' questions!</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
			else if (numberCorrect == 5) {
				finalScore = '<div class="final">Yep, you are a festival genius! Congrats on finishing the quiz! You correctly answered all ' + numberCorrect + ' questions!</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
			else {
				finalScore = '<div class="final">Uh oh someone needs to festival more.. you didnt get any right..</div>';
				// $(".quizContent").html(finalScore);
				$(".multipleChoiceAnswers").html(finalScore);
			}
		}
	}
});
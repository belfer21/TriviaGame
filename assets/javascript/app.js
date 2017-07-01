

$(document).ready(function() {
    $("#introSection").hide();
    $("#messageSection").hide();
    $('#instructionModal').modal();
    $('.parallax').parallax();
    
    $('.tooltipped').tooltip({ 
        delay: 50
    });


    $("#introSection").fadeIn(1000 * 5, function() { 
    });

    $("#questionSpace").hide()
    var correctCounter = 0,
        incorrectCounter = 0,
        unansweredCounter = 0,
        currentQuestionIndex = 0;


    var congratsMessages = ['Great going cadet', 'On the money astrophysicist', "To Infinity!"];

    function randomNum(x) {
        var roll = Math.floor(Math.random() * x);
        return roll;
    }

    function randomCongrats() {
        var messageRoll = randomNum(congratsMessages.length);
    }

    function countDown() {
        $('.pickAnswer').click(function() {
            $(this).data('clicked', true);
        });
        var i = 30;
        var myInterval = setInterval(function() {

            if (i < 10) {
                $('#timerSeconds').html("0" + i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            } else {
                $('#timerSeconds').html(i);
                $(".pickAnswer").on("click", function() {
                    clearInterval(myInterval);
                })
            }

            if (i === 0) {
                unansweredCounter++;
                clearInterval(myInterval);
                currentQuestionIndex++;
                $('#timer').effect("pulsate", {
                    times: 25
                }, 1000 * 5);
                i = 30;
                postQuestion(currentQuestionIndex);
            } else {
                i--;
            }
        }, 1000);
    }

    var questions = [
                    // q1
        {
            "q": "In which country would you find the mouth of the Orinoco River?",
            "c": ["Venezuela", "Brazil", "Algeria"],
            "answer": 0
        },
                    // q2
        {
            "q": "Where is Algeria",
            "c": ["Europe", "Asia", "Africa"],
            "answer": 2
        },
                     // q3
        {
            "q": "Now how big is Algeria",
            "c": ["bigger than Marriland", "bigger than Texas", "Almost half the U.S teritorry"],
            "answer": 2
        },
                    //q4
        {
            "q": "Which tennis star has won the most Grand Slam titles?",
            "c": ["Serena Williams", "Roger Federer"],
            "answer": 1
            
        },
                    // q5
        {
            "q": "Which flag contains more stars?",
            "c": ["Australia", "New Zeland"],
            "answer": 0
        },
                    // q6
        {
            "q": "Which sentence is correct?",
            "c": ["Who's cat is this", "Whose cat is this"],
            "answer": 1
        },
                    // q7
        {
            "q": "Artificially created sounds are :sound _____.",
            "c": ["effects", "affects"],
            "answer": 0
        },
                    //q8
        {
            "q": "Last question:  Where do you think this background image is taken from?",
            "c": ["Australia", "Grand Canyon West","Tassili, Algeria"],
            "answer": 2
        },

    ];


    function postQuestion(n) {

        if (currentQuestionIndex < questions.length) {
            $('#question').remove();
            $('.pickAnswer').remove();
            countDown();
            $('#questionContainer').append("<div id='question'>" + questions[n].q + "</div>");
            for (var i = 0; i < questions[n].c.length; i++) {
                var newDiv = $("<div>");
                newDiv.addClass("pickAnswer").attr("indexnum", i).text(questions[n].c[i]);
                $('#choices').append(newDiv);
            }


        } else {
            resetGame(); 
        }

        $(".pickAnswer").on("click", function() {
            var userChoice = $(this).attr('indexnum');
            userChoice = parseInt(userChoice);

        
            if (userChoice === questions[currentQuestionIndex].answer) {
                correctCounter++;
                currentQuestionIndex++
                randomCongrats();

            } else {
                incorrectCounter++;
                currentQuestionIndex++;

            }
            postQuestion(currentQuestionIndex);
        })
    }

    function startTrivia() {
        $('#messageSection').hide();
        $('#gameMessage').empty()
        $('#questionContainer').show();
        $('#choices').show();
        $("#timer").show();
        correctCounter = 0;
        incorrectCounter = 0;
        unansweredCounter = 0;
        currentQuestionIndex = 0;

        postQuestion(currentQuestionIndex);

    }

    function resetGame() {
        $('#messageSection').show();
        $('#questionContainer').hide();
        $('#choices').hide();
        $('#timer').hide()

        $('#gameMessage').append("<h2>You have completed the game!</h2>");
        $('#gameMessage').append("<h4>Total Correct: " + correctCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Incorrect: " + incorrectCounter + "</h4>");
        $('#gameMessage').append("<h4>Total Unanswered: " + unansweredCounter + "</h4>");

        setTimeout(startTrivia, 1000 * 10);

    }



    $("#startButton").on("click", function() {
        $("#buttonRow").hide();
        $("#introCard").remove();
        $("#timer").append("<span id='timerMinutes'>00</span>:<span id='timerSeconds'>00</span>");
        $("#questionSpace").show();

        startTrivia();


    })


});
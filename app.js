var beginQuiz, gameHTML, questionArr, ansArr, imgArr, correctAnswers, selectedAnswer, counter, questionCounter, correctTally, incorrectTally, unansweredTally,  clock;

questionArr = ["What is the name of Joey's Cabbage Patch Kid?", "Who's fiance wanted the heavy metal band 'Carcass' at their wedding?", "What did Monica originally want to call her children?", "What car did Phoebe briefly live in?", "What does Mona bring Ross back from a trip?", "What was the special power of the super hero Ross created?", "What was Emma's first word?"];
ansArr = [["Alicia Danica", "Alicia May Emory", "Adeline Emory", "Alaina May Presley"], ["Janice", "Monica", "Megan", "Ursula"], ["Emma and Daniel", "Erica and Jack", "Erica and Daniel", "Jack and Emma"], ["Pick Up Truck", "New York Cab", "Buick Lesabre", "Buick Wagon"], ["Rock Candy", "Gummy Bears", "Strawberry Taffy", "Salt Water Taffy"], ["Ability to morph into a dinosaur", "Superhuman thirst for knowledge", "Ability to fly", "Geology master"], ["Mommy", "Hi", "Daddy", "Gleba"]];
imgArr = ["<img class='center-block img-center' src='aliciamay.jpg'>", "<img class='center-block img-center' src='megan.jpg'>", "<img class='center-block img-center' src='emma.jpg'>", "<img class='center-block img-center' src='phoebe.jpg'>", "<img class='center-block img-center' src='taffy.jpg'>", "<img class='center-block img-center' src='scienceboy.jpg'>", "<img class='center-block img-center' src='gleba.jpg'>"];
correctAnswers = ["B. Alicia May Emory", "C. Megan", "A. Emma and Daniel", "C. Buick Lesabre", "D. Salt Water Taffy", "B. Superhuman thirst for knowledge", "D. Gleba"];
counter = 10;
questionCounter = 0;
correctTally = 0;
incorrectTally = 0;
unansweredTally = 0;

$(document).ready(function() {

    function display() {
        beginQuiz = "<p class='text-center main-button'><a class='btn btn-primary btn-lg btn-block start-button' href='#' role='button'>Start Quiz</a></p>";
        $("#quiz").html(beginQuiz);
    }

    display();

    $("body").on("click", ".start-button", function(event) {
        event.preventDefault();
        generateHTML();
        timerContainer();
    });

    $("body").on("click", ".answer", function(e) {
        selectedAnswer = $(this).text();
        if (selectedAnswer === correctAnswers[questionCounter]) {
            clearInterval(clock);
            win();
        } else {
            clearInterval(clock);
            loss();
        }
    });

    $("body").on("click", ".reset-button", function(e) {
        reset();
    });

});
    
    function generateHTML() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining:<span class='timer'>10</span></p><br><p class='text-center'>" + questionArr[questionCounter] + "</p><p class='first-answer answer'>A. " + ansArr[questionCounter][0] + "</p><p class='answer'>B. "+ ansArr[questionCounter][1]+"</p><p class='answer'>C. "+ ansArr[questionCounter][2]+"</p><p class='answer'>D. "+ ansArr[questionCounter][3]+"</p>";
        $("#quiz").html(gameHTML)
    }

    function win() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imgArr[questionCounter];
        $("#quiz").html(gameHTML);
        setTimeout(wait, 4000);
    }

    function loss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='oops.jpg'>";
        $("#quiz").html(gameHTML);
        setTimeout(wait, 4000);
    }

    function timesUp() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='oops.jpg'> alt ='Time's up!'";
        $(".quiz").html(gameHTML);
        setTimeout(wait, 4000);
    }

    function timerContainer() {
        clock = setInterval(seconds, 1000);
        function seconds() {
            if (counter === 0) {
                clearInterval(clock);
                timesUp();
            }
            if (counter > 0) {
                counter --;
            }
            $(".timer").html(counter);
        }
    }

    function wait() {
        if (questionCounter < 6) {
        questionCounter++;
        generateHTML();
        counter = 10;
        timerContainer();
        }
        else {
            endGame();
        }
    }

    function endGame() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='index.html' role='button'>Reset The Quiz!</a></p>";
        $("#quiz").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 10;
        generateHTML();
        timerContainer();
    }








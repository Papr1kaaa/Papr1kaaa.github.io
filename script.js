//question database
const STORE = [
    {
        question: 
            'What university is frequently referenced in HP Lovecraft’s works?',
        answers: 
            ['Brown University',
            'Miskatonic University',
            'Al\'Arab School of the Dead',
            'Harvard Institute of Paranormal Studies'
            ],
        correctAnswer: 
            'Miskatonic University',
    },
    {
        question: 
            'What is Cthulhu\'s nickname?',
        answers:
            ['The Great Dreamer',
            'The Great Eater',
            'He Who Shall Not Be Awoken',
            'The Beast of Redhook'
            ],
        correctAnswer: 
            'The Great Dreamer',
    },
    {
        question:
            'Where does Cthulhu sleep?',
        answers:
            ['Shangri\'la',
            'Atlantis',
            'Planet X Omicron Xi',
            'R\'lyeh'
            ],
        correctAnswer:
            'R\'lyeh',
    },
    {
        question: 
            'What is “At the Mountains of Madness” about?',
        answers: 
            ['An evil cult in the mountains of Massachusetts.',
            'An Antarctic archaeological expedition gone horribly wrong.',
            'A Tibetan expedition hunting for the Yeti.',
            'A Russian scientific team that finds a meteorite from beyond the realm of sanity.'
            ],
        correctAnswer: 
            'An Antarctic archaeological expedition gone horribly wrong.',
    },
    {
        question: 
            'What is Innsmouth’s terrible secret?',
        answers: 
            ['The locals are secret worshippers of ancient fish people.',
            'Jimmy Hoffa is buried under the local donut shop.',
            'There is a secret Egyptian death cult controlling the town.',
            'There is an evil society of molemen that live under the ground.'
            ],
        correctAnswer: 
            'The locals are secret worshippers of ancient fish people.',
    },
    {
        question: 
            'What is the Necronomicon?', 
        answers: 
            ['Mary Berry’s 666th cookbook.',
            'An evil book that causes a demon to hunt the reader 7 days after opening it.',
            'The Greek book of the dead. Able to resurrect the dead, but at a cost...',
            'An ancient spellbook used to summon the old ones.'
            ],
        correctAnswer:
            'An ancient spellbook used to summon the old ones.',
    },
    {
        question: 
            'Who is Azathoth?',
        answers: 
            ['The blind idiot god; unknowing father of our cosmos.',
            'An ancient egyptian priest turned nightmarish deity.',
            'Mother of creation; trapped within the womb of the world.',
            'The fallen angel Azazel, Herald of Beelzebub.'
            ],
        correctAnswer: 
            'The blind idiot god; unknowing father of our cosmos.',
    }
    
];

//variables to store score and question number
let score = 0;
let questionNumber = 0;

//function to generate each question
function generateQuestion() {
    if (questionNumber < STORE.length) {
        return createQuestion(questionNumber);
    }
    else {
        $('.imageBox').hide();
        $('.questions').hide();
        quizResults();
        $('.questionNumber').text(7);
    }
console.log('generateQuestion');
}

//function to increment score by 1
function updateScore() {
    score++;
    $('.quizScore').text(score);
}
//function to increment question number by 1
function updateQuestionNumber() {
    questionNumber++;
    $('.questionNumber').text(questionNumber + 1);
}
//function to reset score and question number
function resetStats() {
    score = 0;
    questionNumber = 0;
    $('.quizScore').text(0);
    $('.questionNumber').text(0);
}
//function to begin quiz
function  startQuiz() {
    $('.imageBox').hide();
    $('.secondaryBox').hide();
    $('.landing-page').on('click','.start-quiz', function(event) {
        $('.landing-page').hide();
        $('.imageBox').show();
        $('.questionNumber').text(1);
        $('.questions').show();
        $('.questions').prepend(generateQuestion());
    });
  console.log('start quiz');
}

//function to submit answer and check if answer is correct
function submitAnswer() {
    $('.questions').on('submit', function(event) {
        event.preventDefault();
        $('.secondaryBox').hide();
        $('.questionResult').show();
        let selected = $('input:checked');
        let answer = selected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if (answer === correct) {
            rightAnswer();
            updateScore();
        }
        else {
            wrongAnswer();
        }
    });
console.log('submit answer');
}

//Save for last?
//function to create html for question form
function createQuestion(questionIndex) {
  let formMaker = $(`
  <form>
    <fieldset>
    <legend class = "questionIndex">${STORE[questionIndex].question}
    </legend>
    </fieldset>
    </form>`)

  let fieldSelector = $(formMaker).find('fieldSet');

    STORE[questionIndex].answers.forEach(function(answerValue, answerIndex) {
      $(`<label class="radioQuestion" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
        </label>
        `).appendTo(fieldSelector);
    });
    $(`<button type="submit" class="submit-answer button">Submit</button>`).appendTo(fieldSelector);
  return formMaker;
  console.log('create questions');
}

//function to give feedback for correct answer
function rightAnswer() {
    $('.questionResult').html(`<h2>Correct!</h2>
    <p>Congratulations! You have passed this trial. Onto the next challenge!</p>
    <img src = "Images/Correct.jpg" alt = "A man and a woman investigating strange ruins." class = "image correctImage">
    <button type="button" class="next-question button">Next Question</button>`);
    
}

//function to give feedback for incorrect answer
function wrongAnswer() {
    $('.questionResult').html(`<h2>Incorrect</h2>
    <p>Drats! You answered incorrectly. The blind god Azathoth stirs in his slumber.</p>
    <img src = "Images/Azathoth.jpg" alt = "A picture of the ancient god Azathoth. A giant, evil space-blob comprised of many tentacles and eyes, all around it's body." class = "image wrongImage">
    <p>"${STORE[questionNumber].correctAnswer}" would have been a better response...</p>
    <button type="button" class="next-question button">Next Question</button>`);
}

//function to generate next question
function nextQuestion() {
    $('.questionResult').on('click', '.next-question', function(event) {
        $('.secondaryBox').hide();
        $('.imageBox').show();
        $('.questions').show();
        updateQuestionNumber();
        $('.questions').html(generateQuestion());
        console.log('next question internals');
    });
    console.log('next question');
}

//function to determine final score and feedback
function quizResults() {
    $('.resultsPage').show();
    return $('.resultsPage').html(`<h2>Your Fate</h2>
    <p>Congratulations! You've managed to complete this test mostly intact. You have answered <span>${score}</span>/7 questions correctly. However, you are now burdened with the knowledge of our horrific cosmic reality. At what cost has this knowledge left your sanity?</p>
    <img src = "Images/Results.jpg" alt = "A man and his family, driven mad by an indescribable horror shown as a purple light encapsulating them." class = "image resultsImage">
    <button type = "button" class = "restart-quiz button">Restart Quiz</button>`);
} 

//function to return to the start page
function restartQuiz() {
    $('.resultsPage').on('click', '.restart-quiz', function(event) {
    event.preventDefault();
    resetStats();
    $('.secondaryBox').hide();
    $('.landing-page').show();
    $('.questions').children().remove();
    });
}

//function to run functions
function runQuiz() {
    startQuiz();
    generateQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
  console.log('run quiz');
}


$(runQuiz);
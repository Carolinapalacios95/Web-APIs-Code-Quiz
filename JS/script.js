// ************************** GLOBAL VARIABLE DECLARATIONS ****************************************

//gets html elements and renames them as variables we can reference thoughout js sheet
var timerEl = document.querySelector("#time");
var startButton = document.querySelector("#start-button");
var questionsEl = document.querySelector('#questions');
var endScreenEl = document.getElementById("end-screen");
var feedbackEl = document.querySelector("#feedback");
var initialsEl = document.querySelector("#initials");
var submitButton = document.querySelector("#submit");
var scoresEl = document.querySelector("#scores");
var highscores = JSON.parse(window.localStorage.getItem("highscores"));


//quiz timer variables 
var time = 60;
var timerId;
var currentQuestionIndex = 0;

// ************************ NEW FUNCTION **************************************************************
function clockTick() {
  // Countsdown the timer
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}


// starts quiz by calling function when start button is clicked
startButton.addEventListener("click", startQuiz);

// *************************** NEW FUNCTION *******************************************************

//this declares startQuiz function
function startQuiz() {
  // creates a variable that references the start screen div by its ID
    var startScreenEl = document.getElementById("start-screen");
    
    //if statement checks the css style of the start screen
    if (startScreenEl.style.display === "none") {
      // if the initial style is set to none then it will make it appear
      // but this is not the case, so this portion is skipped
      startScreenEl.style.display = "block";
    } else {
      // and since the initial display is not set to none, this portion
      // switches its style to none, hiding it on the webpage and 
      // then switches our questions div to block, making it appear on the page
      startScreenEl.style.display = "none";
      questionsEl.style.display = "block";

      // start timer
    timerId = setInterval(clockTick, 1000);

    // show starting time
    timerEl.textContent = time;

      //calls function to display questions
      getQuestion();
    }
}


// ****************************** NEW FUNCTION ***********************************************

//declares the getQuestion function
function getQuestion() {
  // //sets the initial question index to 0
  // var currentQuestionIndex = 0;

  //gets current question object from array
  var currentQuestion = questionsArray[currentQuestionIndex];

  //creates a new var that references the h2 tag in questions div
  var titleEl = document.getElementById("question-title");
  //sets the text content of var to the first question in questions 
  // array by sepcifically referring to .question property with array
  titleEl.textContent = currentQuestion.question;

  //declares a new var that references the div with and ID of choices
  var choicesEl = document.querySelector("#choices");

  //clears out any old question choices by setting them to an empty string
  choicesEl.innerHTML = "";

  // creates a var that holds the array for choices, found within the questions array
  var choicesArray = currentQuestion.choices;

  // creates a function that loops through the choices array
  var displayChoices = function() {
    for (var currentQuestionIndex = 0; currentQuestionIndex < choicesArray.length; currentQuestionIndex++) {

      // creates a var for the current choice in the array that the function is affecting
      var choice = choicesArray[currentQuestionIndex];
     
      //creates a var for a new button element created in html
      var choiceButton = document.createElement("button");
      //sets attributes to the newly created button
      choiceButton.setAttribute("class", "choice");
      //sets the value button to the current choice that the function is dealing with
      choiceButton.setAttribute("value", choice);

      //sets the button text content to the current index of the array plus 1, and beside it, 
      // the text of the current choice that the function is dealing with
      choiceButton.textContent = currentQuestionIndex + 1 + ". " + choice;

      choiceButton.addEventListener("click", questionClick);

      //appended the button within the choices div as a child element
      choicesEl.appendChild(choiceButton);
    };
  }
  //calls the function since we've only declared it above
   displayChoices();
}


 // *********************************** NEW FUNCTION ************************************************

 function questionClick() {
   //sets the initial question index to 0
  //  var currentQuestionIndex = 0;

   //checks if the user guessed wrong
   if (this.value !== questionsArray[currentQuestionIndex].answer) {
     //penalize time
     time -= 15;

     if (time < 0) {
       time = 0;
     }

      //displays the new time on page
      timerEl.textContent = time;
      //styles the feedback text
      feedbackEl.textContent = "Wrong answer!";
      feedbackEl.style.color = "red";
      feedbackEl.style.fontSize = "200%";
     } else {
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "green";
      feedbackEl.style.fontSize = "200%";
     };

     // flash right/ wrong feedback
//     feedbackEl.style.display = "block";
//     setTimeout(function() {
//     feedbackEl.style.display = "none";
//     }, 1000);

     //will go to next question if the following if statement calls getQuestion
    currentQuestionIndex++;

    //time checker
     if (currentQuestionIndex === questionsArray.length || time <= 0) {
       endQuiz();
     } else {
       getQuestion();
     };
};
 
// ********************************* NEW FUNCTION ******************************************

function endQuiz() {
  // stops timer
  clearInterval(timerId);

  //hides the questions div
  questionsEl.style.display = "none";
  feedbackEl.style.display = "none";

  // shows end screen div
  endScreenEl.style.display = "block";

  // creates var that references the span tag
  var finalScoreEl = document.getElementById("final-score");
  //shows the final score
  finalScoreEl.textContent = time;
}


// ************************************ NEW FUNCTION **********************************************
function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}
initialsEl.onkeyup = checkForEnter;

 // submit initials
 submitButton.addEventListener("click", saveHighscore);

function saveHighscore() {
  //gets the value from the input box
  var initials = initialsEl.value.trim();
  

  if (initials !== "") {
    endScreenEl.style.display = "none";
    scoresEl.style.display = "block";

    // get saved scores from localstorage, or if not any, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];

   // formats new score object for current user
   var newScore = {
    score: time,
    initials: initials
  }; 

   // saves to localstorage
   highscores.push(newScore);
   window.localStorage.setItem("highscores", JSON.stringify(highscores));

   //calls the print high scores function
   printHighscores();
  }
}
// ************************************ NEW FUNCTION **********************************************

function printHighscores() {
   // either get scores from localstorage or set to empty array
   JSON.parse(window.localStorage.getItem("highscores")) || [];


  // sort highscores by score property in descending order
  highscores.sort(function(a, b) {
    return b.score - a.score;
  });

 
  highscores.forEach(function(score) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;

    // display on page
    var olEl = document.getElementById("highscores");
    olEl.appendChild(liTag);
  });
}

// ************************************ NEW FUNCTION **********************************************

document.getElementById("clear").onclick = clearHighscores;

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  window.location.reload();
}




// *********************************** QUESTIONS SECTION **********************************************

var questionsArray = [
  {
    question: "Which of these computer programming languages is used to build the structure of a webpage?",
    choices: ["Javascript", "CSS", "HTML", "Git"],
    answer: "HTML"
  },
  {
    question: "Which of these is not one of the 3 ways to style a webpage using CSS?",
    choices: ["automatic CSS", "internal CSS", "inline CSS", "external CSS"],
    answer: "automatic CSS"
  },
  {
    question: "A(n) (fill in the blank), is a set of instructions that tells the computer how to perform a certain task",
    choices: ["array", "variable", "string", "function"],
    answer: "function"
  },
  {
    question: "The header element of an HTML page is located within which of the following?",
    choices: ["head tag", "body tag", "main tag", "footer tag"],
    answer: "body tag"
  },
  {
    question: "If we reach a roadblock when coding, what is the one thing we should NOT do?",
    choices: ["inspect our webpage using Devtools", "go through our lines of code looking for spelling/syntax errors", "look up resources on how to debug the issue", "give up and wallow in self-pity"],
    answer: "give up and wallow in self-pity"
  }
]
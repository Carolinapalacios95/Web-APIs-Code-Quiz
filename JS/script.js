//gets html elements and renames them as variables we can reference thoughout js sheet
var startButton = document.querySelector("#start-button");
var endScreenEl = document.getElementById("end-screen");
var questionsEl = document.querySelector('#questions');

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
      //calls function to display questions
      getQuestion();
    }
    // still need to add timer components
}

// starts quiz by calling function when start button is clicked
startButton.addEventListener("click", startQuiz);


function getQuestion() {
  //sets the initial question index to 0
  var currentQuestionIndex = 0;

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
}




// QUESTIONS SECTION

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
];







    
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
      
    // still need to add timer components
  }
}


// starts quiz by calling function when start button is clicked
startButton.addEventListener("click", startQuiz);









    
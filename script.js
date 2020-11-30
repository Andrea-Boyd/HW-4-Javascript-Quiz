// This is where I am putting my declaration 

// Start button element 
var start = document.querySelector("#start");

//Quiz Elements 
var questionDisplay = document.querySelector("#question");
var option1 = document.querySelector("#option1");
var option2 = document.querySelector("#option2");
var option3 = document.querySelector("#option3");
var option4 = document.querySelector("#option4");


//html elements 
var header = document.querySelector("#quizHeader");
var section = document.querySelector("#quizSection");
var timerDisplay = document.querySelector("#seconds");
var highScoreSection = document.querySelector("#highScore");
var saveScoreBtn = document.querySelector("#saveScoreBtn");
var textArea = document.querySelector("#input");
var table = document.querySelector("#scoreTable");
var tableBody = document.querySelector("#localStorageGet")
// Array of objects that contains questions/ answers 
var qNa = [{
    question: "Inside which HTML element do we put the Javascript?",
    choice:[ "<js>", "<script>", "<javascript>", "<scripting>"],
    correctAnswer: "<script>"
    }, 
    {
    question: "Where is the correct place to insert a Javascript?",
    choice:[ "The <body> section", "The <head> section", "Both the <head> section and the <body> section are correct", "None of the above"],
    correctAnswer: "The <body> section"
    },
    {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice:[ "<script name = 'xxx.js'>", "<script src = 'xxx.js'>", "<script href = 'xxx.js'>", "None of the above"],
    correctAnswer: "<script src = 'xxx.js'"
    },
    {
    question: "How do you create a function in Javascript?",
    choice:[ "function = myFunction()", "function: myFunction()","function myFunction()", "None of the above"],
    correctAnswer: "function my Function()"   
    },
    {
    question: "How do you call a function named 'myFunction'?",
    choice:[ "myFunction()", "call myFunction()","call function MyFunction()", "All of the above are valid"],
    correctAnswer: "myFunction()" 
    },
    {
    question: "Loading...",
    choice: ["Loading...","Loading...","Loading...","Loading..."],
    correctAnswer: "Placeholder"
    }]



    




// function variables 
var secondsLeft = 60;   
var highScore = 0;
var currentQuestion = 0;
var lastAnswer = "";

// This moves from the start screen to the first question
function beginQuiz (){
    header.setAttribute("class", "hide");
    section.setAttribute("class", "unhide");
    timer();
    nextQuestion();
}

// This is what iterates through the objects in the qNa array 
function nextQuestion(){
    lastAnswer = this.textContent;
    console.log(lastAnswer)
    //if (currentQuestion < 5){ //issue here 
    questionDisplay.textContent = qNa[currentQuestion].question
    option1.textContent = qNa[currentQuestion].choice[0]
    option2.textContent = qNa[currentQuestion].choice[1]
    option3.textContent = qNa[currentQuestion].choice[2]
    option4.textContent = qNa[currentQuestion].choice[3]
    //}
    if (lastAnswer === undefined){
        console.log("started")
    }
    else if (lastAnswer === qNa[currentQuestion-1].correctAnswer){
        console.log("correct")
    }
    else if (lastAnswer !== qNa[currentQuestion-1].correctAnswer){
        secondsLeft -= 12;
        console.log("incorrect");
    }
    currentQuestion++ //move to function checking for correct answer 
    

}

// This is what checks for the correct answer 
function correctAnswer(){
    if (this.textcontent == qNa[currentQuestion.correctAnswer]){
        highScore++;
    }
    else {
        secondsLeft = secondsLeft - 12; 
    }
}

// This is creating the functionality of the timer 

function timer(){
    var interval = setInterval(function () {
        secondsLeft--
        timerDisplay.textContent = secondsLeft;
        if (secondsLeft <= 0 || currentQuestion === 6){
            clearInterval(interval);
            section.setAttribute("class", "hide");
            highScoreSection.setAttribute("class", "");
            // localStorage.setItem("score", secondsLeft)
        }
    }, 1000)
    
}
/* <tr>
<th scope="row">3</th>
<td>Larry</td>
<td>the Bird</td>

</tr> */
if(localStorage.getItem("initials")){
    var initialArr = JSON.parse(localStorage.getItem("initials"))
    var scoreArr = JSON.parse(localStorage.getItem("score"))
}
var initialArr = []
var scoreArr = []

function save(){
    var valueText = textArea.value;
    initialArr.push(valueText)
    scoreArr.push(secondsLeft)
    localStorage.setItem("initials", JSON.stringify(initialArr))
    localStorage.setItem("score", JSON.stringify(scoreArr))
    table.setAttribute("class", "")
    for(i=0; i<initialArr.length; i++) {
        var newTR = document.createElement("tr")
        var newTH = document.createElement("th")
        newTH.setAttribute("scope", "row");
        newTH.textContent = i+1;
        var newTDInitials = document.createElement("td");
        var newTDScore = document.createElement("td");
        newTDInitials.textContent = initialArr[i]
        newTDScore.textContent = scoreArr[i]
        newTR.appendChild(newTH);
        newTR.appendChild(newTDInitials);
        newTR.appendChild(newTDScore);
        tableBody.appendChild(newTR)
    }
    // localStorage.getItem("score")
}





start.addEventListener("click", beginQuiz); 
option1.addEventListener("click", nextQuestion); 
option2.addEventListener("click", nextQuestion); 
option3.addEventListener("click", nextQuestion); 
option4.addEventListener("click", nextQuestion); 
saveScoreBtn.addEventListener("click", save);

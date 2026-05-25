// Anti refresh check
if(sessionStorage.getItem("quizStarted") === "true"){
    alert("Quiz was interrupted or page refreshed. Quiz will restart.");
    sessionStorage.removeItem("quizStarted");
    location.reload();
}
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};
const questionBank = [
{q:"CPU stands for?",a:["Central Processing Unit","Computer Processing Unit","Central Program Unit","None"],correct:0},
{q:"RAM stands for?",a:["Random Access Memory","Read Access Memory","Run Access Memory","None"],correct:0},
{q:"Binary base is?",a:["2","8","10","16"],correct:0},
{q:"Shortcut for copy?",a:["Ctrl+C","Ctrl+V","Ctrl+X","Ctrl+Z"],correct:0},
{q:"HTML stands for?",a:["Hyper Text Markup Language","High Text Machine Language","Hyperlinks Text Mark","None"],correct:0},
{q:"CSS used for?",a:["Styling","Programming","Database","Networking"],correct:0},
{q:"Which is OS?",a:["Windows","Word","Excel","PowerPoint"],correct:0},
{q:"Input device?",a:["Keyboard","Monitor","Speaker","Printer"],correct:0},
{q:"WWW stands for?",a:["World Wide Web","Wide World Web","World Web Wide","None"],correct:0},
{q:"1 KB equals?",a:["1024 bytes","1000 bytes","512 bytes","2048 bytes"],correct:0},
{q:"Which is browser?",a:["Chrome","Windows","Linux","MS Word"],correct:0},
{q:"Excel is?",a:["Spreadsheet","Word Processor","OS","Browser"],correct:0},
{q:"Which is database?",a:["MySQL","HTML","CSS","CPU"],correct:0},
{q:"Monitor is?",a:["Output Device","Input Device","Storage","CPU"],correct:0},
{q:"USB is?",a:["Storage Interface","Software","OS","Language"],correct:0},
{q:"Shortcut for paste?",a:["Ctrl+V","Ctrl+C","Ctrl+X","Ctrl+Z"],correct:0},
{q:"MS Word is?",a:["Word Processor","OS","Browser","Compiler"],correct:0},
{q:"Which is storage device?",a:["Hard Disk","Mouse","Keyboard","Scanner"],correct:0},
{q:"Google is?",a:["Search Engine","OS","Software","Hardware"],correct:0},
{q:"IP stands for?",a:["Internet Protocol","Internal Program","Input Protocol","None"],correct:0}
];

let selectedQuestions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 20;
let studentName = "";
window.onbeforeunload = function () {
    return true;
};
function startQuiz() {
    studentName = document.getElementById("studentName").value;

    if(studentName === "") {
        alert("Please enter your name");
        return;
    }

    selectedQuestions = questionBank.sort(() => 0.5 - Math.random()).slice(0, 10);

    document.getElementById("startSection").style.display = "none";
    document.getElementById("quizSection").style.display = "block";

    loadQuestion();
	function startQuiz() {

    studentName = document.getElementById("studentName").value;

    if(studentName === ""){
        alert("Please enter your name");
        return;
    }

    // mark quiz started
    sessionStorage.setItem("quizStarted","true");

    selectedQuestions = questionBank.sort(()=>0.5 - Math.random()).slice(0,10);

    document.getElementById("startSection").style.display="none";
    document.getElementById("quizSection").style.display="block";

    loadQuestion();
}
}

function loadQuestion() {

    if(currentQuestion >= selectedQuestions.length) {
        finishQuiz();
        return;
    }

    let q = selectedQuestions[currentQuestion];

    // Shuffle options
    let options = q.a.map((text, index) => ({text, index}));
    options.sort(() => Math.random() - 0.5);

    let optionsHTML = "";
    options.forEach(opt => {
        optionsHTML += `
        <input type="radio" name="answer" value="${opt.index}">
        ${opt.text}<br>
        `;
    });

    document.getElementById("questionBox").innerHTML = `
        <h4>${currentQuestion+1}. ${q.q}</h4>
        ${optionsHTML}
    `;

    timeLeft = 20;
    document.getElementById("timer").innerText = "Time Left: 20 sec";

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerText = "Time Left: " + timeLeft + " sec";

        if(timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}
function nextQuestion() {
    clearInterval(timer);

    let selected = document.querySelector('input[name="answer"]:checked');
    if(selected && parseInt(selected.value) === selectedQuestions[currentQuestion].correct) {
        score++;
    }

    currentQuestion++;
    loadQuestion();
}

function finishQuiz() {
    document.getElementById("quizSection").style.display = "none";
    document.getElementById("resultSection").style.display = "block";
    document.getElementById("scoreText").innerText = 
        "Your Score: " + score + " / 10";
	function finishQuiz(){

    sessionStorage.removeItem("quizStarted");

    document.getElementById("quizSection").style.display="none";
    document.getElementById("resultSection").style.display="block";

    document.getElementById("scoreText").innerText =
    "Your Score: " + score + " / 10";
}
}

function generateCertificate() {
    document.getElementById("resultSection").style.display = "none";
    document.getElementById("certificateSection").style.display = "block";

    document.getElementById("certName").innerText = studentName;
    document.getElementById("certScore").innerText = 
        "Score Achieved: " + score + " / 10";
	document.querySelector(".cert-date").innerText =
	"Date: " + new Date().toLocaleDateString();
}
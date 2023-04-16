const questionEl=document.getElementById("QuestionNo");
const answerButton=document.getElementById("answerBtn");
const nextButton=document.getElementById("nextbtn");

const questions=[
    {
        question:"The national bird of India is?",
        answers:[
            {text:"Shark",correct:false},
            {text:"Peacock",correct:true},
            {text:"Shark",correct:false},
            // {text:"Shark",correct:false}, 
           
        ]    
    },

    {
        question:"Who is the son of River Ganga in the Mahabharata?" ,
        answers:[
            {text:"Arjun",correct:false},
            {text:"Vidhur", correct:false},
            {text:"Bhisma",correct:true},
        ]     
    },

    {
        question:"Who killed Duryodhan in The Mahabharata?" ,
        answers:[
            {text:"Bhim",correct:true},
            {text:"Arjun", correct:false},
            {text:"Yudhishtir",correct:false},
        ]     
    },

    {
        question:"Name the only mammal that has no stomatch?" ,
        answers:[
            {text:"Moth",correct:true},
            {text:"Butterfly", correct:false},
            {text:"Bat",correct:false},
        ]     
    },

    {
        question:"The state anthem of Assam is?" ,
        answers:[
            {text:"Axom amr Rupohi",correct:false},
            {text:"Ami Oxomiya Nohou Dukhia", correct:false},
            {text:"O mur Apunar Dekh",correct:true},
        ]   
    }
]

let score=0;
let currentQuestionIndex=0;

function play(){
    score=0;
    currentQuestionIndex=0;
    nextButton.innerHTML="Next";
    showQuestion();

}

function showQuestion(){
    resetButtons();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionEl.innerHTML=questionNo+". "+currentQuestion.question;

    //answer part:
    currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("answers-btn");
        answerButton.appendChild(button);
      
        if(answer.correct){
            button.dataset.correct=answer.correct;//storing the value of true and false here
           
        }
        button.addEventListener("click",selectAnswer);

    });
}

function resetButtons(){
    nextButton.style.display="none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}


function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
        console.log(score);
    }else{
        selectedBtn.classList.add("incorrect");

    }
    Array.from(answerButton.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }else{
            button.disabled=true;
        }
    });

    nextButton.style.display="block";
}

play();

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        play();
    }
});

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetButtons();
    questionEl.innerHTML=`You scored : ${score} out of ${questions.length}`;
     nextButton.innerHTML="Play Again";
     nextButton.style.display="block";

}
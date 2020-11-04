import Question from "./Question.js";
import Quiz from "./Quiz.js";

const App = (() => {
    //cache the dom
    const quizEl = document.querySelector(".jabquiz");
    const quizQuestionEl = document.querySelector(".jabquiz__question");
    const trackerEl = document.querySelector(".jabquiz__tracker");
    const tagLineEl = document.querySelector(".jabquiz__tagLine");
    const choicesEl = document.querySelector(".jabquiz__choices");
    const progressEl = document.querySelector(".progress__inner");
    const nextButtonEl = document.querySelector(".next");
    const restarButtonEl = document.querySelector(".restart");

    const q1 = new Question(
        "First President of US?",
        ["Barrack Obama", "George Bush", "George Washington", "Bill Clinton"],
        2
    )
    const q2 = new Question(
        "When was Javascript created?",
        ["June 1995", "May 1995", "July 1885", "Sep 1996"],
        1
    )
    const q3 = new Question(
        "What does CSS stand for?",
        ["County Sheriff Service", "Cascading sexy sheets", "Cascading style sheets"],
        2
    )
    const q4 = new Question(
        "The full form of HTML is...?",
        ["Hypertext markup language", "hold the mic", "ERROR"],
        0
    )
    const q5 = new Question(
        "Console.log(typeof []) would return what?",
        ["Array", "Object", "Null", "array"],
        1
    )

    const quiz = new Quiz([q1, q2, q3, q4, q5]);

    const setValue = (elem, value) => {
        elem.innerHTML = value;
    }

    const renderQuestion = _ => {
        const question = quiz.getCurrentQuestion().question;
        setValue(quizQuestionEl, question);
    }

    const renderChoicesElements = _ => {
        let markup = "";
        const currentChoices = quiz.getCurrentQuestion().choices;
        currentChoices.forEach((elem, index) => {
            markup +=  `
                <li class="jabquiz__choice">
                    <input type="radio" name="choice" class="jabquiz__input" data-order="${index}" id="choice${index}">
                    <label for="choice${index}" class="jabquiz__lable">
                    <i></i>
                    <span>${elem}</span>
                    </label>
                </li>
            `
        })
        setValue(choicesEl, markup);
    }

    const renderTracker = _ => {
        const index = quiz.currentIndex;
        setValue(trackerEl, `${index + 1} of ${quiz.questions.length}`)
    }

    const getPercentage = (num1,num2) => {
        return Math.round((num1/num2) * 100);
    }

    const launch = (width, maxPercentage) => {
        let loadingBar = setInterval(() => {
            if (width > maxPercentage) {
                clearInterval(loadingBar);
            } else {
                width++;
                progressEl.style.width = width + "%";
            }
        }, 3);
    }

    const renderProgress = _ => {
        // 1. width
        const currentWidth = getPercentage(quiz.currentIndex, quiz.questions.length);
        // 2. launch(0, width)
        launch(0, currentWidth);
    }

    const listeners = _ => {
        nextButtonEl.addEventListener("click", function () {
            const selectedRadioEl = document.querySelector('input[name=choice]:checked');
            if (selectedRadioEl) {
                const key = Number(selectedRadioEl.getAttribute("data-order"));
                quiz.guess(key);
                renderAll();
            }
        })
        restarButtonEl.addEventListener("click", function () {
            // 1. reset the quiz
            quiz.restQuiz();
            // 2. renderAll again
            renderAll();
            // 3. restore nextButton
            nextButtonEl.style.opacity = 1;
        })

    }

    const renderEndScreen = _ => {
        setValue(quizQuestionEl, `Great Job!`);
        setValue(tagLineEl, `Completed!`);
        setValue(trackerEl, `Your score: ${getPercentage(quiz.score, quiz.questions.length)}%`);
        nextButtonEl.style.opacity = 0;
        renderProgress();
    }

    const renderAll = _ => {
        if (quiz.hasEnded()) {
            //renderEndScreen
            renderEndScreen();
        } else {
             // 2. render the question
             renderQuestion();
             // 3. render the choices elements
             renderChoicesElements();
             // 4. render the tracker
             renderTracker();
             // 5. render the progress
             renderProgress();
        }
    }
    return {
        renderAll: renderAll,
        listeners: listeners
    }

})();

App.renderAll();
App.listeners();
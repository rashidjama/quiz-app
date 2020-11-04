const tagLineEl = document.querySelector(".jabquiz__tagLine");
export default function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.currentIndex = 0;
}

Quiz.prototype.getCurrentQuestion = function () {
    return this.questions[this.currentIndex];
}
Quiz.prototype.nextIndext = function() {
    return this.currentIndex++;
}
Quiz.prototype.hasEnded = function () {
    return this.currentIndex === this.questions.length;
}
Quiz.prototype.guess = function (userGuess) {
    const currentQuestion = this.questions[this.currentIndex];
    if (currentQuestion.isCorrect(userGuess)) {
        this.score++;
    }
    this.nextIndext();
}
Quiz.prototype.restQuiz = function () {
    this.score = 0;
    this.currentIndex = 0;
    tagLineEl.textContent = 'Pick an option below!';
}




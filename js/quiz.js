export class Quiz {
    constructor(questions, amount) {
        this.questions = questions;
        this.amount = amount;
        this.currentQuestionIndex = 0;
        this.allRightAnswer = 0;
        this.elementQuestion = document.getElementById("question");
        this.elementCurrentQuestion = document.getElementById("current");
        this.elementTotalQustion = document.getElementById("totalAmount");
        this.elementRowAnswer = document.getElementById("rowAnswer");
        this.checkedAnswer = document.getElementsByName('answer');
        this.finishScreen = document.getElementById("finish");
        this.nextBtn = document.getElementById("next");
        this.showQuestion();
        this.nextBtn.addEventListener("click", this.getNextQuestion.bind(this));
        this.tryAgainBtn = document.getElementById("tryBtn");
        this.tryAgainBtn.addEventListener("click", this.tryAgain.bind(this));
    }
    showQuestion() {
        this.elementCurrentQuestion.innerHTML = this.currentQuestionIndex + 1;
        this.elementTotalQustion.innerHTML = this.amount;
        this.elementQuestion.innerHTML = this.questions[this.currentQuestionIndex].question;
        this.elementRowAnswer.innerHTML;
        let answer = this.getAnswer(this.questions[this.currentQuestionIndex]);
        this.showAnswer(answer);
    }
    getNextQuestion() {
        let getCheckedElement = [...this.checkedAnswer].filter(el => el.checked);
        let rightAnswer = this.questions[this.currentQuestionIndex].correct_answer;
        this.currentQuestionIndex++;
        (this.currentQuestionIndex < this.amount) ? this.showQuestion() : this.finish();
        this.handleCheckedAnswer(getCheckedElement, rightAnswer);
    }
    getAnswer(currenAnswer) {
        let answerArray = [currenAnswer.correct_answer, ...currenAnswer.incorrect_answers];

        let ranNums = [],
            i = answerArray.length,
            j = 0;

        while (i--) {
            j = Math.floor(Math.random() * (i + 1));
            ranNums.push(answerArray[j]);
            answerArray.splice(j, 1);
        }
        return ranNums;

    }
    showAnswer(anArray) {
        let temp = '';
        for (let i = 0; i < anArray.length; i++) {
            temp += `
            
            <div class="form-check">
            <label class="form-check-label">
                <input type="radio" class="form-check-input" name="answer" id="q${i}" value='${anArray[i]}'>
                ${anArray[i]}
            </label>
        </div>
            
            
            
            `


        }
        this.elementRowAnswer.innerHTML = temp;

    }
    handleCheckedAnswer(cAnswer, rAnswer) {
        if (cAnswer[0].value == rAnswer) {
            console.log("thats  a  right answer ...");
            this.allRightAnswer++;
            $("#Correct").fadeIn(500, () => {
                $("#Correct").fadeOut(500);
            });
            console.log(this.allRightAnswer);

        } else {
            $("#inCorrect").fadeIn(500, () => {
                $("#inCorrect").fadeOut(500);
            });

        }
    }
    finish() {

        $("#quiz").fadeOut(500, () => {
            $(this.finishScreen).fadeIn(500);
            document.getElementById("score").innerHTML = this.allRightAnswer;
        })


    }
    tryAgain() {
        $("#finish").fadeOut(500, () => { $("#setting").fadeIn(500) });
        document.getElementById("Number").value = '';
        let choosenRadio = document.getElementsByName('difficulty');
        let choosenRadioArray = [...choosenRadio];
        choosenRadioArray[0].checked = true;
    }

}
import {Quiz} from './quiz.js'
export class Setting {
    constructor() {
        this.elementCategory = document.getElementById('category');
        this.elementCount = document.getElementById("Number");
        this.elementDifficulty = document.getElementsByName('difficulty');
        this.startBtn = document.getElementById("startBtn");
        this.startBtn.addEventListener("click", () => {
            this.startQuiz()
        });

    }
    async startQuiz() {
        let amount = this.elementCount.value;
        let category = this.elementCategory.value;
        let difficulty = [...this.elementDifficulty].filter(ay7aga => ay7aga.checked);
        let url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty[0].value}`;
        let result = await this.fetchUrl(url);
        if (result.length > 0) {
                    $("#setting").fadeOut(500,()=>{$("#quiz").fadeIn(500)})
                    new Quiz(result,amount);

        }
        console.log(result.length);
    }

    async fetchUrl(url) {
        let respone = await fetch(url);
        let data = await respone.json();
        return data.results;
    }
}





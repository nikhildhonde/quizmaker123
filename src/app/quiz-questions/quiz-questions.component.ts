import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { questions } from '../app.model';

@Component({
  selector: 'app-quiz-questions',
  templateUrl: './quiz-questions.component.html',
  styleUrls: ['./quiz-questions.component.css']
})
export class QuizQuestionsComponent {
  constructor(private router: Router) { }

  @Input() questions: questions[] = [];
  @Input() correctAns: string[] = [];
  @Input() isQuizResultPage: boolean = false;
  @Input() toJudge: string[] = [];
  selectOption: string[] = [];
  isQuizSubmitted: boolean = false;
  allOptionsSelected: boolean = false;

  ngOnInit() {
    if (!this.isQuizResultPage) {
      this.selectOption = [];
      this.isQuizSubmitted = false;
      return;
    }

    this.selectOption = this.toJudge;
    this.isQuizSubmitted = true;
  }

  //This function click the option 
  clickOption(option: string, questionNum: number) {
    this.selectOption[questionNum] = option
    if (this.selectOption.length == this.questions.length) {
      var counter = 0;
      for (let i = 0; i < this.selectOption.length; i++) {
        if (this.selectOption[i] == undefined) {
          counter = counter + 1;
        }
      }
      if (counter == 0) {

        this.allOptionsSelected = true;
      }
      else {
        this.allOptionsSelected = false;
      }
    }

  }
 
  // shows which option is selected
  clickedOption(option: string, questionNum: number) {
    return option === this.selectOption[questionNum]
  }

  //show the correct answer
  correctAnswer(option: string, questionNum: number) {
    return this.isQuizSubmitted ? option === this.correctAns[questionNum] : false;
  }

  //show the wrong answer

  wrongAnswer(option: string, questionNum: number) {
    if (!this.isQuizSubmitted) {
      return false;
    }

    if (option === this.correctAns[questionNum]) {
      return false;
    }
    return this.selectOption[questionNum] === option;
  }

  //Submit the quiz and navigate to Quiz Result page
  submitQuiz() {
    localStorage.setItem('questions', JSON.stringify(this.questions));
    localStorage.setItem('selectedAnswer', JSON.stringify(this.selectOption));
    localStorage.setItem('correctAnswer', JSON.stringify(this.correctAns));
    this.router.navigate(['/quiz-result'])
  }

  changeFormat(format:string){
    var questionFormat = document.createElement('textarea');
    questionFormat.innerHTML = format;
    return questionFormat.value;

  }
}




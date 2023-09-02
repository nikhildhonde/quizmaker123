import { Component } from '@angular/core';
import{Router} from '@angular/router';
import { questions } from '../app.model';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.css']
})
export class QuizResultComponent {

  questions: questions[] = [];
  selectedAnswer: string[] = [];
  correctAns: string[] = [];
  marksObtained: boolean = false;
  marks: number = NaN;

  constructor(private router:Router) { }

  ngOnInit() {
    if(
      !localStorage.getItem('questions')||
      !localStorage.getItem('selectedAnswer')||
      !localStorage.getItem('correctAnswer')
    ){
      // this.router.navigate(['/'])
    }

    this.questions = JSON.parse(
      localStorage.getItem('questions') || '[]'
    );
    this.selectedAnswer=JSON.parse(
      localStorage.getItem('selectedAnswer')||'[]'
    );

    this.correctAns=JSON.parse(
      localStorage.getItem('correctAnswer')|| '[]'
    );

    this.showResult();
   }

   //shows result with the correct and wrong answers

  showResult() {
    this.marks = this.selectedAnswer.reduce((acc, current) => {
      return acc + (this.correctAns.indexOf(current) === -1 ? 0 : 1);
    }, 0);

    this.marksObtained = true;
  }

  //Navigate to create new quiz page 
  backToCreateQuiz(){
    this.router.navigate(['quiz-maker'])
  }
}

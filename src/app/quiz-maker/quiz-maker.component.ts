import { Component, Input } from '@angular/core';
import { QuizCategoryService } from '../services/quiz-category.service';
import { QuizQuestionsService } from '../services/quiz-questions.service';
import { Router } from '@angular/router'
// import { questions } from '../app.model';
import { questionCategory, categoryModel, questions, ApiResponse, ansModel } from '../app.model';

@Component({
  selector: 'app-quiz-maker',
  templateUrl: './quiz-maker.component.html',
  styleUrls: ['./quiz-maker.component.css']
})
export class QuizMakerComponent {
  @Input() questions: questions[] = [];
  @Input() correctAns: string[] = [];
  category: categoryModel[] = [];
  selectedQuizCategory: string | null = null;
  selectedDifficultyLevel: string | null = null;
  incorrectAns: string[] = [];
  selectOption: string[] = [];
  isQuizSubmitted: boolean = false;



  constructor(private quizCategory: QuizCategoryService,
    private quizQuestions: QuizQuestionsService,
    private router: Router) {

  }
  ngOnInit() {
    this.getQuizCategory();
  }


  //Integration of category service in the quiz component 
  getQuizCategory() {
    this.quizCategory.selectCategory().subscribe((data: questionCategory) => {
      this.category = data.trivia_categories;
    })
  }


  //To show the dropdown to user when it tries to change category 
  changeQuizCategory(event: Event) {
    this.selectedQuizCategory = (event.target as HTMLSelectElement).value;
  }


  //To show the difficulty level to user when it tries to change difficulty 
  changeDifficultyLevel(event: Event) {
    this.selectedDifficultyLevel = (event.target as HTMLSelectElement).value;
  }


  shuffleArray = (array: string[]): string[] => {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };


  //This function create a quiz when we click on button 
  createQuiz() {
    if (this.selectedQuizCategory && this.selectedDifficultyLevel) {
      const url = `https://opentdb.com/api.php?amount=5&category=${this.selectedQuizCategory}&difficulty=${this.selectedDifficultyLevel}&type=multiple`;

      this.quizQuestions.getQuizQuestions(url).subscribe((questions: ApiResponse) => {
        this.correctAns = [];
        this.incorrectAns = [];
        this.questions = questions.results.map(
          (item: ansModel, index: number) => {
            this.correctAns[index] = item.correct_answer;
            const options = [item.correct_answer];
            for (let i = 0; i < item.incorrect_answers.length; i++) {
              options.push(item.incorrect_answers[i])
            }

            const shuffleOptions = this.shuffleArray(options);
            return {
              ...item,
              options: shuffleOptions
            };
          }
        );
      });
    }
    else {
      console.log('Create a quiz by selecting category and difficulty level');
    }
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../app.model';

@Injectable({
  providedIn: 'root'
})
export class QuizQuestionsService {
  selectedQuizCategory: string | null = null;
  selectedDifficultyLevel: string | null = null;

  constructor(private http: HttpClient) { }

   url:string = `https://opentdb.com/api.php?amount=5&category=${this.selectedQuizCategory}&difficulty=${this.selectedDifficultyLevel}&type=multiple`;

  getQuizQuestions(url: string): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(url);
  }
}

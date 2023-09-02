import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { questionCategory } from '../app.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class QuizCategoryService {

  constructor(private http: HttpClient) { }

  url = "https://opentdb.com/api_category.php"

  //This function call the api to select category
  selectCategory():Observable<questionCategory> {
    return this.http.get<questionCategory>(this.url)

  }
}

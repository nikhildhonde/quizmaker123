import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizMakerComponent } from './quiz-maker/quiz-maker.component';
import { HttpClientModule } from '@angular/common/http';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { QuizQuestionsComponent } from './quiz-questions/quiz-questions.component'

@NgModule({
  declarations: [
    AppComponent,
    QuizMakerComponent,
    QuizResultComponent,
    QuizQuestionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

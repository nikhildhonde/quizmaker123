export interface categoryModel {
    name: string;
    id: number;
  }
  
  export interface questionModel {
    question: string;
    options: string[];
  }
  
  export interface answersModel {
    correct_answer: string;
    incorrect_answers: string[];
  }
  
  export interface questionCategory {
    trivia_categories: {
      name: string;
      id: number;
    }[];
  }
  
  export interface ansModel {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }
  
  export interface questions  {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    options: string[];
  }
  
  export interface ApiResponse {
    results: ansModel[];
  }
  
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<any> {
    return this.http.get(
      'https://newsapi.org/v2/top-headlines?country=us&category=business',
      {
        params: {
          apiKey: environment.apiKey,
        },
      }
    );
  }
}

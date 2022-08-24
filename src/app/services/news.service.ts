import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Article, NewsResponse } from '../models/News';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  getTopHeadlines(): Observable<Article[]> {
    return this.http
      .get<NewsResponse>(
        'https://newsapi.org/v2/top-headlines?country=us&category=business',
        {
          params: {
            apiKey: environment.apiKey,
          },
        }
      )
      .pipe(map(({ articles }) => articles));
  }
}

import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from '../../models/News';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  public categories: string[] = [
    'business',
    'entertainment',
    'general',
    'health',
    'science',
    'sports',
    'technology',
  ];
  public selectedCategory = this.categories[0];
  public articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit() {
    this.updateArticlesByCategory();
  }

  segmentChanged(category: string) {
    this.selectedCategory = category;
    this.updateArticlesByCategory(true);
  }

  updateArticlesByCategory(resetList: boolean = false): void {
    this.newsService
      .getTopHeadlinesByCategory(this.selectedCategory)
      .subscribe((articles) => {
        if (resetList) {
          this.articles = articles;
        } else {
          this.articles.push(...articles);
        }
      });
  }
}

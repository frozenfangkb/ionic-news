import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../models/News';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;

  constructor() {}
}

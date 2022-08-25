import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../models/News';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage | null = null;
  private localArticles: Article[] = [];

  constructor(private storageModule: Storage) {
    this.init();
  }

  get getLocalArticles() {
    return [...this.localArticles];
  }

  async init() {
    this.storage = await this.storageModule.create();
    await this.loadFavourites();
  }

  async saveRemoveArticle(article: Article) {
    if (this.localArticles.find((x) => x.title === article.title)) {
      this.localArticles = this.localArticles.filter(
        (x) => x.title !== article.title
      );
    } else {
      this.localArticles = [article, ...this.localArticles];
    }
    await this.storage.set('articles', this.localArticles);
  }

  async loadFavourites() {
    try {
      const articles = await this.storage.get('articles');
      this.localArticles = articles || [];
    } catch (error) {}
  }

  articleInFavourites(article: Article): boolean {
    return !!this.localArticles.find((x) => x.title === article.title);
  }
}

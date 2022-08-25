import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Article } from '../../models/News';
import {
  ActionSheetButton,
  ActionSheetController,
  Platform,
} from '@ionic/angular';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() index: number;

  constructor(
    private iab: InAppBrowser,
    private platform: Platform,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
  ) {}

  openArticle() {
    if (this.platform.is('ios') || this.platform.is('android')) {
      const browser = this.iab.create(this.article.url);
      browser.show();
    } else {
      window.open(this.article.url, '_blank');
    }
  }

  async onOpenMenu() {
    const articleInFavourites = this.storageService.articleInFavourites(
      this.article
    );

    const buttons: ActionSheetButton[] = [
      {
        text: articleInFavourites
          ? 'Remove from favourites'
          : 'Mark as favourite',
        icon: articleInFavourites ? 'heart-outline' : 'heart',
        handler: () => this.onToggleFavourite(),
      },
      {
        text: 'Cancel',
        icon: 'close-outline',
        role: 'cancel',
      },
    ];
    const share: ActionSheetButton = {
      text: 'Share',
      icon: 'share-outline',
      handler: () => this.onShareArticle(),
    };

    if (this.platform.is('capacitor')) {
      buttons.unshift(share);
    }

    const actionSheet = await this.actionSheetController.create({
      header: 'Options',
      buttons,
    });

    await actionSheet.present();
  }

  async onShareArticle() {
    const { title, source, url } = this.article;
    await this.socialSharing.share(title, source.name, null, url);
  }

  onToggleFavourite() {
    this.storageService.saveRemoveArticle(this.article);
  }
}

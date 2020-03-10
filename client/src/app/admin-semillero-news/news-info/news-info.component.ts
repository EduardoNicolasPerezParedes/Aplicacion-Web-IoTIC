import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { News } from 'src/_models/news.model';
import { NewsService } from 'src/_services/news.service';

@Component({
  selector: 'app-news-info',
  templateUrl: './news-info.component.html',
  styleUrls: ['./news-info.component.css']
})
export class NewsInfoComponent implements OnInit {
  /**
   * Contiene la información de la noticia.
   */
  public news: News;
  /**
   * Identificador de la noticia
   */
  public static id: string;

  constructor(
    private modalContent: NgbActiveModal, 
    private newsService: NewsService) { }

  ngOnInit() {
    this.setNews();
  }
  /**
   * Cierra el modal
   */
  public close() {
    this.modalContent.close();
  }

  /**
   * Setea la información de la noticia
   */
  private async setNews() {
    try {
      let res = await this.newsService.get(NewsInfoComponent.id).toPromise();
      this.news = News.fromJSON(res);
    } catch (err) {
      this.close();
    }
  }

  /**
   * Invacada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.setNews();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/_services/news.service';
import { News } from 'src/_models/news.model';
import { NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  /**
   * Contiene las noticias existentes
   */
  public news: Array<News>;
  /**
   * Contiene las cinco primeras noticias o menos
   */
  public some_news: Array<News>;
  /**
   * ¿Hay noticias disponibles?
   */
  public weHaveNews;

  constructor(private newsService:NewsService, private router:Router, private car_config:NgbCarouselConfig) {
    this.setNews().then(() => {
        this.weHaveNews = this.news.length > 0;
        this.loadSome_News();
      }
    );
  }

  ngOnInit() {
  }

  /**
   * Obtiene y setea los cursos
   */
  public async setNews() {
    let res:any = await this.newsService.list().toPromise();
    this.news = new Array<News>();
    
    res.forEach(news => {
      this.news.push(News.fromJSON(news));
    });
  }

  /**
   * Cargar las primeras cinco o menos noticias
   */
  public loadSome_News():void{
    this.some_news = new Array<News>();
    for (let i = 0; i < 5 && i < this.news.length; i++) {
      this.some_news.push(this.news[i])
    }
  }

  public ShowNews(id: string){
    console.log("clicado");
  }

}

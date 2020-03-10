import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt, faTimes, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NewsService } from 'src/_services/news.service';
import { News } from 'src/_models/news.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { NewsSharedService } from 'src/_services/news.shared.service';

interface HtmlInputEvent extends Event{
  target: HTMLInputElement & EventTarget;
}


@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.css']
})
export class NewsFormComponent implements OnInit {
  /**
   * Icono de Fecha noticia
   */
  faCalendarAlt = faCalendarAlt;
  /**
   * Noticia a ser registrada
   */
  public news: News;
  
  constructor(
    public modalContent: NgbActiveModal,
    private newsService: NewsService,
    private newsSharedService: NewsSharedService) {
    this.news = new News();
   }

  ngOnInit() {
  }

  /**
   * Invocada al dar click en Cancelar
   */
  public cancelOnClick() {
    this.close();
  }
  /**
   * Cierra el formulario
   */
  private close() {
    this.modalContent.close();
  }

  /**
   * Invocada al dar click en Agregar
   */
  public async addOnClick() {
    let msg = new MsgHelper();
    try {
      console.log(this.news);
      let res = await this.newsService.create(this.news).toPromise();
      msg.showSuccess('Noticia agregada exitosamente');
      this.close();
      this.newsSharedService.add(News.fromJSON(res));
    } catch(err) {
      if (err.status == 422) { msg.showError(err.error.error); }
    }
  }

}


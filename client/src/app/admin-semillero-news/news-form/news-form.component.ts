import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from 'src/_services/news.service';
import { News } from 'src/_models/news.model';
import { MsgHelper } from 'src/_helpers/msg.helper';
import { NewsSharedService } from 'src/_services/news.shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
   * Formulario de la Noticia
   */
  private newsForm: FormGroup;

  /**
   * ¿Se ha dado click en Agregar?
   */
  private submitted: boolean;
  
  constructor(
    public modalContent: NgbActiveModal,
    private newsService: NewsService,
    private newsSharedService: NewsSharedService,
    private formBuilder: FormBuilder) {
    this.submitted = false;
    this.newsForm = formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  get f() { return this.newsForm.controls; }

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
  public async onSubmit() {
    this.submitted = true;
    if (this.newsForm.invalid) { return; }

    let news = new News();
    news.title = this.newsForm.controls.title.value;
    news.description = this.newsForm.controls.description.value;

    let msg = new MsgHelper();
    try {
      let res = await this.newsService.create(news).toPromise();
      msg.showSuccess('Noticia agregada exitosamente');
      this.close();
      this.newsSharedService.add(News.fromJSON(res));
    } catch(err) {
      if (err.status == 422) { msg.showError(err.error.error); }
    }
  }

}


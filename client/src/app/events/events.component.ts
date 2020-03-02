import { Component, OnInit } from '@angular/core';
import { Event } from 'src/_models/event.model';
import { EventService } from 'src/_services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  /**
   * ¿Hay eventos disponibles?
   */
  public weHaveEvents: boolean;

  /**
   * Eventos disponibles
   */
  public events: Array<Event>;

  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.setEvents().then(() => {
      this.weHaveEvents = this.events.length > 0;
    })
  }

  public showEvent(id: string) {
    // TODO: Mostrar la información del evento
    alert(id);
  }

  /**
   * Obtiene y setea los eventos registrados
   */
  private async setEvents() {
    let res:any = await this.eventService.list().toPromise();
    this.events = new Array<Event>();

    res.forEach(event => {
      this.events.push(Event.fromJSON(event));
    });
  }
}

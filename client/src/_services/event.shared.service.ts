import { Injectable, Output, EventEmitter } from '@angular/core';
import { Event } from '../_models/event.model';
import { EventService } from './event.service';

@Injectable()
export class EventSharedService {
    /**
     * Permite referenciar a los cursos
     */
    @Output() eventsEmitter: EventEmitter<any> = new EventEmitter();

    /**
     * Cursos registrados
     */
    private _events: Array<Event>;

    constructor(private eventService: EventService) { 
    }
 
    get events() { return this._events; }
    set events(value: Array<Event>) { this._events = value; }

    /**
     * Agrega un evento
     * @param event Evento a agregar
     */
    public add(event: Event) {
      this._events.push(event);
    }

    /**
     * Retorna la referencia a los eventos
     */
    public refEvents() {
        return this.eventsEmitter;
    }
}
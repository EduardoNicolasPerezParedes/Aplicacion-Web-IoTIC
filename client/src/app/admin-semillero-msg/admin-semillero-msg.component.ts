import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/_services/message.service';
import { Message } from 'src/_models/message.model';
import { MsgHelper } from 'src/_helpers/msg.helper';

@Component({
  selector: 'app-admin-semillero-msg',
  templateUrl: './admin-semillero-msg.component.html',
  styleUrls: ['./admin-semillero-msg.component.css']
})
export class AdminSemilleroMsgComponent implements OnInit {
  /**
   * Mensajes
   */
  public messages: Array<Message>;

  /**
   * ¿Hay mensajes?
   */
  public weHaveMessages: boolean;

  constructor(private messageService: MessageService) { 
    this.setMessages();
  }

  ngOnInit() {
  }

  public async setMessages() {
    let res = await this.messageService.list().toPromise();
    let messages_list = res as Array<any>;
    this.messages = new Array<Message>();

    messages_list.forEach(msg => {
      this.messages.push(new Message(
        msg._id,
        msg.sender,
        msg.email,
        msg.phone_number,
        msg.message,
        new Date(msg.send_at)
      ));
    });

    this.weHaveMessages = this.messages.length > 0;
  }

  public async deleteOnClick(id: string) {
    let msg = new MsgHelper();

    let res = await msg.showConfirmDialog('Confirmación', '¿Está seguro que desea eliminar el mensaje?');

    if (res.value) {
      try {
        await this.messageService.delete(id).toPromise();
      } catch(err) {
        if (err.status == 200) {
          msg.showSuccess('El mensaje fue eliminado exitosamente');
          this.setMessages();
          return;
        }
        msg.showError('El mensaje no pudo ser eliminado');
      }
    }
  }
}

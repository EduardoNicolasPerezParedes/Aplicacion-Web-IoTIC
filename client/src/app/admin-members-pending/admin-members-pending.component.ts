import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user.model';
import { UserService } from 'src/_services/user.service';

@Component({
  selector: 'app-admin-members-pending',
  templateUrl: './admin-members-pending.component.html',
  styleUrls: ['./admin-members-pending.component.css']
})
export class AdminMembersPendingComponent implements OnInit {
  /**
   * ¿Hay solicitudes pendientes?
   */
  public weHavePendings: boolean;

  /**
   * Solicitudes pendientes
   */
  public pendings: Array<User>;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.setPendings().then(() => {
      this.weHavePendings = this.pendings.length > 0;
    })
  } 
  
  /**
   * Obtiene y setea las solicitudes pendientes
   */
  private async setPendings() {
    let res:any = await this.userService.listPending().toPromise();
    this.pendings = new Array<User>();

    res.forEach(pending => {
      this.pendings.push(User.fromJSON(pending));
    });
  }
}

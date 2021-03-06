import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencials.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public creds : CredenciaisDTO = {
    email : '',
    senha : ''
  };



  constructor(public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService) {

  }

  login() {
    this.auth.authenticate(this.creds).
      subscribe(response => {
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");        
      },
      error => {
      });
  }

  ionViewDidEnter() {
    this.auth.refreshToken().
      subscribe(response => {
        this.auth.sucessfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot("CategoriasPage");        
      },
      error => {
      });    
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}

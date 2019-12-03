import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credencials.dto';

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

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }

  login() {
    console.log(this.creds);
    this.navCtrl.setRoot("CategoriasPage");
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}

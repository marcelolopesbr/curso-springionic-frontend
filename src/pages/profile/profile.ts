import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storageservice';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  public email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public storageService: StorageService) {
  }

  ionViewDidLoad() {
    this.email = this.storageService.getLocalUser().email;
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  public items:CategoriaDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    console.log("Categoria carregada");
    this.categoriaService.findAll().
      subscribe(response => {
        this.items = response;
      },
      error => {
        if (error.status = 401) {
          this.navCtrl.setRoot('HomePage');
        }
      })

  }

}

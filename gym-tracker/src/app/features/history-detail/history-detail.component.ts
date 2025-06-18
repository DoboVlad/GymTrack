import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeOutline } from 'ionicons/icons';
import { Workout } from 'src/app/models/Workout';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss'],
  imports: [CommonModule, IonicModule]
})
export class HistoryDetailComponent  implements OnInit {
  @Input() workout!: Workout;
  
  constructor(private modalCtrl: ModalController) {
    addIcons({ closeOutline });
   }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}

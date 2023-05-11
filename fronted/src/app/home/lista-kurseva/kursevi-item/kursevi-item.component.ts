import { Component, Input, OnInit } from '@angular/core';
import { Kursevi } from '../../kursevi.model';

@Component({
  selector: 'app-kursevi-item',
  templateUrl: './kursevi-item.component.html',
  styleUrls: ['./kursevi-item.component.css']
})
export class KurseviItemComponent implements OnInit {

  @Input() kursevi: Kursevi;
  @Input() index: string;

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'All', url:'type/all'},
    { title: 'Bug', url:'type/bug'},
    { title: 'Dragon', url:'type/dragon'},
    { title: 'Electric', url:'type/electric'},
    { title: 'Fire', url:'type/fire'},
    { title: 'Fairy', url:'type/fairy'},
    { title: 'Flying', url:'type/flying'},
    { title: 'Fighting', url:'type/fighting'},
    { title: 'Ghost', url:'type/ghost'},
    { title: 'Grass', url:'type/grass'},
    { title: 'Ground', url:'type/ground'},
    { title: 'Ice', url:'type/ice'},
    { title: 'Normal', url:'type/normal'},
    { title: 'Poison', url:'type/poison'},
    { title: 'Psychic', url:'type/psychic'},
    { title: 'Rock', url:'type/rock'},
    { title: 'Steel', url:'type/steel'},
    { title: 'Water', url:'type/water'}
  ];
  
  constructor() {}

}


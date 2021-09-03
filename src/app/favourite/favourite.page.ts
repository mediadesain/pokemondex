import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  public list:any;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.list = JSON.parse(localStorage.getItem('favourites'))
  }
  addRemoveFavourite(target, key){
    console.log(target, key)
    target.splice(key, 1)
    localStorage.setItem('favourites', JSON.stringify(target))
  }

}

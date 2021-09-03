import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public list: any = [];
  public favouritelist: any = [];
  public type: string;
  
  //Querying limit item Api Side
  public apiurl:string = 'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0';
  public nextapiurl:string = '';

  //Querying max limit item manual
  public apibytype:string = 'https://pokeapi.co/api/v2/type';
  public preitem:any = [];
  public totalitem:number = 12;
  
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    var favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    this.favouritelist = favourites.map(x=>x.name);
    //console.log('Favourite', this.favouritelist);
    this.type = this.activatedRoute.snapshot.paramMap.get('type');
    if(this.type === 'all'){
      console.log('All type of Pokemon')
      this.http.get(this.apiurl).subscribe(
        (data:any) => {
          var newlist = data.results;
          newlist.forEach( (item:any) => {
            this.http.get(item.url).subscribe(
              (datadetail:any) => {
                item.types = datadetail.types.map(x=>x.type.name)
                //item.thumbnail = datadetail.sprites.other.dream_world.front_default
                item.thumbnail = datadetail.sprites.other['official-artwork'].front_default
              }
            )
          });
          //console.log("Pokemons List",newlist)
          this.list = this.list.concat(newlist)
          this.nextapiurl = data.next;
        },
        (err) => {},
        () => {}
      )
    } else {
      console.log('Spesific type of Pokemon')
      this.http.get(this.apibytype+'/'+this.type).subscribe(
        (data:any) => {
          console.log(data)
          var newlist = data.pokemon.map(a=>a.pokemon);
          newlist.forEach( (item:any) => {
            this.http.get(item.url).subscribe(
              (datadetail:any) => {
                item.types = datadetail.types.map(x=>x.type.name)
                item.thumbnail = datadetail.sprites.other['official-artwork'].front_default
              }
            )
          });
          this.preitem = this.list.concat(newlist);
          this.list = newlist.slice(0, this.totalitem);
        },
        (err) => {},
        () => {}
      )
    }
  }

  addFavourite(val:any){
    //Get Favourite list
    var favourites = JSON.parse(localStorage.getItem('favourites')) || []
    //Condition Add/Remove
    var idx = favourites.map(a=>a.name).indexOf(val.name)
    if(idx != -1) favourites.splice(idx, 1)
    else favourites.push(val)
    //Set & Update Data
    localStorage.setItem('favourites', JSON.stringify(favourites))
    this.favouritelist = favourites.map(x=>x.name);
  }

  loadData(event) {
    if(this.type === 'all'){
      setTimeout(() => {
        event.target.complete();
        this.apiurl = this.nextapiurl;
        this.ngOnInit()
      }, 500);
    } else {
      setTimeout(() => {
        event.target.complete();
        console.log('pust items number', this.totalitem, this.totalitem+this.totalitem)
        this.totalitem = this.totalitem+this.totalitem
        var newlist = this.preitem.slice(this.totalitem, this.totalitem+this.totalitem)
        this.list = this.list.concat(newlist)
      }, 500);
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = !this.infiniteScroll.disabled;
  }

}

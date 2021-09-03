import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  public item : any;
  public activetab : string = 'detail';
  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) { }

  ngOnInit() {
    var itemname = this.activatedRoute.snapshot.paramMap.get('name')
    this.http.get('https://pokeapi.co/api/v2/pokemon/'+itemname).subscribe(
      (data:any) => {
        console.log('data', data)
        this.item = data;
        this.item.types = data.types.map(x=>x.type.name)
        this.item.abilities = data.abilities.map(x=>x.ability.name)
        var statname = data.stats.map(x=>x.stat.name)
        var statvalue = data.stats.map(x=>x.base_stat)
        var i;
        this.item.statsparse = [];
        for(i=0;i<statname.length;i++){
          //console.log(i, statname[i], statvalue[i])
          console.log('test', statname[i].includes('special-'))
          var test = {
            name: statname[i].includes('special-')? statname[i].replace('special-', 'S-') : statname[i],
            value:statvalue[i]
          }
          this.item.statsparse.push(test)
        }
        this.item.moves = this.item.moves.map(x=>x.move.name.replace('-',' '))
      },
      (err) => {},
      () => {}
    )
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail.value);
  }

}

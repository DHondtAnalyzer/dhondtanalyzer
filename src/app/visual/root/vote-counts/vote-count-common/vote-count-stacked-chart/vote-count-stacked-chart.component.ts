import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-count-stacked-chart',
  templateUrl: './vote-count-stacked-chart.component.html',
  styleUrls: ['./vote-count-stacked-chart.component.css']
})
export class VoteCountStackedChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public barChartOptions:any = {
    responsive: true,
    scales: {
      xAxes: [{
        stacked: true,
        display: false,
      }],
      yAxes: [{
        stacked: true,
        display: false,
      }]
    }
  };
  public barChartType:string = 'bar';

  public barChartData:any[] = [
    {data: [65], label: 'Series A'},
    {data: [28], label: 'Series B'},
    {data: [28], label: 'Series C'},
    {data: [28], label: 'Series D'},
  ];

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  public randomize():void {
    // Only Change 3 values
    let data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    let clone = JSON.parse(JSON.stringify(this.barChartData));
    clone[0].data = data;
    this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }

}

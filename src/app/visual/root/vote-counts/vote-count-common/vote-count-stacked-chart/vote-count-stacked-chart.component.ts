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
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        stacked: true,
        display: false,
        ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }],
      yAxes: [{
        stacked: true,
        display: false,
        ticks: {
          stepSize: 1,
          beginAtZero: true
        }
      }]
    }
  };
  public barChartType:string = 'horizontalBar';

  public barChartData:any[] = [
    {data: [Math.random()*100], label: 'Partido Popular'},
    {data: [Math.random()*100], label: 'Partido Socialista'},
    {data: [Math.random()*100], label: 'Podemos'},
    {data: [Math.random()*100], label: 'Ciudadanos'},
  ];

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-count-pie-chart',
  templateUrl: './vote-count-pie-chart.component.html',
  styleUrls: ['./vote-count-pie-chart.component.css']
})
export class VoteCountPieChartComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  // Pie
  public pieChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
  public pieChartData:number[] = [300, 500, 100];
  public pieChartType:string = 'pie';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }
}

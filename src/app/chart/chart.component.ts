import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit{

  margin: any = {top: 20, bottom: 20, left: 20, right: 20};
  width: number;
  height: number;
  data = [
    {num: 0, water: 3, pressure: 1, ev_stop: 2},
    {num: 1, water: 4, pressure: 3},
    {num: 2, water: 2, pressure: 9},
    {num: 3, water: 3, pressure: 5},
    {num: 4, water: 1, pressure: 11},
  ];


  @ViewChild('chart') private chartContainer: ElementRef;
  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  barSize(){
    return this.width / this.data.length;
  }

  createChart(){
    let element = this.chartContainer.nativeElement;
    console.log(element.offsetWidth, element.offsetHeight);
    this.width = element.offsetWidth -this.margin.left - this.margin.right;
    this.height = element.offsetHeight - this.margin.top - this.margin.bottom;

    let x = d3.scaleLinear()
      // .domain([0, d3.max(this.data.num)])
      .domain([0, 4])
      .range([this.barSize() / 2, this.width - this.barSize()/2]);

    let y = d3.scaleLinear()
      .domain([0, 11])
      .range([this.height, 0]);

    let xAxis = d3.axisBottom(x).ticks(5);
    let yAxis = d3.axisLeft(y).ticks(11).tickSize(-this.width)

    let xGrid = d3.axisBottom(x)
      // .tickSize(-this.height, 0, 0)
      .ticks(4)
      .tickFormat((d, i)=> { return d+" s";})
      .tickSize(-this.height);


    let svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight)
      .append('g')
        .attr("transform","translate("+this.margin.left+","+this.margin.top+")");

    svg.append('g')
        .attr("class", "x axis")
        .attr("transform", "translate("+0+", "+this.height+")")
        .call(xAxis);

    svg.append('g')
      .attr("class", "y axis")
      .attr("transform", "translate("+0+", 0)")
      .call(yAxis);

      //Griglia
    svg.append('g')
      .attr("class","grid")
      .attr("transform", "translate("+this.width/2/this.data.length+","+this.height+")")
      .call(xGrid);

    svg.selectAll('rect')
      .data(this.data)
      .enter().append('rect')
        .attr('x', (d,i) => { return (x(d.num) - this.barSize()/ 2); })
        .attr('y', (d,i) => {return y(d.pressure)})
        .attr('width', this.barSize())
        .attr('height', (d) => { return this.height - y(d.pressure)});

    svg.select(".grid")
      .selectAll(".tick")
      .each((d,i)=>{
          console.log(this);
          // var tick = d3.select(this);
          // // let text = tick.select('text');
          // console.log(tick);
          // let text = tick.select('text');
          // console.log(text);
          //bBox = text.node().getBBox();

        // text.style("fill","blue");
        // text.style("stroke","blue");
        //
        // tick.insert('rect')
        //   .attr('x', bBox.x - 3)
        //   .attr('y', bBox.y)
        //   .attr('height', bBox.height + 6)
        //   .attr('width', bBox.width + 20)
        //   .style('fill','red')
      });



  }
}

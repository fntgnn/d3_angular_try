import { Component, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  data = [4, 8, 15, 16, 23, 42];
  @ViewChild('chart') private chartContainer: ElementRef;
  constructor() { }

  ngOnInit() {
    this.createChart();
  }

  ngOnChanges() {
  }

  createChart(){
    let element = this.chartContainer.nativeElement;
    let x = d3.scaleLinear()
      .domain([0, d3.max(this.data)])
      .range([0, 420]);

    d3.select(element)
      .selectAll("div")
        .data(this.data)
      .enter().append("div")
        .style("width", function(d) { return d * 10 + "px"; })
        .text(function(d) { return d; });
  }
    // let element = this.chartContainer.nativeElement;
    // this.width = element.offsetWidth - this.margin.left - this.margin.right;
    // this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
    // let svg = d3.select(element).append('svg')
    //   .attr('width', element.offsetWidth)
    //   .attr('height', element.offsetHeight);
    //   // chart plot area
    //   this.chart = svg.append('g')
    //     .attr('class', 'bars')
    //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    //
    //   // define X & Y domains
    //   let xDomain = this.data.map(d => d[0]);
    //   let yDomain = [0, d3.max(this.data, d => d[1])];
    //
    //   // create scales
    //   this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    //   this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
    //
    //   // bar colors
    //   this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);
    //
    //   // x & y axis
    //   this.xAxis = svg.append('g')
    //     .attr('class', 'axis axis-x')
    //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top + this.height})`)
    //     .call(d3.axisBottom(this.xScale));
    //   this.yAxis = svg.append('g')
    //     .attr('class', 'axis axis-y')
    //     .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`)
    //     .call(d3.axisLeft(this.yScale));
    // }
    //
    //
    //
    // updateChart(){
    //   // update scales & axis
    //       this.xScale.domain(this.data.map(d => d[0]));
    //       this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    //       this.colors.domain([0, this.data.length]);
    //       this.xAxis.transition().call(d3.axisBottom(this.xScale));
    //       this.yAxis.transition().call(d3.axisLeft(this.yScale));
    //
    //       let update = this.chart.selectAll('.bar')
    //         .data(this.data);
    //
    //       // remove exiting bars
    //       update.exit().remove();
    //
    //       // update existing bars
    //       this.chart.selectAll('.bar').transition()
    //         .attr('x', d => this.xScale(d[0]))
    //         .attr('y', d => this.yScale(d[1]))
    //         .attr('width', d => this.xScale.bandwidth())
    //         .attr('height', d => this.height - this.yScale(d[1]))
    //         .style('fill', (d, i) => this.colors(i));
    //
    //       // add new bars
    //       update
    //         .enter()
    //         .append('rect')
    //         .attr('class', 'bar')
    //         .attr('x', d => this.xScale(d[0]))
    //         .attr('y', d => this.yScale(0))
    //         .attr('width', this.xScale.bandwidth())
    //         .attr('height', 0)
    //         .style('fill', (d, i) => this.colors(i))
    //         .transition()
    //         .delay((d, i) => i * 10)
    //         .attr('y', d => this.yScale(d[1]))
    //         .attr('height', d => this.height - this.yScale(d[1]));
    //
    // }
}

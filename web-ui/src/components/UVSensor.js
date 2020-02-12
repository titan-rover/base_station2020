import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DarkUnica from "highcharts/themes/dark-unica";

DarkUnica(Highcharts);

class TemperatureSensor extends Component {
  componentWillReceiveProps() {
    this.setState({
      chartOptions: {
        chart: {
          type: "spline",
        },

        xAxis: {
          type: "datetime",
          visible: true
        },
        
        yAxis: [
          { 
            min: 0, max: 11,
            title: {
              text: "Index"
            },
            labels: {
              format: "{value}t"
            }
          },
          {
            min: 400, max: 1000,
            title: {
              text: "Light"
            },
            labels: {
              format: "{value} nm"
            },
            opposite: true
          },
          {
            min: 400, max: 1000,
            title: {
              text: "Degrees"
            },
            visible: false
          }
        ],
        series: [
          { yAxis: 0, name: "Index", data: [this.props.uv_index], color: '#2f7ed8' },
          { yAxis: 1, name: "Ambient (F)", data: this.props.AmbientF, color: '#0d233a' },
          { yAxis: 2, name: "Object (C)", data: this.props.ObjectC, color: '#8bbc21' },
        ]
      }
    });
  }

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      chartOptions: {}
    };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          ref='chart'
          highcharts={Highcharts}
          options={this.state.chartOptions}
        />
      </div>
    );
  }
}

export default TemperatureSensor;

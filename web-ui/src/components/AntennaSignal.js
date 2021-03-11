import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DarkUnica from "highcharts/themes/dark-unica";

DarkUnica(Highcharts);

class AntennaSignal extends Component {
  componentWillReceiveProps() {
    this.setState({
      chartOptions: {
        series: [
          {
            data: this.props.signal_strength
          },
        ]
      }
    });
  }
  componentDidMount() {}

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      chartOptions: {
        chart: {
          type: "spline",
        },

        time: {
          useUTC: false
        },

        title: {
          text: "3.4Ghz Signal Strength"
        },

        xAxis: {
          type: "datetime"
        },

        yAxis: {
          min: 0,
          max: 60,
          title: {
            text: "Decibels"
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080"
            }
          ]
        },

        legend: {
          enabled: true
        },

        plotOptions: {
          series: {
            marker: {
              enabled: false
            }
          }
        },

        series: [
          {
            // zoneAxis: "y",
            // zones: [
            //   { value: 5, color: "red" },
            //   { value: 15, color: "orange" },
            //   { color: "green" }
            // ],
            name: "Signal",
            data: []
          }
        ]
      }
    };
  }

  render() {
    return (
      <div>
        <HighchartsReact
          ref={this.chartComponent}
          highcharts={Highcharts}
          options={this.state.chartOptions}
        />
      </div>
    );
  }
}

export default AntennaSignal;

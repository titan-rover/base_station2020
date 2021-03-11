import React, { Component } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DarkUnica from "highcharts/themes/dark-unica";
import { toast } from "react-toastify";

DarkUnica(Highcharts);

class UltrasonicSensor extends Component {
  componentWillReceiveProps() {
    this.setState({
      chartOptions: {
        series: [
          {
            data: this.props.max_distance
          },
          // {
          //   data: this.props.ampsB
          // }
        ]
      }
    })
  }

  componentDidMount() {
  }

  constructor(props) {
    super(props);

    this.state = {
      count: 0,
      chartOptions: {
        chart: {
          type: "spline"
        },

        time: {
          useUTC: false
        },

        title: {
          text: "Ultrasonic Sensor"
        },

        yAxis: {
          min: 0,
          max: 80,
          title: {
            text: "Distance"
          },
          plotLines: [
            {
              value: 0,
              width: 1,
              color: "#808080"
            }
          ],
          // plotBands: [
          //   {
          //     color: "#FFCCCB",
          //     from: 15,
          //     to: 20
          //   }
          // ]
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
            name: "Distance",
            data: []
            // data: [this.props.max_distance]
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

export default UltrasonicSensor;

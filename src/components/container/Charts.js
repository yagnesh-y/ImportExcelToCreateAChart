import React, { Component } from 'react';
import { Chart } from '../presentational/';

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: [
          'Boston',
          'Worcester',
          'Springfield',
          'Lowell',
          'Cambridge',
          'New Bedford'
        ],
        datasets: [
          {
            label: 'Population',
            data: [617594, 181045, 153060, 106519, 105162, 95072],
            backgroundColor: ['rgba(255, 99, 132, 0.6)']
          }
        ]
      }
    };
  }
  componentDidMount() {
    console.log('charts mounted...');
    this.getChartData();
  }

  componentDidUpdate() {
    console.log('charts updated.......');
    this.getChartData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) return true;
    return false;
  }

  getChartData() {
    var excel_data = this.props.data;
    var label = ''; //dataset label name ex: SERIES1
    var labels = []; //x-axis
    var data = []; //y-axis
    for (let i = 0; i < excel_data.length; i++) {
      for (let j = 1; j < excel_data[i].length; j++) {
        for (let k = 0; k < excel_data[i][j].length; k++) {
          //poupulate the corresponding x and y axis values into the respective variables...
          if (k % 2 !== 0) data.push(excel_data[i][j][k]);
          else labels.push(excel_data[i][j][k]);
        }
      }
      label = excel_data[i][0][0];
      //here we are trying to set the newState for the new Row of data ex: "SERIES1"
      var chartData = Object.assign({}, this.state.chartData);
      chartData.labels = labels;
      chartData.datasets[0].label = label;
      chartData.datasets[0].data = data;
      //this.setState({ chartData: chartData });
      //unitialise the x and y axis as we are multiple rows of data ..hence
      //we need to call our Charts components with each instance of its own state....
      labels = [];
      data = [];
      label = '';
    }
  }

  render() {
    console.log('rendered charts....');
    console.log('enw satte is ..');
    console.log(this.state.chartData);
    return (
      <div className="test">
        {this.props.data.map(series => {
          return (
            <Chart
              chartData={this.state.chartData}
              location="Massachusetts"
              legendPosition="bottom"
            />
          );
        })}
      </div>
    );
  }
}

export default Charts;

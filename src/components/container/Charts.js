import React, { Component } from 'react';
import { Chart } from '../presentational/';
import CircularJSON from 'circular-json';

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
      },
      data: [],
      finals: []
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
    console.log('next props and state is ');
    console.log(nextProps.data);
    console.log(this.state.data);
    return JSON.stringify(nextProps.data) !== JSON.stringify(this.state.finals)
      ? true
      : false;
  }

  getChartData() {
    var excel_data = this.props.data;
    if (excel_data.length > 0) {
      var label = ''; //dataset label name ex: SERIES1
      var labels = []; //x-axis
      var data = []; //y-axis
      var data_s = Object.assign([], this.state.data);
      var chartData = JSON.parse(CircularJSON.stringify(this.state.chartData));
      console.log('before for loop is ');
      console.log(chartData);
      for (let i = 0; i < excel_data.length; i++) {
        for (let j = 1; j < excel_data[i].length; j++) {
          for (let k = 0; k < excel_data[i][j].length; k++) {
            //poupulate the corresponding x and y axis values into the respective variables...
            if (k % 2 !== 0) data.push(excel_data[i][j][k]);
            else labels.push(excel_data[i][j][k]);
          }
        }
        label = excel_data[i][0][0];
        console.log(`label is ${label}`);
        //here we are trying to set the newState for the new Row of data ex: "SERIES1"
        console.log(`chartData before is ${chartData}`);
        console.log(chartData);
        chartData.labels = labels;
        console.log(`chartData after is ${chartData}`);
        console.log(chartData);
        console.log(`labels is ${labels}`);
        chartData.datasets[0].label = label;
        chartData.datasets[0].data = data;
        console.log(`chartData at ${i} is `);
        console.log(chartData);
        data_s.push(chartData);
        var chartData = JSON.parse(
          CircularJSON.stringify(this.state.chartData)
        );
        //unitialise the x and y axis as we are multiple rows of data ..hence
        //we need to call our Charts components with each instance of its own state....
        labels = [];
        data = [];
        label = '';
      }
      this.setState({ data: data_s, finals: this.props.data });
    }
  }

  render() {
    console.log('rendered charts....');
    console.log('rendered charts props and state is ..');
    console.log(this.props.data);
    console.log(this.state.data);
    if (this.state.data.length > 0) {
      return (
        <div className="test">
          {this.state.data.map((series, i) => {
            return (
              <Chart
                chartData={series}
                title={series.datasets[0].label}
                legendPosition="bottom"
                key={i}
              />
            );
          })}
        </div>
      );
    }
    return <div>Upload an excel to view a line chart</div>;
  }
}

export default Charts;

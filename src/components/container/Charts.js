import React, { Component } from 'react';
import { Chart } from '../presentational/';
import CircularJSON from 'circular-json';
import request from 'superagent';

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
      dataFromFile: []
    };
  }
  componentDidMount() {
    //call the getChartData method to parse the data from File
    //component and send the data to Chart component
    this.getChartData();
  }

  componentDidUpdate() {
    //when the user uploads a new excel file, File component
    //fires and this component gets updated, calling again getChartData
    //to update the newState
    this.getChartData();
  }

  shouldComponentUpdate(nextProps, nextState) {
    //make sure if the same props is being sent, if so dont re-render
    return JSON.stringify(nextProps.data) !==
    JSON.stringify(this.state.dataFromFile)
      ? true
      : false;
  }

  //function to send parsed excel data to server on click of a button..
  sendDataToServer() {
    var data = this.state.dataFromFile;
    request
      .post('/')
      .set('Accept', /application\/json/)
      .send({ data: data })
      .end((err, res) => {
        if (err) {
          console.log('Some error occured while sending ...' + err);
          return;
        }
        //if data successfully posted to server...alert back user confirmation message
        if (res) {
          alert('Data sent to server...check server console for JSON..');
          alert(res.text);
        }
      });
  }

  getChartData() {
    //this function is used to parse the data sent from File
    //component as required by the presentational Chart component
    var excel_data = this.props.data;
    if (excel_data.length > 0) {
      var label = ''; //dataset label name ex: SERIES1
      var labels = []; //x-axis
      var data = []; //y-axis
      var data_s = Object.assign([], this.state.data);
      var chartData = JSON.parse(CircularJSON.stringify(this.state.chartData));
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
        chartData.labels = labels;
        chartData.datasets[0].label = label;
        chartData.datasets[0].data = data;
        //push all the chartData sets required by Chart component into an array
        //so that later in render this can be looped over and sent to presentational
        //Chart component for rendering...
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
      //setting the state of data array and dataFromFile
      this.setState({ data: data_s, dataFromFile: this.props.data });
    }
  }

  render() {
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
          <p>Send parsed excel data to Server</p>
          <button onClick={this.sendDataToServer.bind(this)}>
            Send Data to Server
          </button>
        </div>
      );
    }
    return <div>Upload an excel to view a line chart</div>;
  }
}

export default Charts;

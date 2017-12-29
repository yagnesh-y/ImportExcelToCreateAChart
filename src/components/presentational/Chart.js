import React, { Component } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';

class Chart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: props.chartData
    };
  }

  render() {
    return (
      <div className="chart">
        <Line
          data={this.state.chartData}
          options={{
            title: {
              display: this.props.displayTitle,
              text: this.props.title,
              fontSize: 25
            },
            legend: {
              display: this.props.displayLegend,
              position: this.props.legendPosition
            }
          }}
        />
      </div>
    );
  }
}
Chart.defaultProps = {
  displayTitle: true,
  displayLegend: true,
  legendPosition: 'right'
};
export default Chart;

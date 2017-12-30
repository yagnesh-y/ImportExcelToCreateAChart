import React, { Component } from 'react';
import Charts from './Charts';
import XLSX from 'xlsx';

class Files extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  handleFile(e) {
    var rABS = true; // true: readAsBinaryString ; false: readAsArrayBuffer
    var files = e.target.files,
      f = files[0];
    var reader = new FileReader();
    var self = this;
    reader.onload = function(e) {
      var data = e.target.result;
      if (!rABS) data = new Uint8Array(data);
      var workbook = XLSX.read(data, { type: rABS ? 'binary' : 'array' });
      var first_sheet_name = workbook.SheetNames[0];
      /* Get worksheet */
      var worksheet = workbook.Sheets[first_sheet_name];
      var data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      //create deep clone of nested array object before changing the orignal object..
      var len = data.length,
        copy = new Array(len); // boost in Safari
      for (var i = 0; i < len; ++i) copy[i] = data[i].slice(0);
      //split the value at '|' and format the data before sending it to Charts
      for (var i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          copy[i][j] = data[i][j].split('|');
        }
      }

      //set the state of the new parsed data
      self.setState({
        data: copy
      });
    };

    if (rABS) reader.readAsBinaryString(f);
    else reader.readAsArrayBuffer(f);
  }

  render() {
    return (
      <div>
        <input
          type="file"
          id="excel_file"
          onChange={this.handleFile.bind(this)}
        />
        <Charts data={this.state.data} update />
      </div>
    );
  }
}

export default Files;

import React, { Component }  from 'react';
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore  from 'highcharts/highcharts-more';
import {renderBar, renderHistogram, renderBox} from './Renderer.js';
import DataTable from './DataTable.js';
import './App.css';

HighchartsMore(Highcharts);
class App extends Component {
  componentDidMount() {
    this.fetchOverview();
    this.fetchData(this.state.dataId);
  }
  state = {
    dataId: 1,
    highchartsConfig: {
      title: {
          text: 'Sequential Plot Viewer'
      },
      legend: {
        enabled: false
      },
      subtitle: {
        text: 'EMPTY DATA',
      },
    }
  }
  fetchData = (dataId) => {
    fetch("/"+dataId).then(res => res.json()).then(data => {
      let config = this.state.highchartsConfig;
      switch (data.plottype) {
        case 'bargraph':
          config = renderBar(data);
          this.setState({highchartsConfig: config});
          break;
        case 'histogram':
        case 'percentile':
          config = renderHistogram(data);
          this.setState({highchartsConfig: config});
          break;
        case 'boxplot':
          config = renderBox(data);
          this.setState({highchartsConfig: config});
          break;
        default:
          config = {
            title: {
                text: 'Sequential Plot Viewer'
            },
            subtitle: {
              text: 'EMPTY DATA'
            },
          }
          this.setState({highchartsConfig: config});
          break;
      }
    });
  }
  fetchOverview = () => {
    fetch("/overview").then(res => res.json()).then(data => {
      data = data.overview;
      data = data.map(item => Object.assign(item, {'view': (<button onClick={this.setDataId.bind(this, item.id)}>View</button>)}));
      this.setState({overview: data});
    });
  }
  setDataId = (dataId) => {
    this.fetchData(dataId);
    this.setState({dataId: dataId});
  }
  nextBtnClick = () => {
    let curDataid = parseInt(this.state.dataId);
    this.fetchData(curDataid+1);
    this.setState({ dataId:curDataid+1 });
  }
  prevBtnClick = () => {
    let curDataid = parseInt(this.state.dataId);
    this.fetchData(curDataid-1);
    this.setState({ dataId:curDataid-1 });
  }
  handleChangedDataId = (e) => {
    this.setState({dataId:parseInt(e.target.value)});
  }
  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.fetchData(this.state.dataId);
    }
  }
  render() {
    return (
      <div className="Sequential-plot-viewer">
        <HighchartsReact highcharts={Highcharts} options={this.state.highchartsConfig} />
        <center>
          <div>
            Data:#
            <input type="number" value={this.state.dataId} 
              onChange={this.handleChangedDataId}
              onKeyDown={this.handleKeyDown}
            />
          </div>
          <div>
            <button onClick={this.prevBtnClick}>{"< "}Prev</button>
            <button onClick={this.nextBtnClick}>Next{" >"}</button>
          </div>
          <div>
            <DataTable overview={this.state.overview}/>
          </div>
        </center>
      </div>
    );
  };
}

export default App;

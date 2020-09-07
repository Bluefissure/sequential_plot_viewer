function renderBar(d){
    // console.log(d);
    let subtitle = "";
    for(let k in d.slice){
      subtitle += k.trim() + ":" + d.slice[k].trim() + " ";
    }
    let categories = [], series_data = [];
    for(let i in d.data[0]){
      categories.push(d.data[0][i][0]);
      series_data.push(d.data[0][i][1]);
    }
    let config = {
      chart: {
          type: 'bar'
      },
      legend: {
        enabled: false
      },
      title: {
          text: 'Sequential Plot Viewer'
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        categories: categories,
        tickInterval: 1
      },
      yAxis: {
        title: {
            text: d.first_attr
        }
      },
      series: [{
          name: "data#"+d.id,
          data: series_data
      }],
    };
    return config;
  }
  
  function renderHistogram(d){
    // console.log(d);
    let subtitle = "";
    for(let k in d.slice){
      subtitle += k.trim() + ":" + d.slice[k].trim() + " ";
    }
    let series_data = [];
    for(let i in d.data[0]){
      series_data.push(d.data[0][i]);
    }
    let n = series_data.length;
    let config = {
      chart: {
          type: 'column'
      },
      legend: {
        enabled: false
      },
      title: {
          text: 'Sequential Plot Viewer'
      },
      subtitle: {
        text: subtitle
      },
      xAxis: {
        categories: [...new Array(n).keys()].map(x => x.toString()),
        tickInterval: parseInt(n / 20)
      },
      yAxis: {
        title: {
            text: d.first_attr
        }
      },
      series: [{
          name: "data#"+d.id,
          data: series_data
      }],
    };
    return config;
  }
  
  function renderBox(d){
    console.log(d);
    let subtitle = "";
    for(let k in d.slice){
      subtitle += k.trim() + ":" + d.slice[k].trim() + " ";
    }
    let series_data = [];
    for(let i in d.data[0]){
      series_data.push(d.data[0][i]);
    }
    let config = {
      chart: {
          type: 'boxplot'
      },
      legend: {
        enabled: false
      },
      title: {
          text: 'Sequential Plot Viewer'
      },
      subtitle: {
        text: subtitle
      },
      yAxis: {
        title: {
            text: d.first_attr
        }
      },
      series: [{
          name: "data#"+d.id,
          data: [series_data]
      }],
    };
    return config;
  }
  
export {renderBar, renderHistogram, renderBox};
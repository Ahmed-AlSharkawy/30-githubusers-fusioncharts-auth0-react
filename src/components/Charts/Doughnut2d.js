import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Doughnut2d = ({ data }) => {
  const chartConfigs = {
    type: 'doughnut2d',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Stars Per Language',
        theme: 'candy',
        decimals: 0,
        doughnutRadius: '50%',
        showPercentValues: 0,
        paletteColors: '#ced109,#4006ac,#9b0404,#26d506,#ac0683',
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default Doughnut2d

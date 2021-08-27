import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Bar3D = ({ data }) => {
  const chartConfigs = {
    type: 'bar3D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Forked',
        xAxisName: 'Repos',
        yAxisName: 'Forks',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        paletteColors: '#ced109,#4006ac,#9b0404,#26d506,#ac0683',
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default Bar3D

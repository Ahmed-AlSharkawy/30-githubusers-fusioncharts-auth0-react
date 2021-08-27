import React from 'react'
import FusionCharts from 'fusioncharts'
import Charts from 'fusioncharts/fusioncharts.charts'
import ReactFC from 'react-fusioncharts'
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion'

ReactFC.fcRoot(FusionCharts, Charts, FusionTheme)

const Column3D = ({ data }) => {
  const chartConfigs = {
    type: 'column3D',
    width: '100%',
    height: '400',
    dataFormat: 'json',
    dataSource: {
      chart: {
        caption: 'Most Popular',
        xAxisName: 'Repos',
        yAxisName: 'Stars',
        xAxisNameFontSize: '16px',
        yAxisNameFontSize: '16px',
        paletteColors: '#ced109,#4006ac,#9b0404,#26d506,#ac0683',
      },
      data,
    },
  }
  return <ReactFC {...chartConfigs} />
}

export default Column3D

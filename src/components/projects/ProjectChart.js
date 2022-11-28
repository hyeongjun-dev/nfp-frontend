import {useEffect, useRef, useState} from "react";
import Chart from "react-apexcharts";
import {Box} from "@mui/material";
import {api} from "../../api/apiClient";
import {useTheme} from "@mui/material/styles";

export const ProjectChart = ({symbol}) => {
  const chartRef = useRef();
  const theme = useTheme();
  const [series, setSeries] = useState([])

  async function getPriceHistory(symbol) {
    return await api.get(`/price/history?symbol=${symbol.toUpperCase()}`)
  }

  useEffect(() => {
    getPriceHistory(symbol)
      .then(response => {
        let history = response.data.data
        let chartData = history.map(history => {
          let timestamp = Date.parse(history.createdAt)
          return [timestamp, history.price]
        })
        setSeries([{
          name: 'Price($)',
          data: chartData
        }])
      })
  }, [])

  const options = {
    options: {
      chart: {
        id: 'chart1',
        type: 'area',
        stacked: false,
        height: 300,
        toolbar: {
          autoSelected: 'pan',
        },
        zoom: {
          enabled: true,
          type: "x",
          autoScaleYaxis: true,
        }
      },
      colors: [theme.palette.primary.main, '#7783DB'],
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0,
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100]
        },
      },
      yaxis: {
        title: {
          text: 'Price',
          style: {
            fontSize: '12px',
            color:  'white',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
        labels: {
          show: true,
          style: {
            colors: "white",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      xaxis: {
        type: 'datetime',
        labels: {
          show: true,
          style: {
            colors: "white",
            fontSize: '12px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 400,
            cssClass: 'apexcharts-xaxis-label',
          },
        },
      },
      tooltip: {
        shared: false,
        x: {
          format: 'yyyy MMM dd HH:mm:ss'
        },
        y: {
          formatter: function (val) {
            return val
          }
        }
      }
    },
  };

  return (
    <Box sx={{display: "flex", justifyContent: "center"}}>
      <Box sx={{
        width: "95%",
        marginTop: 4,
        justifyContent: "center",
        alignContent: "center",
        marginLeft: 5,
        marginBottom: 4
      }}>
        <Chart options={options.options} series={series} type="area" width={"95%"} height={300}/>
      </Box>
    </Box>
  )
};

export default ProjectChart;

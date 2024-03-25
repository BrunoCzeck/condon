import React from "react";
import NavBarPriority from '../../../components/NavBar/NavBarPriority'
import {Container, Div} from './AvisoStyle'
import Chart from 'react-apexcharts'

const ViewVoting = () => {
    
const data = {  
        series: [44, 55, 13, 43, 22],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }]
        },
      

      };
    
    return (

        <Container>
            <NavBarPriority/>
            <Div>
            <div>
              <div id="chart">
                <Chart options={data.options} series={data.series} type="pie" width={380} />
              </div>
              <div id="html-dist"></div>
            </div>
            </Div>   
        </Container>
    )
}

export default ViewVoting;
import React, { useEffect, useState } from "react";
import NavBarPriority from '../../../components/NavBar/NavBarPriority'
import { Container, Div } from './AvisoStyle'
import Chart from 'react-apexcharts'
import getVotingUsers from '../../../components/services/api-voting/GetVotingUsers'
import getVoting from '../../../components/services/api-voting/GetVoting'
import { useParams } from "react-router-dom";

const ViewVoting = () => {
  const { id } = useParams();
  const [listOptions, setVotingListOptions] = useState({});
  const [votingOptions, setVotingUsers] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);

  useEffect(() => {
    if (id) {
      const fetchVotingUsersList = async () => {
        try {
          const response = await getVotingUsers(id);
          setVotingListOptions(response.data.data);
        } catch (error) {
          console.error('Ocorreu um erro ao enviar os dados:', error);
        }
      };
      fetchVotingUsersList();
    }
  }, [id]);

  useEffect(() => {
    const labels = [];
    for (let i = 1; i <= 6; i++) {
      const optionKey = `option_${i}`;
      if (listOptions[optionKey] !== undefined) {
        labels.push(listOptions[optionKey]);
      }
    }
    setChartLabels(labels);
  }, [listOptions]);

  useEffect(() => {
    const fetchVotingUsers = async () => {
      try {
        const response = await getVoting(id);
        const votingData = response.data;
        const votingOptions = []; // Array para armazenar os valores dos votos

        // Iterar sobre cada voto na lista de votação
        votingData.votacao.forEach(vote => {
          // Iterar sobre os valores dos votos no voto atual
          const voteValues = Object.values(vote.votos);
          // Adicionar os valores dos votos ao array de votos
          votingOptions.push(...voteValues);
        });

        setVotingUsers(votingOptions);
      } catch (error) {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      }
    };

    if (id) {
      fetchVotingUsers();
    }
  }, [id]);

  useEffect(() => {
    const fetchVotingUsers = async () => {
      try {
        const response = await getVoting(id);
        const votingData = response.data;
        const votingOptions = {}; // Objeto para armazenar as somas dos votos para cada opção

        // Iterar sobre cada voto na lista de votação
        votingData.votacao.forEach(vote => {
          // Iterar sobre cada opção de voto no voto atual
          Object.keys(vote.votos).forEach(option => {
            // Extrair o número da opção (por exemplo, "option_1" -> 1)
            const optionNumber = parseInt(option.split('_')[1]);

            // Verificar se a opção já existe no objeto de opções
            if (votingOptions[optionNumber]) {
              // Se a opção já existe, adicionar os votos ao total existente
              votingOptions[optionNumber] += vote.votos[option];
            } else {
              // Se a opção não existe, inicializar o total de votos para essa opção
              votingOptions[optionNumber] = vote.votos[option];
            }
          });
        });

        // Converter o objeto de opções em um array de valores
        const votingOptionsArray = Object.values(votingOptions);
        setVotingUsers(votingOptionsArray);
      } catch (error) {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      }
    };

    if (id) {
      fetchVotingUsers();
    }
  }, [id]);

  { console.log(votingOptions) }
  const parameter = {
    series: votingOptions,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: chartLabels,
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
      <NavBarPriority />
      <Div>
        <div>
          <div id="chart">
            <Chart options={parameter.options} series={parameter.series} type="pie" width={380} />
          </div>
          <div id="html-dist"></div>
        </div>
      </Div>
    </Container>
  )
}

export default ViewVoting;
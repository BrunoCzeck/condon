import React, { useState, useEffect } from 'react';
import getSchedulerUser from '../../components/services/api-scheduler-user/GetSchedulerUser';
import putSchedulerUser from '../../components/services/api-scheduler-user/PutSchedulerUser';
import NavbarNoPriority from '../../components/NavBar/NavBarNoPriority';
import * as S from './UserTableStyles'
import { Container, Logo, DivButton } from './UserTableStyles' 

function History() {
  const [error, setError] = useState('');
  const [scheduler, setScheduler] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem('loggedInUser');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUsers(parsedUser); // Atualiza o estado apenas quando o usuário for obtido do localStorage
          setLoggedIn(true);

          const response = await getSchedulerUser(parsedUser.data.id); // Usa o ID do usuário
          setScheduler(response.data.data);
        }
      } catch (error) {
        setError('Erro ao consultar usuários. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      }
    };

    fetchData();
  }, []); // Sem 

  const handleCanceled = (userId) => {
    const confirmDelete = window.confirm('Tem certeza que cancelar seu agendamento?');
    if (confirmDelete) {
      // Chama a função passando o id e deletando o usuário
      putSchedulerUser(userId);
      window.location.reload(); // Recarrega a pagina apos deletar
    }
  };

return (
  
  <Container>
  <NavbarNoPriority />
  {console.log(scheduler.id_scheduler)}
        <S.Table>
          <S.Tablethead>
            <tr>
              <S.TableHeader>Nome</S.TableHeader>
              <S.TableHeader>Apartamento</S.TableHeader>
              <S.TableHeader>Bloco</S.TableHeader>
              <S.TableHeader>Data da Reserva</S.TableHeader>
              <S.TableHeader>Espaço Reservado</S.TableHeader>
              <S.TableHeader>Status</S.TableHeader>
              <S.TableHeader>Editar</S.TableHeader>
            </tr>
          </S.Tablethead>
          <tbody>
            {scheduler.map((scheduler) => (
              <S.TableTr key={scheduler.user_id}>
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>{scheduler.nome}</S.TableCell>        
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>{scheduler.apartament}</S.TableCell>
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>{scheduler.bloc}</S.TableCell>
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>{scheduler.date_reserve}</S.TableCell>
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>{scheduler.space}</S.TableCell>
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>{scheduler.status}</S.TableCell>
                <S.TableCell style={{ backgroundColor: scheduler.status === 'Cancelado' ? '#CCC' : 'inherit' }}>
                  <S.ButtonDelete  
                  disabled={scheduler.status === 'Cancelado'} 
                  onClick={() => handleCanceled(scheduler.id_scheduler)}
                  >
                    Cancelar
                  </S.ButtonDelete>
                </S.TableCell>
              </S.TableTr>
            ))}
          </tbody>
        </S.Table>
  </Container>
  );
}
export default History;
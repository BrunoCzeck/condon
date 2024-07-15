import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getUser from '../../services/api-users/GetUser';
import NavBarNoPriority from '../../components/NavBar/NavBarNoPriority';
import * as S from './UserTableStyles'
import { Container, Logo, DivButton } from './UserTableStyles' 
import editUser from '../../img/edit.svg';


function GetUsers() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user_id, setUserId] = useState('');
  const [resultado, setResult] = useState('');



  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);      
      setEnterpriseOptions(parsedUser.data);
      setUserId(parsedUser.data.id);
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getUser()
        .then((response) => {
          setResult(response.data.data);
        })
        .catch((error) => {
          setError('Erro ao consultar usuários. Favor verificar as informações.');
          console.error('Ocorreu um erro ao enviar os dados:', error);
        });
    };
    fetchEnterpriseData();
  }, []);



return (
  <Container>
  <NavBarNoPriority />
        <S.Table>
          <S.Tablethead>
            <tr>
              <S.TableHeader>Nome</S.TableHeader>
              <S.TableHeader>Apartamento</S.TableHeader>
              <S.TableHeader>Bloco</S.TableHeader>
              <S.TableHeader>E-mail</S.TableHeader>
            </tr>
          </S.Tablethead>
          <tbody>
              <S.TableTr key={user_id}>
                <S.TableCell>{enterpriseOptions.usuario}</S.TableCell>
                <S.TableCell>{enterpriseOptions.apartament}</S.TableCell>
                <S.TableCell>{enterpriseOptions.bloc}</S.TableCell>
                <S.TableCell>{enterpriseOptions.email}</S.TableCell>
                <DivButton>
                  <Link to={`/edituser/${user_id}`}>
                    <S.ButtonEdit onClick={() => getUser(user_id)}>
                      <Logo src={editUser} alt="Editar"/>
                    </S.ButtonEdit>
                  </Link>
                </DivButton>
              </S.TableTr>
          </tbody>
        </S.Table>
  </Container>
  );
}
export default GetUsers;
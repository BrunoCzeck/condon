import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import getUser from '../../services/api-users/GetUser';
import getUsers from '../../services/api-users/GetUsers';
import deleteUser from '../../services/api-users/DeleteUser';
import NavbarPriority from '../../components/NavBar/NavBarPriority';
import * as S from './UserTableStyles'
import { Container, Logo, DivButton } from './UserTableStyles' 
import editUser from '../../img/edit.svg';
import deletUser from '../../img/delet.svg';

function GetUsers() {
  const [error, setError] = useState('');
  const [enterpriseOptions, setEnterpriseOptions] = useState([]);

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getUsers()
        .then((response) => {
          setEnterpriseOptions(response.data.data);
        })
        .catch((error) => {
          setError('Erro ao consultar usuários. Favor verificar as informações.');
          console.error('Ocorreu um erro ao enviar os dados:', error);
        });
    };
    fetchEnterpriseData();
  }, []);

  const handleDeleteUser = (userId) => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este usuário?');

    if (confirmDelete) {
      // Chama a função passando o id e deletando o usuário
      deleteUser(userId);
    }
  };

return (
  <Container>
  <NavbarPriority />
        <S.Table>
          <S.Tablethead>
            <tr>
              <S.TableHeader>Nome</S.TableHeader>
              <S.TableHeader>Apartamento</S.TableHeader>
              <S.TableHeader>Bloco</S.TableHeader>
              <S.TableHeader>E-mail</S.TableHeader>
              <S.TableHeader>Tipo de Usuário</S.TableHeader>
              <S.TableHeader>Ações</S.TableHeader>
            </tr>
          </S.Tablethead>
          <tbody>
            {enterpriseOptions.map((enterprise) => (
              <S.TableTr key={enterprise.id}>
                <S.TableCell>{enterprise.usuario}</S.TableCell>
                <S.TableCell>{enterprise.apartament}</S.TableCell>
                <S.TableCell>{enterprise.bloc}</S.TableCell>
                <S.TableCell>{enterprise.email}</S.TableCell>
                <S.TableCell>{enterprise.priority === "2" ? "Administrador" : "Usuário"}</S.TableCell>
                <DivButton>
                  <Link to={`/edituser/${enterprise.id}`}>
                    <S.ButtonEdit onClick={() => getUser(enterprise.id)}>
                      <Logo src={editUser} alt="Editar"/>
                    </S.ButtonEdit>
                  </Link>
                  <S.ButtonDelete onClick={() => handleDeleteUser(enterprise.id)}>
                    <Logo src={deletUser} alt="Deletar" />
                  </S.ButtonDelete>
                </DivButton>
              </S.TableTr>
            ))}
          </tbody>
        </S.Table>
  </Container>
  );
}
export default GetUsers;
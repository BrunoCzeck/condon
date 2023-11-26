import React, { useState, useEffect } from 'react';
import getData from '../../components/FormPostApiValidate';
import Navbar from '../../components/NavbarPriority';
import NavbarNoPriority from '../../components/NavbarNoPriority';
import { Link } from 'react-router-dom';
import getEnterprise from '../../components/GetEnterprise';

function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [users, setUsers] = useState(null);
  const [enterprise, setUser] = useState(null);
  const [nome, setName] = useState(null);

/* Chama a API com os dados do Condominio Individual por ID. */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getEnterprise(users.data.id_enterprise); 
        const userData = response;
        // Preenchendo os campos de input com os valores do usuário
        setName(userData.data.data[0].name);
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [enterprise]);

  /* Chama o localStorage pra guardar as informações no navegador e não perder ao navegar entre as paginas */

  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setUsers(JSON.parse(storedUser));
      setLoggedIn(true);
    }
  }, []);
  /*  */
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { senha, email };
    getData(data)
      .then((response) => {
        setUsers(response.data);
        setUser(response.data)
        setLoggedIn(true);
        localStorage.setItem('loggedInUser', JSON.stringify(response.data));
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
        setError('Usuário não encontrado');
      });
  };

   const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setLoggedIn(false);
    setUsers(null);
    setUser(null);

  }; 
  
  return (
    <div>
      {loggedIn ? (
        <div>
          <h1>Logado como {users && users.data.usuario} </h1>
          <h1>Condominio: {nome} </h1>
          <button onClick={handleLogout}>Sair</button> {/* Utilizando o componente LogoutButton */}
            {users.data.priority === "2" ? <Navbar /> : <NavbarNoPriority />}
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
            <br />
            <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} />
            <br />
            <button type="submit">Enviar</button>
            <li>
              <Link to="/form">Cadastro de Usuário</Link>
            </li>
          </form>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default Home;
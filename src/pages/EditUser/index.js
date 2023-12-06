import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import getUser from '../../components/GetUser';
import putData from '../../components/PutUsers';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
/*   const [result, setResult] = useState(null);
 */  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [priority, setPriority] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getUser(id); 
        const userData = response.data.data[0];
        setUser(userData);
        // Preenchendo os campos de input com os valores do usuário
        setUsuario(userData.usuario);
        setSenha(userData.senha);
        setEmail(userData.email);
        setPriority(userData.priority);
      } catch (error) {
        // Tratamento de erro
      }
    };

    fetchUserData();
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { usuario, senha, email, priority };

    putData(id, data)
      .then((response) => {
        console.log(response.data);
      /*   setResult(response.data); */
      })
      .catch((error) => {
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  const handleGoBack = () => {
    // Voltar para a página anterior no histórico do navegador
    window.history.back();
  };

  return (
    <div>
      <h1>Editar Usuário</h1>
      <Button onClick={handleGoBack}>Voltar</Button>
      {user && (
        <form onSubmit={handleSubmit}>
          <label>Usuario:</label>
          <input type="text" name="usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
          <br />
          <label>Senha:</label>
          <input type="text" name="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
          <br />
          <label>Email:</label>
          <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Tipo de Usuário:</label>
          <input type="text" name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} />
          <br />
          <Button type="submit">Salvar</Button>
        </form>
      )}
    </div>
  );
}

export default EditUser;
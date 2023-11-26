import React, { useState, useEffect } from 'react';
import sendUserData from '../../components/FormPostApi';
import Notification from '../../components/Notification';
import getDataEnterprise from '../../components/GetEnterprises';

function FormUsers() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [apartament, setApartament] = useState('');
  const [bloc, setBloco] = useState('');
  const [email, setEmail] = useState('');
  const [id_enterprise, setEnterprise] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState(null);
  const [enterpriseOptions, setEnterpriseOptions] = useState([]); // Inicializando como uma array vazia

  useEffect(() => {
    const fetchEnterpriseData = () => {
      getDataEnterprise()
      .then((response) => {
        setEnterpriseOptions(response.data.data);
      })
      .catch((error) => {
        setError('Erro ao cadastrar usuário. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
    };

    fetchEnterpriseData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = { usuario, senha, apartament, bloc, email, id_enterprise };

    sendUserData(data)
      .then((response) => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        setError('Erro ao cadastrar usuário. Favor verificar as informações.');
        console.error('Ocorreu um erro ao enviar os dados:', error);
      });
  };

  return (
    <div>
    {users ? (
    <Notification/>
    ) : (
      <>
        <h2>Exemplo de Formulário em React</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Usuario:<input type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)}/>
          </label>
          <br />
          <label>
            Senha:<input type="text" value={senha} onChange={(e) => setSenha(e.target.value)}/>
          </label>
          <br />
          <label>
            Apartamento:<input type="text" value={apartament} onChange={(e) => setApartament(e.target.value)}/>
          </label>
          <br />
          <label>
            Bloco:<input type="text" value={bloc} onChange={(e) => setBloco(e.target.value)}/>
          </label>
          <br />
          <label>
            Email:<input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <br />
          <select value={id_enterprise} onChange={(e) => setEnterprise(e.target.value)}>
              <option value="">Selecione um Condomínio</option>
                {Array.isArray(enterpriseOptions) &&
                enterpriseOptions.map((enterprise) => (
              <option key={enterprise.id_enterprise} value={enterprise.id_enterprise}>
              {enterprise.name}
              </option>
              ))}
          </select>
            <br />
            <button type="submit">Enviar</button>
        </form>
        <p>{error}</p>
      </>
      )}
    </div>
  );
}

export default FormUsers;
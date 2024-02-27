import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getChat from '../../components/services/api-chat/GetChat'; // Substitua pelo seu serviço real

const ChatPage = () => {
  const { id } = useParams(); // Obtém o parâmetro da URL
  const [chatData, setChatData] = useState({});
  const [user_id, setChatDataId] = useState({});

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        const response = await getChat(id); // Substitua pelo seu serviço real
        setChatData(response.data);
        setChatDataId(response.data.user_id);
      } catch (error) {
        console.error('Erro ao obter dados do chat:', error);
      }
    };

    fetchChatData();
  }, [id]);

  return (
    <table
      style={{
        width: '100%',
        height: '20%',
        borderCollapse: 'collapse',
        overflowY: 'auto',
        maxHeight: '400px',
        border: '2px solid #dedede',
        backgroundColor: '#f1f1f1',
        borderRadius: '5px',
        padding: '10px',
        margin: '10px 0'
        // Ajuste a altura máxima conforme necessário
      }}
    >
      <tbody>
        {chatData.chat &&
          chatData.chat.map((message, index) => (
            <tr key={index}>
              <td style={{ marginBottom: '10px' }}>
                {message.user_id_send_message === user_id ? (
                  <div
                    style={{
                      border: '2px solid #dedede',
                      backgroundColor: '#f1f1f1',
                      borderRadius: '5px',
                      padding: '10px',
                      margin: '10px 0',
                      textAlign: 'right',
                      color: '#999',
                    }}
                  >
                    <p>{message.description}</p>
                    <p>{message.date_message}</p>
                  </div>
                ) : (
                  <div
                    style={{
                      border: '2px solid #dedede',
                      backgroundColor: '#f1f1f1',
                      borderRadius: '5px',
                      padding: '10px',
                      margin: '10px 0',
                    }}
                  >
                    <p>{message.description}</p>
                    <p>{message.date_message}</p>
                  </div>
                )}
              </td>
            </tr>
          ))}
      </tbody>
      <tfoot>
        <tr>
          <td>
            <button>Enviar</button>
            <input placeholder="Mensagem Aqui"></input>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default ChatPage;

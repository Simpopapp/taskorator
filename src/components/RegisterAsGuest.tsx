import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Configuração do Supabase
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || '';
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const RegisterAsGuest: React.FC = () => {
  const [nickname, setNickname] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(event.target.value);
  };

  const handleRegisterGuest = async () => {
    setError(null);
    setSuccess(null);

    if (!nickname) {
      setError('Por favor, escolha um nickname.');
      return;
    }

    const { data, error } = await supabase.rpc('create_guest_user', {
      nickname: nickname,
    });

    if (error) {
      console.error('Erro ao criar usuário convidado:', error);
      setError('Erro ao criar usuário convidado. Tente novamente.');
    } else {
      console.log('Usuário convidado criado com ID:', data);
      setSuccess(`Usuário convidado criado com sucesso! ID: ${data}`);
      sessionStorage.setItem('guest_user_id', data);
    }
  };

  return (
    <div>
      <h1>Cadastrar como Convidado</h1>
      <input
        type="text"
        placeholder="Escolha um nickname"
        value={nickname}
        onChange={handleNicknameChange}
      />
      <button onClick={handleRegisterGuest}>Cadastrar como Convidado</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default RegisterAsGuest;

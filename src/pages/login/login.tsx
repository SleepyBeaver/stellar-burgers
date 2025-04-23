import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { loginUserApi } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../services/store';
import { checkUserAuth } from '../../services/slices/authSlice';

export const Login: FC = () => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setErrorText] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setErrorText('');

    try {
      const res = await loginUserApi({ email, password });

      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      localStorage.setItem('userName', res.user.name);

      await dispatch(checkUserAuth());
      navigate('/');
    } catch (err: any) {
      setErrorText(err.message || 'Ошибка авторизации');
    }
  };

  return (
    <LoginUI
      errorText={errorText}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

'use client';

import { Button, Dialog } from '@/components/ui';
import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import { signIn } from 'next-auth/react';
import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import { LoginForm } from './forms/login-form';
import { RegisterForm } from './forms/register-form';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<'login' | 'register'>('login');

  const onSwitchType = () => {
    setType(type === 'login' ? 'register' : 'login');
  };

  const handleClose = () => {
    onClose();
    setType('login');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className='hidden'>
        <DialogTitle>{type === 'login' ? 'Вход в аккаунт' : 'Регистрация'}</DialogTitle>
      </div>
      <DialogContent aria-describedby={undefined} className="w-[450px] h-[calc(100vh-50px)] invisible-scrollbar bg-white p-10 overflow-y-auto">
        {type === 'login' ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn('github', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <GitHubIcon />
            Github
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              signIn('google', {
                callbackUrl: '/',
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1">
            <GoogleIcon />
            Google
          </Button>
        </div>

        <Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
          {type !== 'login' ? 'Войти' : 'Регистрация'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

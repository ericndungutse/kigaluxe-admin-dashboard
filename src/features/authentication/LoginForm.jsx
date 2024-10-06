import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Button from '../../components/Button';
import Input from '../../components/Input';
import VerticalFormRow from '../../components/VerticalFormRow';
import { loginApi } from '../../services/authServices';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [errorMessane, setErrorMessage] = useState('');
  const queryClient = useQueryClient();
  const { isPending, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi(email, password),

    onSuccess: (data) => {
      queryClient.setQueryData(['user'], data.user);
      navigate('/account', { replace: true });
    },

    onError: (err) => setErrorMessage(err.message),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(isPending);

    setErrorMessage('');
    login(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='p-6 border border-gray-200 rounded-md text-base w-full flex flex-col gap-3'
    >
      {errorMessane && <div className='text-red-500 bg-red-200 text-center capitalize p-2 rounded'>{errorMessane}</div>}
      <VerticalFormRow label='Email address' error={errors['email'] && errors['email'].message}>
        <Input type='email' id='email' register={register('email', { required: 'Email is required' })} />
      </VerticalFormRow>

      <VerticalFormRow label='Password' error={errors['password'] && errors['password'].message}>
        <Input type='password' id='password' register={register('password', { required: 'Password is required' })} />
      </VerticalFormRow>

      <VerticalFormRow>
        <Button type='submit' loading={isPending}>
          Log in
        </Button>
      </VerticalFormRow>
    </form>
  );
}

export default LoginForm;

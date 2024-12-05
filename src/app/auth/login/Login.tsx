'use client'


import { z } from 'zod';
import { FiLock, FiMail } from 'react-icons/fi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCallback, useState } from 'react';
import { Input } from '../../components/Input';
import { ReloadIcon } from "@radix-ui/react-icons";

import Link from 'next/link';
import { Button } from '@/app/components/Button';
import Image from 'next/image';
import logo from '../../../../public/logo2.png'

const createUserSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: 'O e-mail é obrigatório',
    })
    .email({
      message: 'Formato de e-mail inválido',
    })
    .toLowerCase(),
  password: z
    .string()
    .min(8, { message: 'A senha deve ter pelo menos 8 caracteres.' })
    .regex(/[A-Z]/, {
      message: 'A senha deve ter pelo menos uma letra maiúscula.',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve ter pelo menos uma letra minúscula.',
    })
    .regex(/[0-9]/, { message: 'A senha deve ter pelo menos um número.' })
    .regex(/[^A-Za-z0-9]/, {
      message: 'A senha deve ter pelo menos um caractere especial.',
    }),
});

type CreateUserData = z.infer<typeof createUserSchema>;

export default function Login() {
  const [loading, setLoading] = useState(false);

  const createUserForm = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = createUserForm;

  const handleOnSubmit = useCallback(
    async (data: CreateUserData) => {
      try {
        setLoading(true);
        console.log('user', data);

      } catch {
        setLoading(false);
      }
    },
    []
  );

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <Image
          src={logo}
          alt='Logo'
          width={150}
          height={150}
          className='cursor-pointer mb-6 mt-6'
        />

        <FormProvider {...createUserForm}>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="w-full text-center space-y-6"
          >
            <h2 className="text-xl font-bold text-gray-900">Acesse sua conta</h2>
            <Input
              name="email"
              placeholder="E-mail"
              icon={FiMail}
              errorMessage={errors?.email?.message ?? ''}
            />

            <Input
              name="password"
              type="password"
              placeholder="Senha"
              icon={FiLock}
              errorMessage={errors?.password?.message ?? ''}
            />

            <Button title="Login" size="large" type="submit" disabled={loading}>
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </FormProvider>

        <Link
          href="/cadastro"
          className="mt-4 flex items-center text-blue-500 hover:text-blue-700 transition">
          <p className="ml-2 text-sm">Quero me cadastrar</p>
        </Link>
      </div>
    </div>
  );
}

'use client'

import { z } from 'zod';
import { FiLock, FiMail } from 'react-icons/fi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useState } from 'react';
import { Input } from '../../components/Input';
import { ReloadIcon } from "@radix-ui/react-icons";

import Link from 'next/link';
import { Button } from '@/app/components/Button';
import Image from 'next/image';
import logo from '../../../../public/logo2.png'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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

export default function SignIn() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const goToSignUp = () => {
    router.push('/auth/sign-up');
  };

  const form = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: CreateUserData) => {
    setLoading(true);

    try {
      const supabase = createClientComponentClient();
      const { email, password } = values;

      const { error, data: { session } } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw new Error(error.message);
      }

      if (session) {
        toast.success('Login efetuado com sucesso.')
        router.push('/dashboard');
      }
    } catch (error: any) {
      toast.error('Ocorreu um erro ao se conectar, tente novamente!')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-600 to-gray-900">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <Link href={'/'}>
          <Image
            src={logo}
            alt='Logo'
            width={150}
            height={150}
            className='cursor-pointer mb-6 mt-6'
          />
        </Link>

        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full text-center space-y-6"
          >
            <h2 className="text-xl font-light text-gray-700">Acesse sua conta</h2>
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

        <button onClick={goToSignUp}
          className="mt-4 flex items-center text-gray-500 hover:text-gray-700 transition">
          Quero me cadastrar
        </button>
      </div>
    </div>
  );
}

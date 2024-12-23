'use client'


import { z } from 'zod';
import { FiLock, FiMail, FiUser } from 'react-icons/fi';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';

import { useCallback, useState } from 'react';
import { Input } from '../../components/Input';
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";

import Link from 'next/link';
import { Button } from '@/app/components/Button';
import Image from 'next/image';
import logo from '../../../../public/logo2.png'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const createUserSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'O nome é obrigatório',
    })
    .transform((name) => {
      return name
        .trim()
        .split(' ')
        .map((word) => word[0].toLocaleUpperCase().concat(word.substring(1)))
        .join(' ')
    }),
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
})

type CreateUserData = z.infer<typeof createUserSchema>;

export default function Register() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const form = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    }
  });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const handleOnSubmit = async (values: CreateUserData) => {
    setLoading(true);

    try {
      const supabase = createClientComponentClient();
      const { email, password } = values;

      const { error, data: { user } } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`
        }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (user) {
        form.reset(); 
        alert("Account created successfully. Please check your email to verify your account.",);
        router.refresh(); 
      } 
    } catch (error: any) {
      alert("There was an issue creating your account.");
    } finally {
      setLoading(false); 
    }
  };


  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-600 to-gray-900">
      <div className="flex flex-col justify-center items-center w-full max-w-md bg-white p-6 shadow-lg rounded-lg">
        <Image
          src={logo}
          alt='Logo'
          width={150}
          height={150}
          className='cursor-pointer mb-6 mt-6'
        />

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="w-full text-center space-y-6"
          >
            <h2 className="text-xl font-light text-gray-700">Realize seu Cadastro</h2>
            <Input
              name="name"
              placeholder="Nome"
              icon={FiUser}
              errorMessage={errors?.name?.message ?? ''}
            />

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

            <Button title="Cadastrar" size="large" type="submit" disabled={loading}>
              {loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Cadastrar'
              )}
            </Button>
          </form>
        </FormProvider>

        <Link
          href="/auth/forgot-password"
          className="mt-4 flex items-center text-gray-500 hover:text-gray-700 transition">
          Esqueci minha senha
        </Link>
      </div>
    </div>
  );
}

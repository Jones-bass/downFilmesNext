'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/app/components/Button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Input } from '@/app/components/Input';
import logo from '../../../public/logo2.png'
import Image from 'next/image';
import { api } from '@/service/api';

const movieSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório.' }),
  year: z.string().min(1, { message: 'O ano é obrigatório.' }),
  rated: z.string().min(1, { message: 'O rated é obrigatório.' }),
  released: z.string().min(1, { message: 'A data de lançamento é obrigatória.' }),
  runtime: z.string().min(1, { message: 'O tempo de execução é obrigatório.' }),
  genre: z.string().min(1, { message: 'O gênero é obrigatório.' }),
  director: z.string().min(1, { message: 'O diretor é obrigatório.' }),
  writer: z.string().min(1, { message: 'O escritor é obrigatório.' }),
  actors: z.string().min(1, { message: 'Os atores são obrigatórios.' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória.' }),
  language: z.string().min(1, { message: 'O idioma é obrigatório.' }),
  country: z.string().min(1, { message: 'O país é obrigatório.' }),
  awards: z.string().min(1, { message: 'Os prêmios são obrigatórios.' }),
  image: z.string().min(1, { message: 'A imagem é obrigatória.' }),
  imdbRating: z.string().min(1, { message: 'A classificação IMDb é obrigatória.' }),
  imdbVotes: z.string().min(1, { message: 'Os votos IMDb são obrigatórios.' }),
  type: z.string().min(1, { message: 'O tipo é obrigatório.' }),
});

type MovieFormData = z.infer<typeof movieSchema>;

export default function MovieForm() {
  const [loading, setLoading] = useState(false);

  const form = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: '',
      year: '',
      rated: '',
      released: '',
      runtime: '',
      genre: '',
      director: '',
      writer: '',
      actors: '',
      description: '',
      language: '',
      country: '',
      awards: '',
      image: '',
      imdbRating: '',
      imdbVotes: '',
      type: '',
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = form;

  const handleOnSubmit = async (values: MovieFormData) => {
    setLoading(true); 
    
    try {
      const response = await api.post<MovieFormData>('/api/movies', values);

      console.log(response)
      toast.success('Filme criado com sucesso!');
      form.reset(); 
    } catch (error: any) {
    
      toast.error(error.response?.data?.message || 'Erro ao criar filme.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gradient-to-br from-gray-900 via-gray-600 to-gray-900">
      <div className="w-full max-w-4xl bg-white p-4 sm:p-6 md:p-8 shadow-lg rounded-lg">
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="Logo"
            width={200}
            height={200}
            className="cursor-pointer mb-6 mt-6"
          />
        </div>

        <h2 className="text-2xl font-light text-gray-700 mb-8 text-center">
          Cadastro de Filme
        </h2>

        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(handleOnSubmit)}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {/* Title ocupa todas as colunas */}
            <div className="col-span-1 sm:col-span-2">
              <Input
                name="title"
                placeholder="Título"
                errorMessage={errors?.title?.message ?? ''}
              />
            </div>

            <Input
              name="year"
              placeholder="Ano"
              errorMessage={errors?.year?.message ?? ''}
            />
            <Input
              name="rated"
              placeholder="Classificação"
              errorMessage={errors?.rated?.message ?? ''}
            />
            <Input
              name="released"
              placeholder="Lançamento"
              errorMessage={errors?.released?.message ?? ''}
            />
            <Input
              name="runtime"
              placeholder="Duração"
              errorMessage={errors?.runtime?.message ?? ''}
            />
            <Input
              name="genre"
              placeholder="Gênero"
              errorMessage={errors?.genre?.message ?? ''}
            />
            <Input
              name="director"
              placeholder="Diretor"
              errorMessage={errors?.director?.message ?? ''}
            />
            <Input
              name="writer"
              placeholder="Escritor"
              errorMessage={errors?.writer?.message ?? ''}
            />
            <Input
              name="actors"
              placeholder="Atores"
              errorMessage={errors?.actors?.message ?? ''}
            />
            <Input
              name="description"
              placeholder="Descrição"
              errorMessage={errors?.description?.message ?? ''}
            />
            <Input
              name="language"
              placeholder="Idioma"
              errorMessage={errors?.language?.message ?? ''}
            />
            <Input
              name="country"
              placeholder="País"
              errorMessage={errors?.country?.message ?? ''}
            />
            <Input
              name="awards"
              placeholder="Prêmios"
              errorMessage={errors?.awards?.message ?? ''}
            />
            <Input
              name="image"
              placeholder="Imagem URL"
              errorMessage={errors?.image?.message ?? ''}
            />
            <Input
              name="imdbRating"
              placeholder="Nota IMDb"
              errorMessage={errors?.imdbRating?.message ?? ''}
            />
            <Input
              name="imdbVotes"
              placeholder="Votos IMDb"
              errorMessage={errors?.imdbVotes?.message ?? ''}
            />
            <Input
              name="type"
              placeholder="Tipo"
              errorMessage={errors?.type?.message ?? ''}
            />

            {/* Botão ocupa todas as colunas */}
            <div className="col-span-1 sm:col-span-2 flex justify-end mt-6">
              <Button title="Cadastrar Filme" size="large" type="submit" disabled={loading}>
                {loading ? (
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Cadastrar'
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

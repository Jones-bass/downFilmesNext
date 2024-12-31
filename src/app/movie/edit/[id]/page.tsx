'use client';

import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/app/components/Button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { Input } from '@/app/components/Input';
import Image from 'next/image';
import { api } from '@/service/api';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

// Atualize o schema para incluir os campos do backend
const movieSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório.' }),
  year: z.string().min(1, { message: 'O ano é obrigatório.' }),
  runtime: z.string().min(1, { message: 'O tempo de execução é obrigatório.' }),
  genre: z.string().min(1, { message: 'O gênero é obrigatório.' }),
  director: z.string().min(1, { message: 'O diretor é obrigatório.' }),
  writer: z.string().min(1, { message: 'O escritor é obrigatório.' }),
  actors: z.string().min(1, { message: 'Os atores são obrigatórios.' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória.' }),
  language: z.string().min(1, { message: 'O idioma é obrigatório.' }),
  country: z.string().min(1, { message: 'O país é obrigatório.' }),
  image: z.string().min(1, { message: 'A imagem é obrigatória.' }),
  imdbRating: z.string().min(1, { message: 'A avaliação é obrigatória.' }),
  type: z.string().min(1, { message: 'O tipo é obrigatório.' }),
});

type MovieFormData = z.infer<typeof movieSchema>;

export default function Edit() {
  const params = useParams();
  const id = params.id; 
  
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<MovieFormData>({
    resolver: zodResolver(movieSchema),
    defaultValues: {
      title: '',
      year: '',
      runtime: '',
      genre: '',
      director: '',
      writer: '',
      actors: '',
      description: '',
      language: '',
      country: '',
      image: '',
      imdbRating: '',
      type: '',
    },
  });

  const { handleSubmit, formState: { errors } } = form;

  useEffect(() => {
    async function fetchMovie() {
      if (!id) return;

      setLoading(true);
      try {
        const response = await api.get(`/api/movies?id=${id}`); 
        const movie = response.data;

        form.reset({
          title: movie.title || '',
          year: movie.year || '',
          runtime: movie.runtime || '',
          genre: movie.genre || '',
          director: movie.director || '',
          writer: movie.writer || '',
          actors: movie.actors || '',
          description: movie.description || '',
          language: movie.language || '',
          country: movie.country || '',
          image: movie.image || '',
          imdbRating: movie.imdbRating || '',
          type: movie.type || '',
        });
      } catch (error) {
        toast.error('Erro ao carregar os dados do filme.');
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchMovie();
    }
  }, [id, form]);

  const handleOnSubmit = async (values: MovieFormData) => {
    setLoading(true);
    try {
      if (id) {
        await api.put(`/api/movies?id=${id}`, values); 
        toast.success('Filme atualizado com sucesso!');
      } else {
        await api.post('/api/movies', values);
        toast.success('Filme criado com sucesso!');
      }
      router.push("/movie/dashboard"); 
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erro ao salvar filme.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <Link href={'/movie/dashboard'}>
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
          </Link>
          <h2 className="text-xl font-bold">{id ? 'Editar Filme' : 'Cadastrar Filme'}</h2>
        </div>

        <FormProvider {...form}>
          <form onSubmit={handleSubmit(handleOnSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input name="title" placeholder="Título" errorMessage={errors?.title?.message ?? ''} />
            <Input name="year" placeholder="Ano" errorMessage={errors?.year?.message ?? ''} />
            <Input name="runtime" placeholder="Duração" errorMessage={errors?.runtime?.message ?? ''} />
            <Input name="genre" placeholder="Gênero" errorMessage={errors?.genre?.message ?? ''} />
            <Input name="director" placeholder="Diretor" errorMessage={errors?.director?.message ?? ''} />
            <Input name="writer" placeholder="Escritor" errorMessage={errors?.writer?.message ?? ''} />
            <Input name="actors" placeholder="Atores" errorMessage={errors?.actors?.message ?? ''} />
            <Input name="description" placeholder="Descrição" errorMessage={errors?.description?.message ?? ''} />

            <div className="col-span-2 flex justify-end">
              <Button title="" type="submit" disabled={loading}>
                {loading ? <ReloadIcon className="animate-spin mr-2" /> : id ? 'Salvar Alterações' : 'Cadastrar'}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

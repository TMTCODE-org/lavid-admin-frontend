'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { useLanguages } from '@/features/languages/hooks/useLanguages';
import {
  useCreateCourseForm,
  CreateCourseSchema
} from '../../hooks/useCreateCourseForm';
import { z } from 'zod';
import { uploadImage } from '@/features/images/actions/upload-image.action';
import { Check, ChevronsUpDown, ImageIcon, X } from 'lucide-react';
import { useGetAllUsers } from '@/features/users/hooks/useGetAllUsers';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { usePacks } from '@/features/packs/hooks/usePacks';
import { useCategories } from '@/features/categories/hooks/useCategories';
import { toast } from 'sonner';

interface Props {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CreateCourseFormDialog: React.FC<Props> = ({
  dialogOpen,
  setDialogOpen
}) => {
  const { form, createCourseMutation } = useCreateCourseForm();
  const { languagesQuery } = useLanguages();
  const { userQuery } = useGetAllUsers();
  const { packsQuery } = usePacks();
  const { categoriesQuery } = useCategories();

  const users = userQuery.data ?? [];

  const handleSubmit = async (data: z.infer<typeof CreateCourseSchema>) => {
    createCourseMutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        setDialogOpen(false);

        toast.success('Curso creado correctamente');
      },
      onError: () => {
        toast.error('Error al crear el curso');
      }
    });
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    const urlFile = await uploadImage(formData);

    form.setValue('image', urlFile);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className='max-h-[90vh] max-w-full overflow-y-auto p-0 sm:max-w-3xl'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader className='px-4 pb-2 pt-5 sm:px-6'>
              <DialogTitle>Crear Nuevo Curso</DialogTitle>
              <DialogDescription>
                Completa el formulario para crear un nuevo curso.
              </DialogDescription>
            </DialogHeader>

            <Tabs className='w-full'>
              <div className='px-4 sm:px-6'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='basic'>Básico</TabsTrigger>
                  <TabsTrigger value='details'>Detalles</TabsTrigger>
                  <TabsTrigger value='media'>Medios</TabsTrigger>
                </TabsList>
              </div>

              <div className='px-4 py-4 sm:px-6'>
                <TabsContent value='basic' className='mt-0 space-y-4'>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Título del Curso *</FormLabel>
                          <FormControl>
                            <Input
                              id='title'
                              {...field}
                              placeholder='Ingresa el título del curso'
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Descripción *</FormLabel>
                          <FormControl>
                            <Textarea
                              id='description'
                              placeholder='Describe el contenido del curso'
                              className='min-h-[100px]'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  />
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='price'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Precio *</FormLabel>
                            <FormControl>
                              <div className='relative'>
                                <span className='absolute left-3 top-2.5'>
                                  $
                                </span>
                                <Input
                                  id='price'
                                  className='pl-7'
                                  type='number'
                                  {...field}
                                  onChange={(e) => {
                                    if (e.target.value === '') {
                                      field.onChange(0);
                                      return;
                                    }

                                    field.onChange(parseFloat(e.target.value));
                                  }}
                                  placeholder='0.00'
                                />
                              </div>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name='offPrice'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Precio Oferta</FormLabel>
                            <FormControl>
                              <div className='relative'>
                                <span className='absolute left-3 top-2.5'>
                                  $
                                </span>
                                <Input
                                  id='offPrice'
                                  className='pl-7'
                                  {...field}
                                  onChange={(e) => {
                                    if (e.target.value === '') {
                                      field.onChange(0);
                                      return;
                                    }

                                    field.onChange(parseFloat(e.target.value));
                                  }}
                                  placeholder='0.00'
                                />
                              </div>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                  <div>
                    <Label htmlFor='category'>Categoría *</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleSelectChange('category', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona una categoría' />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='pack'>Pack *</Label>
                    <Select
                      value={formData.pack}
                      onValueChange={(value) =>
                        handleSelectChange('pack', value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un pack' />
                      </SelectTrigger>
                      <SelectContent>
                        {packs.map((pack) => (
                          <SelectItem key={pack} value={pack}>
                            {pack}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div> */}
                </TabsContent>

                <TabsContent value='details' className='mt-0 space-y-4'>
                  <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='instructorId'
                      render={({ field }) => {
                        return (
                          <FormItem className='flex flex-col'>
                            <FormLabel>Instructor *</FormLabel>
                            <FormControl>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <Button
                                    variant='outline'
                                    role='combobox'
                                    className='w-[200px] justify-between'
                                  >
                                    {field.value
                                      ? users.find(
                                          (user) => field.value === user.id
                                        )?.firstName +
                                        ' ' +
                                        users.find(
                                          (user) => field.value === user.id
                                        )?.lastName
                                      : 'Select instructor...'}
                                    <ChevronsUpDown className='opacity-50' />
                                  </Button>
                                </PopoverTrigger>
                                <PopoverContent className='w-[200px] p-0'>
                                  <Command>
                                    <CommandInput
                                      placeholder='Search framework...'
                                      className='h-9'
                                    />
                                    <CommandList>
                                      <CommandEmpty>
                                        No framework found.
                                      </CommandEmpty>
                                      <CommandGroup>
                                        {users.map((user) => (
                                          <CommandItem
                                            key={user.id}
                                            value={user.id}
                                            onSelect={(currentValue) => {
                                              field.onChange(
                                                currentValue === field.value
                                                  ? ''
                                                  : currentValue
                                              );
                                            }}
                                          >
                                            {user.firstName} {user.lastName}
                                            <Check
                                              className={cn(
                                                'ml-auto',
                                                field.value === user.id
                                                  ? 'opacity-100'
                                                  : 'opacity-0'
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    </CommandList>
                                  </Command>
                                </PopoverContent>
                              </Popover>
                            </FormControl>
                            <FormMessage></FormMessage>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='languageId'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Idioma *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder='Selecciona un idioma' />
                                </SelectTrigger>
                                <SelectContent>
                                  {languagesQuery.data &&
                                    languagesQuery.data.map((language) => (
                                      <SelectItem
                                        key={language.id}
                                        value={language.id.toString()}
                                      >
                                        {language.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='packId'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Paquete *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder='Selecciona un paquete' />
                                </SelectTrigger>
                                <SelectContent>
                                  {packsQuery.data &&
                                    packsQuery.data.map((pack) => (
                                      <SelectItem
                                        key={pack.id}
                                        value={pack.id.toString()}
                                      >
                                        {pack.title}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                    <FormField
                      control={form.control}
                      name='categoryId'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Categoria *</FormLabel>
                            <FormControl>
                              <Select
                                value={field.value}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder='Selecciona una categoria' />
                                </SelectTrigger>
                                <SelectContent>
                                  {categoriesQuery.data &&
                                    categoriesQuery.data.map((pack) => (
                                      <SelectItem
                                        key={pack.id}
                                        value={pack.id.toString()}
                                      >
                                        {pack.name}
                                      </SelectItem>
                                    ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                  {/* <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                    <FormField
                      control={form.control}
                      name='orderNumber'
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormLabel>Orden</FormLabel>
                            <FormControl>
                              <Input
                                id='orderNumber'
                                type='number'
                                {...field}
                                onChange={(e) => {
                                  if (e.target.value === '') {
                                    field.onChange(0);
                                    return;
                                  }

                                  field.onChange(parseFloat(e.target.value));
                                }}
                                placeholder='0'
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div> */}

                  {/* {isEditing && (
                  <div className='rounded-md border bg-muted/50 p-4'>
                    <h3 className='mb-2 font-medium'>
                      Información no editable
                    </h3>
                    <div className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
                      <div>
                        <Label>Valoración Promedio</Label>
                        <div className='mt-1 flex items-center'>
                          <Star className='mr-1 h-4 w-4 fill-yellow-500 text-yellow-500' />
                          <span>{currentCourse?.averageRating}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Total de Reseñas</Label>
                        <div className='mt-1'>
                          {currentCourse?.totalReviews}
                        </div>
                      </div>
                      <div>
                        <Label>Total de Estudiantes</Label>
                        <div className='mt-1 flex items-center'>
                          <Users className='mr-1 h-4 w-4' />
                          <span>{currentCourse?.totalStudents}</span>
                        </div>
                      </div>
                      <div>
                        <Label>Creado Por</Label>
                        <div className='mt-1'>{currentCourse?.createdBy}</div>
                      </div>
                      <div>
                        <Label>Fecha de Creación</Label>
                        <div className='mt-1'>{currentCourse?.createdAt}</div>
                      </div>
                    </div>
                  </div>
                )} */}
                </TabsContent>

                <TabsContent value='media' className='mt-0 space-y-4'>
                  <FormField
                    control={form.control}
                    name='image'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Imagen *</FormLabel>
                          <FormControl>
                            <div className='space-y-4'>
                              <div className='flex items-center gap-2'>
                                <Input type='file' onChange={onImageChange} />
                                {field.value && (
                                  <Button
                                    type='button'
                                    variant='destructive'
                                    size='icon'
                                    onClick={() => form.setValue('image', '')}
                                  >
                                    <X className='h-4 w-4' />
                                  </Button>
                                )}
                              </div>
                              <div className='relative aspect-video w-full overflow-hidden rounded-lg border'>
                                {field.value ? (
                                  <Image
                                    src={field.value}
                                    alt='Preview'
                                    fill
                                    className='object-cover'
                                  />
                                ) : (
                                  <div className='flex h-full items-center justify-center'>
                                    <ImageIcon className='h-10 w-10 text-muted-foreground' />
                                  </div>
                                )}
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='introVideoUrl'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Video de Introducción</FormLabel>
                          <FormControl>
                            <Input
                              id='introVideoUrl'
                              placeholder='https://ejemplo.com/video.mp4'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  />

                  <FormField
                    control={form.control}
                    name='downloadLink'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Link de Descarga</FormLabel>
                          <FormControl>
                            <Input
                              id='downloadLink'
                              placeholder='https://ejemplo.com/descarga'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage></FormMessage>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    control={form.control}
                    name='pdfUrl'
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>PDF</FormLabel>
                          <FormControl>
                            <Input
                              id='pdfUrl'
                              placeholder='https://ejemplo.com/documento.pdf'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage> </FormMessage>
                        </FormItem>
                      );
                    }}
                  />
                </TabsContent>
              </div>
            </Tabs>

            <Separator />

            <DialogFooter className='px-4 py-4 sm:px-6'>
              <div className='flex w-full flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
                <Button
                  variant='outline'
                  onClick={() => setDialogOpen(false)}
                  className='mt-3 sm:mt-0'
                >
                  Cancelar
                </Button>
                <Button type='submit' className='w-full sm:w-auto'>
                  {createCourseMutation.isPending
                    ? 'Creando...'
                    : 'Crear Curso'}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

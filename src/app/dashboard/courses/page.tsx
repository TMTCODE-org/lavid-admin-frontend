'use client';

import type React from 'react';

import { useState } from 'react';
import {
  Edit,
  Trash2,
  Plus,
  Search,
  Star,
  Users,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Course } from '@/features/courses/entities/course.entity';
import { useGetCourses } from '@/features/courses/hooks/useGetCourses';
import Image from 'next/image';
import PageContainer from '@/components/layout/page-container';

// Categorías de ejemplo
const categories = [
  'Desarrollo Web',
  'Diseño',
  'Marketing',
  'Programación',
  'Negocios',
  'Idiomas',
  'Música',
  'Fotografía',
  'Salud y Fitness'
];

// Packs de ejemplo
const packs = ['Básico', 'Premium', 'Pro', 'Enterprise'];

// Idiomas de ejemplo
const languages = ['Español', 'Inglés', 'Francés', 'Alemán', 'Portugués'];

export default function CoursesManagement() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const { getCoursesQuery } = useGetCourses();

  const courses = getCoursesQuery.data || [];

  return (
    <PageContainer>
      <div className='container mx-auto py-6'>
        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Gestión de Cursos</CardTitle>
              <CardDescription>
                Administra todos los cursos de la plataforma
              </CardDescription>
            </div>
            <Button onClick={() => {}}>
              <Plus className='mr-2 h-4 w-4' />
              Nuevo Curso
            </Button>
          </CardHeader>
          <CardContent>
            <div className='rounded-md border'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Imagen</TableHead>
                    <TableHead>Título</TableHead>
                    <TableHead>Categoría</TableHead>
                    <TableHead>Precio</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Pack</TableHead>
                    <TableHead>Valoración</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={8}
                        className='py-8 text-center text-muted-foreground'
                      >
                        No se encontraron cursos
                      </TableCell>
                    </TableRow>
                  ) : (
                    courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <Image
                            src={course.image || '/placeholder.svg'}
                            alt={course.title}
                            width={200}
                            height={200}
                            className='h-12 w-20 rounded-md object-cover'
                          />
                        </TableCell>
                        <TableCell className='font-medium'>
                          {course.title}
                        </TableCell>
                        <TableCell>
                          <Badge variant='outline'>
                            {course.category.name}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex flex-col'>
                            {course.offPrice ? (
                              <>
                                <span className='text-muted-foreground line-through'>
                                  ${course.price}
                                </span>
                                <span className='font-medium'>
                                  ${course.offPrice}
                                </span>
                              </>
                            ) : (
                              <span>${course.price}</span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {course.instructor.firstName}{' '}
                          {course.instructor.lastName}{' '}
                        </TableCell>
                        <TableCell>
                          <Badge>{course.pack.title}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className='flex items-center'>
                            <Star className='mr-1 h-4 w-4 fill-yellow-500 text-yellow-500' />
                            <span>{course.averageRating}</span>
                            <span className='ml-1 text-muted-foreground'>
                              ({course.totalReviews})
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className='flex space-x-2'>
                            <Button
                              variant='outline'
                              size='icon'
                              onClick={() => {}}
                            >
                              <Edit className='h-4 w-4' />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant='outline'
                                  size='icon'
                                  className='text-destructive'
                                >
                                  <Trash2 className='h-4 w-4' />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    ¿Estás seguro?
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Esta acción no se puede deshacer. Se
                                    eliminará permanentemente el curso &quot;
                                    {course.title}
                                    &quot;.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>
                                    Cancelar
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                    onClick={() => {}}
                                  >
                                    Eliminar
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className='flex items-center justify-end space-x-2 py-4'>
              <Button variant='outline' size='sm'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='sm'>
                1
              </Button>
              <Button variant='outline' size='sm'>
                2
              </Button>
              <Button variant='outline' size='sm'>
                3
              </Button>
              <Button variant='outline' size='sm'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Diálogo para crear/editar curso */}
        {/* <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-h-[90vh] max-w-3xl overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? 'Editar Curso' : 'Crear Nuevo Curso'}
            </DialogTitle>
            <DialogDescription>
              {isEditing
                ? 'Modifica los detalles del curso existente.'
                : 'Completa el formulario para crear un nuevo curso.'}
            </DialogDescription>
          </DialogHeader>
          <div className='grid grid-cols-1 gap-4 py-4 md:grid-cols-2'>
            <div className='space-y-4 md:col-span-2'>
              <div>
                <Label htmlFor='title'>Título del Curso *</Label>
                <Input
                  id='title'
                  name='title'
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder='Ingresa el título del curso'
                  required
                />
              </div>
              <div>
                <Label htmlFor='description'>Descripción *</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder='Describe el contenido del curso'
                  className='min-h-[100px]'
                  required
                />
              </div>
            </div>

            <div className='space-y-4'>
              <div>
                <Label htmlFor='price'>Precio Regular *</Label>
                <div className='relative'>
                  <span className='absolute left-3 top-2.5'>$</span>
                  <Input
                    id='price'
                    name='price'
                    type='number'
                    value={formData.price}
                    onChange={handleInputChange}
                    className='pl-7'
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor='offPrice'>Precio de Oferta</Label>
                <div className='relative'>
                  <span className='absolute left-3 top-2.5'>$</span>
                  <Input
                    id='offPrice'
                    name='offPrice'
                    type='number'
                    value={formData.offPrice || ''}
                    onChange={handleInputChange}
                    className='pl-7'
                  />
                </div>
              </div>
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
                  onValueChange={(value) => handleSelectChange('pack', value)}
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
            </div>

            <div className='space-y-4'>
              <div>
                <Label htmlFor='instructor'>Instructor *</Label>
                <Input
                  id='instructor'
                  name='instructor'
                  value={formData.instructor}
                  onChange={handleInputChange}
                  placeholder='Nombre del instructor'
                  required
                />
              </div>
              <div>
                <Label htmlFor='language'>Idioma *</Label>
                <Select
                  value={formData.language}
                  onValueChange={(value) =>
                    handleSelectChange('language', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder='Selecciona un idioma' />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((language) => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor='totalDuration'>Duración Total *</Label>
                <Input
                  id='totalDuration'
                  name='totalDuration'
                  value={formData.totalDuration}
                  onChange={handleInputChange}
                  placeholder='Ej: 42h 30m'
                  required
                />
              </div>
              <div>
                <Label htmlFor='orderNumber'>Número de Orden</Label>
                <Input
                  id='orderNumber'
                  name='orderNumber'
                  type='number'
                  value={formData.orderNumber}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className='space-y-4 md:col-span-2'>
              <div>
                <Label htmlFor='image'>URL de la Imagen *</Label>
                <Input
                  id='image'
                  name='image'
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder='https://ejemplo.com/imagen.jpg'
                  required
                />
              </div>
              <div>
                <Label htmlFor='introVideoUrl'>
                  URL del Video Introductorio
                </Label>
                <Input
                  id='introVideoUrl'
                  name='introVideoUrl'
                  value={formData.introVideoUrl || ''}
                  onChange={handleInputChange}
                  placeholder='https://ejemplo.com/video.mp4'
                />
              </div>
              <div>
                <Label htmlFor='downloadLink'>Enlace de Descarga</Label>
                <Input
                  id='downloadLink'
                  name='downloadLink'
                  value={formData.downloadLink || ''}
                  onChange={handleInputChange}
                  placeholder='https://ejemplo.com/descarga'
                />
              </div>
              <div>
                <Label htmlFor='pdfUrl'>URL del PDF</Label>
                <Input
                  id='pdfUrl'
                  name='pdfUrl'
                  value={formData.pdfUrl || ''}
                  onChange={handleInputChange}
                  placeholder='https://ejemplo.com/documento.pdf'
                />
              </div>
            </div>

            {isEditing && (
              <div className='rounded-md border bg-muted/50 p-4 md:col-span-2'>
                <h3 className='mb-2 font-medium'>Información no editable</h3>
                <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
                  <div>
                    <Label>Valoración Promedio</Label>
                    <div className='mt-1 flex items-center'>
                      <Star className='mr-1 h-4 w-4 fill-yellow-500 text-yellow-500' />
                      <span>{currentCourse?.averageRating}</span>
                    </div>
                  </div>
                  <div>
                    <Label>Total de Reseñas</Label>
                    <div className='mt-1'>{currentCourse?.totalReviews}</div>
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
                  <div>
                    <Label>Última Actualización</Label>
                    <div className='mt-1'>{currentCourse?.updatedAt}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? 'Actualizar Curso' : 'Crear Curso'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      </div>
    </PageContainer>
  );
}

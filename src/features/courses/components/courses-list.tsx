'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, Edit, Star, Trash2 } from 'lucide-react';

import { useGetCourses } from '../hooks/useGetCourses';
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

import { CreateCourseButton } from './create-course-button';

export const CoursesList = () => {
  const { getCoursesQuery } = useGetCourses();

  const courses = getCoursesQuery.data || [];

  return (
    <div className='container mx-auto py-6'>
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <div>
            <CardTitle>Gestión de Cursos</CardTitle>
            <CardDescription>
              Administra todos los cursos de la plataforma
            </CardDescription>
          </div>
          <CreateCourseButton />
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
                        <Badge variant='outline'>{course.category.name}</Badge>
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
                                  Esta acción no se puede deshacer. Se eliminará
                                  permanentemente el curso &quot;
                                  {course.title}
                                  &quot;.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
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
    </div>
  );
};

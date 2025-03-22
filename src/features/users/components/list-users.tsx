'use client';

import { useState } from 'react';
import {
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  UserPlus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

import { Button } from '@/components/ui/button';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

import { User } from '../entities/user.entity';
import { useGetAllUsers } from '../hooks/useGetAllUsers';

export function UsersList() {
  const { userQuery } = useGetAllUsers();

  const users = userQuery.data || [];

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userDetailsOpen, setUserDetailsOpen] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);

    const matchesRole =
      roleFilter === 'all' ||
      user.roles.some((role) => {
        console.log({
          role
        });

        return role.name.toLowerCase() === roleFilter.toLowerCase();
      });

    return matchesStatus && matchesRole;
  });

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setUserDetailsOpen(true);
  };

  const renderUserCard = (user: User) => (
    <Card key={user.id} className='mb-4'>
      <CardContent className='p-0'>
        <div className='flex items-start p-4'>
          <Avatar className='mr-4 h-12 w-12'>
            <AvatarImage
              src={user.avatar}
              alt={`${user.firstName} ${user.lastName}`}
            />
            <AvatarFallback>
              {getInitials(user.firstName, user.lastName)}
            </AvatarFallback>
          </Avatar>
          <div className='min-w-0 flex-1'>
            <div className='flex items-center justify-between'>
              <h3 className='truncate text-base font-medium'>
                {user.firstName} {user.lastName}
              </h3>
              <Badge
                variant={user.isActive ? 'default' : 'secondary'}
                className='ml-2'
              >
                {user.isActive ? 'Activo' : 'Inactivo'}
              </Badge>
            </div>
            <div className='text-sm text-muted-foreground'>
              @{user.username}
            </div>
            <div className='mt-2 flex flex-col space-y-1 text-sm'>
              <div className='flex items-center'>
                <Mail className='mr-2 h-3.5 w-3.5 text-muted-foreground' />
                <span className='truncate'>{user.email}</span>
              </div>
              {user.phoneNumber && (
                <div className='flex items-center'>
                  <Phone className='mr-2 h-3.5 w-3.5 text-muted-foreground' />
                  <span>{user.phoneNumber}</span>
                </div>
              )}
            </div>
            <div className='mt-3 flex items-center justify-between'>
              <div className='flex flex-wrap gap-1'>
                {user.roles.map((role, index) => (
                  <Badge key={index} variant='outline' className='text-xs'>
                    {role.name}
                  </Badge>
                ))}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='ghost' size='icon'>
                    <MoreVertical className='h-4 w-4' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                    <Eye className='mr-2 h-4 w-4' />
                    Ver detalles
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Edit className='mr-2 h-4 w-4' />
                    Editar
                  </DropdownMenuItem>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DropdownMenuItem
                        onSelect={(e) => {}}
                        className='text-destructive'
                      >
                        <Trash2 className='mr-2 h-4 w-4' />
                        Eliminar
                      </DropdownMenuItem>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Esta acción no se puede deshacer. Se eliminará
                          permanentemente el usuario
                          <span className='font-semibold'>
                            {' '}
                            {user.firstName} {user.lastName}
                          </span>{' '}
                          (@{user.username}).
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => {}}>
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          // onClick={handleDeleteUser}
                          className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <DropdownMenuSeparator />
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className='container mx-auto px-4 py-4 sm:px-6 lg:px-8'>
      <Card>
        <CardHeader className='flex flex-col items-start justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0'>
          <div>
            <CardTitle>Gestión de Usuarios</CardTitle>
            <CardDescription>
              Administra todos los usuarios de la plataforma
            </CardDescription>
          </div>
          <Button className='w-full sm:w-auto'>
            <UserPlus className='mr-2 h-4 w-4' />
            Nuevo Usuario
          </Button>
        </CardHeader>
        <CardContent>
          <div className='mb-6'>
            <div className='flex flex-col space-y-2 sm:flex-row sm:space-x-2 sm:space-y-0'>
              <div className='flex-1 sm:max-w-[200px]'>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Estado' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos los estados</SelectItem>
                    <SelectItem value='active'>Activos</SelectItem>
                    <SelectItem value='inactive'>Inactivos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='flex-1 sm:max-w-[200px]'>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder='Rol' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='all'>Todos los roles</SelectItem>
                    <SelectItem value='admin'>Admin</SelectItem>
                    <SelectItem value='user'>Usuario</SelectItem>
                    <SelectItem value='student'>Estudiante</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button variant='outline' size='icon' className='hidden sm:flex'>
                <Filter className='h-4 w-4' />
              </Button>
            </div>
          </div>

          {/* Vista móvil (tarjetas) */}
          <div className='block md:hidden'>
            {filteredUsers.length === 0 ? (
              <div className='py-8 text-center text-muted-foreground'>
                No se encontraron usuarios
              </div>
            ) : (
              filteredUsers.map((user) => renderUserCard(user))
            )}
          </div>

          {/* Vista desktop (tabla) */}
          <div className='hidden rounded-md border md:block'>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Usuario</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Fecha de registro</TableHead>
                  <TableHead>Roles</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className='py-8 text-center text-muted-foreground'
                    >
                      No se encontraron usuarios
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className='flex items-center'>
                          <Avatar className='mr-2 h-8 w-8'>
                            <AvatarImage
                              src={user.avatar}
                              alt={`${user.firstName} ${user.lastName}`}
                            />
                            <AvatarFallback>
                              {getInitials(user.firstName, user.lastName)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className='font-medium'>
                              {user.firstName} {user.lastName}
                            </div>
                            <div className='text-sm text-muted-foreground'>
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.phoneNumber || '-'}</TableCell>
                      <TableCell>
                        {Intl.DateTimeFormat('es-PE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }).format(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className='flex flex-wrap gap-1'>
                          {user.roles.map((role, index) => (
                            <Badge
                              key={index}
                              variant='outline'
                              className='text-xs'
                            >
                              {role.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={user.isActive ? 'default' : 'secondary'}
                        >
                          {user.isActive ? 'Activo' : 'Inactivo'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className='flex space-x-1'>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant='ghost'
                                  size='icon'
                                  onClick={() => handleViewDetails(user)}
                                >
                                  <Eye className='h-4 w-4' />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Ver detalles</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant='ghost' size='icon'>
                                  <Edit className='h-4 w-4' />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Editar usuario</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant='ghost'
                                      size='icon'
                                      className='text-destructive hover:text-destructive'
                                      onClick={() => {}}
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
                                        eliminará permanentemente el usuario
                                        <span className='font-semibold'>
                                          {' '}
                                          {user.firstName} {user.lastName}
                                        </span>{' '}
                                        (@{user.username}).
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel onClick={() => {}}>
                                        Cancelar
                                      </AlertDialogCancel>
                                      <AlertDialogAction
                                        // onClick={handleDeleteUser}
                                        className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                                      >
                                        Eliminar
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Eliminar usuario</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          <div className='flex items-center justify-between py-4'>
            <div className='text-sm text-muted-foreground'>
              Mostrando{' '}
              <span className='font-medium'>{filteredUsers.length}</span> de{' '}
              <span className='font-medium'>{users.length}</span> usuarios
            </div>
            <div className='flex items-center space-x-2'>
              <Button variant='outline' size='icon' className='h-8 w-8'>
                <ChevronLeft className='h-4 w-4' />
              </Button>
              <Button variant='outline' size='sm' className='h-8 w-8'>
                1
              </Button>
              <Button variant='outline' size='sm' className='h-8 w-8'>
                2
              </Button>
              <Button variant='outline' size='sm' className='h-8 w-8'>
                3
              </Button>
              <Button variant='outline' size='icon' className='h-8 w-8'>
                <ChevronRight className='h-4 w-4' />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de detalles del usuario */}
      <Dialog open={userDetailsOpen} onOpenChange={setUserDetailsOpen}>
        <DialogContent className='max-h-[90vh] max-w-full overflow-y-auto sm:max-w-2xl'>
          <DialogHeader>
            <DialogTitle>Detalles del Usuario</DialogTitle>
            <DialogDescription>
              Información completa del perfil de usuario
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className='mt-4'>
              <div className='mb-6 flex flex-col items-center sm:flex-row sm:items-start'>
                <Avatar className='mb-4 h-20 w-20 sm:mb-0 sm:mr-6'>
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={`${selectedUser.firstName} ${selectedUser.lastName}`}
                  />
                  <AvatarFallback className='text-xl'>
                    {getInitials(selectedUser.firstName, selectedUser.lastName)}
                  </AvatarFallback>
                </Avatar>
                <div className='flex-1 text-center sm:text-left'>
                  <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                    <h2 className='text-xl font-bold'>
                      {selectedUser.firstName} {selectedUser.lastName}
                    </h2>
                    <div className='mt-2 sm:mt-0'>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant='destructive'
                            size='sm'
                            onClick={() => {}}
                          >
                            <Trash2 className='mr-2 h-4 w-4' />
                            Eliminar Usuario
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción no se puede deshacer. Se eliminará
                              permanentemente el usuario
                              <span className='font-semibold'>
                                {' '}
                                {selectedUser.firstName} {selectedUser.lastName}
                              </span>{' '}
                              (@{selectedUser.username}).
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={() => {}}>
                              Cancelar
                            </AlertDialogCancel>
                            <AlertDialogAction
                              // onClick={handleDeleteUser}
                              className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
                            >
                              Eliminar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                  <p className='text-muted-foreground'>
                    @{selectedUser.username}
                  </p>
                  <div className='mt-2 flex flex-wrap justify-center gap-1 sm:justify-start'>
                    {selectedUser.roles.map((role, index) => (
                      <Badge
                        key={index}
                        variant='secondary'
                        className='text-xs'
                      >
                        {role.name}
                      </Badge>
                    ))}
                    <Badge
                      variant={selectedUser.isActive ? 'default' : 'outline'}
                      className='text-xs'
                    >
                      {selectedUser.isActive ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </div>
                </div>
              </div>

              <Tabs defaultValue='info' className='w-full'>
                <TabsList className='grid w-full grid-cols-3'>
                  <TabsTrigger value='info'>Información</TabsTrigger>
                  <TabsTrigger value='activity'>Actividad</TabsTrigger>
                  <TabsTrigger value='settings'>Configuración</TabsTrigger>
                </TabsList>

                <TabsContent value='info' className='mt-4 space-y-4'>
                  <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Email
                      </p>
                      <p className='flex items-center'>
                        <Mail className='mr-2 h-4 w-4 text-muted-foreground' />
                        {selectedUser.email}
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Teléfono
                      </p>
                      <p className='flex items-center'>
                        <Phone className='mr-2 h-4 w-4 text-muted-foreground' />
                        {selectedUser.phoneNumber || 'No especificado'}
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Fecha de registro
                      </p>
                      <p className='flex items-center'>
                        <Calendar className='mr-2 h-4 w-4 text-muted-foreground' />
                        {Intl.DateTimeFormat('es-PE', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        }).format(selectedUser.createdAt)}
                      </p>
                    </div>

                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Habilidades
                      </p>
                      <p>{selectedUser.skill || 'No especificado'}</p>
                    </div>
                  </div>

                  {selectedUser.bio && (
                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Biografía
                      </p>
                      <p className='text-sm'>{selectedUser.bio}</p>
                    </div>
                  )}

                  {selectedUser.socialMedia && (
                    <div className='space-y-1'>
                      <p className='text-sm font-medium text-muted-foreground'>
                        Redes Sociales
                      </p>
                      <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                        {Object.entries(
                          JSON.parse(JSON.stringify(selectedUser.socialMedia))
                        ).map(([key, value]) => (
                          <div key={key} className='flex items-center'>
                            <span className='mr-2 capitalize'>{key}:</span>
                            <span className='text-sm'>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value='activity' className='mt-4'>
                  <div className='py-8 text-center text-muted-foreground'>
                    No hay actividad reciente para mostrar
                  </div>
                </TabsContent>

                <TabsContent value='settings' className='mt-4'>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <p className='font-medium'>Estado de la cuenta</p>
                        <p className='text-sm text-muted-foreground'>
                          {selectedUser.isActive
                            ? 'La cuenta está activa y puede acceder a la plataforma'
                            : 'La cuenta está desactivada y no puede acceder a la plataforma'}
                        </p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

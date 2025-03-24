import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { CirclePlus } from 'lucide-react';

type UserInformationTab = 'basic' | 'details' | 'roles';

interface Props {
  render?: () => React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CreateUserDialog: React.FC<Props> = ({
  onOpenChange,
  open,
  render
}) => {
  const [userInformationTab, setUserInformationTab] =
    useState<UserInformationTab>('basic');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {render ? render() : <CirclePlus className='h-4 w-4' />}
      </DialogTrigger>

      <DialogContent className='max-h-[90vh] max-w-full overflow-y-auto sm:max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Usuario</DialogTitle>
          <DialogDescription>
            Completa el formulario para crear un nuevo usuario en la plataforma.
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={userInformationTab}
          onValueChange={(value) =>
            setUserInformationTab(value as UserInformationTab)
          }
          className='mt-4 w-full'
        >
          <TabsList className='grid w-full grid-cols-3'>
            <TabsTrigger value='basic'>Información Básica</TabsTrigger>
            <TabsTrigger value='details'>Detalles</TabsTrigger>
            <TabsTrigger value='roles'>Roles y Permisos</TabsTrigger>
          </TabsList>

          <TabsContent value='basic' className='mt-4 space-y-4'>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <div className='space-y-2'>
                <Label htmlFor='firstName'>
                  Nombre <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='firstName'
                  name='firstName'
                  value={newUserForm.firstName || ''}
                  onChange={handleNewUserChange}
                  placeholder='Nombre'
                  className={formErrors.firstName ? 'border-destructive' : ''}
                />
                {formErrors.firstName && (
                  <p className='text-xs text-destructive'>
                    {formErrors.firstName}
                  </p>
                )}
              </div>
              <div className='space-y-2'>
                <Label htmlFor='lastName'>
                  Apellido <span className='text-destructive'>*</span>
                </Label>
                <Input
                  id='lastName'
                  name='lastName'
                  value={newUserForm.lastName || ''}
                  onChange={handleNewUserChange}
                  placeholder='Apellido'
                  className={formErrors.lastName ? 'border-destructive' : ''}
                />
                {formErrors.lastName && (
                  <p className='text-xs text-destructive'>
                    {formErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className='space-y-2'>
              <Label htmlFor='username'>
                Nombre de usuario <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='username'
                name='username'
                value={newUserForm.username || ''}
                onChange={handleNewUserChange}
                placeholder='nombre_usuario'
                className={formErrors.username ? 'border-destructive' : ''}
              />
              {formErrors.username && (
                <p className='text-xs text-destructive'>
                  {formErrors.username}
                </p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='email'>
                Email <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='email'
                name='email'
                type='email'
                value={newUserForm.email || ''}
                onChange={handleNewUserChange}
                placeholder='usuario@ejemplo.com'
                className={formErrors.email ? 'border-destructive' : ''}
              />
              {formErrors.email && (
                <p className='text-xs text-destructive'>{formErrors.email}</p>
              )}
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>
                Contraseña <span className='text-destructive'>*</span>
              </Label>
              <Input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (formErrors.password) {
                    setFormErrors({
                      ...formErrors,
                      password: ''
                    });
                  }
                }}
                placeholder='Contraseña'
                className={formErrors.password ? 'border-destructive' : ''}
              />
              {formErrors.password && (
                <p className='text-xs text-destructive'>
                  {formErrors.password}
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value='details' className='mt-4 space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='phoneNumber'>Teléfono</Label>
              <Input
                id='phoneNumber'
                name='phoneNumber'
                value={newUserForm.phoneNumber || ''}
                onChange={handleNewUserChange}
                placeholder='+1234567890'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='skill'>Habilidades</Label>
              <Input
                id='skill'
                name='skill'
                value={newUserForm.skill || ''}
                onChange={handleNewUserChange}
                placeholder='JavaScript, React, Node.js'
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='bio'>Biografía</Label>
              <Textarea
                id='bio'
                name='bio'
                value={newUserForm.bio || ''}
                onChange={handleNewUserChange}
                placeholder='Breve descripción del usuario'
                rows={4}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='socialMedia'>Redes Sociales (formato JSON)</Label>
              <Textarea
                id='socialMedia'
                name='socialMedia'
                value={newUserForm.socialMedia || ''}
                onChange={handleNewUserChange}
                placeholder='{"twitter": "@usuario", "linkedin": "linkedin.com/in/usuario"}'
                rows={3}
              />
              <p className='text-xs text-muted-foreground'>
                Formato: {'{'}"twitter": "@usuario", "linkedin":
                "linkedin.com/in/usuario"{'}'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value='roles' className='mt-4 space-y-4'>
            <div className='space-y-2'>
              <Label className='mb-2 block'>Estado de la cuenta</Label>
              <div className='flex items-center space-x-2'>
                <Switch
                  id='isActive'
                  checked={newUserForm.isActive}
                  onCheckedChange={handleActiveChange}
                />
                <label
                  htmlFor='isActive'
                  className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                  Usuario activo
                </label>
              </div>
              <p className='mt-1 text-xs text-muted-foreground'>
                Los usuarios inactivos no pueden acceder a la plataforma.
              </p>
            </div>

            <div className='space-y-2'>
              <Label className='mb-2 block'>
                Roles <span className='text-destructive'>*</span>
              </Label>
              {formErrors.roles && (
                <p className='mb-2 text-xs text-destructive'>
                  {formErrors.roles}
                </p>
              )}
              <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='roleAdmin'
                    checked={newUserForm.roles?.some(
                      (role) => role.name === 'ADMIN'
                    )}
                    onCheckedChange={(checked) =>
                      handleRoleChange('ADMIN', checked === true)
                    }
                  />
                  <label
                    htmlFor='roleAdmin'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Administrador
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='roleInstructor'
                    checked={newUserForm.roles?.some(
                      (role) => role.name === 'INSTRUCTOR'
                    )}
                    onCheckedChange={(checked) =>
                      handleRoleChange('INSTRUCTOR', checked === true)
                    }
                  />
                  <label
                    htmlFor='roleInstructor'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Instructor
                  </label>
                </div>
                <div className='flex items-center space-x-2'>
                  <Checkbox
                    id='roleStudent'
                    checked={newUserForm.roles?.some(
                      (role) => role.name === 'STUDENT'
                    )}
                    onCheckedChange={(checked) =>
                      handleRoleChange('STUDENT', checked === true)
                    }
                  />
                  <label
                    htmlFor='roleStudent'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    Estudiante
                  </label>
                </div>
              </div>
              <p className='mt-1 text-xs text-muted-foreground'>
                Selecciona al menos un rol para el usuario.
              </p>
            </div>
          </TabsContent>
        </Tabs>

        <div className='mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
          <Button variant='outline' onClick={() => setCreateUserOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleCreateUser}>Crear Usuario</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

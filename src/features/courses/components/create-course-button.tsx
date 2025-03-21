'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { CreateCourseFormDialog } from './forms/create-course-form-dialog';

export const CreateCourseButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)}>
        <Plus className='mr-2 h-4 w-4' />
        Nuevo Curso
      </Button>
      <CreateCourseFormDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </>
  );
};

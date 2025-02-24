'use client';

import { useState } from 'react';
import { Eye, Check, X, User, LoaderPinwheel } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BillStatusEnum } from '@/features/bills/entity/bill-status.entity';
import { Bill } from '@/features/bills/entity/bill.entity';
import { useBills } from '../hooks/useBills';
import Image from 'next/image';

export default function PacksList() {
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
  const { billsQuery } = useBills();

  const bills = billsQuery.data || [];

  const getStatusColor = (status: BillStatusEnum) => {
    switch (status) {
      case BillStatusEnum.ACTIVE:
        return 'bg-green-500';
      case BillStatusEnum.INACTIVE:
        return 'bg-gray-500';
      case BillStatusEnum.CANCELLED:
        return 'bg-red-500';
      case BillStatusEnum.REFUSED:
        return 'bg-yellow-500';
      case BillStatusEnum.PENDING:
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleAccept = (bill: Bill) => {
    // Aquí iría la lógica para aceptar el bill
    console.log('Bill aceptado:', bill);
  };

  const handleReject = (bill: Bill) => {
    // Aquí iría la lógica para rechazar el bill
    console.log('Bill rechazado:', bill);
  };

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Lista de Bills</CardTitle>
        <CardDescription>Gestiona los paquetes y sus estados</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Pack</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Monto</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {billsQuery.isLoading && (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className='flex h-44 items-center justify-center'>
                    <LoaderPinwheel className='animate-spin duration-700'></LoaderPinwheel>
                  </div>
                </TableCell>
              </TableRow>
            )}

            {bills.map((bill) => (
              <TableRow key={bill.id}>
                <TableCell>
                  <div className='flex items-center space-x-2'>
                    <Avatar>
                      <AvatarImage
                        src={bill.owner?.avatar}
                        alt={bill.owner?.firstName}
                      />
                      <AvatarFallback>
                        <User className='h-4 w-4' />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className='font-medium'>{bill.owner?.firstName}</div>
                      <div className='text-sm text-muted-foreground'>
                        {bill.owner?.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{bill?.pack?.title}</TableCell>
                <TableCell>
                  <Badge
                    className={`${getStatusColor(bill.status.value)} text-white`}
                  >
                    {bill.status.name}
                  </Badge>
                </TableCell>
                <TableCell>${bill.pack?.price}</TableCell>
                <TableCell>
                  {Intl.DateTimeFormat('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                  }).format(new Date(bill.dateBought))}
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        onClick={() => setSelectedBill(bill)}
                      >
                        <Eye className='mr-2 h-4 w-4' />
                        Ver
                      </Button>
                    </DialogTrigger>
                    <DialogContent className='max-w-2xl'>
                      <DialogHeader>
                        <DialogTitle>Detalles del Pack</DialogTitle>
                        <DialogDescription>
                          Revisa el comprobante de pago y decide si aceptar o
                          rechazar.
                        </DialogDescription>
                      </DialogHeader>
                      {selectedBill && (
                        <div className='mt-4'>
                          <div className='mb-4 flex items-center space-x-4'>
                            <Avatar>
                              <AvatarImage
                                src={selectedBill.owner?.avatar}
                                alt={selectedBill.owner?.firstName}
                              />
                              <AvatarFallback>
                                <User className='h-4 w-4' />
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className='font-medium'>
                                {selectedBill.owner?.firstName}
                              </div>
                              <div className='text-sm text-muted-foreground'>
                                {selectedBill.owner?.email}
                              </div>
                            </div>
                          </div>
                          <div className='mb-4 grid grid-cols-2 gap-4'>
                            <div>
                              <div className='font-medium'>Pack</div>
                              <div>{selectedBill.pack?.title}</div>
                            </div>
                            <div>
                              <div className='font-medium'>Estado</div>
                              <Badge
                                className={`${getStatusColor(selectedBill.status.value)} text-white`}
                              >
                                {selectedBill.status.name}
                              </Badge>
                            </div>
                            <div>
                              <div className='font-medium'>Monto</div>
                              <div>${selectedBill.pack?.price}</div>
                            </div>
                            <div>
                              <div className='font-medium'>Fecha</div>
                              <div>
                                {Intl.DateTimeFormat('es-ES', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  second: '2-digit'
                                }).format(new Date(selectedBill.dateBought))}
                              </div>
                            </div>
                          </div>
                          <div className='mb-2 font-medium'>
                            Comprobante de pago
                          </div>
                          <div className='relative max-h-[400px] overflow-hidden rounded-lg'>
                            <Image
                              src={
                                selectedBill.paymentImage || '/placeholder.svg'
                              }
                              width={400}
                              height={400}
                              alt='Comprobante de pago'
                              className='object-cover'
                              style={{ maxHeight: '400px', width: '100%' }}
                            />
                          </div>

                          <div className='flex justify-end space-x-2'>
                            <Button
                              onClick={() => handleAccept(selectedBill)}
                              variant='default'
                            >
                              <Check className='mr-2 h-4 w-4' />
                              Aceptar
                            </Button>
                            <Button
                              onClick={() => handleReject(selectedBill)}
                              variant='destructive'
                            >
                              <X className='mr-2 h-4 w-4' />
                              Rechazar
                            </Button>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

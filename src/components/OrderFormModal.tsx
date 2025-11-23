'use client';

import { FC } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import ServiceOrderForm from './ServiceOrderForm';

interface OrderFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName?: string;
}

const OrderFormModal: FC<OrderFormModalProps> = ({ open, onOpenChange, serviceName }) => {
  const handleFormSubmitted = () => {
    // Закрываем модалку после успешной отправки через небольшую задержку
    setTimeout(() => {
      onOpenChange(false);
    }, 3500);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-2xl overflow-y-auto bg-white dark:bg-[#0b0b0b]"
      >
        <SheetHeader className="mb-6">
          <SheetTitle className="sr-only">Форма заказа</SheetTitle>
        </SheetHeader>
        <ServiceOrderForm onSubmitted={handleFormSubmitted} serviceName={serviceName} />
      </SheetContent>
    </Sheet>
  );
};

export default OrderFormModal;

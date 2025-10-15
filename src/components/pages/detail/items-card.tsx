import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import React from 'react';

type ItemsCardProps = {
  className?: string;
  children: React.ReactNode;
};

type ItemCardIconProps = {
  icon: LucideIcon;
  className?: string;
};

const ItemsCardBase: React.FC<ItemsCardProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-2 p-4 lg:p-5 justify-center items-center border rounded-2xl border-neutral-800 bg-black',
        className
      )}
    >
      {children}
    </div>
  );
};

const ItemCardIcon: React.FC<ItemCardIconProps> = ({
  icon: Icon,
  className,
}) => {
  return <Icon className={cn('size-5 text-white', className)} />;
};

export const ItemsCard = Object.assign(ItemsCardBase, {
  Icon: ItemCardIcon,
});

export default ItemsCard;

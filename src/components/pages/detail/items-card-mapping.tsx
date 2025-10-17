import { TypographySub, TypographyTitle } from '@/components/ui/typography';
import ItemsCard from './items-card';
import { movieMeta } from './items-card-constants';
import { cn } from '@/lib/utils';

const ItemsCardMapping: React.FC<{ className?: string }> = ({
  className = '',
}) => (
  <div className={cn('w-full flex flex-row gap-3 lg:hidden', className)}>
    {movieMeta.map((meta, idx) => {
      const Icon = meta.icon;
      return (
        <ItemsCard key={idx} className='flex-1'>
          <ItemsCard.Icon
            icon={Icon}
            className={cn('lg:size-8', meta.className)}
          />
          <TypographySub smSize='xs' lgSize='md' label={meta.label} />
          <TypographyTitle smSize='lg' lgSize='xl' label={meta.value} />
        </ItemsCard>
      );
    })}
  </div>
);

export default ItemsCardMapping;

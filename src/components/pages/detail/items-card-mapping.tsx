import { TypographySub, TypographyTitle } from '@/components/ui/typography';
import ItemsCard from './items-card';
import { movieMeta } from './items-card-constants';
import { cn } from '@/lib/utils';
import { Genre } from '@/types';

const ItemsCardMapping: React.FC<{
  className?: string;
  rating?: number;
  genres?: Genre[];
  adult?: boolean;
}> = ({ className = '', rating = 0, adult = false, genres = [] }) => {
  const processedMeta = movieMeta.map((meta) => {
    const newMeta = { ...meta };
    switch (meta.label) {
      case 'Rating':
        newMeta.value = `${rating?.toFixed(1) || 0}/10`;
        break;
      case 'Age Limit':
        newMeta.value = adult ? '18+' : '13+';
        break;
      case 'Genre':
        newMeta.value = genres[0]?.name || '-';
        break;
    }
    return newMeta;
  });

  return (
    <div className={cn('w-full flex flex-row gap-3 lg:hidden', className)}>
      {processedMeta.map(
        ({ icon: Icon, label, value, className: metaClassName }, idx) => (
          <ItemsCard
            key={idx}
            className={cn(
              'flex-1 flex flex-col items-center text-center',
              metaClassName
            )}
          >
            <ItemsCard.Icon icon={Icon} className='lg:size-8' />
            <TypographySub size='xs' lgSize='md' label={label} />
            <TypographyTitle size='lg' lgSize='xl' label={value} />
          </ItemsCard>
        )
      )}
    </div>
  );
};

export default ItemsCardMapping;

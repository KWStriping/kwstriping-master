import Link from '@tempo/ui/components/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import type { FC, ReactNode } from 'react';
import { Fragment } from 'react';
import FormattedDateTime from '@tempo/dashboard/components/core/Date';

export interface TitleElement {
  text: string;
  link?: string;
}

export interface TimelineEventHeaderProps {
  title?: ReactNode;
  date: Maybe<string>;
  titleElements?: TitleElement[];
  secondaryTitle?: string;
}

export const TimelineEventHeader: FC<TimelineEventHeaderProps> = (props) => {
  const { title, date, titleElements, secondaryTitle } = props;
  const router = useRouter();
  return (
    <div className={'flex flex-row items-center justify-between w-full'}>
      {title && <Typography>{title}</Typography>}
      {titleElements && (
        <div className={'flex flex-row flex-wrap items-center'}>
          {titleElements.filter(Boolean).map(({ text, link }) => {
            return (
              <Fragment key={text}>
                {link ? (
                  <Link className={'mr-0.5'} onClick={() => router.push(link)}>
                    {text}
                  </Link>
                ) : (
                  <Typography className={'mr-0.5'}>{text}</Typography>
                )}
              </Fragment>
            );
          })}
        </div>
      )}
      <Typography className={'pl-[24px]'}>
        <FormattedDateTime date={date} />
      </Typography>
      {secondaryTitle && <Typography className={'mt-2'}>{secondaryTitle}</Typography>}
    </div>
  );
};

export default TimelineEventHeader;

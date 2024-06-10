import Box from '@mui/material/Box';
import { RichText } from '../inputs/RichText';

export interface PageHeroProps {
  title: string;
  description?: string;
}

export function PageHero({ title, description }: PageHeroProps) {
  return (
    <Box>
      <div className="text-center">
        <h1 className="text-6xl font-bold" data-testid={`titleOf${title}`}>
          {title}
        </h1>

        {description && (
          <div className="text-lg inline-block sm:block my-6 text-main-1">
            <RichText jsonStringData={description} />
          </div>
        )}
      </div>
    </Box>
  );
}

export default PageHero;

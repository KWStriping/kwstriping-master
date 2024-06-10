// import { useLocalization } from '@tempo/ui/providers/LocalizationProvider';
import { pagesPath } from '@kwstriping/lib/$path';

export const usePaths = () => {
  // const { locale } = useLocalization();
  // if (!locale) throw new Error('No current locale');
  // return pagesPath._locale(locale);
  return pagesPath;
};

export default usePaths;

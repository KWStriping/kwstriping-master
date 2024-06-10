import { createContext } from 'react';

export enum Locale {
  Ar = 'ar',
  Az = 'az',
  Bg = 'bg',
  Bn = 'bn',
  Ca = 'ca',
  Cs = 'cs',
  Da = 'da',
  De = 'de',
  El = 'el',
  En = 'en',
  Es = 'es',
  EsCo = 'es-CO',
  Et = 'et',
  Fa = 'fa',
  Fr = 'fr',
  Hi = 'hi',
  Hu = 'hu',
  Hy = 'hy',
  Id = 'id',
  Is = 'is',
  It = 'it',
  Ja = 'ja',
  Ko = 'ko',
  Mn = 'mn',
  Nb = 'nb',
  Nl = 'nl',
  Pl = 'pl',
  Pt = 'pt',
  PtBr = 'pt-BR',
  Ro = 'ro',
  Ru = 'ru',
  Sk = 'sk',
  Sl = 'sl',
  Sq = 'sq',
  Sr = 'sr',
  Sv = 'sv',
  Th = 'th',
  Tr = 'tr',
  Uk = 'uk',
  Vi = 'vi',
  ZhHans = 'zh-Hans',
  ZhHant = 'zh-Hant',
}

interface StructuredMessage {
  context?: string;
  string: string;
}
type LocaleMessages = Record<string, StructuredMessage>;

export const localeNames: Record<Locale, string> = {
  [Locale.Ar]: 'العربيّة',
  [Locale.Az]: 'Azərbaycanca',
  [Locale.Bg]: 'български',
  [Locale.Bn]: 'বাংলা',
  [Locale.Ca]: 'català',
  [Locale.Cs]: 'česky',
  [Locale.Da]: 'dansk',
  [Locale.De]: 'Deutsch',
  [Locale.El]: 'Ελληνικά',
  [Locale.En]: 'English',
  [Locale.Es]: 'español',
  [Locale.EsCo]: 'español de Colombia',
  [Locale.Et]: 'eesti',
  [Locale.Fa]: 'فارسی',
  [Locale.Fr]: 'français',
  [Locale.Hi]: 'Hindi',
  [Locale.Hu]: 'Magyar',
  [Locale.Hy]: 'հայերեն',
  [Locale.Id]: 'Bahasa Indonesia',
  [Locale.Is]: 'Íslenska',
  [Locale.It]: 'italiano',
  [Locale.Ja]: '日本語',
  [Locale.Ko]: '한국어',
  [Locale.Mn]: 'Mongolian',
  [Locale.Nb]: 'norsk (bokmål)',
  [Locale.Nl]: 'Nederlands',
  [Locale.Pl]: 'polski',
  [Locale.Pt]: 'Português',
  [Locale.PtBr]: 'Português Brasileiro',
  [Locale.Ro]: 'Română',
  [Locale.Ru]: 'Русский',
  [Locale.Sk]: 'Slovensky',
  [Locale.Sl]: 'Slovenščina',
  [Locale.Sq]: 'shqip',
  [Locale.Sr]: 'српски',
  [Locale.Sv]: 'svenska',
  [Locale.Th]: 'ภาษาไทย',
  [Locale.Tr]: 'Türkçe',
  [Locale.Uk]: 'Українська',
  [Locale.Vi]: 'Tiếng Việt',
  [Locale.ZhHans]: '简体中文',
  [Locale.ZhHant]: '繁體中文',
};

const dotSeparator = '_dot_';
const sepRegExp = new RegExp(dotSeparator, 'g');

function _getKeyValueJson(messages: LocaleMessages): Record<string, string> {
  if (messages) {
    const keyValueMessages: Record<string, string> = {};
    return Object.entries(messages).reduce((acc, [id, msg]) => {
      acc[id.replace(sepRegExp, '.')] = msg.string;
      return acc;
    }, keyValueMessages);
  }
}

export function getMatchingLocale(languages: readonly string[]): Locale {
  const localeEntries = Object.entries(Locale);

  for (const preferredLocale of languages) {
    for (const localeEntry of localeEntries) {
      if (localeEntry[1].toLowerCase() === preferredLocale.toLowerCase()) {
        return Locale[localeEntry[0]];
      }
    }
  }

  return undefined;
}

const defaultLocale = Locale.En;

export interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}
export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => undefined,
});

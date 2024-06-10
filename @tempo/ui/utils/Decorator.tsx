import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { Theme } from '@mui/material/styles';
import { StyledEngineProvider } from '@mui/material/styles';
import { ThemeProvider } from '@tempo/ui/theme/ThemeProvider';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

export const Decorator = (storyFn: any) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider>
      <div
        style={{
          isolation: 'isolate',
          padding: 24,
        }}
      >
        {storyFn()}
      </div>
    </ThemeProvider>
  </StyledEngineProvider>
);

export const GuideDecorator = (storyFn: any) => (
  <Card style={{ margin: 'auto', width: 800 }}>
    <CardContent>{storyFn()}</CardContent>
  </Card>
);

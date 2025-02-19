import type { SubmitPromise } from '@tempo/hooks/useForm';
import useForm from '@tempo/hooks/useForm';
import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';

import { ExitFormDialogContext, useExitFormDialogProvider } from './ExitFormDialogProvider';
import { useExitFormDialog } from './useExitFormDialog';

jest.mock('@tempo/hooks/useNotifier', () => undefined);

const MockExitFormDialogProvider = ({ children }) => {
  const { providerData } = useExitFormDialogProvider();
  return (
    <ExitFormDialogContext.Provider value={providerData}>
      {children}
    </ExitFormDialogContext.Provider>
  );
};

const initialPath = '/';
const targetPath = '/path';

const setup = (submitFn: () => SubmitPromise, confirmLeave = true) =>
  renderHook(
    () => {
      const form = useForm({ field: '' }, submitFn, { confirmLeave });
      const exit = useExitFormDialog();
      const navigate = useNavigate();
      const location = useLocation();
      return {
        form,
        exit,
        navigate,
        location,
      };
    },
    {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={[{ pathname: '/' }]}>
          <MockExitFormDialogProvider>{children}</MockExitFormDialogProvider>
        </MemoryRouter>
      ),
    }
  );

describe('useExitFormDialog', () => {
  it('blocks navigation after leaving dirty form', async () => {
    // Given
    const submitFn = jest.fn(() => Promise.resolve([]));
    const { result } = setup(submitFn);

    // When
    act(() => {
      result.current.form.change({
        target: { name: 'field', value: 'something' },
      });
    });
    act(() => {
      result.current.router.push(targetPath);
    });

    // Then
    expect(result.current.exit.shouldBlockNavigation()).toBe(true);
    expect(result.current.location.pathname).toBe(initialPath);
  });

  it('allows navigation after leaving dirty form if no confirmation is needed', async () => {
    // Given
    const submitFn = jest.fn(() => Promise.resolve([]));
    const { result } = setup(submitFn, false);

    // When
    act(() => {
      result.current.form.change({
        target: { name: 'field', value: 'something' },
      });
    });
    act(() => {
      result.current.router.push(targetPath);
    });

    // Then
    expect(result.current.exit.shouldBlockNavigation()).toBe(false);
    expect(result.current.location.pathname).toBe(targetPath);
  });
  it('navigates to full url with querystring', async () => {
    // Given
    const submitFn = jest.fn(() => Promise.resolve([]));
    const { result } = setup(submitFn);
    const qs = '?param=value';
    const targetPathWithQs = targetPath + qs;

    // When
    act(() => {
      result.current.form.change({
        target: { name: 'field', value: 'something' },
      });
    });
    act(() => {
      result.current.router.push(targetPathWithQs);
      result.current.exit.leave();
    });

    // Then
    expect(result.current.location.pathname).toBe(targetPath);
    expect(result.current.location.search).toBe(qs);
  });
});

import { useBlocker } from '@tempo/dashboard/hooks/navigation';
import type { SubmitPromise } from '@tempo/dashboard/hooks/useForm';
import { useRouter } from 'next/navigation';
import { createContext, useRef, useState } from 'react';
import type { Context, ReactNode } from 'react';
import ExitFormDialog from './ExitFormDialog';
import useBeforeUnload from './useBeforeUnload';

export interface ExitFormDialogData {
  setIsDirty: (id: symbol, isDirty: boolean) => void;
  setExitDialogSubmitRef: (id: symbol, submitFn: SubmitFn) => void;
  setEnableExitDialog: (value: boolean) => void;
  shouldBlockNavigation: () => boolean;
  setIsSubmitting: (value: boolean) => void;
  leave: () => void;
  setIsSubmitDisabled: (value: boolean) => void;
}

export type SubmitFn = (dataOrEvent?: unknown) => SubmitPromise<any[]>;

export type FormId = symbol;

type FormsData = Record<FormId, FormData>;

export interface WithFormId {
  formId: FormId;
}

interface FormData {
  isDirty: boolean;
  submitFn: SubmitFn | null;
}

// Do not use this context directly in components
// use useExitFormDialog hook instead
export const ExitFormDialogContext: Context<ExitFormDialogData> =
  createContext<ExitFormDialogData>({
    setIsDirty: () => undefined,
    setEnableExitDialog: () => undefined,
    setExitDialogSubmitRef: () => undefined,
    shouldBlockNavigation: () => false,
    setIsSubmitting: () => undefined,
    leave: () => undefined,
    setIsSubmitDisabled: () => undefined,
  });

const defaultValues = {
  isDirty: false,
  showDialog: false,
  blockNav: true,
  navAction: null,
  enableExitDialog: false,
  isSubmitting: false,
  formsData: {},
};

export function useExitFormDialogProvider() {
  const router = useRouter();

  const [showDialog, setShowDialog] = useState(defaultValues.showDialog);
  const isSubmitDisabled = useRef(false);

  const setIsSubmitDisabled = (status: boolean) => {
    isSubmitDisabled.current = status;
  };

  const isSubmitting = useRef(defaultValues.isSubmitting);
  const formsData = useRef<FormsData>({});
  const blockNav = useRef(defaultValues.blockNav);
  const navAction = useRef<string | null>(defaultValues.navAction);
  const enableExitDialog = useRef(defaultValues.enableExitDialog);
  const currentLocation = useRef(router.asPath);

  const setIsSubmitting = (value: boolean) => {
    setEnableExitDialog(!value);
    isSubmitting.current = value;
  };

  const setEnableExitDialog = (value: boolean) => {
    // dialog should never be toggled to enabled during form submission
    if (isSubmitting.current) return;

    enableExitDialog.current = value;
  };

  const setDefaultFormsData = () => {
    formsData.current = defaultValues.formsData;
  };

  const setCurrentLocation = (newLocation: string) => {
    currentLocation.current = newLocation;
  };

  const setFormData = (id: symbol, newData: Partial<FormData>) => {
    const updatedFormData = { ...formsData.current[id], ...newData };

    formsData.current = {
      ...formsData.current,
      [id]: updatedFormData,
    };
  };

  // Set either on generic form load or on every custom form data change
  // but doesn't cause re-renders
  const setSubmitRef = <T extends () => SubmitPromise<any[]>>(id: symbol, submitFn: T) => {
    setFormData(id, { submitFn });
  };

  const setIsDirty = (id: symbol, value: boolean) => {
    // in case of race conitions between forms and transitions
    if (!formsData.current[id]) return;

    setFormData(id, { isDirty: value });

    if (value) {
      setEnableExitDialog(true);
    }
  };

  const setBlockNav = (value: boolean) => (blockNav.current = value);

  const setDefaultNavAction = () => (navAction.current = defaultValues.navAction);

  const setStateDefaultValues = () => {
    setIsSubmitting(defaultValues.isSubmitting);
    setDefaultFormsData();
    setShowDialog(defaultValues.showDialog);
    setBlockNav(defaultValues.blockNav);
    setEnableExitDialog(defaultValues.enableExitDialog);
    setDefaultNavAction();
  };

  const getFormsDataValuesArray = () =>
    Object.getOwnPropertySymbols(formsData.current).map((key) => formsData.current[key]);

  const hasAnyFormsDirty = () => getFormsDataValuesArray().some(({ isDirty }) => !!isDirty);

  const shouldBlockNav = () => {
    if (!enableExitDialog.current || !hasAnyFormsDirty()) {
      return false;
    }

    return blockNav.current;
  };

  useBlocker({
    enabled: shouldBlockNav(),
    onBlock: (to: string) => {
      navAction.current = to;
      setShowDialog(true);
    },
  });

  // const isOnlyQuerying = (transition: typeof location) =>
  //   // We need to compare to current path and not window location
  //   // so it works with browser back button as well
  //   transition.pathname === currentLocation.current.pathname;

  // const handleNavigationBlock = () => {
  //   const unblock = navigate.block(transition => {
  //     // needs to be done before the shouldBlockNav condition
  //     // so it doesn't trigger setting default values
  //     if (isOnlyQuerying(transition)) {
  //       // Transition type requires this function to return either
  //       // false | void | string where string opens up the browser prompt
  //       // hence we return null
  //       return null;
  //     }

  //     if (shouldBlockNav()) {
  //       navAction.current = transition;
  //       setShowDialog(true);
  //       return false;
  //     }

  //     setStateDefaultValues();
  //     setCurrentLocation(transition);
  //     return null;
  //   });

  //   return unblock;
  // };

  const continueNavigation = async () => {
    setBlockNav(false);
    setDefaultFormsData();
    // because our useNavigator navigate action may be blocked
    // by exit dialog we want to avoid using it doing this transition
    if (navAction.current !== null) {
      setCurrentLocation(navAction.current);
      await router.push(navAction.current + navAction.current.search);
    }
    setStateDefaultValues();
  };

  const handleLeave = () => {
    void continueNavigation();
  };

  const handleClose = () => {
    setDefaultNavAction();
    setShowDialog(false);
  };

  // Used to prevent race conditions from places such as
  // create pages with navigation on mutation completed
  const shouldBlockNavigation = () => !!navAction.current;

  const providerData: ExitFormDialogData = {
    setIsDirty,
    shouldBlockNavigation,
    setEnableExitDialog,
    setExitDialogSubmitRef: setSubmitRef,
    setIsSubmitting,
    setIsSubmitDisabled,
    leave: handleLeave,
  };

  return {
    providerData,
    showDialog,
    handleLeave,
    handleClose,
    shouldBlockNav,
    isSubmitDisabled,
  };
}

const ExitFormDialogProvider = ({ children }: { children: ReactNode }) => {
  const { handleClose, handleLeave, providerData, showDialog, shouldBlockNav } =
    useExitFormDialogProvider();

  useBeforeUnload((e) => {
    // If form is dirty and user does a refresh,
    // the browser will ask about unsaved changes
    if (shouldBlockNav() && process.env.NODE_ENV !== 'development') {
      e.preventDefault();
      e.returnValue = '';
    }
  });

  return (
    <ExitFormDialogContext.Provider value={providerData}>
      <ExitFormDialog isOpen={showDialog} onLeave={handleLeave} onClose={handleClose} />
      {children}
    </ExitFormDialogContext.Provider>
  );
};

export default ExitFormDialogProvider;

import * as m from '@paraglide/messages';
import Button from '@tempo/ui/components/buttons/Button';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import debounce from 'lodash-es/debounce';

export interface PointOfContact {
  firstName?: Maybe<string>;
  lastName?: Maybe<string>;
  email?: Maybe<string>;
  phone?: Maybe<string>;
}

interface ContactInfoFormProps {
  poc: Maybe<PointOfContact>;
  onSubmit?: (data: PointOfContact) => void;
  onChange?: (data: PointOfContact) => void;
  defaultValues?: PointOfContact;
  disabled?: boolean;
}

export function ContactInfoForm({
  onSubmit,
  onChange: _onFormChange,
  defaultValues,
  disabled,
}: ContactInfoFormProps) {
  const contactInfoSchema = Yup.object().shape({
    firstName: Yup.string().optional(),
    lastName: Yup.string().optional(),
    email: Yup.string().required(), // TODO - config
    phone: Yup.string().required(), // TODO - config
  });
  const {
    // register,
    // reset,
    watch,
    getValues,
    formState: { errors, isDirty, isValid },
    control,
    handleSubmit,
    // setError,
  } = useForm<PointOfContact>({
    mode: 'all',
    criteriaMode: 'all',
    resolver: yupResolver(contactInfoSchema),
    defaultValues,
  });

  const handleDebouncedChange = debounce((data: PointOfContact) => {
    _onFormChange?.(data);
  }, 500);
  const onFormChange = async () => {
    const data = getValues();
    try {
      const validated = await contactInfoSchema.validate(data);
      handleDebouncedChange(validated);
    } catch (e) {
      console.log(e);
    }
    console.log('>>>>> end onFormChange');
  };
  return (
    <>
      <form onChange={onFormChange} {...(onSubmit && { onSubmit: handleSubmit(onSubmit) })}>
        <div className="grid grid-cols-12 w-full gap-3">
          <div className="col-span-6">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  name="firstName"
                  label={m.checkout_firstName() ?? 'First name'}
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            />
          </div>
          <div className="col-span-6">
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  name="lastName"
                  label={m.checkout_lastName() ?? 'Last name'}
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            />
          </div>
          <div className="col-span-full">
            <Controller
              control={control}
              name="email"
              rules={{ pattern: /^\S[^\s@]*@\S+$/ }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  required
                  name="email"
                  label={m.checkout_email() ?? 'Email'}
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            />
            {errors.email?.message && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div className="col-span-full">
            <Controller
              control={control}
              name="phone"
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  name="phone"
                  type={'tel'}
                  label={m.checkout_phone() ?? 'Phone number'}
                  value={value ?? ''}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            />
            <p>{errors.phone?.message}</p>
          </div>
          {onSubmit && (
            <div className="col-span-full">
              <Button disabled={disabled} type="submit" className="w-full">
                {m.checkout_saveButton() ?? 'Save'}
              </Button>
            </div>
          )}
        </div>
      </form>
    </>
  );
}

export default ContactInfoForm;

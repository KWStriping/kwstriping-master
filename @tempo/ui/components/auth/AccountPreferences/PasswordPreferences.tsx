import * as m from '@paraglide/messages';
import { PasswordChangeDocument } from '@tempo/api/generated/graphql';

import type {
  PasswordChangeMutation,
  PasswordChangeMutationVariables,
} from '@tempo/api/generated/graphql';
import { useMutation } from '@tempo/api/hooks/useMutation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface PasswordChangeFormData {
  oldPassword: string;
  newPassword: string;
  newPasswordRepeat: string;
}

export function PasswordPreferences() {
  const [changePasswordMutation] = useMutation(PasswordChangeDocument);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<PasswordChangeFormData>();

  const onPasswordPreferenceSubmit = handleSubmit(async (formData) => {
    if (formData.newPassword !== formData.newPasswordRepeat) {
      setError('newPasswordRepeat', { message: 'Passwords have to match.' });
    } else {
      const result = await changePasswordMutation({
        newPassword: formData.newPassword,
        oldPassword: formData.oldPassword,
      });
      const mutationErrors = result.data?.changePassword?.errors || [];
      if (mutationErrors?.length) {
        mutationErrors.forEach((e) =>
          setError(e.field as keyof PasswordChangeFormData, {
            message: e.message || '',
          })
        );
      } else if (result.data?.changePassword) {
        setSuccessMessage('Password changed successfully.');
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  });
  return (
    <div className="mt-4 mb-4">
      <h2>{m.changePasswordHeader() ?? 'Change password'}</h2>
      <form onSubmit={onPasswordPreferenceSubmit}>
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-full">
            <label htmlFor="oldPassword" className="block pl-1 text-sm font-medium text-gray-700">
              {m.oldPasswordFieldLabel() ?? 'Old password'}
            </label>
            <input
              className="px-4 py-2 rounded-md text-sm outline-none w-full"
              type="password"
              placeholder="Old password"
              id="oldPassword"
              spellCheck={false}
              {...register('oldPassword', {
                required: true,
              })}
            />
            {!!errors.oldPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.oldPassword.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 w-full mt-2">
          <div className="col-span-full">
            <label htmlFor="newPassword" className="block pl-1 text-sm font-medium text-gray-700">
              {m.newPasswordFieldLabel() ?? 'New password'}
            </label>
            <input
              className="px-4 py-2 rounded-md text-sm outline-none w-full"
              type="password"
              placeholder="New password"
              id="newPassword"
              spellCheck={false}
              {...register('newPassword', {
                required: true,
              })}
            />
            {!!errors.newPassword && (
              <p className="mt-2 text-sm text-red-600">{errors.newPassword.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4 w-full mt-2">
          <div className="col-span-full">
            <label htmlFor="password" className="block pl-1 text-sm font-medium text-gray-700">
              {m.newPasswordRepeatedFieldLabel() ?? 'Repeat new password'}
            </label>
            <input
              className="px-4 py-2 rounded-md text-sm outline-none w-full"
              type="password"
              placeholder="Repeat new password"
              id="password"
              spellCheck={false}
              {...register('newPasswordRepeat', {
                required: true,
              })}
            />
            {!!errors.newPasswordRepeat && (
              <p className="mt-2 text-sm text-red-600">{errors.newPasswordRepeat.message}</p>
            )}
          </div>
        </div>
        {!!successMessage && <p className="mt-2 text-sm text-green-600">{successMessage}</p>}
        <div>
          <button
            className="mt-2 w-40 bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
            onClick={() => onPasswordPreferenceSubmit()}
            type="submit"
          >
            {m.saveButton() ?? 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PasswordPreferences;

import type { SetPasswordData } from '@tempo/api/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import NewPasswordPage from '@tempo/dashboard/components/auth/NewPasswordPage';
import type { NewPasswordPageFormData } from '@tempo/dashboard/components/auth/NewPasswordPage';

const NewPassword = () => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<SetPasswordData['errors']>([]);

  // TODO
  // const params = parseQs(location.search.substr(1));
  const params = {};

  const handleSubmit = async (data: NewPasswordPageFormData) => {
    setLoading(true);

    const result = await setPassword({
      email: params.email,
      password: data?.password,
      token: params.token,
    });

    const errors = result.data?.setPassword?.errors || [];

    setErrors(errors);
    setLoading(false);

    if (!errors?.length) {
      router.replace('/');
    }
  };

  return <NewPasswordPage errors={errors} loading={loading} onSubmit={handleSubmit} />;
};

NewPassword.auth = false;

export default NewPassword;

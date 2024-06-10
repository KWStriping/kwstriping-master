import * as m from '@paraglide/messages';
import { useRegister } from '@tempo/api/auth/react/hooks/register';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { usePaths } from '@kwstriping/hooks/usePaths';

export interface RegisterFormData {
  email: string;
  password: string;
}

function RegisterPage() {
  const router = useRouter();
  const paths = usePaths();
  const [register] = useRegister();
  const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm },
    setError: setErrorForm,
  } = useForm<RegisterFormData>({});

  const handleRegister = handleSubmitForm(async (formData: RegisterFormData) => {
    const result = await register({
      input: {
        email: formData.email,
        password: formData.password,
      },
      // TODO
      // redirectUrl: `${window.location.origin}/account/confirm`,
    });
    if (result?.error) {
      // Unable to sign in.
      result.error.graphQLErrors.forEach((e) => {
        if (e.extensions?.field === 'email') {
          setErrorForm('email', { message: e.message as string });
        } else if (e.extensions?.field === 'password') {
          setErrorForm('password', { message: e.message as string });
        } else {
          console.error('Registration error:', e);
        }
      });
      return;
    }

    // User signed in successfully.
    void router.push('/');
  });

  return (
    <div className="min-h-screen bg-no-repeat bg-cover bg-center bg-gradient-to-r from-blue-100 to-blue-500">
      <div className="flex justify-end">
        <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
          <div>
            <form onSubmit={handleRegister}>
              <div>
                <h1 className="text-2xl font-bold">
                  {m.registerHeader() ?? 'Create a new account'}
                </h1>
              </div>

              <div className="my-3">
                <label htmlFor="email" className="block text-md mb-2">
                  {m.registerEmailFieldLabel() ?? 'Email'}
                </label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="email"
                  id="email"
                  spellCheck={false}
                  {...registerForm('email', {
                    required: true,
                  })}
                />
                {!!errorsForm.email && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.email?.message}</p>
                )}
              </div>
              <div className="mt-5">
                <label htmlFor="password" className="block text-md mb-2">
                  {m.registerPasswordFieldLabel() ?? 'Password'}
                </label>
                <input
                  className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
                  type="password"
                  id="password"
                  spellCheck={false}
                  {...registerForm('password', {
                    required: true,
                  })}
                />
                {!!errorsForm.password && (
                  <p className="text-sm text-red-500 pt-2">{errorsForm.password?.message}</p>
                )}
              </div>

              <div className="">
                <button
                  type="submit"
                  className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100"
                >
                  {m.registerButton() ?? 'Register'}
                </button>
              </div>
            </form>
            <p className="mt-8">
              <Link href={`/auth/signin`}>{m.backToLogin() ?? 'Log in to existing account'}</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

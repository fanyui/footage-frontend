'use client';

import Input from "@/src/components/ui/input";
import { useI18n, useScopedI18n } from "@/src/locales/client";
import { Button } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const LoginBodyType = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
type LoginBodyType = z.infer<typeof LoginBodyType>;

export default function LoginPage() {
  const t = useScopedI18n('Common')

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBodyType),
  });

  const onSubmit: SubmitHandler<LoginBodyType> = async (data: any) => {
    try {
      const signInResponse = await signIn('credentials', {
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard',
        redirect: true,
      });
      if (signInResponse?.error) {
        console.error(signInResponse.error);
        return;
      }
      return;
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <section className="flex flex-col h-screen justify-center">
      <div className='mb-4'>Go back <Link href='/' className='text-secondary-1 underline'>Home</Link></div>
      <div className="bg-white shadow-md border border-primary-3 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Footage Analysis"
            src="/images/footage.png"
            className="mx-auto w-auto  w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {t('sign_in')}
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3"
          >
            <Input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-1 sm:text-sm sm:leading-6"
              id="login-email"
              label="Email"
              type="email"
              placeholder="test@email.cm"
              {...register('email')}
              error={formErrors.email?.message}
            />
            <Input
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-1 sm:text-sm sm:leading-6"
              id="login-password"
              label="Password"
              type="password"
              placeholder="*********"
              {...register('password')}
              error={formErrors.password?.message}
            />
            <Button type="submit" className="flex w-full justify-center rounded-md bg-primary-1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-1"
            >{t('login')}</Button>
          </form>
        </div>
      </div>
    </section>
  )
}

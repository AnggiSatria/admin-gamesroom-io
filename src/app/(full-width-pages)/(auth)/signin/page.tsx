import SignInForm from '@/components/auth/SignInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games Room Admin | Login',
  description: 'Games Room Admin',
};

export default function SignIn() {
  return <SignInForm />;
}

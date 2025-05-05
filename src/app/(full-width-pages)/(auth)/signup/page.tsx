import SignUpForm from '@/components/auth/SignUpForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Games Room Admin | Register',
  description: 'Games Room Admin',
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}

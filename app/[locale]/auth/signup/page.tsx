import SignUpBody from "@/src/features/auth/signup-page";

export default function SignIn(
  { searchParams }: { searchParams: { referralCode: string } }
) {
  return (
    <>
      <SignUpBody />
    </>
  )
}

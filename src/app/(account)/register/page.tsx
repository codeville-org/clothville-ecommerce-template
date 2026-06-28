import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { RegisterForm } from "@/components/account/register-form";

export const metadata: Metadata = {
  title: "Create account",
  robots: { index: false },
};

export default function RegisterPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <RegisterForm />
    </Container>
  );
}

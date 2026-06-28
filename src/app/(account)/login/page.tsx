import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { LoginForm } from "@/components/account/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <LoginForm />
    </Container>
  );
}

import type { Metadata } from "next";
import { Container } from "@/components/common/container";
import { ForgotPasswordForm } from "@/components/account/forgot-password-form";

export const metadata: Metadata = {
  title: "Reset password",
  robots: { index: false },
};

export default function ForgotPasswordPage() {
  return (
    <Container className="flex min-h-[70vh] items-center justify-center py-16">
      <ForgotPasswordForm />
    </Container>
  );
}

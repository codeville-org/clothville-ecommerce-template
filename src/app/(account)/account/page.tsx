import type { Metadata } from "next";
import { AccountShell } from "@/components/account/account-shell";
import { ProfileForm } from "@/components/account/profile-form";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false },
};

export default function AccountPage() {
  return (
    <AccountShell title="Account">
      <h2 className="font-serif text-xl">Profile details</h2>
      <p className="mb-6 mt-1 text-sm text-muted-foreground">Update your personal information.</p>
      <ProfileForm />
    </AccountShell>
  );
}

import ResetPasswordWatcherServer from "@/components/dialogs/components/reset-password/components/reset-password-watcher-server";
import { notFound } from "next/navigation";
import Loading from "@/components/ui/Loader/Loading";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const token = searchParams?.token;

  if (!token) {
    notFound();
  }

  return (
    <>
      <ResetPasswordWatcherServer token={token} />
      <div className="min-h-screen w-full flex items-center justify-center">
        <Loading />
      </div>
    </>
  );
}

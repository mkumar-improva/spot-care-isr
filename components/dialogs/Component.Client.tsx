"use client";
import CustomDialog from "./components/custom-dialog";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import AuthServerSide from "./components/auth/Component";
import ResetPassword from "./components/reset-password/Component";
import useResetPasswordUIStore from "@/store/ui/reset-password-ui-store";
import useClaimProviderDialogStore from "@/store/dialog/claim-provide-store";
import useReportProviderDialogStore from "@/store/dialog/report-provider-store";
import useShareProviderDialogStore from "@/store/dialog/share-provider-store";
import ClaimProviderDialog from "./components/claim-provider/Component";
import ReportProviderDialog from "./components/report-provider/Component";
import ShareProviderDialog from "./components/share-provider/Component";

const DialogClientRenderer = () => {
  const { showLogin, showSignup, setShowLogin, setShowSignup } =
    useAuthUIStore();
  const { showResetPassword, setShowResetPassword } = useResetPasswordUIStore();
  const { showClaimProvider, setShowClaimProvider } = useClaimProviderDialogStore();
  const { showReportDialog, setShowReportDialog } = useReportProviderDialogStore();
  const { showShareDialog, setShowShareDialog } = useShareProviderDialogStore();

  //handlers
  const onCloseAuth = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const closeResetPassword = () => {
    setShowResetPassword(false);
  };

  const closeClaimProvider = () => {
    setShowClaimProvider(false);
  };

  const closeReportDialog = () => {
    setShowReportDialog(false);
  };

  const closeShareDialog = () => {
    setShowShareDialog(false);
  };

  return (
    <>
      {/* Auth Dialog */}
      <CustomDialog
        isDialogOpen={showLogin || showSignup}
        handleClose={onCloseAuth}
        children={<AuthServerSide />}
      />
      {/* Reset Password Dialog */}
      <CustomDialog
        isDialogOpen={showResetPassword}
        handleClose={closeResetPassword}
        children={<ResetPassword />}
      />
      {/* Claim Provider Dialog */}
      <CustomDialog
        isDialogOpen={showClaimProvider}
        handleClose={closeClaimProvider}
        children={<ClaimProviderDialog />}
      />
      {/* Report Provider Dialog */}
      <CustomDialog
        isDialogOpen={showReportDialog}
        handleClose={closeReportDialog}
        children={<ReportProviderDialog />}
      />
      {/* Share Provider Dialog */}
      <CustomDialog
        isDialogOpen={showShareDialog}
        handleClose={closeShareDialog}
        children={<ShareProviderDialog />}
      />
    </>
  );
};

export default DialogClientRenderer;

"use client";
import CustomDialog from "./components/custom-dialog";
import useAuthUIStore from "@/store/ui/auth-ui-store";
import AuthServerSide from "./components/auth/Component";
import ResetPassword from "./components/reset-password/Component";
import useResetPasswordUIStore from "@/store/ui/reset-password-ui-store";

const DialogClientRenderer = () => {
  const { showLogin, showSignup, setShowLogin, setShowSignup } =
    useAuthUIStore();
  const { showResetPassword, setShowResetPassword } = useResetPasswordUIStore();

  //handlers
  const onCloseAuth = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const closeResetPassword = () => {
    setShowResetPassword(false);
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
    </>
  );
};

export default DialogClientRenderer;

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
import usePageListDialogStore from "@/store/dialog/page-list-dialog-store";
import CmsRatingDialog from "./components/filters/cms-rating-dialog";
import SortFilterDialog from "./components/filters/sort-filter-dialog";
import CustomImageModal from "./components/custom image-dialog";
import useImageGalleryStore from "@/store/dialog/image-gallery-store";
import SuccessDialog from "./components/sucess/success-dialog";
import SuccessPng from "@/assets/success.png";

const DialogClientRenderer = () => {
  const { showLogin, showSignup, setShowLogin, setShowSignup } =
    useAuthUIStore();
  const { showResetPassword, setShowResetPassword } = useResetPasswordUIStore();
  const { showClaimProvider, setShowClaimProvider } =
    useClaimProviderDialogStore();
  const {
    showReportDialog,
    setShowReportDialog,
    successDialogOpen,
    setSuccessDialogOpen,
  } = useReportProviderDialogStore();
  const { showShareDialog, setShowShareDialog } = useShareProviderDialogStore();
  const {
    isCmsRatingsDialogOpen,
    setIsCmsRatingsDialogOpen,
    isSortingDialogOpen,
    setIsSortingDialogOpen,
  } = usePageListDialogStore();
  const { isImageGalleryOpen, setIsImageGalleryOpen } = useImageGalleryStore();

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

  const closeCmsRatingDialog = () => {
    setIsCmsRatingsDialogOpen(false);
  };

  const closeSortFilterDialog = () => {
    setIsSortingDialogOpen(false);
  };

  const closeSuccessDialog = () => {
    setSuccessDialogOpen(false);
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
      {/* CMS Rating Dialog */}
      <CustomDialog
        isDialogOpen={isCmsRatingsDialogOpen}
        handleClose={closeCmsRatingDialog}
        dialogVisibleClassName="block lg:hidden"
        children={<CmsRatingDialog />}
      />
      {/* Sort Filter Dialog */}
      <CustomDialog
        isDialogOpen={isSortingDialogOpen}
        handleClose={closeSortFilterDialog}
        dialogVisibleClassName="block lg:hidden"
        children={<SortFilterDialog />}
      />
      {/* Image Modals */}
      <CustomImageModal
        handleClose={() => setIsImageGalleryOpen(false)}
        isShowDialog={isImageGalleryOpen}
      />
      {/* Success Dialog */}
      <CustomDialog
        isDialogOpen={successDialogOpen}
        handleClose={closeSuccessDialog}
        children={
          <SuccessDialog
            img={SuccessPng.src}
            content={"Thank you for sharing your concern."}
            contentToBold="Our safety team will review and take actions."
            onClick={closeSuccessDialog}
            btnString="Done"
          />
        }
      />
    </>
  );
};

export default DialogClientRenderer;

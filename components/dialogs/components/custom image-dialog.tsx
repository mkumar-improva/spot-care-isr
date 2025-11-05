import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import ImageModal from "@/components/dialogs/components/image-modal/image-modal";

interface CustomImageModalProps {
  isShowDialog: boolean;
  handleClose: () => void;
}

const CustomImageModal: React.FC<CustomImageModalProps> = ({
  isShowDialog = false,
  handleClose = () => {}
}) => {
  let overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handlePopState = () => {
      if (isShowDialog) {
        handleClose();
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isShowDialog]);

  return (
    <>
      <Dialog
        open={isShowDialog}
        onClose={handleClose}
        initialFocus={overlayRef}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <Dialog.Overlay
          ref={overlayRef}
          as={motion.div}
          key="backdrop"
          className="fixed inset-0 z-30 bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
        <ImageModal />
      </Dialog>
    </>
  );
};

export default CustomImageModal;

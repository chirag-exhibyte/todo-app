import React from "react";
import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useDialog } from "@/context/DialogContext";

const AlertDialog = ({
  title,
  content,
  onClose,
  onAction,
  closeText,
  actionText,
  isLoading,
}) => {
  const { type, payload, closeDialog } = useDialog();
  return (
    <Dialog.Root open={type === "ALERT_DIALOG"} role="alertdialog">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title || ""}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <p>{content || ""}</p>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  disabled={isLoading}
                  variant="outline"
                  onClick={() => {
                    onClose && onClose();
                    closeDialog();
                  }}
                >
                  {closeText || "Close"}
                </Button>
              </Dialog.ActionTrigger>
              <Button
              disabled={isLoading}
              loading={isLoading}
                colorPalette="red"
                onClick={() => {
                  onAction(payload);
                }}
              >
                {actionText || "Delete"}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

export default AlertDialog;

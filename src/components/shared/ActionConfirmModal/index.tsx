import React from 'react';
import { Wrapper, Modal, ModalHeader, ModalBody } from './styles';

type ActionConfirmModalProps = {
  open: boolean;
  // callback fired when modal is closed. usually sets the open boolean to false in parent component
  onClose: () => void;
  // callback fired when user confirms the action
  onConfirm: () => void;
  /*
    Optionally provide custom text for confirm and cancel buttons.
    Please do not do something evil like setting cancelText to 'confirm' or confirmText to 'cancel'
  */
  confirmText?: string;
  cancelText?: string;
  modalText: string;
};

export const ActionConfirmModal: React.FC<ActionConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
  modalText
}) => {
  return (
    <Wrapper>
      <Modal>
        <ModalHeader>{modalText}</ModalHeader>
        <ModalBody>
          <span onClick={onConfirm}>Confirm</span>
          <span onClick={onClose}>Cancel</span>
        </ModalBody>
      </Modal>
    </Wrapper>
  );
};

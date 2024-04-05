import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button, Modal } from "@mui/material";

import styles from "./index.less";

interface IApplyModal {
  open: boolean;
}
export const ApplyModal: React.FC<IApplyModal> = (props) => {
  const { open } = props;

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}></div>
    </Modal>
  );
};

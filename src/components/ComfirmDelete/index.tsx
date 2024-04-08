import React, { forwardRef, useState, useImperativeHandle } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import styles from "./index.less";

export const Comfirm = (props) => {
  const { open, onClose, onConfirm, tip, confirmText = "确定" } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <div className={styles.tip}>{tip}</div>
        <div className={styles.bottom}>
          <Button
            variant="outlined"
            className={styles.cancel}
            onClick={onClose}
          >
            取消
          </Button>
          <Button variant="contained" onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button, Modal } from "@mui/material";

import styles from "./index.less";

export const Comfirm = (props) => {
  const { open, onClose, onConfirm, tip } = props;

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
            确认
          </Button>
        </div>
      </div>
    </Modal>
  );
};

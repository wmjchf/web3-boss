import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button, Modal } from "@mui/material";

import styles from "./index.less";

export const ComfirmDelete = (props) => {
  const { open, onClose, onConfirm } = props;

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <div className={styles.tip}>确认删除吗？删除之后该岗位不在生效</div>
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

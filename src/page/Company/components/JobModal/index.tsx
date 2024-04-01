import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, TextField } from "@mui/material";
import styles from "./index.less";

export const JobModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleClose,
    };
  });
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.box}>
        <div className={styles.title}>发布岗位</div>
        <div className={styles.content}>
          <div className={styles.name}>
            <TextField id="name" label="岗位名称" fullWidth hiddenLabel />
          </div>
        </div>
      </div>
    </Modal>
  );
});

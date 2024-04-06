import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button, Modal } from "@mui/material";
import { ApplyItem } from "../ApplyItem";
import styles from "./index.less";
import { userUserStore } from "@/store";
import { Upload, UploadFile, UploadProps } from "antd";
import { addResume, deleteResume } from "@/api/resume";

import toast from "react-hot-toast";

interface IResumeModal {
  openResume?: (item) => void;
}
export const ResumeModal: React.FC<IResumeModal> = forwardRef((props, ref) => {
  const { openResume } = props;
  const [open, setOpen] = useState(false);
  const { userInfo, getCurrentUser } = userUserStore();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => {
    return {
      handleClose,
      handleOpen,
    };
  });
  const handleChange: UploadProps["onChange"] = ({ file }) => {
    if (file?.response?.result) {
      const url = file?.response?.result?.url;
      const name = file?.name;
      addResume({ url, name }).then((res) => {
        toast.success(res.message);
        getCurrentUser();
      });
    }
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className={styles.container}>
        {userInfo?.resumes
          ?.filter((item) => !item.isDelete)
          .map((item) => {
            return (
              <ApplyItem
                data={{ resume: item }}
                key={item.id}
                onDelete={() => {
                  deleteResume(item.id).then(() => {
                    getCurrentUser();
                  });
                }}
                onClick={() => {
                  openResume(item);
                }}
                showDelete={true}
                showTime={false}
                className={styles.apply__item}
              ></ApplyItem>
            );
          })}
        {userInfo.resumes?.length === 3 && (
          <Upload
            // className={styles.upload}
            action="http://localhost:8000/common/upload"
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
            className={styles.ant__upload}
          >
            <div className={styles.upload}>
              <i className="iconfont icon-tianjia"></i>
              <span>上传简历</span>
            </div>
          </Upload>
        )}
      </div>
    </Modal>
  );
});

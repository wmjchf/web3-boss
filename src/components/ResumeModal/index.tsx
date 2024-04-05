import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Button, Modal } from "@mui/material";
import { ApplyItem } from "../ApplyItem";
import styles from "./index.less";
import { userUserStore } from "@/store";
import { Upload, UploadFile, UploadProps } from "antd";
import { deleteResume } from "@/api/resume";

interface IResumeModal {}
export const ResumeModal: React.FC<IResumeModal> = forwardRef((props, ref) => {
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
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const list = newFileList
      .map((item) => {
        return item?.response?.result;
      })
      .filter((item) => item);

    setFileList(list.concat(fileList));
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
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
                showDelete={true}
                showTime={false}
                className={styles.apply__item}
              ></ApplyItem>
            );
          })}
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
      </div>
    </Modal>
  );
});

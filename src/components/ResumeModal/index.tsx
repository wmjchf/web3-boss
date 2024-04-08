import React, { forwardRef, useState, useImperativeHandle } from "react";
import Modal from "@mui/material/Modal";
import { ApplyItem } from "../ApplyItem";
import styles from "./index.less";
import { userUserStore } from "@/store";
import { Upload, UploadFile, UploadProps } from "antd";
import { addResume, deleteResume } from "@/api/resume";

import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";
import { Button } from "@mui/material";

interface IResumeModal {
  openResume?: (item) => void;
  isChoice?: boolean;
  showDelete?: boolean;
  select?: number;
  onSelect?: (id: number) => void;
  onPost?: () => void;
}
export const ResumeModal: React.FC<IResumeModal> = forwardRef((props, ref) => {
  const {
    openResume,
    isChoice = false,
    showDelete = true,
    select,
    onSelect,
    onPost,
  } = props;
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
                showDelete={showDelete}
                showTime={false}
                isChoice={isChoice}
                checked={select === item.id}
                className={styles.apply__item}
                onSelect={() => {
                  onSelect && onSelect(item.id);
                }}
              ></ApplyItem>
            );
          })}
        {userInfo.resumes?.length <= 3 && !isChoice && (
          <Upload
            // className={styles.upload}
            action={`${BASE_URL}/common/upload`}
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
            className={styles.ant__upload}
            headers={{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }}
          >
            <div className={styles.upload}>
              <i className="iconfont icon-tianjia"></i>
              <span>上传简历</span>
            </div>
          </Upload>
        )}
        {isChoice && (
          <div className={styles.btn}>
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(false);
              }}
            >
              取消
            </Button>
            <Button variant="contained" onClick={onPost}>
              确定
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
});

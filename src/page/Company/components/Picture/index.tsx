import React, { useState } from "react";
import { Upload, UploadFile, UploadProps } from "antd";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import styles from "./index.less";
import { EditPannel } from "../EditPannel";

export const Picture = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  return (
    <EditPannel
      onEdit={() => {
        setIsEdit(true);
      }}
      onSave={() => {
        setIsEdit(false);
      }}
      className={styles.edit__picture}
    >
      <div className={styles.picture}>
        {/* <div className={styles.upload__image}> */}
        <PhotoProvider>
          {fileList.map((item) => {
            // console.log(item?.response.result.url);
            return (
              <PhotoView src={item?.response?.result?.url}>
                <img
                  src={item?.response?.result?.url}
                  alt=""
                  className={styles.preview__image}
                />
              </PhotoView>
            );
          })}
        </PhotoProvider>
        <Upload
          // className={styles.upload}
          action="http://localhost:8000/common/upload"
          listType="picture-card"
          fileList={fileList}
          showUploadList={false}
          onChange={handleChange}
        >
          <div className={styles.upload}></div>
        </Upload>
      </div>
    </EditPannel>
  );
};

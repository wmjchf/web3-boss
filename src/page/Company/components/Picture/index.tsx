import React, { useState, useEffect } from "react";
import { Upload, UploadFile, UploadProps } from "antd";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import { useAccount } from "wagmi";
import NoData from "@/image/common/no-list.png";
import { addPicture, getPicture } from "@/api/company";
import { Image } from "@/components/Image";
import styles from "./index.less";
import { EditPannel } from "../EditPannel";
interface IPicture {
  companyId: number;
  address: string;
}
export const Picture: React.FC<IPicture> = (props) => {
  const { companyId, address: caddress } = props;
  const [isEdit, setIsEdit] = useState(false);
  const { address } = useAccount();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    const list = newFileList
      .map((item) => {
        return item?.response?.result;
      })
      .filter((item) => item);

    setFileList(list.concat(fileList));
  };

  const onSave = async () => {
    const pictures = fileList.map((item) => {
      return {
        url: item?.url,
        companyId,
      };
    });
    const { result } = await addPicture(companyId, { pictures });

    setIsEdit(false);
  };
  const handleGetPicture = async () => {
    const { result } = await getPicture(companyId);
    setFileList(result.list);
  };
  useEffect(() => {
    if (companyId) {
      handleGetPicture();
    }
  }, [companyId]);
  return (
    <EditPannel
      onEdit={() => {
        setIsEdit(true);
      }}
      onSave={onSave}
      showEdit={address === caddress || !companyId}
      className={styles.edit__picture}
    >
      <div className={styles.picture}>
        {/* <div className={styles.upload__image}> */}
        <PhotoProvider>
          {fileList.map((item) => {
            // console.log(item?.response.result.url);
            return (
              <PhotoView src={item?.url} key={item?.id}>
                <div>
                  <Image
                    src={item?.url}
                    alt=""
                    className={styles.preview__image}
                  />
                </div>
              </PhotoView>
            );
          })}
        </PhotoProvider>
        {isEdit ? (
          <Upload
            // className={styles.upload}
            action="http://localhost:8000/common/upload"
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
          >
            <div className={styles.upload}></div>
          </Upload>
        ) : (
          <>
            {fileList?.length === 0 && (
              <div className={styles.no__data}>
                <img src={NoData}></img>
                <span>没有数据，赶快去上传图片吧</span>
              </div>
            )}
          </>
        )}
      </div>
    </EditPannel>
  );
};

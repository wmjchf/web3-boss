import React, { useState, useEffect } from "react";
import { Upload, UploadFile, UploadProps } from "antd";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import NoData from "@/image/common/no-list.png";
import { addPicture, getPicture } from "@/api/company";
import { Image } from "@/components/Image";
import styles from "./index.less";
import { EditPannel } from "../EditPannel";
import { userUserStore } from "@/store";
import toast from "react-hot-toast";
import { BASE_URL } from "@/constant";
interface IPicture {
  companyId: number;
  userId: string;
}
export const Picture: React.FC<IPicture> = (props) => {
  const { companyId, userId } = props;
  const [isEdit, setIsEdit] = useState(false);
  const { userInfo } = userUserStore();
  const { id } = userInfo;
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
      onClose={() => {
        setIsEdit(false);
      }}
      onSave={onSave}
      showEdit={id === userId || !companyId}
      className={styles.edit__picture}
    >
      <div className={styles.picture}>
        {/* <div className={styles.upload__image}> */}
        <PhotoProvider>
          {fileList.map((item) => {
            // console.log(item?.response.result.url);
            return (
              <PhotoView src={item?.url} key={item?.id}>
                <div className={styles.image}>
                  {isEdit && (
                    <div
                      className={styles.delete}
                      onClick={(event) => {
                        event.stopPropagation();
                        const newFileList = fileList.filter(
                          (v) => v.id !== item.id
                        );

                        setFileList(newFileList);
                      }}
                    >
                      <i className="iconfont icon-shanchu1"></i>
                    </div>
                  )}

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
        {isEdit && fileList.length < 6 ? (
          <Upload
            // className={styles.upload}
            action={`${BASE_URL}/common/upload`}
            listType="picture-card"
            showUploadList={false}
            onChange={handleChange}
            beforeUpload={() => {
              if (fileList.length === 6) {
                toast.error("目前最多支持6张图片");
                return;
              }
            }}
            headers={{
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            }}
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

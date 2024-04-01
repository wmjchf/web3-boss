import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import ImgCrop from "antd-img-crop";
import { EditPannel } from "../EditPannel";
import styles from "./index.less";
import classNames from "classnames";
import { Upload, UploadProps } from "antd";

export const Introduce = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const handleChange: UploadProps["onChange"] = ({ file }) => {
    if (file?.response?.result?.url) {
      setLogo(file?.response?.result?.url);
    }
  };
  return (
    <EditPannel
      onEdit={() => {
        setIsEdit(true);
      }}
      onSave={() => {
        setIsEdit(false);
      }}
      className={styles.edit__introduce}
    >
      <div className={styles.introduce}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <ImgCrop aspect={100 / 65} zoomSlider={false} quality={1}>
              <Upload
                // className={styles.upload}
                action="http://localhost:8000/common/upload"
                listType="picture-card"
                showUploadList={false}
                onChange={handleChange}
              >
                {logo ? (
                  <img src={logo} alt="" />
                ) : (
                  <div className={styles.upload}></div>
                )}
              </Upload>
            </ImgCrop>
          </div>
          <div className={styles.name}>
            {isEdit ? (
              <TextField
                id="name"
                label="项目/团队/公司名字"
                fullWidth
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            ) : (
              <span className={classNames(!name && styles.none)}>
                {name || "一个好的名字可以给求职者留下好的印象哦"}
              </span>
            )}
          </div>
        </div>
        <div className={styles.middle}>
          <div className={styles.location}>
            <i>地址：</i>
            {isEdit ? (
              <TextField
                id="location"
                label="地址"
                fullWidth
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              />
            ) : (
              <span className={classNames(!location && styles.none)}>
                {location || "请填写你们的办公地址"}
              </span>
            )}
          </div>
        </div>
        <div className={styles.bottom}>
          {isEdit ? (
            <TextField
              id="description"
              label="简介"
              fullWidth
              value={description}
              // defaultValue="杭州电子科技大学（Hangzhou Dianzi
              // University），简称“杭电”，位于杭州市，是浙江省人民政府与国防科技工业局共建高校，是一所电子信息特色突出，经管学科优势明显，工、理、经、管、文、法、艺等多学科相互渗透的教学研究型大学，是浙江省首批重点建设的5所高校之一，是省属高校中唯一拥有国防特色重点专业的高校，是长三角高水平行业特色大学联盟成员，入选国家“111计划”、教育部“卓越工程师教育培养计划”、“国家级大学生创新创业训练计划”、“国家级新工科研究与实践项目”、“国家级特色专业建设点”、“全国毕业生就业典型经验高校，是博士学位授予单位，具有硕士推免权和全球雅思考点。对口支援衢州学院。"
              multiline
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          ) : (
            <span className={classNames(!description && styles.none)}>
              {description || "简介可以给求职者留下好的印象哦"}
            </span>
          )}
        </div>
      </div>
    </EditPannel>
  );
};

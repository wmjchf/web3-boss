import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import ImgCrop from "antd-img-crop";
import toast from "react-hot-toast";
import { Image } from "@/components/Image";
import { EditPannel } from "../EditPannel";
import styles from "./index.less";
import classNames from "classnames";
import { Upload, UploadProps } from "antd";
import { addCompany, getCompanyDetail, updateCompany } from "@/api/company";
import { userUserStore } from "@/store";
import Button from "@mui/material/Button";
import { BASE_URL } from "@/constant";
interface IIntroduce {
  companyId: number;
  className?: string;
}
export const Introduce: React.FC<IIntroduce> = (props) => {
  const { companyId, className } = props;
  const { userInfo, getCurrentUser } = userUserStore();
  const { id } = userInfo;

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [cuserId, setCUserId] = useState(-1);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const handleChange: UploadProps["onChange"] = ({ file }) => {
    if (file?.response?.result?.url) {
      setLogo(file?.response?.result?.url);
    }
  };
  const onSave = () => {
    if (companyId) {
      handleUpdateCompany();
    } else {
      handleAddCompany();
    }
  };
  const handleAddCompany = async () => {
    if (!name) {
      toast.error("相关团队/项目/公司名称必填");
      return;
    }
    if (!location) {
      toast.error("相关地址必填");
      return;
    }
    if (!description) {
      toast.error("相关简介必填");
      return;
    }
    if (!logo) {
      toast.error("相关logo必填");
      return;
    }
    await addCompany({
      name,
      location,
      description,
      logo,
    });
    getCurrentUser();
    setIsEdit(false);
  };
  const handleUpdateCompany = async () => {
    try {
      await updateCompany(companyId, {
        name,
        location,
        description,
        logo,
      });
      setIsEdit(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGetCompanyDetail = async () => {
    const { result } = await getCompanyDetail(companyId);

    setDescription(result.description);
    setLocation(result.location);
    setLogo(result.logo);
    setName(result.name);
    setCUserId(result.userId);
  };
  useEffect(() => {
    if (companyId) {
      handleGetCompanyDetail();
    }
  }, [companyId]);

  return (
    <EditPannel
      onEdit={() => {
        setIsEdit(true);
      }}
      showEdit={id === cuserId || !companyId}
      onSave={onSave}
      onClose={() => {
        setIsEdit(false);
      }}
      className={classNames(styles.edit__introduce, className)}
    >
      <div className={styles.introduce}>
        <div className={styles.top}>
          <div className={styles.logo}>
            {isEdit ? (
              <ImgCrop aspect={100 / 65} zoomSlider={false} quality={1}>
                <Upload
                  // className={styles.upload}
                  action={`${BASE_URL}/common/upload`}
                  listType="picture-card"
                  showUploadList={false}
                  onChange={handleChange}
                  headers={{
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  }}
                >
                  {logo ? (
                    <Image src={logo}></Image>
                  ) : (
                    <div className={styles.upload}></div>
                  )}
                </Upload>
              </ImgCrop>
            ) : logo ? (
              <Image src={logo} className={styles.logo__image}></Image>
            ) : (
              <div className={styles.upload}></div>
            )}
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
                {name || "一个好的名字可以给用户留下好的印象哦"}
                {companyId && (
                  <Button
                    className={styles.copy}
                    onClick={() => {
                      navigator.clipboard
                        .writeText(`http://localhost:3000/company/${companyId}`)
                        .then(() => {
                          console.log("复制成功");
                        })
                        .catch(() => {
                          console.log("复制失败");
                        });
                    }}
                  >
                    复制
                  </Button>
                )}
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
                {location || "请填写所在位置"}
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
              {description || "简介可以让用户更了解你们哦"}
            </span>
          )}
        </div>
      </div>
    </EditPannel>
  );
};

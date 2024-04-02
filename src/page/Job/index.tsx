import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-hot-toast";
import styles from "./index.less";
import { Chip, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { getJobDetail, IJob } from "@/api/job";
import { userUserStore } from "@/store";
import { AuthBtn } from "@/components/AuthBtn";
import { Upload } from "antd";
import { addResume } from "@/api/resume";
import { IApply, addApply, getApply } from "@/api/apply";

export const Job = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<IJob>();
  const [applyInfo, setApplyInfo] = useState<IApply>();
  const { userInfo, resume, getCurrentResume } = userUserStore();

  const { address } = userInfo;
  const handleGetJobInfo = async () => {
    const { result } = await getJobDetail(parseInt(id));
    setDetail(result);
  };

  const handleGetApply = async () => {
    try {
      const { result } = await getApply();
      setApplyInfo(result);
    } catch (error) {}
  };

  useEffect(() => {
    if (address !== detail?.address) {
      handleGetApply();
    }
  }, [address, detail?.address]);

  useEffect(() => {
    if (id) {
      handleGetJobInfo();
    }
  }, []);
  const salary = useMemo(() => {
    return detail?.isFace
      ? "面议"
      : `${detail?.minSalary}~${detail?.maxSalary}`;
  }, [detail]);
  const renderBtn = () => {
    if (detail?.address !== address) {
      if (resume?.length === 0) {
        return (
          <AuthBtn>
            <Upload
              action="http://localhost:8000/common/upload"
              accept=".pdf"
              showUploadList={false}
              onChange={(event) => {
                const url = event.file?.response?.result?.url;
                const name = event.file?.name;
                if (url) {
                  addResume({ url, name }).then((res) => {
                    toast.success(res.message);
                    getCurrentResume();
                  });
                }
              }}
            >
              <Button variant="contained" size="large">
                上传简历
              </Button>
            </Upload>
          </AuthBtn>
        );
      } else {
        return (
          <>
            {applyInfo ? (
              <AuthBtn
                onClick={() => {
                  //   addApply({
                  //     jobId: detail?.id,
                  //     resumeId: resume[0]?.id,
                  //     resumeName: resume[0]?.name,
                  //     resumeUrl: resume[0]?.url,
                  //   }).then((res) => {
                  //     toast.success(res.message);
                  //   });
                }}
              >
                <Button variant="contained" size="large">
                  简历修改
                </Button>
              </AuthBtn>
            ) : (
              <AuthBtn
                onClick={() => {
                  addApply({
                    jobId: detail?.id,
                    resumeId: resume[0]?.id,
                    resumeName: resume[0]?.name,
                    resumeUrl: resume[0]?.url,
                  }).then((res) => {
                    toast.success(res.message);
                    handleGetApply();
                  });
                }}
              >
                <Button variant="contained" size="large">
                  申请岗位
                </Button>
              </AuthBtn>
            )}
          </>
        );
      }
    }
  };
  return (
    <div className={styles.job}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.name}>
            {detail?.name} <span className={styles.salary}>{salary}</span>
          </div>
          <div className={styles.tag}>
            {detail?.tag?.split(",").map((item) => {
              return (
                <Chip
                  key={item}
                  label={item}
                  className={styles.chip}
                  size="small"
                />
              );
            })}
            <Chip
              key={detail?.isRemote ? "支持远程" : "不支持远程"}
              label={detail?.isRemote ? "支持远程" : "不支持远程"}
              className={styles.chip}
              size="small"
            />
          </div>
          <div className={styles.location}>
            <span>地址：</span>
            <span>{detail?.location}</span>
          </div>
          <div className={styles.description}>
            <span>岗位描述</span>
            <span>{detail?.description}</span>
          </div>

          <div className={styles.apply}>{renderBtn()}</div>
        </div>
      </div>
    </div>
  );
};

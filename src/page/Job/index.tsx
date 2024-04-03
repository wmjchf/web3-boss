import React, { useEffect, useState, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import styles from "./index.less";
import { Chip, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetail, IJob } from "@/api/job";
import { useJobListStore, userUserStore } from "@/store";
import { AuthBtn } from "@/components/AuthBtn";
import NoData from "@/image/common/no-list.png";
import { ApplyItem } from "./ApplyItem";
import { Upload } from "antd";
import { addResume } from "@/api/resume";
import { PdfPreview } from "@/components/PdfPreview";
import {
  IApply,
  addApply,
  getApply,
  getApplyList,
  updateApply,
} from "@/api/apply";
import classNames from "classnames";
import { ComfirmDelete } from "@/components/ComfirmDelete";

export const Job = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // hr查询申请的时候
  const [currentApply, setCurrentApply] = useState<IApply>();
  const [detail, setDetail] = useState<IJob>();
  const [applyInfo, setApplyInfo] = useState<IApply>();
  const [noReadList, setNoReadList] = useState<IApply[]>([]);
  const [haveReadList, setHaveReadList] = useState<IApply[]>([]);
  const [markList, setMarkList] = useState<IApply[]>([]);
  const { userInfo, resume, getCurrentResume } = userUserStore();
  const [current, setCurrent] = useState("0");
  const { address } = userInfo;
  const pdfPreviewRef = useRef<any>();
  const { closeConfirm, deleteJob, openConfirm, confirmOpen } =
    useJobListStore();
  const handleGetJobInfo = async () => {
    const { result } = await getJobDetail(parseInt(id));
    setDetail(result);
  };
  // 申请人的apply，看是否有申请过
  const handleGetApply = async () => {
    try {
      const { result } = await getApply();
      setApplyInfo(result);
    } catch (error) {}
  };

  const handleGetApplyList = async (data: unknown) => {
    try {
      const { result } = await getApplyList(data);
      return result.list;
    } catch (error) {}
  };

  useEffect(() => {
    if (id) {
      handleGetApplyList({ jobId: id, haveRead: "0" })
        .then((res) => {
          setNoReadList(res);
        })
        .catch((error) => {});
      handleGetApplyList({ jobId: id, haveRead: "1" })
        .then((res) => {
          setHaveReadList(res);
        })
        .catch((error) => {});
      handleGetApplyList({ jobId: id, haveRead: "1", mark: "1" })
        .then((res) => {
          setMarkList(res);
        })
        .catch((error) => {});
    }
  }, [address]);

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
            <div className={styles.left}>
              {detail?.name} <span className={styles.salary}>{salary}</span>
            </div>
            <div className={styles.operation}>
              <Button
                onClick={() => {
                  openConfirm(detail);
                }}
              >
                删除
              </Button>
            </div>
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

          {detail?.address === address && (
            <div className={styles.resume__list}>
              <div className={styles.title}>申请列表</div>
              <div className={styles.top}>
                <span
                  className={classNames(current === "0" && styles.active)}
                  onClick={() => {
                    setCurrent("0");
                  }}
                >
                  未读
                </span>
                <span
                  className={classNames(current === "1" && styles.active)}
                  onClick={() => {
                    setCurrent("1");
                  }}
                >
                  已读
                </span>
                <span
                  className={classNames(current === "2" && styles.active)}
                  onClick={() => {
                    setCurrent("2");
                  }}
                >
                  标记
                </span>
              </div>
              <div className={styles.bottom}>
                <div
                  className={classNames(
                    styles.content,
                    current !== "0" && styles.none
                  )}
                >
                  {noReadList?.length === 0 ? (
                    <div className={styles.no__data}>
                      <img src={NoData}></img>
                      <span>没有数据，还没有人申请</span>
                    </div>
                  ) : (
                    <div className={styles.wrap} style={{ height: 232 }}>
                      {noReadList?.map((item) => {
                        return (
                          <ApplyItem
                            data={item}
                            key={item.id}
                            onClick={() => {
                              pdfPreviewRef.current?.handleOpen(item.resumeUrl);
                              setCurrentApply(item);
                            }}
                          ></ApplyItem>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div
                  className={classNames(
                    styles.content,
                    current !== "1" && styles.none
                  )}
                >
                  {haveReadList?.length === 0 ? (
                    <div className={styles.no__data}>
                      <img src={NoData}></img>
                      <span>没有数据，还没有查看申请</span>
                    </div>
                  ) : (
                    <div style={{ height: 232 }} className={styles.wrap}>
                      {haveReadList?.map((item) => {
                        return (
                          <ApplyItem
                            data={item}
                            key={item.id}
                            onClick={() => {
                              pdfPreviewRef.current?.handleOpen(item.resumeUrl);
                              setCurrentApply(item);
                            }}
                          ></ApplyItem>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div
                  className={classNames(
                    styles.content,
                    current !== "2" && styles.none
                  )}
                >
                  {markList?.length === 0 ? (
                    <div className={styles.no__data}>
                      <img src={NoData}></img>
                      <span>没有数据，还没有标记申请</span>
                    </div>
                  ) : (
                    <div>fds</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <PdfPreview
        ref={pdfPreviewRef}
        onLoad={() => {
          !currentApply.haveRead &&
            updateApply(currentApply.id, { haveRead: true });
        }}
      ></PdfPreview>
      <ComfirmDelete
        open={confirmOpen}
        onClose={closeConfirm}
        onConfirm={() => {
          deleteJob().then((res) => {
            if (res) {
              navigate("/company");
            }
          });
        }}
      ></ComfirmDelete>
    </div>
  );
};
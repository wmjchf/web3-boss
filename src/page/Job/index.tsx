import React, { useEffect, useState, useMemo, useRef } from "react";
import { toast } from "react-hot-toast";
import styles from "./index.less";
import { Chip, Button, Pagination } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { getJobDetail, IJob } from "@/api/job";
import { useJobListStore, userUserStore } from "@/store";
import { AuthBtn } from "@/components/AuthBtn";
import NoData from "@/image/common/no-list.png";
import { ApplyItem } from "@/components/ApplyItem";
import { Upload } from "antd";
import { Introduce } from "../Company/components/Introduce";
import { addResume } from "@/api/resume";
import { PdfPreview } from "@/components/PdfPreview";
import {
  IApply,
  addApply,
  getApplyList,
  getApplySelf,
  updateApply,
} from "@/api/apply";
import classNames from "classnames";
import { Comfirm } from "@/components/ComfirmDelete";
import { BASE_URL, SHARE_TIP } from "@/constant";

export const Job = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // hr查询申请的时候
  const [currentApply, setCurrentApply] = useState<IApply>();
  const [detail, setDetail] = useState<IJob>();
  const [applyInfo, setApplyInfo] = useState<IApply>();
  const [noReadList, setNoReadList] = useState<IApply[]>([]);
  const [noReadPage, setNoReadPage] = useState<number>(1);
  const [noReadTotal, setNoReadTotal] = useState<number>(0);
  const [haveReadList, setHaveReadList] = useState<IApply[]>([]);
  const [haveReadPage, setHaveReadPage] = useState(1);
  const [haveReadTotal, setHaveReadTotal] = useState<number>(0);
  const [markList, setMarkList] = useState<IApply[]>([]);
  const [markPage, setMarkPage] = useState(1);
  const [markTotal, setMarkTotal] = useState<number>(0);
  const { userInfo, getCurrentUser, token } = userUserStore();
  const [current, setCurrent] = useState("0");
  const { id: userId } = userInfo;
  const pdfPreviewRef = useRef<any>();
  const [shareOpen, setShareOpen] = useState(false);
  const {
    closeConfirm,
    deleteJob,
    openConfirm,
    confirmOpen,
    applyOpen,
    openApply,
    closeApply,
  } = useJobListStore();
  const handleGetJobInfo = async () => {
    const { result } = await getJobDetail(parseInt(id));
    setDetail(result);
  };
  // 申请人的apply，看是否有申请过
  const handleGetApply = async () => {
    try {
      const { result } = await getApplySelf({ jobId: detail?.id });
      setApplyInfo(result.list[0]);
    } catch (error) {}
  };

  const handleGetApplyList = async (data: unknown) => {
    try {
      const { result } = await getApplyList(data);
      return result;
    } catch (error) {}
  };

  // useEffect(() => {
  //   if (id && token) {
  //     handleGetApplyList({ jobId: id, haveRead: "0" })
  //       .then((res) => {
  //         setNoReadList(res.list);
  //         setNoReadTotal(res.total);
  //       })
  //       .catch((error) => {});
  //     handleGetApplyList({ jobId: id, haveRead: "1", mark: "0" })
  //       .then((res) => {
  //         setHaveReadList(res.list);
  //         setHaveReadTotal(res.total);
  //       })
  //       .catch((error) => {});
  //     handleGetApplyList({ jobId: id, haveRead: "1", mark: "1" })
  //       .then((res) => {
  //         setMarkList(res.list);
  //         setMarkTotal(res.total);
  //       })
  //       .catch((error) => {});
  //   }
  // }, [id, token]);

  useEffect(() => {
    if (userId !== detail?.company?.userId && detail?.id) {
      handleGetApply();
    }
  }, [userId, detail]);

  useEffect(() => {
    if (id && token && noReadPage) {
      handleGetApplyList({
        jobId: id,
        haveRead: "0",
        pageNum: noReadPage,
        pageSize: 12,
      })
        .then((res) => {
          setNoReadList(res.list);
          setNoReadTotal(res.total);
        })
        .catch((error) => {});
    }
  }, [noReadPage, id, token]);

  useEffect(() => {
    if (id && token && haveReadPage) {
      handleGetApplyList({
        jobId: id,
        haveRead: "1",
        mark: "0",
        pageNum: haveReadPage,
        pageSize: 12,
      })
        .then((res) => {
          setHaveReadList(res.list);
          setHaveReadTotal(res.total);
        })
        .catch((error) => {});
    }
  }, [haveReadPage, id, token]);

  useEffect(() => {
    if (id && token && markPage) {
      handleGetApplyList({
        jobId: id,
        haveRead: "1",
        mark: "1",
        pageNum: markPage,
        pageSize: 12,
      })
        .then((res) => {
          setMarkList(res.list);
          setMarkTotal(res.total);
        })
        .catch((error) => {});
    }
  }, [markPage, id, token]);

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
    if (detail?.company?.userId !== userId) {
      if (userInfo?.resumes?.length === 0) {
        return (
          <AuthBtn>
            <Upload
              action={`${BASE_URL}/common/upload`}
              accept=".pdf"
              showUploadList={false}
              headers={{
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              }}
              onChange={(event) => {
                const url = event.file?.response?.result?.url;
                const name = event.file?.name;
                if (url) {
                  addResume({ url, name }).then((res) => {
                    toast.success(res.message);
                    getCurrentUser();
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
              applyInfo.haveRead ? (
                <Button variant="contained" disabled>
                  简历已被查看，不能再修改简历
                </Button>
              ) : (
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
                    修改简历
                  </Button>
                </AuthBtn>
              )
            ) : (
              <AuthBtn
                onClick={() => {
                  openApply();
                  // addApply({
                  //   jobId: detail?.id,
                  //   resumeId: resume[0]?.id,
                  //   resumeName: resume[0]?.name,
                  //   resumeUrl: resume[0]?.url,
                  // }).then((res) => {
                  //   toast.success(res.message);
                  //   handleGetApply();
                  // });
                }}
              >
                <Button variant="contained" size="large">
                  投递岗位
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
        <Introduce
          companyId={detail?.company?.id}
          className={styles.company}
        ></Introduce>
        <div className={styles.content}>
          <div className={styles.name}>
            <div className={styles.left}>
              {detail?.name} <span className={styles.salary}>{salary}</span>
            </div>
            {detail?.company?.userId === userId && (
              <div className={styles.operation}>
                <Button
                  onClick={() => {
                    openConfirm(detail);
                  }}
                >
                  删除
                </Button>
              </div>
            )}
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

          {detail?.company?.userId === userId && (
            <div className={styles.resume__list}>
              <div className={styles.title}>投递列表</div>
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
                      <span>没有数据，还没有人投递</span>
                    </div>
                  ) : (
                    <>
                      <div
                        className={styles.wrap}
                        style={{
                          height: 336,
                        }}
                      >
                        {noReadList?.map((item) => {
                          return (
                            <ApplyItem
                              data={item}
                              key={item.id}
                              onClick={() => {
                                pdfPreviewRef.current?.handleOpen(
                                  item.resumeUrl,
                                  item.id,
                                  item.mark
                                );
                                setCurrentApply(item);
                              }}
                            ></ApplyItem>
                          );
                        })}
                      </div>
                      <div className={styles.pagination}>
                        <Pagination
                          count={Math.ceil(noReadTotal / 12)}
                          variant="outlined"
                          color="primary"
                          onChange={(_, page) => {
                            setNoReadPage(page);
                          }}
                        />
                      </div>
                    </>
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
                      <span>没有数据，还没有查看投递</span>
                    </div>
                  ) : (
                    <>
                      <div
                        className={styles.wrap}
                        style={{
                          height: 336,
                        }}
                      >
                        {haveReadList?.map((item) => {
                          return (
                            <ApplyItem
                              data={item}
                              key={item.id}
                              onClick={() => {
                                pdfPreviewRef.current?.handleOpen(
                                  item.resumeUrl,
                                  item.id,
                                  item.mark
                                );
                                setCurrentApply(item);
                              }}
                            ></ApplyItem>
                          );
                        })}
                      </div>
                      <div className={styles.pagination}>
                        <Pagination
                          count={Math.ceil(haveReadTotal / 12)}
                          variant="outlined"
                          color="primary"
                          onChange={(_, page) => {
                            setHaveReadPage(page);
                          }}
                        />
                      </div>
                    </>
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
                      <span>没有数据，还没有标记投递</span>
                    </div>
                  ) : (
                    <>
                      <div
                        className={styles.wrap}
                        style={{
                          height: 336,
                        }}
                      >
                        {markList?.map((item) => {
                          return (
                            <ApplyItem
                              data={item}
                              key={item.id}
                              onClick={() => {
                                pdfPreviewRef.current?.handleOpen(
                                  item.resumeUrl,
                                  item.id,
                                  item.mark
                                );
                                setCurrentApply(item);
                              }}
                            ></ApplyItem>
                          );
                        })}
                      </div>
                      <div className={styles.pagination}>
                        <Pagination
                          count={Math.ceil(markTotal / 12)}
                          variant="outlined"
                          color="primary"
                          onChange={(_, page) => {
                            setMarkPage(page);
                          }}
                        />
                      </div>
                    </>
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
      <Comfirm
        open={confirmOpen}
        tip="确认删除吗？"
        onClose={closeConfirm}
        onConfirm={() => {
          deleteJob().then((res) => {
            if (res) {
              navigate("/company");
            }
          });
        }}
      ></Comfirm>
      <Comfirm
        open={applyOpen}
        tip="投递将消耗5颗豆豆，是否继续投递？"
        onClose={closeApply}
        onConfirm={() => {
          addApply({
            jobId: detail?.id,
            resumeId: userInfo?.resumes[0]?.id,
          })
            .then((res) => {
              toast.success(
                `${res.message},还剩${res.result?.resetIntegral}豆豆`
              );
              closeApply();
              handleGetApply();
            })
            .catch((error) => {
              toast.error(error.message);
              setShareOpen(true);
              closeApply();
            });
        }}
      ></Comfirm>
      <Comfirm
        open={shareOpen}
        tip={SHARE_TIP}
        onClose={() => {
          setShareOpen(false);
        }}
        onConfirm={() => {
          console.log("复制");
          navigator.clipboard
            .writeText(`http://localhost:3000/jobs?address=${userInfo.address}`)
            .then(() => {
              console.log("复制成功");
            })
            .catch(() => {
              console.log("复制失败");
            });

          setShareOpen(false);
        }}
      ></Comfirm>
    </div>
  );
};

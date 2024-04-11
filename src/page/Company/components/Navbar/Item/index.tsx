import React, { useMemo, useRef } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import { Ellipsis } from "@/components/Ellipsis";
import { timeAgo } from "@/utils/time";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import { useJobListStore, userUserStore } from "@/store";
import { AuthBtn } from "@/components/AuthBtn";
import { deleteJob } from "@/api/job";

interface IItem {
  data: any;
  userId: number;
}
export const Item: React.FC<IItem> = (props) => {
  const { data, userId } = props;
  const confirmRef = useRef();
  const navigate = useNavigate();
  const { userInfo } = userUserStore();
  const { id } = userInfo;
  const salary = useMemo(() => {
    return data?.isFace ? "面议" : `${data.minSalary}~${data.maxSalary}`;
  }, [data]);
  return (
    <div
      className={styles.item}
      onClick={() => {
        navigate(`/job/${data.id}`);
      }}
    >
      {id === userId && (
        <div className={styles.edit}>
          <AuthBtn>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/updateJob/${data.id}`);
              }}
            >
              编辑
            </Button>
          </AuthBtn>
        </div>
      )}

      <div className={styles.position}>
        <span>{data.name}</span>
        <span>{salary}</span>
      </div>
      <div className={styles.tag}>
        {data?.tag?.split(",").map((item) => {
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
          key={data?.isRemote ? "支持远程" : "不支持远程"}
          label={data?.isRemote ? "支持远程" : "不支持远程"}
          className={styles.chip}
          size="small"
        />
      </div>
      <div className={styles.address}>
        <span>地址：</span>
        <span>{data.location}</span>
      </div>
      <div className={styles.required}>
        <span>岗位描述</span>
        <Ellipsis content={data.description}></Ellipsis>
      </div>
      <div className={styles.time}>
        <span>{timeAgo(new Date(data?.updatedAt).getTime())}</span>
      </div>
    </div>
  );
};

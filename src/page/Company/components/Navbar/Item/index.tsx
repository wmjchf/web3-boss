import React, { useMemo } from "react";
import { Button, Chip } from "@mui/material";
import { Ellipsis } from "@/components/Ellipsis";
import { timeAgo } from "@/utils/time";
import styles from "./index.less";
import { useNavigate } from "react-router-dom";
import { userUserStore } from "@/store";

interface IItem {
  data: any;
  caddress: string;
}
export const Item: React.FC<IItem> = (props) => {
  const { data, caddress } = props;
  const navigate = useNavigate();
  const { userInfo } = userUserStore();
  const { address } = userInfo;
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
      {address === caddress && (
        <Button
          className={styles.edit}
          onClick={() => {
            navigate(`/updateJob/${data.id}`);
          }}
        >
          编辑
        </Button>
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
      <div className={styles.required}>
        <Ellipsis content={data.description}></Ellipsis>
      </div>
      <div className={styles.time}>
        <span>{timeAgo(new Date(data?.updatedAt).getTime())}</span>
      </div>
    </div>
  );
};

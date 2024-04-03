import React, { useMemo } from "react";
import { Ellipsis } from "@/components/Ellipsis";
import styles from "./index.less";
import { IJob } from "@/api/job";
import { Image } from "@/components/Image";
import { Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IItem {
  data: IJob;
}
export const Item: React.FC<IItem> = (props) => {
  const { data } = props;
  const navigate = useNavigate();
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
      <div className={styles.logo}>
        <Image src={data.company.logo}></Image>
      </div>
      <div className={styles.company__name}>
        <span>{data.company.name}</span>
      </div>
      <div className={styles.position}>
        <span>{data.name}</span>
        <span>{salary}</span>
      </div>
      <div className={styles.address}>
        <span>地址：</span>
        <span>{data.location}</span>
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
        <span>岗位描述</span>
        {/* <span>{data.description}</span> */}
        <Ellipsis content={data.description}></Ellipsis>
        {/* <div className={styles.required1}>
          <span></span>
          <span>
            精通JavaScript语言核心技术开发DOM、Ajax、JSON等相关技术，对JavaScript面向对象编程有自己的理解；
          </span>
        </div>
        <div className={styles.required1}>
          <span></span>
          <span>熟悉ES6规范，可以使用基本的ES6语法；</span>
        </div>
        <div className={styles.required1}>
          <span></span>
          <span>
            熟悉应用JQuery,同时熟悉Vue、React、angular等前端主流框架之一；
          </span>
        </div> */}
      </div>
      <div className={styles.time}>
        <span>{data.time}</span>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import styles from "./index.less";
import {
  Button,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

export const AddJob = () => {
  const [tagList, setTagList] = useState([]);
  const [tag, setTag] = useState("");
  return (
    <div className={styles.add__job}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>
            <span className={styles.span}>发布职位</span>
            <Button variant="contained">发布</Button>
          </div>
          <div className={styles.one}>
            <div className={styles.name}>
              <TextField id="name" label="岗位名称" fullWidth />
            </div>
            <div className={styles.remote}>
              <span className={styles.label}>是否支持远程</span>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                row
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="否"
                />
                <FormControlLabel value="male" control={<Radio />} label="是" />
              </RadioGroup>
            </div>
          </div>
          <div className={styles.two}>
            <div className={styles.salary}>
              <TextField id="name" label="最低薪资" />{" "}
              <span className={styles.range}>-</span>
              <TextField id="name" label="最高薪资" />
            </div>
            <div className={styles.tag}>
              <span className={styles.label}>标签</span>
              <TextField
                id="tag"
                label="Enter键嵌入"
                fullWidth
                value={tag}
                onChange={(event) => {
                  setTag(event.target.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    const newTagList = tagList.filter((item) => item !== tag);
                    setTagList([...newTagList, tag]);
                    setTag("");
                  }
                }}
              />
              <div className={styles.tag__list}>
                {tagList.map((item) => {
                  return (
                    <Chip
                      key={item}
                      label={item}
                      onDelete={() => {}}
                      className={styles.chip}
                      size="medium"
                    />
                  );
                })}
              </div>
            </div>
          </div>
          <div className={styles.description}>
            <TextField
              id="name"
              label="岗位描述"
              fullWidth
              multiline
              rows={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

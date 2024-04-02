import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import styles from "./index.less";
import {
  Button,
  Chip,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AuthBtn } from "@/components/AuthBtn";
import { getJobDetail, updateJob } from "@/api/job";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateJob = () => {
  const [tagList, setTagList] = useState([]);
  const { id } = useParams();

  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isRemote, setIsRemote] = useState("0");
  const [companyId, setCompanyId] = useState(-1);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [description, setDescription] = useState("");

  const handleGetJobInfo = async () => {
    const { result } = await getJobDetail(parseInt(id));
    setName(result.name);
    setIsRemote(result.isRemote ? "1" : "0");
    setMaxSalary(result.maxSalary);
    setMinSalary(result.minSalary);
    setDescription(result.description);
    setTagList(result.tag.split(","));
    setCompanyId(result.companyId);
  };

  const handlePublish = async () => {
    const result = await updateJob(parseInt(id), {
      name,
      isRemote,
      minSalary,
      maxSalary,
      description,
      companyId,
      tag: tagList.join(","),
    });

    navigate(-1);
  };
  useEffect(() => {
    if (id) {
      handleGetJobInfo();
    }
  }, [id]);
  return (
    <div className={styles.add__job}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>
            <span className={styles.span}>发布职位</span>
            <AuthBtn onClick={handlePublish}>
              <Button variant="contained">发布</Button>
            </AuthBtn>
          </div>
          <div className={styles.one}>
            <div className={styles.name}>
              <TextField
                id="name"
                label="岗位名称"
                value={name}
                fullWidth
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            </div>
            <div className={styles.remote}>
              <span className={styles.label}>是否支持远程</span>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={isRemote}
                name="radio-buttons-group"
                row
                onChange={(event) => {
                  setIsRemote(event.target.value);
                }}
              >
                <FormControlLabel value="0" control={<Radio />} label="否" />
                <FormControlLabel value="1" control={<Radio />} label="是" />
              </RadioGroup>
            </div>
          </div>
          <div className={styles.two}>
            <div className={styles.salary}>
              <TextField
                id="minSalary"
                value={minSalary}
                label="最低薪资"
                onChange={(event) => {
                  setMinSalary(event.target.value);
                }}
              />{" "}
              <span className={styles.range}>-</span>
              <TextField
                id="maxSalary"
                value={maxSalary}
                label="最高薪资"
                onChange={(event) => {
                  setMaxSalary(event.target.value);
                }}
              />
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
              id="description"
              label="岗位描述"
              value={description}
              fullWidth
              multiline
              rows={20}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

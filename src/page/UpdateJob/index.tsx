import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import styles from "./index.less";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { AuthBtn } from "@/components/AuthBtn";
import { getJobDetail, updateJob } from "@/api/job";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const UpdateJob = () => {
  const [tagList, setTagList] = useState([]);
  const { id } = useParams();

  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const [companyId, setCompanyId] = useState(-1);
  const [isRemote, setIsRemote] = useState("0");
  const [showLocation, setShowLocation] = useState(true);
  const [location, setLocation] = useState("");
  const [isFace, setIsFace] = useState("0");
  const [showSalary, setShowSalary] = useState(true);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");

  const handleGetJobInfo = async () => {
    const { result } = await getJobDetail(parseInt(id));
    setName(result.name);
    setIsFace(result.isFace ? "1" : "0");
    setLocation(result.location);
    setIsRemote(result.isRemote ? "1" : "0");
    setMaxSalary(result.maxSalary);
    setMinSalary(result.minSalary);
    setDescription(result.description);
    setTagList(result.tag.split(","));
    setCompanyId(result.company?.id);
    setContact(result.contact);
  };
  useEffect(() => {
    setShowLocation(isRemote === "0");
  }, [isRemote]);
  useEffect(() => {
    setShowSalary(isFace === "0");
  }, [isFace]);
  const handlePublish = async () => {
    if (!name) {
      toast.error("岗位名称必填");
      return;
    }
    if (isFace === "0" && (!minSalary || !maxSalary)) {
      toast.error("薪资范围必填");
      return;
    }
    if (isRemote === "0" && !location) {
      toast.error("工作地点必填");
      return;
    }
    if (!description) {
      toast.error("岗位描述必填");
      return;
    }
    if (tagList.length === 0) {
      toast.error("标签至少有一个");
      return;
    }
    const result = await updateJob(parseInt(id), {
      name,
      isRemote,
      minSalary,
      maxSalary,
      description,
      companyId,
      isFace,
      location,
      contact,
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
                fullWidth
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
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
          <div className={styles.two}>
            <div className={styles.is__face}>
              <span className={styles.label}>是否薪资面议</span>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="radio-buttons-group"
                row
                value={isFace}
                onChange={(event) => {
                  setIsFace(event.target.value);
                }}
              >
                <FormControlLabel value="0" control={<Radio />} label="否" />
                <FormControlLabel value="1" control={<Radio />} label="是" />
              </RadioGroup>
            </div>
            {showSalary && (
              <div className={styles.salary}>
                <span className={styles.label}>薪资范围</span>
                <TextField
                  id="name"
                  label="最低薪资"
                  value={minSalary}
                  onChange={(event) => {
                    setMinSalary(event.target.value);
                  }}
                />{" "}
                <span className={styles.range}>-</span>
                <TextField
                  id="name"
                  label="最高薪资"
                  value={maxSalary}
                  onChange={(event) => {
                    setMaxSalary(event.target.value);
                  }}
                />
              </div>
            )}
          </div>
          <div className={styles.three}>
            <div className={styles.remote}>
              <span className={styles.label}>是否支持远程</span>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="0"
                name="radio-buttons-group"
                row
                value={isRemote}
                onChange={(event) => {
                  setIsRemote(event.target.value);
                }}
              >
                <FormControlLabel value="0" control={<Radio />} label="否" />
                <FormControlLabel value="1" control={<Radio />} label="是" />
              </RadioGroup>
            </div>
            {showLocation && (
              <div className={styles.location}>
                <span className={styles.label}>工作地点</span>
                {/* <div className={styles.location__input}> */}
                <TextField
                  id="location"
                  label="地址"
                  value={location}
                  onChange={(event) => {
                    setLocation(event.target.value);
                  }}
                  fullWidth
                />
                {/* </div> */}
              </div>
            )}
          </div>
          <div className={styles.four}>
            <div className={styles.contact}>
              <span className={styles.label}>联系方式</span>
              {/* <div className={styles.location__input}> */}
              <TextField
                id="contact"
                label="简历被下载联系会被显示，非必填"
                value={contact}
                onChange={(event) => {
                  setContact(event.target.value);
                }}
                fullWidth
              />
              {/* </div> */}
            </div>
          </div>
          <div className={styles.description}>
            <TextField
              id="name"
              label="岗位描述"
              fullWidth
              multiline
              value={description}
              rows={15}
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

export default UpdateJob;

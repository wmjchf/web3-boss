import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { toast } from "react-hot-toast";
import styles from "./index.less";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { AuthBtn } from "@/components/AuthBtn";
import { addJob } from "@/api/job";
import { useNavigate, useParams } from "react-router-dom";
import { Comfirm } from "@/components/ComfirmDelete";
import { SHARE_TIP } from "@/constant";
import { userUserStore } from "@/store";

const AddJob = () => {
  const [tagList, setTagList] = useState([]);
  const { companyId } = useParams();
  const [shareOpen, setShareOpen] = useState(false);
  const [tag, setTag] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [isRemote, setIsRemote] = useState("0");
  const { userInfo } = userUserStore();
  const [showLocation, setShowLocation] = useState(true);
  const [location, setLocation] = useState("");
  const [isFace, setIsFace] = useState("0");
  const [showSalary, setShowSalary] = useState(true);
  const [minSalary, setMinSalary] = useState("");
  const [maxSalary, setMaxSalary] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setShowLocation(isRemote === "0");
  }, [isRemote]);
  useEffect(() => {
    setShowSalary(isFace === "0");
  }, [isFace]);

  const handlePublish = async () => {
    const result = await addJob({
      name,
      isRemote,
      minSalary,
      maxSalary,
      description,
      companyId,
      isFace,
      location,
      tag: tagList.join(","),
    })
      .then((result) => {
        toast.success(
          `${result.message},还剩${result.result?.resetIntegral}豆豆`
        );
        navigate(-1);
      })
      .catch((error) => {
        toast.error(error.message);
        setShareOpen(true);
        // closeApply();
        setOpen(false);
      });
  };
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.add__job}>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.title}>
            <span className={styles.span}>发布职位</span>
            <AuthBtn
              onClick={() => {
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
                setOpen(true);
              }}
            >
              <Button variant="contained">发布</Button>
            </AuthBtn>
          </div>
          <div className={styles.one}>
            <div className={styles.name}>
              <TextField
                id="name"
                label="岗位名称"
                fullWidth
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
                  onChange={(event) => {
                    setMinSalary(event.target.value);
                  }}
                />{" "}
                <span className={styles.range}>-</span>
                <TextField
                  id="name"
                  label="最高薪资"
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
          <div className={styles.description}>
            <TextField
              id="name"
              label="岗位描述"
              fullWidth
              multiline
              minRows={20}
              onChange={(event) => {
                setDescription(event.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <Comfirm
        open={open}
        tip="发布将消耗5颗豆豆，是否继续发布？"
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={handlePublish}
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
            .writeText(
              `http://localhost:3000/company${companyId}?address=${userInfo.address}`
            )
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

export default AddJob;

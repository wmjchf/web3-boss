import React, {
  useEffect,
  forwardRef,
  useState,
  useRef,
  useImperativeHandle,
} from "react";
import { Button, Modal } from "@mui/material";
import { Item } from "./item";
import styles from "./index.less";
import { userUserStore } from "@/store";
import { getApplySelf, IApply } from "@/api/apply";

interface IApplyModal {
  onClose?: () => void;
}
export const ApplyModal: React.FC<IApplyModal> = forwardRef((props, ref) => {
  const { onClose } = props;
  const [open, setOpen] = useState(false);
  const [list, setList] = useState<IApply>([]);
  const pageRef = useRef<number>(1);
  const sizeRef = useRef<number>(10);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleGetApply = async () => {
    const { result } = await getApplySelf({
      pageNum: pageRef.current,
      pageSize: sizeRef.current,
    });
    setList(result.list);
  };
  useEffect(() => {
    handleGetApply();
  }, []);
  useImperativeHandle(ref, () => {
    return {
      handleClose,
      handleOpen,
    };
  });

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={() => {
        setOpen(false);
      }}
    >
      <div className={styles.container}>
        <div className={styles.title}>
          <span>投递列表</span>
        </div>
        <div className={styles.list}>
          {list.map((item) => {
            return (
              <Item
                key={item.id}
                data={item.job}
                apply={item}
                onClose={() => {
                  setOpen(false);
                  onClose && onClose();
                }}
              ></Item>
            );
          })}
        </div>
      </div>
    </Modal>
  );
});

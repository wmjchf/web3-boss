import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./index.less";
import classNames from "classnames";
import { AuthBtn } from "@/components/AuthBtn";

interface IEditorPannel {
  children?: React.ReactElement;
  className?: string;
  showEdit?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
  onClose?: () => void;
}
export const EditPannel: React.FC<IEditorPannel> = (props) => {
  const {
    children,
    onEdit,
    onSave,
    className,
    showEdit = true,
    onClose,
  } = props;
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={classNames(styles.edit__pannel, className)}>
      <div className={styles.edit__pannel__inner}>
        {children}
        {showEdit && (
          <div className={styles.btn}>
            {isEdit && (
              <Button
                onClick={() => {
                  setIsEdit(false);
                  onClose && onClose();
                }}
              >
                取消
              </Button>
            )}
            {!isEdit ? (
              <AuthBtn
                onClick={() => {
                  setIsEdit(true);
                  onEdit && onEdit();
                }}
              >
                <Button>编辑</Button>
              </AuthBtn>
            ) : (
              <AuthBtn
                onClick={() => {
                  setIsEdit(false);
                  onSave && onSave();
                }}
              >
                <Button>保存</Button>
              </AuthBtn>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

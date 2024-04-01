import React, { useState } from "react";
import Button from "@mui/material/Button";
import styles from "./index.less";
import classNames from "classnames";

interface IEditorPannel {
  children?: React.ReactElement;
  className?: string;
  showEdit?: boolean;
  onEdit?: () => void;
  onSave?: () => void;
}
export const EditPannel: React.FC<IEditorPannel> = (props) => {
  const { children, onEdit, onSave, className, showEdit = true } = props;
  const [isEdit, setIsEdit] = useState(false);
  return (
    <div className={classNames(styles.edit__pannel, className)}>
      <div className={styles.edit__pannel__inner}>
        {children}
        {showEdit && (
          <div className={styles.btn}>
            {!isEdit ? (
              <Button
                onClick={() => {
                  setIsEdit(true);
                  onEdit && onEdit();
                }}
              >
                编辑
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setIsEdit(false);
                  onSave && onSave();
                }}
              >
                保存
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

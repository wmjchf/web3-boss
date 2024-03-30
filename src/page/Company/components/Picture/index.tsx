import React, { useState } from "react";

import styles from "./index.less";
import { EditPannel } from "../EditPannel";

export const Picture = () => {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <EditPannel
      onEdit={() => {
        setIsEdit(true);
      }}
      onSave={() => {
        setIsEdit(false);
      }}
      className={styles.edit__picture}
    >
      <div className={styles.picture}>
        <div className={styles.upload__image}>
          <input type="file" multiple />
        </div>
      </div>
    </EditPannel>
  );
};

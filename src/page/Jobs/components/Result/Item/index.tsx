import React from "react";

import styles from "./index.less";

export const Item = () => {
  return (
    <div className={styles.item}>
      <div className={styles.logo}>
        <img
          src="https://bx-branding-gateway.cloud.seek.com.au/7964ed18-692c-40c5-a733-c4540ee12ae8.1/serpLogo"
          alt=""
        />
      </div>
      <div className={styles.company__name}>
        <span>杭州不方科技有限公司</span>
      </div>
    </div>
  );
};

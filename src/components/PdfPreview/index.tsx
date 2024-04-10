import React, { forwardRef, useState, useImperativeHandle, lazy } from "react";
import Modal from "@mui/material/Modal";
import Pagination from "@mui/material/Pagination";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./index.less";
import { updateApply } from "@/api/apply";
import classNames from "classnames";
// const { Document, Page, pdfjs } = lazy(() => import("react-pdf"));
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
const PdfPreview = forwardRef((props, ref) => {
  const { onLoad, showMark = true } = props;
  const [open, setOpen] = useState(false);
  const [mark, setMark] = useState(false);
  const [url, setUrl] = useState("");
  const [applyId, setApplyId] = useState(-1);
  const [loaded, setLoaded] = useState(false);
  const handleOpen = (url: string, applyId: number, mark: boolean) => {
    setApplyId(applyId);
    setOpen(true);
    console.log(url, "fdsfs");
    setUrl(url);
    setMark(mark);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useImperativeHandle(ref, () => {
    return {
      handleOpen,
      handleClose,
    };
  });
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);
  const handleMark = () => {
    if (!mark) {
      const result = updateApply(applyId, { mark: true });
      setMark(true);
    } else {
      const result = updateApply(applyId, { mark: false });
      setMark(false);
    }
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={styles.container}>
        <div className={styles.box}>
          <Document
            loading={<div></div>}
            className={styles.documents}
            file={url}
            onLoadSuccess={({ numPages }) => {
              setNumPages(numPages);
              setLoaded(true);
              onLoad && onLoad();
            }}
          >
            <Page pageNumber={pageNumber}></Page>
          </Document>
        </div>
        {loaded && (
          <div className={styles.operation}>
            <div className={styles.page}>
              <Pagination
                count={numPages}
                variant="outlined"
                color="primary"
                onChange={(_, page) => {
                  setPageNumber(page);
                }}
              />
            </div>
            {showMark && (
              <>
                {mark ? (
                  <div className={styles.operation__btn}>
                    <div
                      className={classNames(styles.collection, styles.has)}
                      onClick={handleMark}
                    >
                      <i className="iconfont icon-yishoucang"></i>
                      <span>收藏</span>
                    </div>
                  </div>
                ) : (
                  <div className={styles.operation__btn}>
                    <div className={styles.collection} onClick={handleMark}>
                      <i className="iconfont icon-weishoucang"></i>
                      <span>收藏</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
});
export default PdfPreview;

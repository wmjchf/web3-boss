import React, { forwardRef, useState, useImperativeHandle } from "react";
import { Modal, Pagination } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import styles from "./index.less";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

export const PdfPreview = forwardRef((props, ref) => {
  const { onLoad } = props;
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [loaded, setLoaded] = useState(false);
  const handleOpen = (url: string) => {
    setOpen(true);
    setUrl(url);
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
            file={
              "http://localhost:8000/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88.pdf"
            }
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
          </div>
        )}
      </div>
    </Modal>
  );
});

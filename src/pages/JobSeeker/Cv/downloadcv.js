import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import { useReactToPrint } from "react-to-print";
import Template1 from "../../../templates/template1";

const DownloadCv = () => {
  const componentRef = useRef();

  // function to handle print/download
  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "My_CV", // filename when downloading
  });

  return (
    <div className="p-3">
      {/* Download button */}
      <Button variant="success" onClick={handleDownload} className="mb-3">
        Download CV
      </Button>

      {/* The CV content */}
      <div ref={componentRef}>
        <Template1 />
      </div>
    </div>
  );
};

export default DownloadCv;

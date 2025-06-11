import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

const usePrint = () => {
  const size = "210mm";
  const componentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
      @media print {
        @page {
        size: ${size} 297mm;
        margin: 20mm 10mm;
        display: block;
        }
      }
    `,
  });

  return { componentRef, handlePrint };
};

export default usePrint;

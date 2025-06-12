import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { toast } from "sonner";

const usePrint = () => {
  const size = "210mm";
  const componentRef = useRef<HTMLDivElement | null>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: "Resume Print",
    pageStyle: `
      @media print {
        @page {
        size: ${size} 297mm;
        margin: 20mm 10mm;
        display: block;
        }
      }
    `,
    onAfterPrint: () => {
      toast.success("Printing");
    },
  });

  return { componentRef, handlePrint };
};

export default usePrint;

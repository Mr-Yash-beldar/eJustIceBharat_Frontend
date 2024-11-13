// pdfData.ts
export type PdfData = {
    title: string;
    pdfUrl: string;
  };
  
  const pdfData: PdfData[] = [
    {
      title: "Smith vs. Johnson - Case Details",
      pdfUrl:"/Smith vs. Johnson_details.pdf", // Path to your PDF file
    },
  ];
  
  export default pdfData;
  
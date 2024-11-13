// feedbackData.ts

type Feedback = {
    plaintiffName: string;
    rating: number; // Number of stars rated by user
    suggestion: string;
  };
  
  const feedbackData: Feedback[] = [
    {
      plaintiffName: "John Doe",
      rating: 5,
      suggestion:
        "Excellent advocate! Very knowledgeable and professional. Helped me through every step of the case and provided clear guidance. Highly recommended!",
    },
    {
      plaintiffName: "Jane Smith",
      rating: 4,
      suggestion:
        "Good experience overall. The advocate was attentive and offered helpful insights. The case was resolved quickly, though there were a few minor delays.",
    },
    {
      plaintiffName: "Robert Brown",
      rating: 3,
      suggestion:
        "Average service. The advocate provided adequate support, but I felt there could have been more communication throughout the process. Satisfactory outcome.",
    },
    {
      plaintiffName: "Emily Johnson",
      rating: 4,
      suggestion:
        "Very supportive and responsive advocate. Always answered my questions promptly and made me feel confident about my case. Only minor delays but overall a good experience.",
    },
    {
      plaintiffName: "Michael Davis",
      rating: 2,
      suggestion:
        "Unfortunately, my experience was below expectations. The advocate seemed busy with other cases and didn’t always prioritize my case. More frequent updates would have been appreciated.",
    },
    {
      plaintiffName: "Sarah Lee",
      rating: 5,
      suggestion:
        "Outstanding advocate! The level of dedication and attention to detail was impressive. Made the entire legal process feel manageable and stress-free.",
    },
    {
      plaintiffName: "William Turner",
      rating: 3,
      suggestion:
        "The advocate was competent but could improve on communication. Sometimes it was difficult to get timely responses, but overall, the case was handled well.",
    },
    {
      plaintiffName: "Jessica White",
      rating: 4,
      suggestion:
        "Professional and reliable. The advocate was clear and concise in all communications and kept me informed. A positive experience overall.",
    },
    {
      plaintiffName: "David Miller",
      rating: 2,
      suggestion:
        "Not the best experience. I felt the advocate was not as engaged as I expected, and it took too long to reach any resolution. Improvement needed in follow-up and updates.",
    },
    {
      plaintiffName: "Laura Wilson",
      rating: 5,
      suggestion:
        "Absolutely fantastic! The advocate was always available to answer questions and made sure I understood every step. I felt truly supported and am grateful for the outcome.",
    },
  ];
  
  export default feedbackData;
  
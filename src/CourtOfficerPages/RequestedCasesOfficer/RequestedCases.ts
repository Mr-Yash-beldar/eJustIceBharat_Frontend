export interface Case {
    case_title: string;
    case_description: string;
    case_type: string;
    filing_date: string; // Format: YYYY-MM-DD
    causeOfAction: string;
    urgency_level: string; // E.g., 'High', 'Medium', 'Low'
    plaintiffName: string;
    plaintiffContactEmail: string;
    plaintiffContactPhone: string;
    plaintiffAddress: string;
    defendantName: string;
    defendantContactEmail: string;
    defendantContactPhone: string;
    defendantAddress: string;
    evidence_provided: string;
    witness_details: string;
    case_status: 'Filed' | 'Requested' | 'Accepted' | 'Registered' | 'Closed';
    advocate_name: string;
    desired_hearing_date: string; // Format: YYYY-MM-DD
    remark_for_case_by_advocate: string;
}

const RequestedCases: Case[] = [
    {
        case_title: "Smith vs. Johnson",
        case_description: "Dispute over property boundaries.",
        case_type: "Civil",
        filing_date: "2024-01-15",
        causeOfAction: "Property Dispute",
        urgency_level: "Medium",
        plaintiffName: "Alice Smith",
        plaintiffContactEmail: "alice.smith@example.com",
        plaintiffContactPhone: "555-0123",
        plaintiffAddress: "123 Main St, Springfield, IL",
        defendantName: "Bob Johnson",
        defendantContactEmail: "bob.johnson@example.com",
        defendantContactPhone: "555-0456",
        defendantAddress: "456 Elm St, Springfield, IL",
        evidence_provided: "Survey reports, witness statements.",
        witness_details: "John Doe, Jane Roe.",
        case_status: "Filed",
        advocate_name: "Laura Green",
        desired_hearing_date: "2024-03-01",
        remark_for_case_by_advocate: "Recommend mediation before court hearing."
    },
    {
        case_title: "Doe vs. City of Springfield",
        case_description: "Claim against the city for negligence.",
        case_type: "Civil",
        filing_date: "2024-02-10",
        causeOfAction: "Negligence",
        urgency_level: "High",
        plaintiffName: "John Doe",
        plaintiffContactEmail: "john.doe@example.com",
        plaintiffContactPhone: "555-0678",
        plaintiffAddress: "789 Oak St, Springfield, IL",
        defendantName: "City of Springfield",
        defendantContactEmail: "contact@springfield.gov",
        defendantContactPhone: "555-0987",
        defendantAddress: "101 City Hall, Springfield, IL",
        evidence_provided: "Photos of the incident, police report.",
        witness_details: "Officer Smith, Emily Brown.",
        case_status: "Requested",
        advocate_name: "Emily Black",
        desired_hearing_date: "2024-04-15",
        remark_for_case_by_advocate: "Urgent due to plaintiff's health condition."
    },
    {
        case_title: "Garcia vs. Smith Corp.",
        case_description: "Employment discrimination case.",
        case_type: "Employment",
        filing_date: "2024-03-05",
        causeOfAction: "Discrimination",
        urgency_level: "Low",
        plaintiffName: "Maria Garcia",
        plaintiffContactEmail: "maria.garcia@example.com",
        plaintiffContactPhone: "555-1234",
        plaintiffAddress: "234 Pine St, Springfield, IL",
        defendantName: "Smith Corp.",
        defendantContactEmail: "hr@smithcorp.com",
        defendantContactPhone: "555-5678",
        defendantAddress: "890 Market St, Springfield, IL",
        evidence_provided: "Emails, performance reviews.",
        witness_details: "Linda White.",
        case_status: "Accepted",
        advocate_name: "John White",
        desired_hearing_date: "2024-05-20",
        remark_for_case_by_advocate: "Suggest settlement discussion."
    },
    {
        case_title: "Brown vs. Green LLC",
        case_description: "Contract dispute over service agreement.",
        case_type: "Commercial",
        filing_date: "2024-04-12",
        causeOfAction: "Breach of Contract",
        urgency_level: "Medium",
        plaintiffName: "David Brown",
        plaintiffContactEmail: "david.brown@example.com",
        plaintiffContactPhone: "555-4321",
        plaintiffAddress: "567 Birch St, Springfield, IL",
        defendantName: "Green LLC",
        defendantContactEmail: "info@greenllc.com",
        defendantContactPhone: "555-8765",
        defendantAddress: "321 Cedar St, Springfield, IL",
        evidence_provided: "Signed contract, communication logs.",
        witness_details: "Tom Black.",
        case_status: "Registered",
        advocate_name: "Sandra Lee",
        desired_hearing_date: "2024-06-10",
        remark_for_case_by_advocate: "Document review pending."
    },
    {
        case_title: "Taylor vs. Martin",
        case_description: "Personal injury claim.",
        case_type: "Personal Injury",
        filing_date: "2024-05-25",
        causeOfAction: "Personal Injury",
        urgency_level: "High",
        plaintiffName: "Linda Taylor",
        plaintiffContactEmail: "linda.taylor@example.com",
        plaintiffContactPhone: "555-5678",
        plaintiffAddress: "678 Maple St, Springfield, IL",
        defendantName: "James Martin",
        defendantContactEmail: "james.martin@example.com",
        defendantContactPhone: "555-2345",
        defendantAddress: "789 Cherry St, Springfield, IL",
        evidence_provided: "Medical records, accident report.",
        witness_details: "Nancy Blue.",
        case_status: "Closed",
        advocate_name: "Robert Black",
        desired_hearing_date: "2024-07-15",
        remark_for_case_by_advocate: "Case concluded, awaiting closure report."
    },
    {
        case_title: "Wilson vs. State of Illinois",
        case_description: "Challenge to state law regarding zoning.",
        case_type: "Administrative",
        filing_date: "2024-06-30",
        causeOfAction: "Zoning Law",
        urgency_level: "Low",
        plaintiffName: "Henry Wilson",
        plaintiffContactEmail: "henry.wilson@example.com",
        plaintiffContactPhone: "555-6789",
        plaintiffAddress: "234 Oak St, Springfield, IL",
        defendantName: "State of Illinois",
        defendantContactEmail: "info@illinois.gov",
        defendantContactPhone: "555-9876",
        defendantAddress: "123 State Capitol, Springfield, IL",
        evidence_provided: "Zoning maps, public hearing transcripts.",
        witness_details: "David Green.",
        case_status: "Filed",
        advocate_name: "Michael Adams",
        desired_hearing_date: "2024-08-05",
        remark_for_case_by_advocate: "Consider state-level negotiation."
    },
    {
        case_title: "Nguyen vs. First National Bank",
        case_description: "Dispute over loan terms.",
        case_type: "Financial",
        filing_date: "2024-07-15",
        causeOfAction: "Loan Dispute",
        urgency_level: "Medium",
        plaintiffName: "Anna Nguyen",
        plaintiffContactEmail: "anna.nguyen@example.com",
        plaintiffContactPhone: "555-3456",
        plaintiffAddress: "345 Spruce St, Springfield, IL",
        defendantName: "First National Bank",
        defendantContactEmail: "support@firstnationalbank.com",
        defendantContactPhone: "555-7654",
        defendantAddress: "890 Banking St, Springfield, IL",
        evidence_provided: "Loan agreement, payment history.",
        witness_details: "Paul Gray.",
        case_status: "Requested",
        advocate_name: "Sarah King",
        desired_hearing_date: "2024-09-20",
        remark_for_case_by_advocate: "Review loan documents in detail."
    },
    {
        case_title: "Miller vs. United Airlines",
        case_description: "Claim for lost luggage.",
        case_type: "Consumer",
        filing_date: "2024-08-22",
        causeOfAction: "Consumer Protection",
        urgency_level: "Low",
        plaintiffName: "Sophia Miller",
        plaintiffContactEmail: "sophia.miller@example.com",
        plaintiffContactPhone: "555-9871",
        plaintiffAddress: "456 Ash St, Springfield, IL",
        defendantName: "United Airlines",
        defendantContactEmail: "customer.service@united.com",
        defendantContactPhone: "555-4322",
        defendantAddress: "789 Airline Rd, Springfield, IL",
        evidence_provided: "Flight itinerary, baggage claim ticket.",
        witness_details: "Kevin White.",
        case_status: "Accepted",
        advocate_name: "Daniel Brown",
        desired_hearing_date: "2024-10-05",
        remark_for_case_by_advocate: "Check compensation policies."
    },
    {
        case_title: "Adams vs. ABC Corp.",
        case_description: "Intellectual property theft case.",
        case_type: "Intellectual Property",
        filing_date: "2024-09-10",
        causeOfAction: "IP Theft",
        urgency_level: "High",
        plaintiffName: "Michael Adams",
        plaintiffContactEmail: "michael.adams@example.com",
        plaintiffContactPhone: "555-6782",
        plaintiffAddress: "567 Elm St, Springfield, IL",
        defendantName: "ABC Corp.",
        defendantContactEmail: "legal@abccorp.com",
        defendantContactPhone: "555-1235",
        defendantAddress: "890 Business Ave, Springfield, IL",
        evidence_provided: "Patent documents, product samples.",
        witness_details: "Jessica Yellow.",
        case_status: "Registered",
        advocate_name: "Sandra Clark",
        desired_hearing_date: "2024-10-25",
        remark_for_case_by_advocate: "Prepare for injunction request."
    }
];

export default RequestedCases;

// home.ts

// Define and export the CardData type
export type CardDataOfficer = {
    cardTitle: string;
    value: number;
};

// Define the homeData array
const homeDataOfficer: CardDataOfficer[] = [
    { cardTitle: "All Cases", value: 35 },
    { cardTitle: "Accepted Cases", value: 25 },
    { cardTitle: "PreTrialScheduled", value: 10 },
    
];

// Export homeData as the default export
export default homeDataOfficer;

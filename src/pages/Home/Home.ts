// home.ts

// Define and export the CardData type
export type CardData = {
    cardTitle: string;
    value: number;
};

// Define the homeData array
const homeData: CardData[] = [
    { cardTitle: "All Cases", value: 150 },
    { cardTitle: "Filed", value: 30 },
    { cardTitle: "Accepted", value: 25 },
    { cardTitle: "Rejected", value: 10 },
    { cardTitle: "Registered", value: 50 },
    { cardTitle: "Resolved", value: 20 },
    { cardTitle: "Closed", value: 15 },
];

// Export homeData as the default export
export default homeData;

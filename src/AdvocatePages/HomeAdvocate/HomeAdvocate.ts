// home.ts

// Define and export the CardData type
export type CardDataAdvocate = {
    cardTitle: string;
    value: number;
};

// Define the homeData array
const homeDataAdvocate: CardDataAdvocate[] = [
    { cardTitle: "All Cases", value: 150 },
    { cardTitle: "Accepted Cases", value: 25 },
    { cardTitle: "Rejected Cases", value: 10 },
    { cardTitle: "Registered Cases", value: 50 },
    { cardTitle: "Resolved Cases", value: 20 },
    { cardTitle: "Closed Cases", value: 15 },
];

// Export homeData as the default export
export default homeDataAdvocate;

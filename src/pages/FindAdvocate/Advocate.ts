// Advocate interface definition for TypeScript
export interface Advocate {
  id: number;
  name: string;
  email: string;
  state: string;
  district: string;
  gender: string;
  mobile: string;
  language: string;
  aadharProof: string;
  pincode: string;
  location: string;
  distance: string; // Assuming distance will be calculated later
  specialization: string;
  ratings: number;
  profilePicture: string;
}

// Data array of advocates
const Advocates: Advocate[] = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    state: 'Maharashtra',
    district: 'Mumbai',
    gender: 'Male',
    mobile: '9876543210',
    language: 'English, Hindi',
    aadharProof: 'Uploaded',
    pincode: '400001',
    location: 'Mumbai',
    distance: '', // To be calculated
    specialization: 'Criminal Law',
    ratings: 3.5,
    profilePicture: 'https://via.placeholder.com/150?text=John+Doe',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    state: 'Delhi',
    district: 'New Delhi',
    gender: 'Female',
    mobile: '9876543211',
    language: 'English, Hindi',
    aadharProof: 'Not Uploaded',
    pincode: '110001',
    location: 'New Delhi',
    distance: '', // To be calculated
    specialization: 'Family Law',
    ratings: 2.7,
    profilePicture: 'https://via.placeholder.com/150?text=Priya+Sharma',
  },
  {
    id: 3,
    name: 'Amit Verma',
    email: 'amit.verma@example.com',
    state: 'Karnataka',
    district: 'Bangalore',
    gender: 'Male',
    mobile: '9876543212',
    language: 'Kannada, English',
    aadharProof: 'Uploaded',
    pincode: '560001',
    location: 'Bangalore',
    distance: '', // To be calculated
    specialization: 'Corporate Law',
    ratings: 3.2,
    profilePicture: 'https://via.placeholder.com/150?text=Amit+Verma',
  },
  {
    id: 4,
    name: 'Rekha Iyer',
    email: 'rekha.iyer@example.com',
    state: 'Tamil Nadu',
    district: 'Chennai',
    gender: 'Female',
    mobile: '9876543213',
    language: 'Tamil, English',
    aadharProof: 'Not Uploaded',
    pincode: '600001',
    location: 'Chennai',
    distance: '', // To be calculated
    specialization: 'Civil Law',
    ratings: 3.8,
    profilePicture: 'https://via.placeholder.com/150?text=Rekha+Iyer',
  },
  {
    id: 5,
    name: 'Rahul Singh',
    email: 'rahul.singh@example.com',
    state: 'Uttar Pradesh',
    district: 'Lucknow',
    gender: 'Male',
    mobile: '9876543214',
    language: 'Hindi, English',
    aadharProof: 'Uploaded',
    pincode: '226001',
    location: 'Lucknow',
    distance: '', // To be calculated
    specialization: 'Labour Law',
    ratings: 1.2,
    profilePicture: 'https://via.placeholder.com/150?text=Rahul+Singh',
  },
  {
    id: 6,
    name: 'Sunita Desai',
    email: 'sunita.desai@example.com',
    state: 'Gujarat',
    district: 'Ahmedabad',
    gender: 'Female',
    mobile: '9876543215',
    language: 'Gujarati, English',
    aadharProof: 'Not Uploaded',
    pincode: '380001',
    location: 'Ahmedabad',
    distance: '', // To be calculated
    specialization: 'Intellectual Property Law',
    ratings: 2.6,
    profilePicture: 'https://via.placeholder.com/150?text=Sunita+Desai',
  },
  {
    id: 7,
    name: 'Ramesh Kumar',
    email: 'ramesh.kumar@example.com',
    state: 'Punjab',
    district: 'Amritsar',
    gender: 'Male',
    mobile: '9876543216',
    language: 'Punjabi, English',
    aadharProof: 'Uploaded',
    pincode: '143001',
    location: 'Amritsar',
    distance: '', // To be calculated
    specialization: 'Tax Law',
    ratings: 3.4,
    profilePicture: 'https://via.placeholder.com/150?text=Ramesh+Kumar',
  },
  {
    id: 8,
    name: 'Shalini Mehta',
    email: 'shalini.mehta@example.com',
    state: 'West Bengal',
    district: 'Kolkata',
    gender: 'Female',
    mobile: '9876543217',
    language: 'Bengali, English',
    aadharProof: 'Uploaded',
    pincode: '700001',
    location: 'Kolkata',
    distance: '', // To be calculated
    specialization: 'Constitutional Law',
    ratings: 3.9,
    profilePicture: 'https://via.placeholder.com/150?text=Shalini+Mehta',
  },
  {
    id: 9,
    name: 'Vikram Patel',
    email: 'vikram.patel@example.com',
    state: 'Rajasthan',
    district: 'Jaipur',
    gender: 'Male',
    mobile: '9876543218',
    language: 'Hindi, English',
    aadharProof: 'Not Uploaded',
    pincode: '302001',
    location: 'Jaipur',
    distance: '', // To be calculated
    specialization: 'Property Law',
    ratings: 4.0,
    profilePicture: 'https://via.placeholder.com/150?text=Vikram+Patel',
  },
  {
    id: 10,
    name: 'Nisha Gupta',
    email: 'nisha.gupta@example.com',
    state: 'Madhya Pradesh',
    district: 'Bhopal',
    gender: 'Female',
    mobile: '9876543219',
    language: 'Hindi, English',
    aadharProof: 'Uploaded',
    pincode: '462001',
    location: 'Bhopal',
    distance: '', // To be calculated
    specialization: 'Environmental Law',
    ratings: 3.5,
    profilePicture: 'https://via.placeholder.com/150?text=Nisha+Gupta',
  },
  {
    id: 11,
    name: 'Sanjana Nevatiya',
    email: 'sanjananevatiya@example.com',
    state: 'Madhya Pradesh',
    district: 'Indore',
    gender: 'Female',
    mobile: '7748814074',
    language: 'Hindi, English,GErman',
    aadharProof: 'Uploaded',
    pincode: '451666',
    location: 'Indore',
    distance: '', // To be calculated
    specialization: 'Criminal Law',
    ratings: 3.8,
    profilePicture: 'https://via.placeholder.com/150?text=Sanjana+Nevatiya',

  }
];

export default Advocates;

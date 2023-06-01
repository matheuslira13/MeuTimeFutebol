export type teamsTypes = {
  team: {
    id: number;
    name: string;
    code: string;
    country: string;
    founded: number;
    national: false;
    logo: string;
  };
  venue: {
    id: number;
    name: string;
    address: string;
    city: string;
    capacity: number;
    surface: string;
    image: string;
  };
};

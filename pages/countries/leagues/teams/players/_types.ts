export type PlayerType = {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: Array<StaticPlyerType>;
};
export type StaticPlyerType = {
  team: {
    id: number;
    name: string;
    logo: string;
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
    season: number;
  };
  games: {
    appearences: number;
    lineups: number;
    minutes: number;
    number: null;
    position: string;
    rating: null;
    captain: boolean;
  };
  substitutes: {
    in: number;
    out: number;
    bench: number;
  };
  shots: {
    total: null;
    on: null;
  };
  goals: {
    total: 1;
    conceded: null;
    assists: null;
    saves: null;
  };
  passes: {
    total: null;
    key: null;
    accuracy: null;
  };
  tackles: {
    total: null;
    blocks: null;
    interceptions: null;
  };
  duels: {
    total: null;
    won: null;
  };
  dribbles: {
    attempts: null;
    success: null;
    past: null;
  };
  fouls: {
    drawn: null;
    committed: null;
  };
  cards: {
    yellow: number;
    yellowred: number;
    red: number;
  };
  penalty: {
    won: null;
    commited: null;
    scored: null;
    missed: null;
    saved: null;
  };
};
/* export type PlatInfoType = {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: {
      date: string;
      place: string;
      country: string;
    };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: any;
}; */

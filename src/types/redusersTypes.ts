export type Direction = {
    code: string;
    name: string;
}

export type Filter = {
    from: Direction;
    to: Direction[];
}

export interface DirectionState {
  directions: Direction[];
}

export interface FilterState {
  filter: Filter[]
}

export const roles = ['admin', 'viewer'] as const;
export type Role = typeof roles[number];

export const sortingDirections = ["asc", "desc", "default"] as const;
export type SortingDirection = typeof sortingDirections[number]

export const actionCollumnsVariants = ["update", "delete"] as const;
export type ActionCollumnVariant = typeof actionCollumnsVariants[number]
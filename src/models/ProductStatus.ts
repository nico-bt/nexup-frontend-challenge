// Extend this enum if necessary
export enum ProductStatus {
  Active = 'Active',
  Inactive = 'Inactive',
}

export type StatusFilterType = ProductStatus | 'All';

export type Pedigree = {
  id: string;
  createdAt: string;
  updatedAt: string;

  regNo: string;
  microchip: string;

  dogName: string;
  breed: string;
  sex: string;
  dob: string;
  color: string;
  breederStation: string;

  ownerName: string;
  ownerAddress: string;
  phone: string;

  lineage: string[];
};

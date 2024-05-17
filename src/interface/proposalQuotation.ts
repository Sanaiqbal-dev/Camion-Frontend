export interface IProposalQuotationUpdateBody {
  id: number;
  trackingId: string;
  status: string;
  origin: string;
  destination: string;
  weight: string;
  dimentions: string;
  proposalQuotationStatusId: number;
  amount: string;
}

export interface IProposalQuotation {
  id: number;
  amount: string;
  destination: string;
  origin: string;
  dimentions: string;
  status: string;
  trackingId: string;
  weight: string;
  expectedDeliveryDate?: string;
  proposalQuotationStatusId: number | null;
}

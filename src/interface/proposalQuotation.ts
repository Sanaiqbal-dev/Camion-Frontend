import { IProposal } from "./proposal";

export interface IProposalQuotationUpdateBody {
  amount: string;
  delieveryDate: string;
  otherDetails: string;
  proposalQuotationId: number;
  proposalQuotationStatusId: number;
  fileName: string;
  filePath: string;
  purposalId: number;
  userId: string;
}

export interface IProposalQuotation {
  id: number;
  amount: string;
  expectedDeliveryDate: string;
  proposalId: number;
  proposal: IProposal;
  extraDetails: string;
  absolutePath: string;
  relativePath: string;
  fileName: string;
  proposalQuotationStatusId: number;
  createdById: string;
  appUser: any;
  createdDateTime: string;
  proposalStatusChangeById: number;
  appUsers: any;
  proposalStatusChangeDateTime: string;
}

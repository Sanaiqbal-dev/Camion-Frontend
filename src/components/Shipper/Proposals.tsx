import ProposalColumns from "./ProposalColumns";

const Proposals = () => {
  return (
    <div>
      {[...Array(10)].map((_, index) => (
        <ProposalColumns key={index} />
      ))}
    </div>
  );
};

export default Proposals;

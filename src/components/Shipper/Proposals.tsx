import ProposalColumns from "./TableColumns/ProposalColumns";

const Proposals = () => {
  return (
    <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
      {[...Array(10)].map((_, index) => (
        <ProposalColumns key={index} />
      ))}
    </div>
  );
};

export default Proposals;

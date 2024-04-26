import CompanyLogo from "../../assets/icons/companyLogo.svg";

const ProposalColumns = () => {
  return (
    <div className="table-container">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "-20px",
        }}
      >
        <div
          style={{
            display: "flex",
            height: "42px",
            width: "166px",
            borderRadius: "6px",
            backgroundColor: "white",
            alignItems: "center",
            marginLeft: "10px",
          }}
        >
          <img src={CompanyLogo} />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "166px",
            height: "42px",
            borderRadius: "10px",
            backgroundColor: "#0060B8",
            fontFamily: "Inter",
            fontSize: "18px",
            fontWeight: "600",
            textAlign: "center",
            color: "#FFF",
            marginRight: "20px",
            zIndex: "3",
          }}
        >
          SAR: 5670
        </div>
      </div>

      <div
        className="container"
        style={{
          height: "113px",
          backgroundColor: "#FFF",
          padding: "15px",
          borderRadius: "10px",
          paddingTop: "35px",
        }}
      >
        <div className="row" style={{ display: "flex" }}>
          <div className="col-sm">
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
                color: "#7B7878",
              }}
            >
              Tracking ID:
            </div>
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
              }}
            >
              9-859859859
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
                color: "#7B7878",
              }}
            >
              Status
            </div>
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
              }}
            >
              Ready to ship
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
                color: "#7B7878",
              }}
            >
              Origin
            </div>
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
              }}
            >
              Saudi Arabia
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
                color: "#7B7878",
              }}
            >
              Destination
            </div>
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
              }}
            >
              Qatar
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
                color: "#7B7878",
              }}
            >
              Weight
            </div>
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
              }}
            >
              250KG
            </div>
          </div>
          <div className="col-sm">
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
                color: "#7B7878",
              }}
            >
              Dimension
            </div>
            <div
              style={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "18.75px",
                textAlign: "left",
              }}
            >
              25x20x25
            </div>
          </div>
          <div className="col-sm">
            <div style={{ display: "flex", width: "169px", gap: "20px" }}>
              <button
                style={{
                  height: "30px",
                  width: "82px",
                  backgroundColor: "#21965333",
                  color: "#219653",
                  borderRadius: "5px",
                  fontWeight: "600px",
                }}
              >
                Accept
              </button>
              <button
                style={{
                  height: "30px",
                  width: "82px",
                  backgroundColor: "#EB575733",
                  color: "##EB5757",
                  borderRadius: "5px",
                  fontWeight: "600px",
                }}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProposalColumns;

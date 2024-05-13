import { DataTable } from "../ui/DataTable";
import { Col, FormControl, Image, InputGroup, Row } from "react-bootstrap";
import PreviousIcon from "../../assets/icons/ic-previous.svg";
import NextIcon from "../../assets/icons/ic-next.svg";
import SearchIcon from "../../assets/icons/ic-search.svg";
import { useState } from "react";
import { Iprofiles } from "../../interface/admin";
import { ProfileColumns } from "./TableColumns/ProfileColumns";
import { useGetCompanyProfilesListQuery } from "@/services/companyProfile";
import { debounce } from "@/util/debounce";

const Profiles = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  console.log(searchTerm, "searchTerm");
  const companyProfiles = useGetCompanyProfilesListQuery({ term: searchTerm });
  const ProfilesTableData: Iprofiles[] = companyProfiles.data?.result.result;
  const profilesData = ProfilesTableData?.map((item) => ({
    id: item.id,
    profileType: "shipper",
    firstName: item.firstName,
    lastName: item.lastName,
    email: item.email,
    contact: item.phoneNumber ? item.phoneNumber : "2233445566",
    company: item.companyName,
    crDocument: "",
    status: item.companyAccountStatus
      ? item.companyAccountStatus
      : "Not Approved",
  }));

  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);
  const debouncedSearch = debounce((search: string) => {
    if (search.length >= 3) {
      setSearchTerm(search);
    }
  }, 3000);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  function handleChangeValue(direction: number) {
    setCurrentIndex(currentIndex + direction);

    if (currentIndex >= values.length) {
      setCurrentIndex(values.length - 1);
    } else if (currentIndex < 0) {
      setCurrentIndex(0);
    }
    setEntriesValue(values[currentIndex]);
  }
  return (
    <div className="table-container">
      <div className="tw-flex tw-justify-between tw-items-center">
        <Row className="tw-items-center">
          <Col xs="auto" className="tw-text-secondary">
            Show
          </Col>
          <Col xs="auto">
            <div className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-px-2.5 tw-py-0 tw-gap-1 tw-w-max tw-h-10">
              <input
                className="tw-text-center tw-w-7 tw-border-0 tw-font-bold tw-bg-white tw-text-gray-700 tw-text-base"
                type="text"
                readOnly
                value={entriesValue}
              />
              <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center">
                <button
                  className="tw-border-none"
                  onClick={() => handleChangeValue(1)}
                >
                  <Image
                    className="tw-cursor-pointer tw-border-0 tw-bg-transparent"
                    src={PreviousIcon}
                  />
                </button>
                <button
                  className="tw-border-none"
                  onClick={() => handleChangeValue(-1)}
                >
                  <Image
                    className="tw-cursor-pointer tw-border-0 tw-bg-transparent"
                    src={NextIcon}
                  />
                </button>
              </div>
            </div>
          </Col>
          <Col xs="auto" className="tw-text-secondary">
            entries
          </Col>
        </Row>
        <Row className="tw-mt-3">
          <Col>
            <InputGroup>
              <InputGroup.Text>
                <Image src={SearchIcon} />
              </InputGroup.Text>
              <FormControl
                type="text"
                placeholder="Search"
                className="form-control"
                onChange={handleInputChange}
              ></FormControl>
            </InputGroup>
          </Col>
        </Row>
      </div>
      {profilesData && (
        <DataTable
          isAction={false}
          columns={ProfileColumns}
          data={profilesData}
        />
      )}
    </div>
  );
};
export default Profiles;

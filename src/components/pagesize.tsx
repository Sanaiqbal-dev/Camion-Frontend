import { useState } from 'react';
import { Col, Image } from 'react-bootstrap';
import PreviousIcon from '../../assets/icons/ic-previous.svg';
import NextIcon from '../../assets/icons/ic-next.svg';

const pagesize = () => {
  const values = [10, 20, 30, 40, 50];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [entriesValue, setEntriesValue] = useState(10);

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
    <>
      <Col xs="auto" className="tw-text-secondary">
        Show
      </Col>
      <Col xs="auto">
        <div className="tw-flex tw-justify-center tw-items-center tw-bg-white tw-border tw-border-gray-300 tw-rounded-md tw-px-2.5 tw-py-0 tw-gap-1 tw-w-max tw-h-10">
          <input className="tw-text-center tw-w-7 tw-border-0 tw-font-bold tw-bg-white tw-text-gray-700 tw-text-base" type="text" readOnly value={entriesValue} />
          <div className="tw-flex tw-flex-col tw-gap-2 tw-items-center">
            <button className="tw-border-none" onClick={() => handleChangeValue(1)}>
              <Image className="tw-cursor-pointer tw-border-0 tw-bg-transparent" src={PreviousIcon} />
            </button>
            <button className="tw-border-none" onClick={() => handleChangeValue(-1)}>
              <Image className="tw-cursor-pointer tw-border-0 tw-bg-transparent" src={NextIcon} />
            </button>
          </div>
        </div>
      </Col>
      <Col xs="auto" className="tw-text-secondary">
        entries
      </Col>
    </>
  );
};

export default pagesize;

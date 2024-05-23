interface LoadingProps {
  size: number;
}

export const Loading: React.FC<LoadingProps> = ({ size }) => {
  return (
    <>
      <div className="tw-flex tw-justify-center tw-items-center tw-w-full tw-h-screen tw-fixed tw-left-0 tw-top-0">
        <div style={{ width: `${size}px`, height: `${size}px` }} className="tw-animate-spin">
          <div
            className="tw-h-full tw-w-full tw-border-4  tw-border-t-[#0060b8]
       tw-border-b-[#0060b8] tw-rounded-[50%]"></div>
        </div>
      </div>
    </>
  );
};

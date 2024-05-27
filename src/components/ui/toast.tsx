import { useEffect, useCallback } from 'react';
import { Alert } from 'react-bootstrap';

interface IAlertProps {
  variant: 'success' | 'danger';
  showToast: boolean;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
  autoClose?: boolean;
  duration?: number;
  message?: string;
}

export const Toast = (props: IAlertProps) => {
  const { showToast, variant, setShowToast, autoClose = true, duration = 10000, message } = props;

  const handleCloseAlert = useCallback(() => {
    setShowToast(false);
  }, [setShowToast]);

  useEffect(() => {
    const timeoutRef: NodeJS.Timeout[] = [];
    if (autoClose) {
      timeoutRef.push(
        setTimeout(() => {
          const closeButton: HTMLButtonElement | null = document.querySelector('button[class=btn-close]');
          if (closeButton) {
            closeButton.click();
            timeoutRef.push(
              setTimeout(() => {
                handleCloseAlert();
              }, 2500),
            );
          }
        }, duration),
      );
    }

    return () => {
      timeoutRef.forEach((ref) => clearTimeout(ref));
    };
  }, [autoClose, duration, handleCloseAlert]);

  return (
    <Alert
      show={showToast}
      className={`tw-fixed tw-top-2 tw-right-2 tw-max-w-sm tw-max-h-16 d-inline-block m-1 ${variant}`}
      variant={variant}
      onClose={handleCloseAlert}
      transition
      dismissible>
      {message ? <span>{message}</span> : <span>{variant === 'success' ? 'Request has been processed.' : 'Something went wrong.'}</span>}
    </Alert>
  );
};

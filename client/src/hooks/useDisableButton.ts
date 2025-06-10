import { useState } from "react";

const useDisableButton = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const disableButtonTemporarily = (duration = 3000) => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
    }, duration);
  };
  return { isDisabled, disableButtonTemporarily };
};

export default useDisableButton;

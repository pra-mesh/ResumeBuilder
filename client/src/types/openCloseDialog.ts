import { Dispatch, SetStateAction } from "react";
export interface DialogOpenClose {
  openCloseDialog: boolean;
  setOpenCloseDialog: Dispatch<SetStateAction<boolean>>;
}

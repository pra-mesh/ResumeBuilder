import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";

import { setCurrentPage, setLimit } from "@/slices/resumeSlice";

const Pagination = ({ totalPage }: { totalPage: number }) => {
  const { limit, currentPage } = useSelector(
    (state: RootState) => state.resumes
  );
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center space-x-6">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-medium">Rows per page</p>
        <Select
          value={limit}
          onValueChange={(newValue) => {
            dispatch(setLimit(newValue));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue>{limit}</SelectValue>
          </SelectTrigger>
          <SelectContent side="top">
            {[2, 5, 10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-[100px] items-center justify-center text-sm font-medium">
        {currentPage} Page of {totalPage}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            dispatch(setCurrentPage(1));
          }}
          disabled={false}
        >
          <span className="sr-only">Go to first page</span>
          <DoubleArrowLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            if (currentPage !== 1) dispatch(setCurrentPage(currentPage - 1));
          }}
          disabled={false}
        >
          <span className="sr-only">Go to previous page</span>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            if (currentPage !== totalPage)
              dispatch(setCurrentPage(currentPage + 1));
          }}
          disabled={false}
        >
          <span className="sr-only">Go to next page</span>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            dispatch(setCurrentPage(totalPage));
          }}
          disabled={false}
        >
          <span className="sr-only">Go to last page</span>
          <DoubleArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;

import { Button } from "./button";
import { Input } from "./input";
import { X, Search } from "lucide-react";

interface DataTableToolbarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  setSearchValue: (value: string) => void;
}

export function DataTableToolbar({
  searchPlaceholder = "Search...",
  searchValue = "",
  setSearchValue,
}: DataTableToolbarProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex flex-1 items-center space-x-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            value={searchValue ?? ""}
            onChange={(event) => setSearchValue(event.target.value)}
            className="pl-8"
          />
          {searchValue && (
            <Button
              variant="ghost"
              onClick={() => setSearchValue("")}
              className="absolute right-1 top-1 h-7 w-7 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Reset filters</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

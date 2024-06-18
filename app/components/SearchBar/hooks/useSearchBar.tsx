import { Search } from "@/app/assets/icons/config";
import React from "react";

export const useSearchBar = () => {
  const [query, setQuery] = React.useState("");
  const [heading, setHeading] = React.useState(true);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHeading(false);
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    setHeading(true);
    // Implement your search logic here
  };

  return {
    searchIcon: Search,
    query,
    handleInputChange,
    handleSearch,
    heading,
  };
};

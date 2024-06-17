import { useState, useEffect } from "react";
import { ButtonProps } from "@/app/components/Button/constants/interface";
import Image from "next/image";
import { DropDownIcon, DropUpIcon, DownArrowBgWhite } from "@/app/assets/icons/config";

const useButton = (props: ButtonProps) => {
  const {
    icon,
    iconWidth = 16,
    iconHeight = 16,
    options,
    onOptionSelect,
    label,
    dropdownIcons,
    changeLabel = true,
  } = props;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const initialLabel = label || options?.[0]?.label || "";
  const findOptionLabel = (optionValue: string) =>
    options?.find((option) => option.value === optionValue)?.label ||
    initialLabel;

  useEffect(() => {
    if (label) {
      const matchingOption = options?.find((option) => option.label === label);
      if (matchingOption) {
        setSelectedOption(matchingOption.value);
      } else {
        setSelectedOption("");
      }
    } else {
      setSelectedOption("");
    }
  }, [label, options]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleOptionSelect = (optionValue: string) => {
    if (changeLabel) {
      setSelectedOption(optionValue);
    }
    onOptionSelect?.(optionValue);
    setDropdownOpen(false);
  };

  const renderIcon = () => {
    return (
      <>
        {icon && (
          <Image
            src={icon as string}
            alt=""
            width={iconWidth}
            height={iconHeight}
          />
        )}
      </>
    );
  };
  // const dropDownIconSrc = dropdownOpen ? DropUpIcon : DropDownIcon;
  const dropDownIconSrc = dropdownIcons ? dropdownOpen ? dropdownIcons.openIcon : dropdownIcons.closeIcon : dropdownOpen ? DropUpIcon : DropDownIcon;
  const renderDropDownIcon = (
    toggleDropDown: () => void,
    multipleActionStyles?: React.CSSProperties
  ) => {
    return (
      <div onClick={toggleDropDown} style={multipleActionStyles} >
        <Image
          src={dropDownIconSrc as string}
          alt=""
          width={iconWidth}
          height={iconHeight}

        />
      </div>
    );
  };

  const currentLabel = changeLabel ? findOptionLabel(selectedOption) : label;

  return {
    dropdownOpen,
    toggleDropdown,
    renderIcon,
    renderDropDownIcon,
    handleOptionSelect,
    currentLabel,
    selectedOption,
  };
};

export default useButton;

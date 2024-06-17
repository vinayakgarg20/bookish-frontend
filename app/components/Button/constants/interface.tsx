import { ReactNode } from "react";

export enum IconPosition {
  BEFORE = "before",
  AFTER = "after",
}

export enum ButtonType {
  DEFAULT = "default",
  DROPDOWN = "dropdown",
}

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownIconProps {
  openIcon: ReactNode;
  closeIcon: ReactNode;
}

export interface ButtonProps {
  label?: string | undefined | ReactNode;
  icon?: ReactNode;
  iconPosition?: IconPosition;
  iconWidth?: number;
  showLabel?: boolean;
  iconHeight?: number;
  onClick?: () => void;
  buttonStyles?: React.CSSProperties;
  type?: ButtonType;
  changeLabel?: boolean;
  buttonContainerMain?: React.CSSProperties;
  options?: DropdownOption[];
  onOptionSelect?: (value: string) => void;
  dropdownIcons?: DropdownIconProps;
  activeOptionStyle?: React.CSSProperties;
  inactiveOptionStyle?: React.CSSProperties;
  dropdownListStyle?: React.CSSProperties;
  isLoading?: boolean;
  disabled?: boolean;
}

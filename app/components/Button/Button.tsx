"use client";
import React from "react";
import styles from "@/app/components/Button/styles/Button.module.css";
import useButton from "@/app/components/Button/hooks/useButton";

import {
  ButtonProps,
  ButtonType,
  IconPosition,
} from "@/app/components/Button/constants/interface";

const Button: React.FC<ButtonProps> = (props) => {
  const {
    onClick,
    buttonStyles = {},
    type = ButtonType.DEFAULT,
    buttonContainerMain,
    activeOptionStyle,
    inactiveOptionStyle,
    dropdownListStyle,
    options,
    iconPosition = IconPosition.BEFORE,
    isLoading,
    disabled,
    showLabel = true,
    changeLabel,
  } = props;

  const {
    dropdownOpen,
    toggleDropdown,
    renderIcon,
    renderDropDownIcon,
    handleOptionSelect,
    selectedOption,
    currentLabel,
  } = useButton(props);

  const handleClick = () => {
    if (type === ButtonType.DEFAULT && onClick) {
      onClick();
    } else if (type === ButtonType.DROPDOWN) {
      onClick?.();
      options && options?.length > 1 && toggleDropdown();
    }
  };

  return (
    <div style={buttonContainerMain}>
      <button
        className={styles.button}
        style={buttonStyles}
        onClick={handleClick}
        disabled={isLoading || disabled}
      >
        {isLoading ? (
          <div className={styles.loadingIndicator}>Loading...</div>
        ) : (
          <>
            {iconPosition === IconPosition.BEFORE && renderIcon()}
            {showLabel && currentLabel && (
              <div className={styles.label}>{currentLabel}</div>
            )}
            {iconPosition === IconPosition.AFTER && renderIcon()}
            {type === ButtonType.DROPDOWN &&
              renderDropDownIcon(toggleDropdown)}
          </>
        )}
      </button>
      {type === ButtonType.DROPDOWN && dropdownOpen && (
        <div className={styles.dropdownContainer}>
          <ul className={styles.dropdownList} style={dropdownListStyle}>
            {options?.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionSelect(option.value)}
                className={styles.dropdownItem}
                style={
                  option.value === selectedOption
                    ? activeOptionStyle
                    : inactiveOptionStyle
                }
              >
                {option.label || option.value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Button;

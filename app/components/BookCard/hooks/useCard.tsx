// useCard.ts
import { useState, useCallback } from "react";
import { CardProps } from "@/app/components/Card/constants/interface";

const useCard = (CardProps: CardProps) => {
  const {
    fields,
    cardStyles,
    cardHeaderStyles,
    cardDescriptionStyles,
    cardType,
    handleClick,
    descriptionFields,
  } = CardProps;

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleCardClick = useCallback(() => {
    handleClick && handleClick();
    if (cardType === "detailed") {
      setIsDescriptionOpen((prev) => !prev);
    }
  }, [cardType, handleClick]);

  return {
    fields,
    cardStyles,
    cardHeaderStyles,
    cardDescriptionStyles,
    cardType,
    descriptionFields,
    isDescriptionOpen,
    handleCardClick,
  };
};

export default useCard;
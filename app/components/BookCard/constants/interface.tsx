import { ReactNode } from "react";

export interface CardFields {
  [key: string]: ReactNode;
}

export interface CardProps {
  fields: CardFields;
  cardStyles?: React.CSSProperties;
  cardHeaderStyles?: React.CSSProperties;
  cardDescriptionStyles?: React.CSSProperties;
  cardType: "compact" | "detailed";
  handleClick?: () => void;
  descriptionFields?: CardFields;
}

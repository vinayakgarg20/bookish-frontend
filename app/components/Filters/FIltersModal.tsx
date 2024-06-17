import React, { useState, useContext } from "react";

import styles from "./styles/styles.module.css";
import { FiltersOptions } from "./constants/interface";
import Button from "@/app/components/Button/Button";
import { ActionIconStyles, ActionIconStyles2 } from "./constants/config";

interface FilterModalProps {
  value?: FiltersOptions[];
  isOpen: boolean;
}

const FiltersModal: React.FC<FilterModalProps> = (props: FilterModalProps) => {
  const { value, isOpen } = props;
  if (isOpen && value) {
    return (
      <div className={styles.filterTab}>
        <div className={styles.filterDropdown}>
          {value.map((data, index: number) => (
            <div key={index} className={styles.filtersRow}>
              <p>{data.value}</p>
            </div>
          ))}
        </div>
        <div className={styles.Button}>
          <Button label={"Reset"} buttonStyles={ActionIconStyles}></Button>
          <Button
            label={"Show Results"}
            buttonStyles={ActionIconStyles2}
          ></Button>
        </div>
      </div>
    );
  }
};

export default FiltersModal;

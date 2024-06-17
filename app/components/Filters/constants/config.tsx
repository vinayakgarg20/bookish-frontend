import { FiltersData } from "./interface";
import { CSSProperties } from "react";
import { DownArrowIcon, UpArrowIcon } from '@/app/assets/icons/config';
import { ButtonType } from "@/app/components/Button/constants/interface";
import { PlusIcon } from "@/app/assets/icons/config";

export const dropdownIcons = {
    openIcon: DownArrowIcon,
    closeIcon: UpArrowIcon,
};

export const ActionIconStyles: CSSProperties = {
    display: "flex",
    padding: "0.45rem",
    justifyContent: "space-between",
    alignItems: " center",
    border: "1px solid #BABCBE",
    borderRadius: "8px",
    background: " #fff",
    fontWeight: "600",
    flexDirection: "row-reverse",
    color: "#272127"
};
export const ActionIconStyles2: CSSProperties = {
    display: "flex",
    padding: "0.45rem",
    justifyContent: "space-between",
    alignItems: " center",
    border: "1px solid #BABCBE",
    borderRadius: "8px",
    background: " #644BFD",
    fontWeight: "600",
    color: " #fff",
};

export const filterData: FiltersData[] = [
    {
        id: 1,
        title: "All",
        type: ButtonType.DEFAULT,
        styles: ActionIconStyles,
        
    },
    {
        id: 2,
        title: "Favorites",
        type: ButtonType.DEFAULT,
        styles: ActionIconStyles,
        
    }, {
        id: 3,
        title: `Sort by ${"Title"}`,
        type: ButtonType.DEFAULT,
        styles: ActionIconStyles,
        icon: DownArrowIcon,
        options: [
            {
                index: 1,
                value: "Title",
            },
            {
                index: 2,
                value: "Genre"
            },
            {
                index: 2,
                value: "Author"
            },
            {
                index: 2,
                value: "Rating"
            }
        ]
    }, {
        id: 4,
        title: "Location",
        type: ButtonType.DEFAULT,
        styles: ActionIconStyles,
        icon: DownArrowIcon,
        options: [
            {
                index: 1,
                value: "Lucknow",
            },
            {
                index: 2,
                value: "Delhi"
            }
        ]
    },
    {
        id: 5,
        title: "More Filters",
        type: ButtonType.DEFAULT,
        styles: ActionIconStyles,
        icon: DownArrowIcon,
    },
    {
        id: 1,
        title: "Add Candidate",
        type: ButtonType.DEFAULT,
        icon: PlusIcon,
        styles: ActionIconStyles2,
    }
]
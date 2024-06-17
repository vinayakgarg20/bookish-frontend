import { DropdownOption } from "@/app/components/Button/constants/interface"
import { ButtonType } from "@/app/components/Button/constants/interface"
import { CSSProperties } from "react"

export interface FiltersOptions {
    index: number,
    value: string,
}

export interface dropDownIcons {
    openIcon: string,
    closeIcon: string,
}
export interface FiltersData {
    id: number,
    title: string,
    type: ButtonType,
    styles?: CSSProperties,
    icon?: string,
    dropDownIcon?: dropDownIcons,
    options?: FiltersOptions[],
}
export interface FiltersProps {
    data: FiltersData[],
}
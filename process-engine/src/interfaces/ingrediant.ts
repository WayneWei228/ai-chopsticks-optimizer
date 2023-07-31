import {Nutrition} from "./nutrition"

export interface Ingrediant {
    name: string
    nameEN: string
    quantity: string
    weight?: number
    key?: string
    nutrition?: Nutrition
}
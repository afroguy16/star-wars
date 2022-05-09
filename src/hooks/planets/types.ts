import { PlanetT } from "../../components/planet/types"

export type PaginationConfig = {
    perPage: number,
    currentPage: number
}

export type PaginationResult = {
    results: Array<PlanetT>,
    totalCount: number
}
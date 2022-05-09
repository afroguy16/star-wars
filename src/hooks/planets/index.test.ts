import { cleanup } from '@testing-library/react';
import { usePlanets } from '.';
import { results as planetResponse } from "../../mocks/planets-response.json"
import { results, mockedPaginatedItemForPlanetsComponent as paginatedResults } from "../../mocks/transformed-planets-response"
import { PaginationConfig } from './types';

jest.mock('../../data/planets.json', () => require("../../mocks/planets-response.json")); //Jest hoist this to be on top of "imports", so I had to use "require"

describe('useTest', () => {
    const { fetchPlanets } = usePlanets();

    afterEach(cleanup);

    it('should contain fetchPlanets function', () => {
        expect(fetchPlanets).toBeTruthy();
    })

    it('should return an output of Planet array with all the results if not paginated', () => {
        const fakeTransformedPlanets = [...results]
        const planetsResult = fetchPlanets()
        expect(planetsResult).toEqual({ results: fakeTransformedPlanets, totalCount: planetResponse.length })
    })

    it('should return an output of Planet array with all the results if not paginated', () => {
        const paginationConfig: PaginationConfig = { perPage: 2, currentPage: 3 }
        const fakeTransformedPlanets = [...paginatedResults]
        const planetsResult = fetchPlanets(paginationConfig)
        expect(planetsResult.results).toHaveLength(2)
        expect(planetsResult).toEqual({ results: fakeTransformedPlanets, totalCount: planetResponse.length })
    })
})
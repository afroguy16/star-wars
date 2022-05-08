import { cleanup } from '@testing-library/react';
import { usePlanets } from '.';
import mockPlanets from "../../mocks/planets-response.json"
import { results } from "../../mocks/transformed-planets-response"

describe('useTest', () => {
    const { fetchPlanets } = usePlanets();
    jest.mock('../../data/planets.json', () => mockPlanets); //failed to mock

    afterEach(cleanup);

    it('should contain fetchPlanets function', () => {
        expect(fetchPlanets).toBeTruthy();
    })

    it('should return a Promise which resolves an output of Planet array', () => {
        const fakeTransformedPlanets = [...results]
        const planetsResult = fetchPlanets();
        console.log(fakeTransformedPlanets.length, planetsResult.length)
        expect(planetsResult).toBe(fakeTransformedPlanets)
    })
})
import { cleanup } from '@testing-library/react';
import { usePaginate } from '.';
import { results, mockedPaginatedItem } from '../../mocks/transformed-planets-response'

describe('usePaginate', () => {
    const { paginate } = usePaginate();

    afterEach(cleanup);

    it('should contain paginate function', () => {
        expect(paginate).toBeTruthy();
    })

    // update the description
    it('should return a new array that contains only items in the specified config arguments', () => {
        const returnedItems = paginate(results, 2, 2)
        expect(returnedItems).toHaveLength(2)
        expect(returnedItems).toStrictEqual(mockedPaginatedItem)
    })

    it(`should throw an error if config's perPage is less than 1`, () => {
        expect(() => paginate(results, 0, 2)).toThrowError()
    })

    it(`should return all the result if config's perPage is more than the length of the arrary given`, () => {
        const returnedItems = paginate(results, 100, 2)
        expect(returnedItems).toHaveLength(results.length)
        expect(returnedItems).toStrictEqual(results)
    })

    it(`should throw an error if config's currentPage is less than 1`, () => {
        expect(() => paginate(results, 2, 0)).toThrowError()
    })

    it(`should throw an error if config's currentPage is more than the available page`, () => {
        expect(() => paginate(results, 2, 10)).toThrowError()
    })
})
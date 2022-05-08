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
})
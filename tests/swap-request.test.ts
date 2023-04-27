import { Dexter, LiquidityPool, Minswap, Mock, SwapRequest, Asset } from '../src';
import { WingRiders } from '../build';

describe('SwapRequest', () => {

    const dexter: Dexter = new Dexter(new Mock());
    const swapRequest: SwapRequest = dexter.newSwapRequest();

    it('Can calculate Minswap parameters', () => {
        const liquidityPool: LiquidityPool = new LiquidityPool(
            Minswap.name,
            'addr1',
            'lovelace',
            new Asset('29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6', '4d494e', 6),
            30817255371488n,
            349805856622734n,
        );
        liquidityPool.poolFee = 0.3;

        swapRequest
            .forLiquidityPool(liquidityPool)
            .withSwapInToken('lovelace')
            .withSwapInAmount(10_000_000_000000n)
            .withSlippagePercent(0.5);

        expect(+swapRequest.getPriceImpactPercent().toFixed(2)).toEqual(24.37);
        expect(swapRequest.getEstimatedReceive()).toEqual(85_506_228_814959n);
        expect(swapRequest.getMinimumReceive()).toEqual(85_080_824_691501n);
    });

    it('Can calculate WingRiders parameters', () => {
        const liquidityPool: LiquidityPool = new LiquidityPool(
            WingRiders.name,
            'addr1',
            'lovelace',
            new Asset('533bb94a8850ee3ccbe483106489399112b74c905342cb1792a797a0', '494e4459', 6),
            50491527399n,
            12677234723n,
        );
        liquidityPool.poolFee = 0.35;

        swapRequest
            .forLiquidityPool(liquidityPool)
            .withSwapInToken('lovelace')
            .withSwapInAmount(10_000000n)
            .withSlippagePercent(0.5);

        expect(+swapRequest.getPriceImpactPercent().toFixed(2)).toEqual(0.37);
        expect(swapRequest.getEstimatedReceive()).toEqual(2_501483n);
        expect(swapRequest.getMinimumReceive()).toEqual(2_489037n);
    });

});
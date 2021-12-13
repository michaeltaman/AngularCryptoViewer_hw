export class Coin {

  id: string;
  slug: string;
  symbol: string;
  metrics: {
      market_data: {
          price_usd: number
      }
  }
}

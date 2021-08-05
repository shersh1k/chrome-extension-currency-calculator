import { isToday } from 'date-fns';
import { IAbbreviation, IExchangeRate } from 'types';
import { getCacheFromStorage, setCacheToStorage } from 'storage';

export abstract class BaseApi {
  abstract url: string;

  abstract abbreviation: string;

  abstract name: string;

  abstract load(date: Date): Promise<IExchangeRate[]>;

  private async get(date: Date): Promise<IExchangeRate[]> {
    const cachedCurrencys = await this.getCache(date);
    if (cachedCurrencys && cachedCurrencys.length) return cachedCurrencys;

    const newCurrencys = await this.load(date);
    this.setCache(newCurrencys, date);

    return newCurrencys;
  }

  private setCache(currencys: IExchangeRate[], date: Date) {
    // if we load new today`s currencys cache them
    if (isToday(date)) setCacheToStorage({ currencys, loadDate: new Date().getTime(), loadApi: this.abbreviation });
  }

  private async getCache(date: Date) {
    const { currencys, loadDate, loadApi } = await getCacheFromStorage();
    // checking is cached todays currencys by this API and choosed date is today
    if (loadApi === this.abbreviation && currencys && loadDate && isToday(loadDate) && isToday(date)) return currencys;
  }

  public async getExchangeRates(date: Date): Promise<IExchangeRate[]> {
    const data = await this.get(date);

    return data;
  }

  public async getAbbreviations(): Promise<IAbbreviation[]> {
    const data = await this.get(new Date());

    return data.map(({ id, abbreviation, name }) => ({ abbreviation, id, name }));
  }
}

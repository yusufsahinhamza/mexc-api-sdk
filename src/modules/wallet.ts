import { Base } from './base';
import { fromatData } from '../util';

export class Wallet extends Base {
  /**
   * Query the currency information
   *
   * @returns
   */
  public currencyInformation() {
    const res = this.signRequest('GET', '/capital/config/getall');
    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }

  /**
   * Withdraw
   *
   * If "network" is not sent, will return default network in that currency.
   * Can get "network" via currencyInformation's response params "networkList" and check whether is default network by response params "isDefault"
   * Withdraw address only support address which added in withdrawal settings on website.
   *
   * @param coin
   * @param address
   * @param amount
   * @param options
   * ```
   * [options.withdrawOrderId]
   * [options.network]
   * [options.memo]
   * [options.remark]
   * ```
   * @returns
   */
  public withdraw(coin: string, address: string, amount: string, options: any = {}) {
    if ([coin, address, amount].some(str => !str.trim())) {
      console.assert(false, `Some params are required`);
      return;
    }

    const res = this.signRequest('POST', '/capital/withdraw/apply', Object.assign(options, {
      coin: coin.toUpperCase(),
      address: address,
      amount: amount,
    }));
    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }
}

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

  /**
   * Deposit History (supporting network)
   *
   * Ensure that the default timestamp of 'startTime' and 'endTime' does not exceed 90 days.
   *
   * @param options
   * ```
   * [options.coin]
   * [options.status]
   * [options.startTime] - default: 90 days ago from current time
   * [options.endTime] - default:current time
   * [options.limit] - default:1000,max:1000
   * ```
   * @returns
   */
  public depositHistory(options: any = {}) {
    const res = this.signRequest('GET', '/capital/deposit/hisrec', options);
    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }

  /**
   * Withdraw History (supporting network)
   *
   * Supported multiple network coins' withdraw history may not return the 'network' field.
   * Ensure that the default timestamp of 'startTime' and 'endTime' does not exceed 90 days.
   *
   * @param options
   * ```
   * [options.coin]
   * [options.status] - withdraw status
   * [options.limit] - default:1000, max:1000
   * [options.startTime] - default: 90 days ago from current time
   * [options.endTime] - default:current time
   * ```
   * @returns
   */
  public withdrawHistory(options: any = {}) {
    const res = this.signRequest('GET', '/capital/withdraw/history', options);
    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }

  /**
   * Generate deposit address (supporting network)
   *
   * @param coin
   * @param network - deposit network
   *
   * @returns
   */
  public generateDepositAddress(coin: string, network: string) {
    if ([coin, network].some(str => !str.trim())) {
      console.assert(false, `Some params are required`);
      return;
    }

    const res = this.signRequest('POST', '/capital/deposit/address', {
      coin: coin.toUpperCase(),
      network: network.toUpperCase(),
    });
    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }

  /**
   * Deposit Address (supporting network)
   *
   * @param coin
   * @param options
   * ```
   * [options.network] - deposit network
   * ```
   *
   * @returns
   */
  public depositAddress(coin: string, options: any = {}) {
    if ([coin].some(str => !str.trim())) {
      console.assert(false, `Some params are required`);
      return;
    }

    const res = this.signRequest('GET', '/capital/deposit/address', Object.assign(options, {
      coin: coin.toUpperCase(),
    }));
    const rawData = JSON.parse(res.getBody());
    const formatDatas = fromatData(rawData);

    return formatDatas;
  }
}

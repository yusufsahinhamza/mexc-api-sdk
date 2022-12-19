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
}

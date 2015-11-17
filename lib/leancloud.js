/**
 * Leancloud api sdk.
 */
'use strict';

const https = require('https');

class Leancloud {
  /**
   * Constructor
   * @param  {Object} options Config
   * @return {Object}         A instance of Leancloud
   */
  constructor(options) {
    if (typeof options !== 'object') {
      throw new Error('options should be a dict');
    }

    if (!options.hasOwnProperty('appId')) {
      throw new Error('appId is required');
    }

    if (!options.hasOwnProperty('appKey')) {
      throw new Error('appKey is required');
    }

    this.timeout = options.timeout || 10000;
    this.hostname = options.hostname || 'leancloud.cn';
    this.version = options.version || '1.1';
    this.headers = {
      'X-LC-Id': options.appId,
      'X-LC-Key': options.appKey,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Send request.
   * @private
   * @param  {string} api    api name
   * @param  {string} method HTTP method
   * @param  {string} body   Payload
   * @return {object}        A promise
   */
  request(options, body) {
    options.headers['Content-Length'] = Buffer.byteLength(body);
    return new Promise((resolve, reject) => {
      let req = https.request(options, (res) => {
        let bufs = [];
        let length = 0;
        res.setTimeout(this.timeout, () => {
          reject(new Error('recv timeout'));
        });

        res.on('data', (chunk) => {
          bufs.push(chunk);
          length += chunk.length;
        });

        res.once('end', () => {
          let body = Buffer.concat(bufs, length);
          resolve(body.toString());
        });
      });
      req.once('error', (err) => {
        reject(err);
      });
      console.log(body);
      req.write(body);
      req.end();
    });
  }

  /**
   * Generate http request options.
   * @private
   * @param  {String} api    [description]
   * @param  {String} method [description]
   * @return {Object}        [description]
   */
  generateOptions(api, method) {
    let path = `/${this.version}/${api}`;
    let options = {
      hostname: this.hostname,
      method: method,
      path: path,
      headers: this.headers
    };
    return options;
  }

  /**
   * Call leancloud push api.
   * @public
   * @param  {object} data       [description]
   * @param  {string} channel    [description]
   * @param  {object} conditions [description]
   * @return {object}            [description]
   */
  push(data, channel, deviceType, conditions) {
    if (deviceType !== 'ios' && deviceType !== 'android') {
      throw new Error('deviceType must be ios or android');
    }

    conditions = conditions || {};
    let valid = conditions.valid || true;
    let where = {
      'channels': {
        '$in': [channel]
      },
      'valid': true,
      'deviceType': deviceType
    };
    let body = {
      where: where,
      data: data
    };

    let options = this.generateOptions('push', 'POST');
    body = JSON.stringify(body);

    return this.request(options, body).then((rst) => {
      return rst;
    });
  }
}

module.exports = Leancloud;

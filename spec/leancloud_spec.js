/**
 * Leancloud unittest.
 */
'use strict';

const Leancloud = require('../index');

describe('Test Leancloud', () => {
  describe('Test constructor without options', () => {
    it('should pass', () => {
      try {
        new Leancloud();
      } catch (err) {
        let rst = err instanceof Error;
        expect(rst).toBe(true);
      }
    });
  });

  describe('Test constructor without appId', () => {
    it('should pass', () => {
      try {
        new Leancloud({});
      } catch (err) {
        let rst = err instanceof Error;
        expect(rst).toBe(true);
      }
    });
  });

  describe('Test constructor without appKey', () => {
    it('should pass', () => {
      try {
        new Leancloud({appId: 1});
      } catch (err) {
        let rst = err instanceof Error;
        expect(rst).toBe(true);
      }
    });
  });

  describe('Test default timeout is 10000', () => {
    it('should pass', () => {
      let cli = new Leancloud({
        appId: 'test',
        appKey: 'test'
      });
      expect(cli.timeout).toBe(10000);
    });
  });

  describe('Test default hostname is leancloud.cn', () => {
    it('should pass', () => {
      let cli = new Leancloud({
        appId: 'test',
        appKey: 'test'
      });
      expect(cli.hostname).toBe('leancloud.cn');
    });
  });

  describe('Test default version is 1.1', () => {
    it('should pass', () => {
      let cli = new Leancloud({
        appId: 'test',
        appKey: 'test'
      });
      expect(cli.version).toBe('1.1');
    });
  });

  describe('Test leancloud headers', () => {
    it('should pass', () => {
      let cli = new Leancloud({
        appId: 'test',
        appKey: 'test'
      });

      expect(cli.headers.hasOwnProperty('X-LC-Id')).toBe(true);
      expect(cli.headers.hasOwnProperty('X-LC-Key')).toBe(true);
      expect(cli.headers.hasOwnProperty('Content-Type')).toBe(true);
      expect(cli.headers['X-LC-Id']).toBe('test');
      expect(cli.headers['X-LC-Key']).toBe('test');
      expect(cli.headers['Content-Type']).toBe('application/json');
    });
  });

  describe('Test generateOptions', () => {
    it('should pass', () => {
      let cli = new Leancloud({
        appId: 'test',
        appKey: 'test'
      });
      let options = cli.generateOptions('test', 'GET');
      expect(options.method).toBe('GET');
      expect(options.path).toBe('/1.1/test');
    });
  });
});
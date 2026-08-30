import { describe, expect, it } from 'vitest';
import { calculateSubnet, intToIp, ipToInt } from './logic';

describe('Subnetting Logic', () => {
  it('converts IP string to 32-bit integer and back', () => {
    const ip = '192.168.1.1';
    const int = ipToInt(ip);
    expect(int).toBe(3232235777);
    expect(intToIp(int)).toBe(ip);
  });

  it('calculates standard /24 subnet details correctly', () => {
    const result = calculateSubnet('192.168.1.10', 24);
    expect(result).toEqual({
      network: '192.168.1.0',
      broadcast: '192.168.1.255',
      mask: '255.255.255.0',
      hosts: 254,
      range: '192.168.1.1 - 192.168.1.254',
    });
  });

  it('calculates /16 subnet details correctly', () => {
    const result = calculateSubnet('10.0.5.20', 16);
    expect(result).toEqual({
      network: '10.0.0.0',
      broadcast: '10.0.255.255',
      mask: '255.255.0.0',
      hosts: 65534,
      range: '10.0.0.1 - 10.0.255.254',
    });
  });

  it('handles edge case CIDR values /30, /31, /32, and /0', () => {
    const p2pResult = calculateSubnet('192.168.1.0', 31);
    expect(p2pResult?.mask).toBe('255.255.255.254');
    expect(p2pResult?.hosts).toBe(2);

    const hostResult = calculateSubnet('192.168.1.5', 32);
    expect(hostResult?.mask).toBe('255.255.255.255');
    expect(hostResult?.hosts).toBe(1);

    const defaultRoute = calculateSubnet('0.0.0.0', 0);
    expect(defaultRoute?.mask).toBe('0.0.0.0');
    expect(defaultRoute?.network).toBe('0.0.0.0');
  });

  it('returns null for invalid IP inputs or out-of-range octets', () => {
    expect(calculateSubnet('999.999.999.999', 24)).toBeNull();
    expect(calculateSubnet('192.168.1', 24)).toBeNull();
    expect(calculateSubnet('invalid-ip', 24)).toBeNull();
  });
});

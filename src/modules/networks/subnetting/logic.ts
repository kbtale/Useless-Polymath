export interface SubnetCalculation {
  network: string;
  broadcast: string;
  mask: string;
  hosts: number;
  range: string;
}

const toUint32 = (value: number): number => value >>> 0;

export const ipToUint32 = (ip: string): number => {
  return ip.split('.').reduce((accumulatedIp, octetString) => {
    const parsedOctet = parseInt(octetString, 10);
    return toUint32((accumulatedIp << 8) + parsedOctet);
  }, 0);
};

export const uint32ToIp = (uint32Value: number): string => {
  const safeUint32 = toUint32(uint32Value);
  const firstOctet = (safeUint32 >>> 24) & 255;
  const secondOctet = (safeUint32 >>> 16) & 255;
  const thirdOctet = (safeUint32 >>> 8) & 255;
  const fourthOctet = safeUint32 & 255;

  return [firstOctet, secondOctet, thirdOctet, fourthOctet].join('.');
};

// Aliases for backward compatibility
export const ipToInt = ipToUint32;
export const intToIp = uint32ToIp;

export const calculateSubnet = (ip: string, cidr: number): SubnetCalculation | null => {
  if (cidr < 0 || cidr > 32 || !Number.isInteger(cidr)) return null;

  const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipv4Regex.test(ip)) return null;

  const octets = ip.split('.');
  const hasInvalidOctet = octets.some((octetStr) => {
    const octetNumber = parseInt(octetStr, 10);
    return (
      octetNumber < 0 || octetNumber > 255 || (octetStr.length > 1 && octetStr.startsWith('0'))
    );
  });

  if (hasInvalidOctet) {
    return null;
  }

  const ipUint32 = ipToUint32(ip);
  const maskUint32 = cidr === 0 ? 0 : toUint32(-1 << (32 - cidr));

  const networkUint32 = toUint32(ipUint32 & maskUint32);
  const broadcastUint32 = toUint32(networkUint32 | toUint32(~maskUint32));

  const hosts = cidr === 32 ? 1 : cidr === 31 ? 2 : 2 ** (32 - cidr) - 2;
  const usableStartUint32 = cidr >= 31 ? networkUint32 : networkUint32 + 1;
  const usableEndUint32 = cidr >= 31 ? broadcastUint32 : broadcastUint32 - 1;

  return {
    network: uint32ToIp(networkUint32),
    broadcast: uint32ToIp(broadcastUint32),
    mask: uint32ToIp(maskUint32),
    hosts,
    range: `${uint32ToIp(usableStartUint32)} - ${uint32ToIp(usableEndUint32)}`,
  };
};

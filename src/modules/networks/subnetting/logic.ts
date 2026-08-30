export const ipToInt = (ip: string): number => {
  return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet, 10), 0) >>> 0;
};

export const intToIp = (int: number): string => {
  return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
};

export const calculateSubnet = (ip: string, cidr: number) => {
  const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (!ipRegex.test(ip)) return null;

  const octets = ip.split('.');
  if (octets.some((o) => parseInt(o) > 255)) return null;

  const ipInt = ipToInt(ip);
  const maskInt = cidr === 0 ? 0 : ~0 >>> (32 - cidr);

  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | (~maskInt >>> 0)) >>> 0;

  const hosts = cidr === 32 ? 1 : cidr === 31 ? 2 : Math.pow(2, 32 - cidr) - 2;
  const usableStart = cidr >= 31 ? networkInt : networkInt + 1;
  const usableEnd = cidr >= 31 ? broadcastInt : broadcastInt - 1;

  return {
    network: intToIp(networkInt),
    broadcast: intToIp(broadcastInt),
    mask: intToIp(maskInt),
    hosts: hosts,
    range: `${intToIp(usableStart)} - ${intToIp(usableEnd)}`,
  };
};

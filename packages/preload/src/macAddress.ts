const address = require('address');

export function getMacAddress() {
  const macAddress = address.mac(function (err: string, addr: string) {
    return addr;
  });
  return macAddress;
}

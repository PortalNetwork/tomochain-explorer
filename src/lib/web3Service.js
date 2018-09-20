export const getTomoChainProvider = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return 'https://core.tomocoin.io';
    default:
      return 'http://localhost:8545/';
  }
}

export const getTomoChainRegistrarAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return '0x0';
    case '3':
      return '0xb4cc8deec867c8352ec8f86afc945590629ae260';
    default:
      return '0x0';
  }
}

export const getTomoChainRegistryAddress = (networkId = '1') => {
  switch (networkId) {
    case '1':
      return '0x0';
    case '3':
      return '0xdf9e5ce912412ab6af0dd46acff0ffc112bbe36e';
    default:
      return '0x0';
  }
}

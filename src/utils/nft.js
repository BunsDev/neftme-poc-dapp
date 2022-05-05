import Web3 from 'web3';

export const convertToNFTAmount = (amount) => amount * 10 ** 3;

export const convertFromNFTAmount = (amount) => amount * 10 ** -3;

export const convertToETH18 = (amount) => Web3.utils.toBN(String(amount) + '0'.repeat(18));

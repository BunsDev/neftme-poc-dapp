import BigNumber from 'big-number';

export const convertToNFTAmount = (amount) => amount * 10 ** 3;

export const convertToETH18 = (amount) => BigNumber((amount * 10 ** 18));

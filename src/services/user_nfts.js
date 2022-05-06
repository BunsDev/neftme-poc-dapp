export const getCreatedNfts = async (contractMethods, address) => {
  if (!address) return [];

  try {
    return await contractMethods.getNFTsByCreator(address).call();
  } catch (err) {
    // log error
    return [];
  }
};

export const getOwnedNfts = async (contractMethods, address) => {
  if (!address) return [];

  try {
    return await contractMethods.getNFTsByOwner(address).call();
  } catch (err) {
    // log error
    return [];
  }
};

import { configureStore } from '@reduxjs/toolkit';
import { api } from '@features/api';
import { onChainNFT } from '@features/on_chain/nft';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    onChainNFT: onChainNFT.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});

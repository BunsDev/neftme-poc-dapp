import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  nfts: {},
};

export const onChainNFT = createSlice({
  name: 'onChainNFT',
  initialState,
  reducers: {
    initNFTBids: (state, action) => {
      if (!state.nfts[action.payload]) {
        state.nfts[action.payload] = {};
      }
      state.nfts[action.payload] = {
        ...state.nfts[action.payload],
        bids: {
          loading: 'pending',
          data: [],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNFTBids.fulfilled, (state, action) => {
      state.nfts[action.meta.arg.tokenId].bids.loading = 'succeeded';
      const [payload] = action.payload;
      state.nfts[action.meta.arg.tokenId].bids.data = payload;
    });
    builder.addCase(fetchNFTBids.rejected, (state, action) => {
      state.nfts[action.meta.arg.tokenId].bids.loading = 'failed';
    });
  },
});

// Async Thunks
export const fetchNFTBids = createAsyncThunk(
  'onChainNFT/fetchNFTBids',
  (params, thunkAPI) => {
    const onChainNFTstate = thunkAPI.getState().onChainNFT;
    if (!onChainNFTstate.nfts?.[params.tokenId]?.bids || params.forceRefresh) {
      thunkAPI.dispatch(onChainNFT.actions.initNFTBids(params.tokenId));
      return params.contractMethods.getBids(params.tokenId).call();
    }
    return new Promise(null);
  },
);

// Selectors
const sliceState = (state) => state.onChainNFT;

export const selectNFTsBids = createSelector(
  sliceState,
  (state) => state?.nfts || {},
);

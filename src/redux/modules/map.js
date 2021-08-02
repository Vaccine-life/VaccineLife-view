import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
//프로젝트가 대형이 되면 component가 30개 넘게 나와. 어떤 페이지에서 어떤 스테이트가 작동을 안해. 그러면 헷갈리게됨. state값을 store 몰아넣고 유지보수 편하게 하기 위함. 
//미들웨어는 툴킷 임포트하면됨. 



const url = "https://api.odcloud.kr/api/15077756/v1/vaccine-stat?page=1&perPage=10000&serviceKey=g7z%2FjYsaSLHc65MfRAm09lQoXM3RSvq7toXdEiu%2BlYesH2wWNE%2FjrvSfRh%2FtyStEmKU9D4G6Ho6Ia9%2FHNJkITA%3D%3D"

//useState를 여기다가 쓰는 느낌. 그냥 기본값으로 넣는것. set은 없고.
const initialState = {
    map_loading: false,
    mapData: [],
}

export const fetchProducts = createAsyncThunk(
    "map/fetchData",
    async (url) => {
        const response = await axios.get(url);
        const products = response.data;
        return products;
    }
);

const fetchDataSlice = createSlice({
    name: "map",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.map_loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                //state.input = setInput와 같은 넉낌
                state.mapData = action.payload;
            })

    },
});

export const {

} = fetchDataSlice.actions
export default fetchDataSlice.reducer
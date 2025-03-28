import {getAddress} from "../../services/apiGeocoding.js";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";



function getPosition() {
    return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}



export const fetchAddress =createAsyncThunk("user/fetchAddress",async ()=>{

    const positionObj = await getPosition();
    const position = {
        latitude: positionObj.coords.latitude,
        longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    console.log(addressObj)
    return { position, address };

})



const initialState={
    username:'',
    status:'idle',
    position:{},
    address:"",
    error:'',
};



const userSlice=createSlice({
    name: 'user',
    initialState,
    reducers:{
        updateName(state,action){
            state.username = action.payload;
        },
    },

    extraReducers:(builder)=>{
        builder
            .addCase(fetchAddress.pending,(state,action)=>{
                state.status="loading";
            })

            .addCase(fetchAddress.fulfilled,(state,action)=>{
                state.status='idle';
                state.position=action.payload.position;
                state.address=action.payload.address;
            })
            .addCase(fetchAddress.rejected,(state, action)=>{
                state.status='failed';
                state.error='There was a problem getting your address. Make sure everything is right!';
            })

    }

});

export const {updateName}=userSlice.actions;

 export default userSlice.reducer;
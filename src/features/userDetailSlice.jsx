import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const createUser = createAsyncThunk("createUser", async(data,{rejectWithValue}) => {
    
   try{
    const response = await fetch("https://68510bab8612b47a2c085e72.mockapi.io/crud",{
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }

});

//read action
export const showUser = createAsyncThunk("showUser", async(_ ,{rejectWithValue})=>{
  const response = await fetch("https://68510bab8612b47a2c085e72.mockapi.io/crud");
  try{
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
})

//delete action
export const deleteUser = createAsyncThunk("deleteUser", async(id ,{rejectWithValue})=>{
  const response = await fetch(`https://68510bab8612b47a2c085e72.mockapi.io/crud/${id}`,
    {method: "DELETE"}
  );
  try{
    const result = await response.json();
    return result;
  }
  catch(error){
    return rejectWithValue(error);
  }
});
 
//Update Action
export const updateUser = createAsyncThunk("updateUser", async(data,{rejectWithValue}) => {
    
   try{
    const response = await fetch(`https://68510bab8612b47a2c085e72.mockapi.io/crud/${data.id}`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();
        return result;
    }catch(error){
        return rejectWithValue(error);
    }

});

const userDetail = createSlice({
    name: 'userDetail',
    initialState: {
        users: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
  builder
    .addCase(createUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    })
    .addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(showUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(showUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    })
    .addCase(showUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteUser.fulfilled, (state, action) => {
      state.loading = false;
      const {id} = action.payload;
      if(id){
        state.users = state.users.filter((ele)=> ele.id !== id)
      }
    })
    .addCase(deleteUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUser.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.users = state.users.map((ele) => (
        ele.id === action.payload.id ? action.payload : ele 
      ))
    })
    .addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
},

});

export default userDetail.reducer;
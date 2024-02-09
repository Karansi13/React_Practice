import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//Get all user action
export const getAllUser = createAsyncThunk(
  "getUsers",
  async (args, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue("Opps found an error", err.response.data);
    }
  }
);

//get single user
export const getSingleUser = createAsyncThunk(
  "getSingleUser",
  async (id, { rejectWithValue }) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );

    try {
      const result = await response.json();
      return result;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
//create action
export const createUser = createAsyncThunk(
  "createUser",
  async (data, { rejectWithValue }) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
);

//delete single user
export const deleteUser = createAsyncThunk(
  "deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      const result = await response.json();
      return result;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.response.data);
    }
  }
);

//update user
export const updateUser = createAsyncThunk(
  "updateUser",
  async ({ id, name, email, age, gender }, { rejectWithValue }) => {  

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, age, gender }),
        }
      );
      const result = await response.json();     
      return result;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const gitUser = createSlice({
  name: "gitUser",
  initialState: {
    users: [],
    loading: false,
    error: null,
    searchData: [],
  },
  reducers: {
    searchUser: (state, action) => {
      state.searchData = action.payload;
    },
  },
  extraReducers: {
    [getAllUser.pending]: (state) => {
      state.loading = true;
    },
    [getAllUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleUser = [];
      state.users = action.payload;
    },
    [getAllUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { id } = action.payload;
      if (id) {
        state.users = state.users.filter((post) => post.id !== id);
      }
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [getSingleUser.pending]: (state) => {
      state.loading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.singleUser = [action.payload];
    },
    [getSingleUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      console.log("updated user fulfilled", action.payload);
      state.loading = false;
      state.users = state.users.map((ele) =>
        ele.id === action.payload.id ? action.payload : ele
      );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;    
      state.error = action.payload.message;
    },
  },
});

export const { searchUser } = gitUser.actions;
export default gitUser.reducer;
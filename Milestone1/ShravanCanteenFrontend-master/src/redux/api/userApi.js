import { createAsyncThunk } from "@reduxjs/toolkit";

const baseURL = process.env.REACT_APP_BASE_URL;

const authenticate = createAsyncThunk("authUser", async () => {
    try {
        const res = await fetch(`${baseURL}/user/auth`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:'include'
        });
        return await res.json();
    } catch (err) {
        console.log(`an error in authenticating user:${err}`);
        return {authenticate:false};
    }
});

const userLogout = createAsyncThunk("logout", async () => {
    try {
        const res = await fetch(`${baseURL}/user/logout`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:'include'
        });
        return await res.json();
    } catch (err) {
        console.log(`an error in authenticating user:${err}`);
    }
});

const getUserProfile = createAsyncThunk("userProfile", async () => {
    try {
        const res = await fetch(`${baseURL}/user/profile`,{
            method:"GET",
            headers:{"Content-Type":"application/json"},
            credentials:'include'
        });
        return await res.json();
    } catch (err) {
        console.log(`an error in authenticating user:${err}`);
        return { data:{},authenticate:false};
    }
});

const changeAvatar = createAsyncThunk("changeAvatar", async (data) => {
    try {
        const res = await fetch(`${baseURL}/user/profile/avatar`,{
            method:"PATCH",
            credentials:'include',
            body:data
        });
        if(res.status === 201) return await res.json();
        else throw new Error("Server error");
    } catch (err) {
        console.log(`an error in changing user profile pic:${err}`);
        return { avatar:"",authenticate:""};
    }
});

const purchaseCoins = createAsyncThunk("purchaseCoins", async (amount) => {
    try {
        const res = await fetch(`${baseURL}/wallet`,{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            credentials:'include',
            body:JSON.stringify({amount})
        });
        return await res.json();
    } catch (err) {
        console.log(`an error in authenticating user:${err}`);
    }
});

export { authenticate,userLogout,getUserProfile,changeAvatar,purchaseCoins };

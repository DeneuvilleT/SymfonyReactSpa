import { loadStripe } from '@stripe/stripe-js';

// export const URL = "https://back-server.online";
// export const URL_LOCAL = "https://chocolate-bar.site";

// export const URL = "http://localhost:9000";
// export const URL_LOCAL = "http://localhost:3000";


export const valueOk = /(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.*[^A-Za-z0-9])+(?=.{8,})/;

let id = null;
export const notification = (setMsg, msg) => {
   clearTimeout(id);
   setMsg('');
   setMsg(msg);
   id = window.setTimeout(() => {
      clearTimeout(id)
      setMsg('');
   }, 5000);
};


export const pagination = (array, max, setNewArray) => {
   const tempArr = [];

   for (let i = 0; i < array.length; i = i + max) {
      const slice = array.slice(i, i + max);
      tempArr.push(slice);
   };
   return setNewArray(data => [...data, ...tempArr]);
};
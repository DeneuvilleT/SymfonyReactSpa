export const valueOk = /(?=.*[a-z])+(?=.*[A-Z])+(?=.*[0-9])+(?=.*[^A-Za-z0-9])+(?=.{8,})/;

export const pagination = (array, max, setNewArray) => {
   const tempArr = [];

   for (let i = 0; i < array.length; i = i + max) {
      const slice = array.slice(i, i + max);
      tempArr.push(slice);
   };
   return setNewArray(data => [...data, ...tempArr]);
};

export const creaDomElem = (elem, attribut = undefined, value = undefined, content = undefined) => {
   const elementDom = document.createElement(elem);

   if (attribut !== undefined && value !== undefined) elementDom.setAttribute(attribut, value);

   if (content !== undefined) elementDom.innerHTML = content;

   return elementDom;
};

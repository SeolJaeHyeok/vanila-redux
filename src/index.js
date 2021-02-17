import { createStore } from "redux";

const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

// createStore의 reducer => 유일하게 data를 modify 할 수 있음
// 그렇다면 어떻게 수정하느냐 => actions를 통해 data modify 가능
const countModifier = (count = 0) => {
  return count;
};

const countStore = createStore(countModifier);

console.log(countStore.getState());

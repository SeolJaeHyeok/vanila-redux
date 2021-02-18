import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // state를 변형(mutate)하는 것이 아니라 ex)state.push() 새로운 state를 return 해야만 한다. 새로운 state를 이전의 state와 새로운 toDo를 가짐
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return [];
    default:
      return state;
  }
};

const store = createStore(reducer);

store.subscribe(() => {
  console.log(store.getState());
});

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  // dispatch를 통해 reducer와 communicate
  // type과 text 사용
  store.dispatch({ type: ADD_TODO, text: toDo });
};

form.addEventListener("submit", onSubmit);

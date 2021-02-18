import { createStore } from "redux";

const form = document.querySelector("form");
const input = document.querySelector("input");
const ul = document.querySelector("ul");

const ADD_TODO = "ADD_TODO";
const DELETE_TODO = "DELETE_TODO";

// Action의 함수화 보통 reducer 위에 위치
const addToDoAction = (text) => {
  return { type: ADD_TODO, text };
};

const deleteToDoAction = (id) => {
  return { type: DELETE_TODO, id };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      // state를 변형(mutate)하는 것이 아니라 ex)state.push() 새로운 state를 return 해야만 한다. 새로운 state를 이전의 state와 새로운 toDo를 가짐
      return [{ text: action.text, id: Date.now() }, ...state];
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

const addToDo = (text) => {
  // dispatch를 통해 reducer와 communicate
  // type과 text 사용
  store.dispatch(addToDoAction(text));
};

const deleteToDo = (event) => {
  const id = event.target.parentNode.id;
  store.dispatch(deleteToDoAction(id));
};

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach((toDo) => {
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    delBtn.innerText = "DEL";
    delBtn.addEventListener("click", deleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(delBtn);
    ul.appendChild(li);
  });
};

store.subscribe(paintToDos);

const onSubmit = (event) => {
  event.preventDefault();
  const toDo = input.value;
  input.value = "";
  addToDo(toDo);
};

form.addEventListener("submit", onSubmit);

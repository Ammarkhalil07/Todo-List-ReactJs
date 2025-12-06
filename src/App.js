import "./App.css";
import TodoList from "./components/TodoList";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TodosContext } from "./contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const theme = createTheme({
  typography: {
    fontFamily: ["Alexandria"],
  },

  palette: {
    primary: {
      main: "#dd2c00",
    },
  },
});

const initialTodos = [
  {
    id: uuidv4(),
    title: "قراءه كتاب",
    details: "كتاب الاطفال الذي احبه",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءه الابطال",
    details: "كتاب الابطال الذي احبه",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "قراءه الملعب",
    details: "كتاب الرياضه",
    isCompleted: false,
  },
];

function App() {
  const [todos, SetTodos] = useState(initialTodos);
  return (
    <ThemeProvider theme={theme}>
      <div
        className="App"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "grey",
          height: "100vh",
          direction: "rtl",
        }}
      >
        <TodosContext.Provider value={{ todos, SetTodos }}>
          <TodoList />
        </TodosContext.Provider>
      </div>
    </ThemeProvider>
  );
}

export default App;

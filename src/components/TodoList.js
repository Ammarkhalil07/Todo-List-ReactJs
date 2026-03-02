import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useState, useContext, useEffect, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { TodosContext } from "../contexts/todosContext";

export default function TodoList() {
  const { todos, SetTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");

  // ✅ Safe memoized filters
  const completedTodos = useMemo(
    () => todos.filter((t) => t.isCompleted),
    [todos]
  );

  const notCompletedTodos = useMemo(
    () => todos.filter((t) => !t.isCompleted),
    [todos]
  );

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  }

  const todosJsx = todosToBeRendered.map((t) => (
    <Todo key={t.id} todo={t} />
  ));

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };

    const updatedTodos = [...todos, newTodo];
    SetTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  // ✅ Safe localStorage load
  useEffect(() => {
    const storageTodos = JSON.parse(localStorage.getItem("todos")) || [];
    SetTodos(storageTodos);
  }, []);

  function changeDisplayType(_, value) {
    if (value !== null) {
      setDisplayedTodosType(value);
    }
  }

  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275, maxHeight: "80vh", overflow: "scroll" }}>
        <CardContent>
          <Typography style={{ fontSize: "30px" }} variant="h3">
            مهامي
          </Typography>

          <Divider sx={{ mt: 2 }} />

          <ToggleButtonGroup
            sx={{ mt: 2, direction: "ltr" }}
            color="primary"
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayType}
          >
            <ToggleButton value="all">الكل</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
          </ToggleButtonGroup>

          {todosJsx}

          <Grid container sx={{ mt: 2 }} spacing={2}>
            <Grid item xs={8}>
              <TextField
                fullWidth
                label="عنوان المهمة"
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
              />
            </Grid>

            <Grid item xs={4}>
              <Button
                fullWidth
                variant="contained"
                disabled={!titleInput}
                onClick={handleAddClick}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}
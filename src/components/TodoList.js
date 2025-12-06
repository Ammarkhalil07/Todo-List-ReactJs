import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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

  const completedTodos = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedTodos = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  let todosToBeRendered = todos;

  if (displayedTodosType === "completed") {
    todosToBeRendered = completedTodos;
  } else if (displayedTodosType === "non-completed") {
    todosToBeRendered = notCompletedTodos;
  } else {
    todosToBeRendered = todos;
  }

  const todosJsx = todosToBeRendered.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

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

  useEffect(() => {
    //console.log("calling UseEffect");
    const storageTodos = JSON.parse(localStorage.getItem("todos"));
    SetTodos(storageTodos);
  }, []);

  function changeDisplayType(e) {
    setDisplayedTodosType(e.target.value);
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{ maxHeight: "80vh", overflow: "scroll" }}
      >
        <CardContent>
          <Typography style={{ fontSize: "30px" }} variant="h3">
            مهامي
          </Typography>
          <Divider style={{ marginTop: "15px" }} />
          {/* toggle icons */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "10px" }}
            color="primary"
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayType}
            aria-label="Platform"
            color="primary"
          >
            <ToggleButton value="all">الكل</ToggleButton>
            <ToggleButton value="completed">منجز</ToggleButton>
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
          </ToggleButtonGroup>

          {/* all TODOS */}

          {todosJsx}

          {/* Input + ADD button  */}

          <Grid container style={{ marginTop: "10px" }} spacing={2}>
            <Grid size={8} display="flex" justifyContent="space-around">
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid
              size={4}
              display="flex"
              alignItems="center"
              justifyContent="space-around"
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length === 0}
              >
                إضافه
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
}

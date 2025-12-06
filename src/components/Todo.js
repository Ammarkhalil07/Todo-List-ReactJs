import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
import TextField from "@mui/material/TextField";

//dialoge
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function Todo({ todo, handleCheck }) {
  const [showDeleteDialog, setshowDeleteDialog] = useState(false);
  const [showEditDialog, setshowEditDialog] = useState(false);
  const [EditDialog, setEditDialog] = useState({});
  const { todos, SetTodos } = useContext(TodosContext);

  //EVENT HANDLERS
  function handleClickCheck() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        t.isCompleted = !todo.isCompleted;
      }
      return t;
    });
    SetTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setshowDeleteDialog(true);
  }

  function handleDeleteClose() {
    setshowDeleteDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id !== todo.id;
    });
    SetTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleEditClick() {
    setshowEditDialog(true);
  }
  function handleEditClose() {
    setshowEditDialog(false);
  }
  function handleEditConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id === todo.id) {
        return {
          ...t,
          title: EditDialog.title,
          details: EditDialog.details,
        };
      } else {
        return t;
      }
    });
    SetTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setshowEditDialog(false);
  }
  return (
    <>
      <Dialog
        style={{ direction: "rtl" }}
        open={showDeleteDialog}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {" هل متأكد من رغبتك بالحذف؟"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لا يمكنك التراجع عن الحذف بعد حذف العنصر
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>تجاهل</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم، قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        style={{ direction: "rtl" }}
        open={showEditDialog}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"تعديل المهمه"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="العنوان"
            type="email"
            fullWidth
            variant="standard"
            value={EditDialog.title}
            onChange={(e) => {
              setEditDialog({ ...EditDialog, title: e.target.value });
            }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="التفاصيل"
            type="email"
            fullWidth
            variant="standard"
            value={EditDialog.details}
            onChange={(e) => {
              setEditDialog({ ...EditDialog, details: e.target.value });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>إغلاق</Button>
          <Button autoFocus onClick={handleEditConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              display="flex"
              spacing={2}
              justifyContent="space-around"
              alignItems="center"
            >
              <Grid size={8}>
                {" "}
                <Typography variant="h5" sx={{ textAlign: "right" }}>
                  {todo.title}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ fontSize: "15px" }}
                  sx={{ textAlign: "right" }}
                >
                  {todo.details}
                </Typography>
              </Grid>
              <Grid xs={4} display="flex" justifyContent="space-around">
                <IconButton
                  style={{
                    background: "white",
                    color: "grey",
                    border: "solid grey 3px",
                  }}
                  aria-label="Create"
                  onClick={handleEditClick}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  style={{
                    background: "white",
                    color: "red",
                    border: "solid red 3px",
                  }}
                  aria-label="delete"
                  onClick={handleDeleteClick}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  style={{
                    background: todo.isCompleted ? "#8bc34a" : "white",
                    color: todo.isCompleted ? "white" : "#8bc34a",
                    border: "solid #8bc34a 3px",
                  }}
                  aria-label="edit"
                  onClick={() => {
                    handleClickCheck();
                  }}
                >
                  <TaskAltIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

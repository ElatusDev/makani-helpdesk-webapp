import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box, Container, Grid2, TextField, List, ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import { CalendarToday, Delete } from '@mui/icons-material';
import Calendar from 'react-calendar';
import useStyles from "./Styles";
import { Value } from 'react-calendar/dist/cjs/shared/types';
import 'react-calendar/dist/Calendar.css';
import { RootState } from '../../app/store';
import { setTodoText, addTodo, toggleTodo, deleteTodo } from './TodoSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.todos);
  const todoText = useSelector((state: RootState) => state.todos.todoText);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [date, setDate] = useState<Value>(new Date());

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (): void => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    // Simulate search results
    const results = query ? ["Result 1", "Result 2", "Result 3"] : [];
    setSearchResults(results);
  };

  const handleDateChange = (value: Value): void => {
    setDate(value);
  };

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setTodoText(event.target.value));
  };

  const handleAddTodo = (): void => {
    dispatch(addTodo());
  };

  const handleToggleTodo = (id: number): void => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number): void => {
    dispatch(deleteTodo(id));
  };


  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Makani
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button color="inherit">Anuncios</Button>
          <Button color="inherit" onClick={handleMenuClick}>Altas</Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Alumno</MenuItem>
            <MenuItem onClick={handleMenuClose}>Clase</MenuItem>
            <MenuItem onClick={handleMenuClose}>Reportes</MenuItem>
          </Menu>
          <Button color="inherit">Iniciar Sesion</Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="md">
        <Box className={classes.heroContent}>
          <Grid2 container spacing={2} justifyContent="center">
            <Grid2 size={8}>
              <Box p={3} border={1} borderRadius={2} textAlign="center" style={{ height: '500px' }}>
                <CalendarToday fontSize="large" />
                <Typography variant="h6">Calendario de Actividades</Typography>
                <Calendar
                  onChange={handleDateChange}
                  value={date}
                  locale="es-ES"
                />
              </Box>
            </Grid2>
            <Grid2 size={4}>
              <Box p={3} border={1} borderRadius={2} textAlign="center" style={{ height: '500px' }}>
                <Typography variant="h6">Pendientes</Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="no olvidarse de"
                  value={todoText}
                  onChange={handleTodoChange}
                  onKeyUp={(event) => {
                    if (event.key === 'Enter') {
                      handleAddTodo();
                    }
                  }}
                />
                <List style={{ maxHeight: '400px', overflow: 'auto' }}>
                  {todos.map(todo => (
                    <ListItem onClick={() => handleToggleTodo(todo.id)}>
                      <Checkbox
                        checked={todo.completed}
                        tabIndex={-1}
                        disableRipple
                      />
                      <ListItemText primary={todo.text} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(todo.id)}>
                        <Delete />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Grid2>
          </Grid2>
        </Box>
        <Box mt={4}>
          <Typography variant="h5" component="h2" align="center" className={classes.title}>
            Busca Ayuda
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Intorduce tu pregunta"
            className={classes.searchField}
            onChange={handleSearchChange}
          />
          <List>
            {searchResults.map((result, index) => (
              <ListItem key={index}>
                <ListItemText primary={result} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </div>
  );
};

export default Home;
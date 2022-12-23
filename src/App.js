import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import ListOfTask from "./components/listOfTask";
import ListAdd from "./components/ListAdd";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";

function App() {
  const toast = useToast();
  const [tasks, setTasks] = useState(
    () => JSON.parse(localStorage.getItem("tasks")) || []
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function deleteTask(id) {
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  }

  function deleteTaskAll() {
    setTasks([]);
  }

  function checkTask(id) {
    const newTasksCheck = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.check = !task.check;
      }
      return task;
    });
    setTasks(newTasksCheck);
  }

  function updateTask(id, body, onClose) {
    const info = body.trim();

    if (!info) {
      toast({
        title: "Enter your task",
        position: "top",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }

    const newTasksUpdate = tasks.map((task, index, array) => {
      if (task.id === id) {
        task.body = body;
        task.check = false;
      }
      return task;
    });

    setTasks(newTasksUpdate);

    onClose();
  }

  function addTask(task) {
    setTasks([...tasks, task]);
  }

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p={4} minH='100vh' pb={28}>

      <IconButton
        icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
        isRound='true'
        size='lg'
        alignSelf='flex-end'
        onClick={toggleColorMode}
         aria-label='toogle-dark-mode'
      />

      <Heading
        p='3'
        fontWeight='extrabold'
        size='2xl'
        bgGradient='linear(to-r, red.400, yellow.700)'
        bgClip='text'
      >
        Todo lists
      </Heading>

      <ListAdd addTask={addTask} />

      <ListOfTask
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
        checkTask={checkTask}
      />

    </VStack>
  );
}

export default App;

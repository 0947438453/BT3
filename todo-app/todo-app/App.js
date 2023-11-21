import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Switch,
  StyleSheet,
} from "react-native";

const App = () => {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTask = () => {
    if (task) {
      const newTask = { text: task, done: false, category: category || "Uncategorized" };
      setTasks([...tasks, newTask]);
      setTask("");
      setCategory("");
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleToggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const renderFilteredTasks = () => {
    let filteredTasks = tasks;

    if (searchQuery !== "") {
      filteredTasks = tasks.filter(
        (task) =>
          task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
          task.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filteredTasks;
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.taskContainer}>
      <View style={styles.task}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Switch
            value={item.done}
            onValueChange={() => handleToggleDone(index)}
          />
          <Text
            style={[
              styles.itemList,
              { textDecorationLine: item.done ? "line-through" : "none" },
            ]}
          >
            {item.text}
          </Text>
        </View>
        <View style={styles.taskButtons}>
          <TouchableOpacity onPress={() => handleDeleteTask(index)}>
            <Text style={styles.deleteButton}>❌</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.categoryText}>Phân loại: {item.category}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>WELCOME</Text>
      <Text style={styles.title}>ToDoList</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập công việc"
        value={task}
        onChangeText={(text) => setTask(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập phân loại"
        value={category}
        onChangeText={(text) => setCategory(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
        <Text style={styles.addButtonText}>Thêm</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="🔍Tìm kiếm"
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />
      <FlatList
        data={renderFilteredTasks()}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    padding: 40,
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  heading: {
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 7,
    color: "green",
    textAlign: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  taskContainer: {
    borderWidth: 2,
    borderColor: 'black',
    backgroundColor: '#DDE6ED',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemList: {
    fontSize: 19,
    marginLeft: 30,
  },
  taskButtons: {
    flexDirection: "row",
  },
  deleteButton: {
    color: "red",
    fontWeight: "bold",
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    width: 90,
    marginLeft: '35%',
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
  },
  categoryText: {
    marginTop: 5,
    color: "#555",
    fontSize: 16,
  },
});

export default App;

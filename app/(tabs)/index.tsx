import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Platform } from "react-native";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask("");
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text>{item.text}</Text>
            <TouchableOpacity onPress={() => removeTask(item.id)}>
              <Text style={styles.deleteText}>❌</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 50 : 20, // Adjust padding for iOS and Android
    backgroundColor: "#f8f8f8",
  },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10, textAlign: "center" }, // Increased font size
  input: { 
    borderWidth: 1, 
    padding: 10, 
    marginBottom: 10, 
    borderRadius: 5, 
    backgroundColor: "#fff" // White background for input
  },
  taskContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    padding: 10, 
    backgroundColor: "#fff", 
    marginVertical: 5, 
    borderRadius: 5,
    shadowColor: '#000', // Adding shadow for better appearance
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3, // Shadow effect for Android
  },
  deleteText: { color: "red", fontWeight: "bold" },
});

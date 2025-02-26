import { useState } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";

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
      <Button title="Add Task" onPress={addTask} color="#4CAF50" />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.taskText}>{item.text}</Text>
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
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#f8f8f8" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, padding: 12, marginBottom: 10, borderRadius: 5, backgroundColor: '#fff' },
  taskContainer: { flexDirection: "row", justifyContent: "space-between", padding: 12, backgroundColor: "#fff", marginVertical: 8, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 2 },
  taskText: { fontSize: 16, color: "#333" },
  deleteText: { color: "red", fontWeight: "bold" },
});

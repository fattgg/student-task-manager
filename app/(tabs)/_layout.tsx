import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [taskDeadline, setTaskDeadline] = useState(null);
  const [priority, setPriority] = useState("Medium");
  const [searchQuery, setSearchQuery] = useState("");

  const loadTasks = async () => {
    try {
      const tasksFromStorage = await AsyncStorage.getItem("tasks");
      if (tasksFromStorage) {
        setTasks(JSON.parse(tasksFromStorage));
      }
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Error saving tasks:", error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setTaskDeadline(date);
    hideDatePicker();
  };

  const addTask = () => {
    if (task.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: task, deadline: taskDeadline, priority, completed: false },
      ]);
      setTask("");
      setTaskDeadline(null);
    }
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const setTaskPriority = (id, priority) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, priority } : task
    ));
  };

  const sortByDeadline = () => {
    const sorted = [...tasks].sort((a, b) => a.deadline - b.deadline);
    setTasks(sorted);
  };

  const removeAllTasks = () => {
    setTasks([]);
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [tasks]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Task Manager</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task..."
        value={task}
        onChangeText={setTask}
      />
      <View style={styles.buttonContainer}>
        <Button title="Set Deadline" onPress={showDatePicker} />
        <Button title="Add Task" onPress={addTask} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sort by Deadline" onPress={sortByDeadline} />
        <Button title="Delete All Tasks" onPress={removeAllTasks} />
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <TextInput
        style={styles.input}
        placeholder="Search tasks..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View>
              <Text>{item.text}</Text>
              {item.deadline && <Text>Deadline: {item.deadline.toLocaleString()}</Text>}
              <Text>Priority: {item.priority}</Text>
            </View>
            <View style={styles.priorityButtons}>
              <TouchableOpacity onPress={() => setTaskPriority(item.id, "High")}>
                <Text style={styles.highPriority}>🔥 High</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTaskPriority(item.id, "Medium")}>
                <Text style={styles.mediumPriority}>⚡ Medium</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setTaskPriority(item.id, "Low")}>
                <Text style={styles.lowPriority}>✅ Low</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => removeTask(item.id)}>
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#f8f8f8" },
  heading: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 },
  taskContainer: { padding: 15, backgroundColor: "#fff", marginVertical: 8, borderRadius: 5 },
  priorityButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
  highPriority: { color: "red", fontWeight: "bold" },
  mediumPriority: { color: "orange", fontWeight: "bold" },
  lowPriority: { color: "green", fontWeight: "bold" },
  deleteText: { color: "red", fontWeight: "bold" },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }
});


import TodoList from "./TodoList";
import './styles.css';


const App = () => {
  return (
    <div className="task-list">
      <h1>My Agenda</h1>
      <TodoList />
    </div>
  );
};

export default App;
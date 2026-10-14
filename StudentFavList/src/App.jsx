import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { StudentProvider, useStudents } from "./studentContext";
import "./index.css";

function StudentList() {
  const { students, favourites, addFavourite } = useStudents();

  return (
    <div className="container">
      <h2>Student List</h2>

      <div className="student-list">
        {students.map((student) => {
          const alreadyAdded = favourites.find(
            (item) => item.id === student.id
          );

          return (
            <div className="student-card" key={student.id}>
              <h3>{student.name}</h3>

              <p>Roll Number: {student.rollNumber}</p>

              <button
                onClick={() => addFavourite(student)}
                disabled={alreadyAdded}
              >
                {alreadyAdded ? "Added to Favourite" : "Add to Favourite"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function FavouriteStudents() {
  const { favourites, removeFavourite } = useStudents();

  return (
    <div className="container">
      <h2>Favourite Students</h2>

      {favourites.length === 0 ? (
        <p className="empty-message">
          No favourite students added yet.
        </p>
      ) : (
        <div className="student-list">
          {favourites.map((student) => (
            <div className="student-card" key={student.id}>
              <h3>{student.name}</h3>

              <p>Roll Number: {student.rollNumber}</p>

              <button
                className="remove-button"
                onClick={() => removeFavourite(student.id)}
              >
                Remove Favourite
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <StudentProvider>
      <BrowserRouter>
        <nav className="navbar">
          <h2>Student App</h2>

          <div className="nav-links">
            <Link to="/">Student List</Link>
            <Link to="/favourites">Favourite Students</Link>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route
            path="/favourites"
            element={<FavouriteStudents />}
          />
        </Routes>
      </BrowserRouter>
    </StudentProvider>
  );
}

export default App;

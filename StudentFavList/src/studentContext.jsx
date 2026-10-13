import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

const students = [
  { id: 1, name: "Arun", rollNumber: "101" },
  { id: 2, name: "Priya", rollNumber: "102" },
  { id: 3, name: "Karthik", rollNumber: "103" },
  { id: 4, name: "Divya", rollNumber: "104" },
  { id: 5, name: "Rahul", rollNumber: "105" },
  { id: 6, name: "Sneha", rollNumber: "106" }
];

export function StudentProvider({ children }) {
  const [favourites, setFavourites] = useState([]);

  function addFavourite(student) {
    const alreadyAdded = favourites.find(
      (item) => item.id === student.id
    );

    if (!alreadyAdded) {
      setFavourites([...favourites, student]);
    }
  }

  function removeFavourite(id) {
    const updatedFavourites = favourites.filter(
      (student) => student.id !== id
    );

    setFavourites(updatedFavourites);
  }

  return (
    <StudentContext.Provider
      value={{
        students,
        favourites,
        addFavourite,
        removeFavourite
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentContext);
}

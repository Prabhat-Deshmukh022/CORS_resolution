import React, { useState, useEffect } from "react";

function JSONDisplay() {
  const [jsonData, setJsonData] = useState(null);
  const [newId, setNewId] = useState("");
  const [newName, setNewName] = useState("");

  useEffect(() => {
    Send();
  }, []);

  async function Send() {
    try {
      const response = await fetch("http://localhost:8000/fake");
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error("Error fetching JSON:", error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/fake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newId, newName }), // Simplified
      });

      await fetch("http://localhost:5000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newId: newId, newName: newName }),
      });

      // Clear input fields after successful submission
      setNewId("");
      setNewName("");
      // Fetch JSON data again to update display (optional)
      Send();
    } catch (err) {
      console.log("ERROR ", err);
    }
  }

  return (
    <div>
      <h1>JSON Display</h1>
      {/* Check if jsonData is defined before accessing its properties */}
      {jsonData && (
        <div>
          <p>ID: {jsonData.id}</p>
          <p>Name: {jsonData.name}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          ID:
          <input
            type="text"
            name="newId"
            value={newId}
            onChange={(e) => setNewId(e.target.value)}
            placeholder="Enter new ID"
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="newName"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter new name"
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default JSONDisplay;

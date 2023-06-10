import React, { useState, useEffect } from "react";
import CreateOrJoinGame from "./components/CreateOrJoinGame";

function App() {
  return (
    <main className="mx-auto max-w-4xl pt-12">
      <div className="p-1">
        <CreateOrJoinGame />
      </div>
    </main>
  );
}

export default App;

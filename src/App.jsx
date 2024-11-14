import React, { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoSelectedProject from "./components/NoSelectedProject";

function App() {
  const [projectSate, setProjectState] = useState({
    slectedProjectId: undefined,
    projects: [],
  });
  let content;

  function handleAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        slectedProjectId: null,
      };
    })
  }

  function handleProject(projectData) {
    setProjectState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random(),
      }

      return {
        ...prevState,
        projects: [...prevState.projects, newProject]
      }
    }
    )
  }

  console.log(projectSate);

  if (projectSate.slectedProjectId === null) {
    content = <NewProject onAddProject={handleProject} />
  } else if (projectSate.slectedProjectId === undefined) {
    content = <NoSelectedProject onAddProject={handleAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar onAddProject={handleAddProject} />
      {content}
    </main>
  );
}

export default App;

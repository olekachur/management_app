import React, { useState } from "react";
import ProjectsSidebar from "./components/ProjectsSidebar";
import NewProject from "./components/NewProject";
import NoSelectedProject from "./components/NoSelectedProject";
import SelectedProjects from "./components/SelectedProjects";

function App() {
  const [projectSate, setProjectState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectState((prevState) => {
      const taskId = Math.random();
      const newTask = {
        text: text,
        projectId: prevState.selectedProjectId,
        id: taskId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    })
  }

  function handleDeleteTask(id) {
    setProjectState((prevState) => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter(
          (task) => task.id !== id
        )
      };
    })
  }

  function handleSelectProject(id) {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      };
    })
  }

  function handleAddProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      };
    })
  }

  function handleCancelProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
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
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      }
    }
    )
  }

  function handleDeleteProject() {
    setProjectState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter(
          (project) => project.id !== prevState.selectedProjectId
        )
      };
    })
  }

  const selectedProject = projectSate.projects.find(project => project.id === projectSate.selectedProjectId);

  let content = (
    <SelectedProjects
      project={selectedProject}
      onDelete={handleDeleteProject}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
      tasks={projectSate.tasks}
    />);

  if (projectSate.selectedProjectId === null) {
    content = <NewProject onAddProject={handleProject} onCancel={handleCancelProject} />
  } else if (projectSate.selectedProjectId === undefined) {
    content = <NoSelectedProject onAddProject={handleAddProject} />
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <ProjectsSidebar
        onAddProject={handleAddProject}
        projects={projectSate.projects}
        onSelectProject={handleSelectProject}
        selectedProjectId={projectSate.selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;

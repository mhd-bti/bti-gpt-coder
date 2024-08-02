import React, { useState } from 'react';

// import from each directory in "src" directory.
// import Alcanoid from './alcanoid/App';
// import HelloWorld from './hello/App';
// import UseEffectorNot from './useffectornot/App'
// import Test from './test/App';
// import Test2 from './test2/App';
// import Test3 from './test3/App';
// import Picros from './picros/App';
import Demo from './demo/App';
import Countdown from './countdown/App';
import Mini_demo from './mini_demo/App'; // ### IMPORT AFTER HERE ###

const App = () => {
  const [selectedProject, setSelectedProject] = useState("");

  const projects = [
    // projectCode is the name of the directory in "src" directory.
    { projectCode: "", projectName: "選択してください", component: null },
    // { projectCode: "alcanoid", projectName: "ブロック崩しゲーム", component: <Alcanoid /> },
    // { projectCode: "hello", projectName: "Hello World", component: <HelloWorld /> },
    // { projectCode: "useeffectornot", projectName: "useEffectornot", component: <UseEffectorNot /> },
    // { projectCode: "test", projectName: "test", component: <Test /> },
    // { projectCode: "test2", projectName: "test2", component: <Test2 /> },
    // { projectCode: "test3", projectName: "test3", component: <Test3 /> },
    // { projectCode: "picros", projectName: "picros", component: <Picros /> },
    { projectCode: "demo", projectName: "demo", component: <Demo /> },
    { projectCode: "countdown", projectName: "countdown", component: <Countdown /> },
    { projectCode: "mini_demo", projectName: "mini_demo", component: <Mini_demo /> } // ### COMPONENT AFTER HERE ###
  ];

  return (
    <>
      <select value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
        {projects.map((project) => (
          <option key={project.projectCode} value={project.projectCode}>
            {project.projectName}
          </option>
        ))}
      </select>
      {/* render the project */}
      {projects.map(project => project.projectCode === selectedProject && project.component)}
    </>
  );
};

export default App;

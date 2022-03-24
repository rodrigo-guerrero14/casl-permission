import React from "react";
import TodoList from "./components/TodoList";
import { AbilityContext } from "./components/Can";
import { buildAbilityFor } from "./config/ability";
import "./App.css";

// if (process.env.NODE_ENV !== "production") {
//   // expose ability to play around with it in devtools
//   (window as any).ability = ability;
// }

export default () => {
  const [ability, seAbility] = React.useState(buildAbilityFor("member"));

  React.useEffect(() => {
    setTimeout(() => {
      seAbility(buildAbilityFor("admin"));
    }, 2000);
  }, []);

  return (
    <AbilityContext.Provider value={ability}>
      <div className="todoapp">
        <TodoList />
      </div>
    </AbilityContext.Provider>
  );
};

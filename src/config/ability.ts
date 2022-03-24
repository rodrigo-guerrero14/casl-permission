import { AbilityBuilder, Ability, AbilityClass } from "@casl/ability";
import { Todo } from "../services/todo-storage";

export type Actions =
  | "view"
  | "manage"
  | "create"
  | "read"
  | "update"
  | "delete";
type Subjects = "Todo" | Todo | "ProductsListRoute";

export type AppAbility = Ability<[Actions, Subjects]>;
export const appAbility = Ability as AbilityClass<AppAbility>;

export default function defineRulesFor(role: string) {
  const { can, rules } = new AbilityBuilder(appAbility);

  if (role === "admin") {
    can("view", "ProductsListRoute");
  } else {
    can(["read", "create"], "Todo");
    can(["update", "delete"], "Todo", { assignee: "me" });
  }

  // const routePermissionsFromApi: string[] = [];
  // can(routePermissionsFromApi, "route");

  return rules;
}

export function buildAbilityFor(role: string): AppAbility {
  return new appAbility(defineRulesFor(role), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    detectSubjectType: (object) => object!.type
  });
}

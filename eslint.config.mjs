import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Ignore Tiptap template files and external hooks
    "components/tiptap-templates/**",
    "components/tiptap-ui/**", 
    "components/tiptap-ui-primitive/**",
    "hooks/use-composed-ref.ts",
    "hooks/use-element-rect.ts",
    "hooks/use-is-breakpoint.ts",
    "hooks/use-menu-navigation.ts",
    "hooks/use-unmount.ts",
    "lib/tiptap-utils.ts"
  ]),
]);

export default eslintConfig;

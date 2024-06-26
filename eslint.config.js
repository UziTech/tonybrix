import js from "@eslint/js";
import globals from "globals";

export default [
	js.configs.recommended,
	{
		languageOptions: {
			globals: {
				...globals.es6,
				...globals.node,
				...globals.jasmine,
			},
			parserOptions: {
				sourceType: "module",
				ecmaVersion: 2023
			},
		},
		rules: {
			"block-scoped-var": 2,
			"curly": 2,
			"default-case": 2,
			"dot-location": [2, "property"],
			"eqeqeq": 2,
			"no-console": 1,
			"no-else-return": 1,
			"no-eval": 2,
			"no-loop-func": 1,
			"no-multi-spaces": 1,
			"no-param-reassign": 1,
			"no-unused-expressions": 1,
			"no-unused-vars": 2,
			"no-warning-comments": 1,
			"no-with": 2,
			"require-await": 2,
			"strict": 1,

			"no-restricted-globals": [
				"error",
				{
					"name": "fit",
					"message": "Do not commit focused tests."
				},
				{
					"name": "fdescribe",
					"message": "Do not commit focused tests."
				}
			],
			"no-shadow": 1,
			"no-undef": 2,
			"no-undefined": 2,
			"no-sync": 1,

			"array-bracket-spacing": 2,
			"block-spacing": 2,
			"brace-style": [2, "1tbs"],
			"comma-spacing": 2,
			"comma-style": 2,
			"computed-property-spacing": 2,
			"eol-last": 1,
			"func-call-spacing": 2,
			"indent": [2, "tab", {"SwitchCase": 1}],
			"key-spacing": 2,
			"keyword-spacing": 2,
			"line-comment-position": 1,
			"linebreak-style": 2,
			"lines-around-comment": 2,
			"lines-between-class-members": 2,
			"multiline-comment-style": 1,
			"new-parens": 2,
			"no-array-constructor": 2,
			"no-whitespace-before-property": 2,
			"object-curly-newline": [2, {"consistent": true}],
			"object-curly-spacing": 2,
			"quotes": 1,
			"semi": 2,
			"space-before-blocks": 2,
			"space-before-function-paren": [2, {"anonymous": "always", "named": "never", "asyncArrow": "always"}],
			"space-in-parens": 2,
			"space-infix-ops": 2,
			"space-unary-ops": 2,
			"spaced-comment": 1,
			"switch-colon-spacing": 2,

			"arrow-spacing": 2,
			"prefer-const": 1,
			"prefer-destructuring": 1,
			"prefer-rest-params": 1,
			"prefer-spread": 1,
			"prefer-template": 2,
			"rest-spread-spacing": 2,
			"template-curly-spacing": 2
		}
	}
];

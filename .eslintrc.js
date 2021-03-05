module.exports = {
  extends: ["prettier", "prettier/@typescript-eslint", "prettier/react"],
  plugins: ["prettier"],
  parserOptions: {
    "ecmaVersion": 6,
    sourceType: 'module',
    "ecmaFeatures": {
      "jsx": true,
      "modules": true
    }
  },
  rules: {
      "prettier/prettier": 0,
    //   // strict: 0,
    //   // "import/no-dynamic-require": 0,
    //   "import/order": 0,
    //   "react/jsx-filename-extension": 0,
    //   "global-require": 1,
    //   "no-use-before-define": 0,
    //   "consistent-return": 0,
    //   "import/no-unresolved": 0,
    //   "no-unused-vars": 0,
    //   // "@typescript-eslint/no-unused-vars": 0,
    //   "react/no-array-index-key": 0,
    //   "react/prefer-stateless-function": 1,
    //   "no-param-reassign": 1,
    //   "jsx-a11y/click-events-have-key-events": 0,
    //   "jsx-a11y/no-noninteractive-element-interactions": 0,
    //   "react/prop-types": 0,
    //   "prefer-destructuring": 0,
    //   "react/destructuring-assignment": 0,
    //   "jsx-a11y/no-static-element-interactions": 0,
    //   "no-param-reassign": [
    //     0,
    //     { props: true, ignorePropertyModificationsFor: ["draft"] },
    //   ],
    //   "import/prefer-default-export": 0,
    //   "jsx-a11y/anchor-is-valid": 0,
    //   "no-script-url": 0,
    //   "react/jsx-props-no-spreading": 1,
  },
};

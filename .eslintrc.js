const path = require('path');

module.exports = {
  root: true,

  extends: 'airbnb',

  env: {
    es6: true,
    commonjs: true,
    browser: true
  },

  parserOptions: {
    ecmaVersion: 7,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      generators: true,
      experimentalObjectRestSpread: true
    }
  },

  settings: {
    'import/resolver': {
      webpack: {
        config: path.resolve('build/webpack.base.conf.js')
      }
    }
  },

  rules: {
    // indent暂时保持4空格
    'indent': ['error', 4],
    // 实在是太多了，prettier 也不支持
    'no-mixed-operators': 'off',
    // 不允许覆盖作用域变量？关！
    'no-shadow': 'off',
    // 只有一个export时候要用default，不合理，关！
    'import/prefer-default-export': 'off',
    // 之前是warning
    'func-names': 'off',
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    // jsx文件后缀名
    'react/jsx-filename-extension': ['error', { 'extensions': ['.js', '.jsx'] }],
    // 全局require，关闭
    'global-require': 'off',
    // 不允许使用部分PropTypes，关闭
    'react/forbid-prop-types': 'off',
    // 强制给所有props提供propTypes声明，关闭
    'react/prop-types': 'off',
    // 非required的prop必须设置defaultProps，关闭
    'react/require-default-props': 'off',
    // 不允许在jsx props里写bind，（用得太多了...先关了）
    'react/jsx-no-bind': 'off',
    // 不允许用遍历数组的key作为component的key,（用得太多了...先关了）
    'react/no-array-index-key': 'off',
    // 方法名 按字母顺序排序 暂时关闭
    'react/sort-comp': 'off',
    'react/no-unescaped-entities': 'off',
    // jsx-a11y是accessbility的支持，先全部关闭
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/alt-text': 'off',
    // 如果else里面只有一个if，强制用else if，不合理，关了
    'no-lonely-if': 'off',
    'one-var': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': 'off',
    'no-restricted-syntax': [
        'off',
        {
          selector: 'ForInStatement',
          message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
        },
        {
          selector: 'ForOfStatement',
          message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
        },
      ],
  }
}

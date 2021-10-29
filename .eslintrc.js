module.exports = {
  extends: [
    'airbnb',
    'airbnb/hooks',
    // 关闭eslint配置中与prettier冲突的格式化规则
    'prettier',
  ],
  plugins: [
    'react',
    'import',
    'prettier'
  ],
  rules: {
    'import/order': 2, // import引入按照一定顺序
    'jsx-quotes': [2, 'prefer-double'], // JSX元素中的字符串必须使用双引号
    'quotes': [2, 'single'], // 字符串必须使用单引号
  },
};

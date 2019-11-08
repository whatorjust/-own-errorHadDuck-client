const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#9C64A6',
      '@secondary-color': '#9C64A6',
      '@link-color': '#9C64A6',
      '@success-color': '#9C64A6',
      '@warning-color': '#9C64A6',
      '@error-color': '#9C64A6',
      '@font-size-base': '17px',
      '@heading-color': '#09000B',
      '@text-color': '#6D6D6D',
      '@text-color-secondary': '#9C64A6',
      '@disabled-color': '#CE93D8',
      '@border-radius-base': '4px',
      '@border-color-base': '#CE93D8',
      '@box-shadow-base': '0 2px 8px rgba(0, 0, 0, 0.15)',
      '@layout-header-background': '#9C64A6',
      '@layout-sider-background': '#CE93D8',
      '@processing-color': '#CE93D8',
      '@layout-body-background': '#ffffff'
    }
  })
);

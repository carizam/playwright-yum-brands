module.exports = {
    default: {
      require: [
        'features/support/**/*.ts',
        'features/step_definitions/**/*.ts',
        '--require-module ts-node/register',
      ],
      format: ['progress', 'html:cucumber-report.html'],
      paths: ['features/**/*.feature'],
    },
  };
  
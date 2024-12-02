module.exports = {
    default: {
      require: ['features/step_definitions/**/*.ts'], 
      requireModule: ['ts-node/register'],           
      format: ['progress'],
      paths: ['features/**/*.feature'],             
      parallel: 1,
      publishQuiet: true,                           
    },
  };
  
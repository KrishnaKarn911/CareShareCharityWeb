module.exports = {
  apps: [
    {
      name: 'Charity-Donation',
      script: './app.js', // Replace with the entry point of your application
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};

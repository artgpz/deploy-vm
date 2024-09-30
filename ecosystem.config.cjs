module.exports = {
	/**
	 * Application configuration section
	 * http://pm2.keymetrics.io/docs/usage/application-declaration/
	 */
	apps: [
		// First application
		{
			name: 'deploy-vm', // name of the process in PM2
			script: 'build/index.js', // change according to project requirements
			env_main: {
				NODE_ENV: 'production',
				PORT: 5173 // port the app will be launched on
			}
		}
	],

	/**
	 * Deployment section
	 * http://pm2.keymetrics.io/docs/usage/deployment/
	 */

	deploy: {
		main: {
			user: 'deploy', // deployer user
			host: '20.0.153.8', // IP address of your server
			ref: 'origin/main', // the branch you want to deploy
			repo: 'git@github.com:artgpz/deploy-vm.git', // the ssh git clone URL
			path: '/home/deploy/websites/deploy-vm/main', // the path where you want the project to be
			// code you want to run after the project has been pushed to your server
			'post-deploy': 'pnpm install && pnpm run build && pm2 reload ecosystem.config.cjs --env main'
		}
	}
}

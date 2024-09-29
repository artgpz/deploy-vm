export type Content = {
	title?: string
	subtitle?: string
	text: string
	checked?: boolean
	url?: string
	code?: boolean
}

export type Section = {
	id: number
	title: string
	subtitle?: string
	content: Content[]
	open: boolean
}

export const content: Section[] = [
	{
		id: 0,
		title: 'What do we need to deploy a website on a server/VPS/VM?',
		open: true,
		content: [
			{
				subtitle: 'A way to connect to the server',
				text: 'terminal emulator, ssh'
			},
			{
				subtitle: 'Proxy/Reverse proxy/Load balancer',
				text: 'caddy, nginx, traefik, haproxy'
			},
			{
				subtitle: 'Something to publish',
				text: 'html!, css, js...'
			}
		]
	},
	{
		id: 1,
		title: 'How do we deploy a non SSR/static website?',
		open: false,
		content: [
			{
				title: '2024 most common way of building websites (non wordpressque)',
				text: 'Svelte - ui framework; SvelteKit - fullstack framework'
			},
			{
				text: 'React - NextJS/Remix'
			},
			{
				text: 'Vue - Nuxt'
			},
			{
				title: 'Server runtime',
				text: 'Node.js, C#, Go, Python'
			},
			{ title: 'Process manager for Node', text: 'PM2' }
		]
	},
	{
		id: 2,
		title: 'Local prerequisites',
		open: false,
		content: [
			{
				text: 'A SSH key (ed25519 now available)'
			},
			{
				text: 'Terminal emulator (Alacritty recommended, other available)'
			},
			{
				text: 'Node'
			},
			{
				text: 'PM2'
			},
			{
				text: 'a web project in git published in a code sharing platform with a pm2 ecosystem file (like this one)',
				url: 'https://github.com/artgpz/deploy-vm'
			},
			{
				text: `make sure to check the framework's prerequisites for a node production deployment (for example, sveltekit requires adapter-node)`
			}
		]
	},
	{
		id: 3,
		title: 'To install',
		open: false,
		content: [
			{
				title: 'Reverse proxy',
				text: 'Caddy',
				url: 'https://caddyserver.com/'
			},
			{ title: 'Runtime, environment and process manager', text: 'pnpm', url: 'https://pnpm.io/' },
			{ text: 'Node', url: 'https://nodejs.org' },
			{ text: 'pm2', url: 'https://pm2.io/' },
			{
				title: 'Securely managing environments (optional)',
				text: 'sops',
				url: 'https://github.com/getsops/sops'
			},
			{
				text: 'age',
				url: 'https://github.com/FiloSottile/age'
			},
			{
				title: 'Nice to have',
				text: 'stow (manage dot files, symlink farm manager)',
				url: 'https://www.gnu.org/software/stow/'
			},
			{ text: 'tmux (terminal multiplexer)', url: 'https://github.com/tmux/tmux/' },
			{
				text: 'zsh (unix shell, ohmyzsh)',
				url: 'https://github.com/ohmyzsh/ohmyzsh/wiki/Installing-ZSH'
			},
			{ text: 'nvim (text editor, lazyvim)', url: 'https://neovim.io/' },
			{ text: 'bottom (process viewer)', url: 'https://github.com/ClementTsang/bottom' },
			{ text: 'lazygit (git manager)', url: 'https://github.com/jesseduffield/lazygit' },
			{ text: 'mcfly (history search)', url: 'https://github.com/cantino/mcfly' },
			{ text: 'lsd (colourful terminal)', url: 'https://github.com/lsd-rs/lsd' },
			{ text: 'zoxide (cd replacement)', url: 'https://github.com/ajeetdsouza/zoxide' },
			{ text: 'rsync (sync files)', url: 'https://github.com/rsyncproject/rsync' },
			{ text: 'docker (docker engine)', url: 'https://docs.docker.com/engine/install/debian/' },
			{ text: 'lazydocker (manage docker)', url: 'https://github.com/jesseduffield/lazydocker' },
			{ text: 'go (language)', url: 'https://go.dev/doc/install' }
		]
	},
	{
		id: 4,
		title: 'Steps on local',
		open: false,
		content: [
			{
				text: 'Prepare an ecosystem file'
			},
			{ text: 'commit your changes' },
			{ text: 'Get the IP address of the VM' }
		]
	},
	{
		id: 5,
		title: 'Install on linux (debian 12) server',
		open: false,
		content: [
			{
				title: 'Login as root, update server',
				text: 'ssh root@ip-address (use -i KEYNAME if key name is not default)'
			},
			{ title: 'Create deploy user (optional, not for azure)', text: 'adduser deploy' },
			{
				text: 'usermod -aG sudo deploy'
			},
			{ title: 'Change to root user', text: 'sudo -s' },
			{ text: 'apt update' },
			{ text: 'apt upgrade' },
			{
				title: 'Caddy',
				text: 'apt install -y debian-keyring debian-archive-keyring apt-transport-https curl'
			},
			{
				text: `curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg`
			},
			{
				text: `curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list`
			},
			{
				text: `apt update`
			},
			{ text: `apt install caddy` },
			{
				title: 'git',
				text: 'apt install git'
			},
			{
				title: 'pnpm',
				text: 'sudo -su deploy && cd (install on user we want to use for deploy, preferably not root)'
			},
			{ text: 'curl -fsSL https://get.pnpm.io/install.sh | sh -' },
			{ text: 'source /home/deploy/.bashrc' },
			{ title: 'Node', text: 'pnpm env use --global lts' },
			{ text: 'pnpm add -g pm2' }
		]
	},
	{
		id: 6,
		title: 'Server configuration',
		open: false,
		content: [
			{ text: 'nano .bashrc (in the deploy user account)' },
			{ text: `comment out: 'If not running interactively, don't do anything...' and save` },
			{
				text: 'create or copy your current ssh key to access your repo provider...'
			},
			{ text: 'ssh git@git-provider (verify you can access your repo provider)' },
			{
				text: 'mkdir websites && cd websites'
			},
			{
				title: 'Configuration to match the ecosystem file path',
				text: 'mkdir deploy-vm && cd deploy-vm'
			},
			{ text: 'cd && sudo -s' },
			{ text: 'nano /etc/caddy/Caddyfile (change according to requirements)' },
			{ text: 'caddy reload (before running this point your DNS A record to the server IP)' },
			{ text: 'configure secrets, envs or any post-deploy requirements' }
		]
	},
	{
		id: 7,
		title: 'Deploy the website',
		open: false,
		content: [
			{
				title: 'Setup with pm2',
				text: 'pm2 deploy ecosystem.config.cjs main setup (change to name of the deployment)'
			},
			{
				title: 'Deploy from local machine (this can be automated via ci/cd',
				text: 'pm2 deploy ecosystem.config.cjs main (deploy manually)'
			}
		]
	},
	{
		id: 8,
		title: 'Bash script (linux automation)',
		open: false,
		content: [
			{
				text: `
#!/bin/bash

#to remove verbosity installing with apt-get
install="apt-get -o Dpkg::Use-Pty=0 -qq install -y"

UTILITIES="zsh git curl stow age postgresql-client wireguard tmux caddy xcaddy duf lsd restic ca-certificates fuse3 build-essential "
ARCH=$(uname -m)

apt-get -qq update >/dev/null 2>&1
apt-get -qq upgrade -y >/dev/null 2>&1

#caddy and xcaddy
$install debian-keyring debian-archive-keyring apt-transport-https curl >/dev/null 2>&1
curl -1sLfS 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg >/dev/null 2>&1
curl -1sLfS 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list >/dev/null 2>&1
curl -1sLfS 'https://dl.cloudsmith.io/public/caddy/xcaddy/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-xcaddy-archive-keyring.gpg >/dev/null 2>&1
curl -1sLfS 'https://dl.cloudsmith.io/public/caddy/xcaddy/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-xcaddy.list >/dev/null 2>&1
apt-get update >/dev/null 2>&1

#utilities
for i in $UTILITIES; do
  $install $i >/dev/null 2>&1
  echo "$i installed"
done

#docker
$install -m 0755 -d /etc/apt/keyrings >/dev/null 2>&1
curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc >/dev/null 2>&1
chmod a+r /etc/apt/keyrings/docker.asc >/dev/null 2>&1
echo "Docker installed"

#ohmyzsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)" >/dev/null 2>&1
chsh -s /bin/zsh root
echo "Oh my zsh installed"

#zoxide
curl -sS https://raw.githubusercontent.com/ajeetdsouza/zoxide/main/install.sh | zsh >/dev/null 2>&1
echo "zoxide installed"

#mcfly - great scott!
curl -LfsS https://raw.githubusercontent.com/cantino/mcfly/master/ci/install.sh | zsh -s -- --git cantino/mcfly >/dev/null 2>&1
echo "mcfly installed"

#pnpm
curl -fsSL https://get.pnpm.io/install.sh | zsh - >/dev/null 2>&1
echo "pnpm installed"

#rclone
curl https://rclone.org/install.sh | zsh >/dev/null 2>&1
echo "rclone installed"

#tpm
if "test ! -d ~/.tmux/plugins/tpm" \\
   "run 'git clone https://github.com/tmux-plugins/tpm ~/.tmux/plugins/tpm && ~/.tmux/plugins/tpm/bin/install_plugins'"

mkdir ~/downloads
cd ~/downloads

#lazydocker
curl https://raw.githubusercontent.com/jesseduffield/lazydocker/master/scripts/install_update_linux.sh | bash
echo 'lazydocker installed'

#split by arch to download from packages
if [[ "$ARCH" = 'aarch64' ]]; then

  #go
  curl -OLsS https://go.dev/dl/go1.23.1.linux-arm64.tar.gz
  tar -C /usr/local -xf go1.23.1.linux-arm64.tar.gz
  #NOTE: add export PATH=$PATH:/usr/local/go/bin
  echo "go installed"

  #sops
  curl -LOsS https://github.com/getsops/sops/releases/download/v3.9.0/sops_3.9.0_arm64.deb
  dpkg -i sops_3.9.0_arm64.deb >/dev/null 2>&1
  echo "sops installed"

  #bottom
  curl -LOsS https://github.com/ClementTsang/bottom/releases/download/0.10.2/bottom_0.10.2-1_arm64.deb
  dpkg -i bottom_0.10.2-1_arm64.deb >/dev/null 2>&1
  echo "bottom installed"

  #dust
  curl -LOsS https://github.com/bootandy/dust/releases/download/v1.1.1/dust-v1.1.1-aarch64-unknown-linux-musl.tar.gz
  tar -xf dust-v1.1.1-aarch64-unknown-linux-musl.tar.gz
  mv dust-v1.1.1-aarch64-unknown-linux-musl/ /usr/local/dust
  echo "dust installed"

  #duf
  curl -LOsS https://github.com/muesli/duf/releases/download/v0.8.1/duf_0.8.1_linux_arm64.deb
  dpkg -i duf_0.8.1_linux_arm64.deb >/dev/null 2>&1
  echo "duf installed"

fi

#split by arch to download from packages
if [[ "$ARCH" = 'x86_64' ]]; then

  #go
  curl -OLsS https://go.dev/dl/go1.23.1.linux-amd64.tar.gz
  tar -C /usr/local -xf go1.23.1.linux-amd64.tar.gz
  #NOTE: add export PATH=$PATH:/usr/local/go/bin
  echo "go installed"

  #sops
  curl -LOsS https://github.com/getsops/sops/releases/download/v3.9.0/sops_3.9.0_amd64.deb
  dpkg -i sops_3.9.0_amd64.deb >/dev/null 2>&1
  echo "sops installed"

  #bottom
  curl -LOsS https://github.com/ClementTsang/bottom/releases/download/0.10.2/bottom_0.10.2-1_amd64.deb
  dpkg -i bottom_0.10.2-1_amd64.deb >/dev/null 2>&1
  echo "bottom installed"

  #dust
  curl -LOsS https://github.com/bootandy/dust/releases/download/v1.1.1/du-dust_1.1.1-1_amd64.deb
  dpkg -i du-dust_1.1.1-1_amd64.deb >/dev/null 2>&1
  echo "dust installed"

  #duf
  curl -LOsS https://github.com/muesli/duf/releases/download/v0.8.1/duf_0.8.1_linux_amd64.deb
  dpkg -i duf_0.8.1_linux_amd64.deb >/dev/null 2>&1
  echo "duf installed"

fi`,
				code: true
			}
		]
	},
	{
		id: 9,
		title: 'Tmux configuration',
		open: false,
		content: [
			{
				code: true,
				text: `
#24 bit colour
set-option -sa terminal-overrides ",xterm*:Tc"

#change to space for command
unbind C-b
set -g prefix C-Space

#change for vertical and horizontal splitting
unbind v
unbind h

unbind % # Split vertically
unbind '"' # Split horizontally

bind v split-window -h -c "#{pane_current_path}"
bind h split-window -v -c "#{pane_current_path}"

# Shift Alt vim keys to switch windows
bind -n M-H previous-window
bind -n M-L next-window

# List of plugins
set -g @plugin 'tmux-plugins/tpm'
set -g @plugin 'tmux-plugins/tmux-sensible'
set -g @plugin 'catppuccin/tmux'
set -g @catppuccin_flavour 'mocha'
set -g @plugin 'christoomey/vim-tmux-navigator'
set -g @plugin 'tmux-plugins/tmux-yank'
set -g @plugin 'tmux-plugins/tmux-battery'
set -g @plugin 'jamesoff/tmux-loadavg'
# set -g @plugin 'erikw/tmux-powerline'

# Other examples:
# set -g @plugin 'github_username/plugin_name'
# set -g @plugin 'github_username/plugin_name#branch'
# set -g @plugin 'git@github.com:user/plugin'
# set -g @plugin 'git@bitbucket.com:user/plugin'

# set status bar to top
set -g status-position top

#catpp config
# set -g @catppuccin_window_left_separator "🏰 "
# set -g @catppuccin_window_right_separator " "
# set -g @catppuccin_window_number_position "right"
# set -g @catppuccin_window_right_separator "█⁍ "
# set -g @catppuccin_window_middle_separator "█"
#
# set -g @catppuccin_window_default_fill "number"
#
# set -g @catppuccin_window_current_fill "number"
# set -g @catppuccin_window_current_text "#{pane_current_path}"
#
# set -g @catppuccin_status_modules_right "application session battery date_time"
# set -g @catppuccin_status_left_separator  ""
# set -g @catppuccin_status_right_separator " "
# set -g @catppuccin_status_right_separator_inverse "yes"
# set -g @catppuccin_status_fill "all"
# set -g @catppuccin_status_connect_separator "no"

set -g @catppuccin_window_left_separator ""
set -g @catppuccin_window_right_separator " "
set -g @catppuccin_window_middle_separator " █"
set -g @catppuccin_window_number_position "right"

set -g @catppuccin_window_default_fill "number"
set -g @catppuccin_window_default_text "#W"

set -g @catppuccin_window_current_fill "number"
set -g @catppuccin_window_current_text "#W"

set -g @catppuccin_status_modules_right "application session battery load date_time"
set -g @catppuccin_status_left_separator  " "
set -g @catppuccin_status_right_separator ""
set -g @catppuccin_status_fill "icon"
set -g @catppuccin_status_connect_separator "no"

set -g @catppuccin_directory_text "#{pane_current_path}"

# Initialize TMUX plugin manager (keep this line at the very bottom of tmux.conf)
run '~/.tmux/plugins/tpm/tpm'
`
			}
		]
	}
]

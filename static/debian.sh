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
if "test ! -d ~/.tmux/plugins/tpm" \
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

fi

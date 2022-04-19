# git-ssh

gitssh is for switching among different github accounts, such as work-related account, personal account etc.

didn't check existing solution; just create this simple one for myself switching between work-account and personal-account.

```
git-ssh <command>

Commands:
  git-ssh init        init ~/.git-ssh/config
  git-ssh ls          ls github accounts in ~/.git-ssh/config
  git-ssh add         add github account by answering prompts
                      1. username;
                      2. email;
                      3. ssh-private-key file path;

  git-ssh use [name]  use specific ssh name for git

Options:
  --version  Show version number                               [boolean]
  --help     Show help                                         [boolean]
```
 
 ## How does it work?

 Before switching github account using ssh, we need to setup [GitHub with SSH](https://docs.github.com/en/authentication/connecting-to-github-with-ssh) or follow steps in [this one](https://jdblischak.github.io/2014-09-18-chicago/novice/git/05-sshkeys.html).

Basically, this cli will init `~/.git-ssh/config`, this file to store git-name, git-email, and git-ssh-private-key file path as an json object.

Example one is just like this: 
```
{
    "kent": {
        "ssh_private_path": "~/.ssh/kentgithub",
        "name": "kent",
        "email": "kent@thisismyemail.com"
    },
    "aaa": {
        "ssh_private_path": "~/.ssh/aaakey",
        "name": "aaa",
        "email": "aaa@example.com"
    }
}
```

- `git-ssh ls` just gonna print out this json object in `~/.git-ssh/config`.

- `git-ssh add` will ask you name, email and your ssh-key-path in your file system and push them into the config json object; create your ssh key pair beforehand.

- `git-ssh use` can be used like `git-ssh use kent` in above example.
under the hook, it simple runs three command to set git `user.name`, `user.email` and `core.sshcommand` in global scope:
```
git config --global core.sshCommand "ssh -i [the-ssh-path-goes-here]"
git config --global  user.name [name-goes-in-here]
git config --global  user.email [email-goes-in-here]
```


By running `git-ssh use [account]` in advance, now your can write comment with the account you want, and push, pull github repos with the correct permissions.




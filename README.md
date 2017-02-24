Healthgrades UI Template
========================

## Getting Started

Your environment should have node installed ([link](https://nodejs.org/en/download/)) and usually Git ([link](https://git-scm.com/downloads)). Next download this repository from the [Healthgrades GitLab](https://git.healthgrades.com/) either via Git or the direct download link.

Customize these files to refer to your library:
```
/package.json
/README.md
/app/index.html
/app/tests/index.html
```

Create a page for component development and add it to the routes:
```
/app/src/styleguide/pages/[PageName]
/app/src/styleguide/routes.es
```

Components meant for export should be kep in the `/src/components/` folder. Hg has a small utilities library which makes it easier to import into other HG libraries called *hg-common-toolz* (aka HgZ). Add your module to the /webpack folder to make it easy to import elsewhere!

To start the repository run these commands from that directory:
```
npm install
npm start
open http://localhost:8080/
```

--------

## Development

Git and GitLab makes development easy! There are three main things to know about the development process:
1. Projects download source files from GitLab via npm install.
2. Our GitLab projects have two important branches - `master` and `dev-master`.
3. Most work should go into the `dev-master` branch via a Merge Request.

### npm install

npm is a flexable program that allows us to specify our GitLab as a source of dependency and it will install correctly. We do this via the devDependency list in the package.json file at the root of the the project. A GitLab dependency will specify what repository to install. Typically we also specify a tag or commit SHA to use rather than the default - this comes after a hash at the end. For example

```
  "@hg/hg-common-toolz": "git+https://git.healthgrades.com/blue-falcon/hg-common-toolz.git#release",
```

### Git branches

Our git branching scheme uses two important branches. `master` is used for QA'd production ready code. `dev-master` is the primary development branch which QA will test against. New features, bug fixes, etc should typically be merged into `dev-master`, when a release is ready to go out and QA has signed off then `dev-master` will be merged into `master`.

To track these two branches and allow for easy npm installation we use two tags. `release` points to the latest `master` branch, `dev-release` points to the latest `dev-master`.

### Merge requests

Code reviews are easy to do in GitLab via an Merge Request (aka Pull Request). The idea of a merge request is to provide a place to discuss and review merging a source branch into a destination branch. The most common use is to request review of merging a feature branch into the dev-master branch.

##### A basic workflow:
1. Create a local feature branch `git checkout dev-master; git checkout -b feature_branch_name;`
2. Make your changes
3. Check in the changes `git add file/that/changed; git commit -m "123456: FeatureName: I made an awesome new feature!";`
4. Push the branch to origin `git push origin feature_branch_name;`
5. Create a merge request: https://git.healthgrades.com/blue-falcon/search-ui/merge_requests/new
6. Send a message to someone to review it. They will add comments, request changes, give you a pat on the back, etc.
7. You go to GitLab and accept merge request and remove the feature branch on origin.
8. In GitLab delete the `dev-release` tag and recreate it against the `dev-master` branch.

-----------

Healthgrades Styleguide framework components. Other HG UI Kits can easily set up a styleguide by importing these components.

Questions, Comments, Suggestions, Candy? Contact Zack or Nick at:

```
Zack: ZTillotson@healthgrades.com or @Zack on Slack
Nick: NPantier@healthgrades.com or @Nick on Slack
```"# serverless-epp" 

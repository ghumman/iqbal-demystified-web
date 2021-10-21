# Application Demo
Go to web application
... [Iqbal Demystified Web Application](https://ghumman.github.io/iqbal-demystified-web/).

# To Deploy
```
yarn deploy
(or)
npm run deploy
```

### Notes
- Do not forget to create new 404.html file in branch gh-pages...checkout section "Issues hosting web app on github pages"
- When deploying if you're getting an error `Failed to get remote.orgin.url ...`, use this command `git remote add origin git@github.com:ghumman/iqbal-demystified-web-opensource.git`.

# To install and start the project 
```
npm install
npm start
```

# To submit a PR
- When naming the branch if you are working on a new feature or addition, prefix the branch name with feature otherwise if it is fixing a bug call it bug-fix. If you are working on existing issues, please include the issue name in your branch, otherwise create an issue first and then include that issue name in your branch name. Also adding a short description for that branch will be great. Following are the examples of branch names. ID-1/ID-2 in following examples are issues' names. Also ID stands for Iqbal Demystified. 

```
feature/ID-1-fix-structure-of-project
bug-fix/ID-2-change-password-not-working
```
- Following is really helpful understanding how to contribute by forking, creating new branch and submitting the PR. 
```
https://www.dataschool.io/how-to-contribute-on-github/
```

# ES-Lint
```
Please fix all formatting and linting errors before creating PR. Currently project has babel-eslint installed which will be replaced with typescript-eslint once we convert the project to typescript. You can run 'npm run lint' / 'npm run lint-fix' and please use a eslint plugin with your IDE. 
```

# Coding Standard
```
Use long and explanatory variable names. 
Divide your code in smaller functions.
Declare all constants inside constants file. 
Please include name of issue you are working on in your commit message like 'ID-3: Updated Readme'
```

## Issues hosting web app on github pages
Found following on this link 
[Single Page App on Github Pages](https://itnext.io/so-you-want-to-host-your-single-age-react-app-on-github-pages-a826ab01e48).
#### Notes on client-side routing
GitHub Pages doesn’t support routers that use the HTML5 `pushState` history API under the hood (for example, React Router using `browserHistory`). This is because when there is a fresh page load for a url like `http://user.github.io/todomvc/todos/42`, where `/todos/42` is a frontend route, the GitHub Pages server returns 404 because it knows nothing of `/todos/42`. If you want to add a router to a project hosted on GitHub Pages, here are a couple of solutions:
* You could switch from using HTML5 history API to routing with hashes. If you use React Router, you can switch to `hashHistory` for this effect, but the URL will be longer and more verbose (for example, `http://user.github.io/todomvc/#/todos/42?_k=yknaj`). [Read more](https://reacttraining.com/react-router/web/api/Router) about different history implementations in React Router.
* Alternatively, you can use a trick to teach GitHub Pages to handle 404 by redirecting to your `index.html` page with a special redirect parameter. You would need to add a `404.html` file with the redirection code to the `build` folder before deploying your project, and you’ll need to add code handling the redirect parameter to `index.html`. You can find a detailed explanation of this technique [in this guide](https://github.com/rafrex/spa-github-pages).

### More Notes
- `Fallback font will be used while loading` is a chrome related error and it displays text in regular font for a moment before switching to `Jameel` font. No such error in Firefox browser. 

## For Workshop Purposes
### For Kids
- Student 1
- Student 2
- Student 3

### For Grown Ups
- Student 1
- Student 2
- Student 3
- Student 4
- Student 5

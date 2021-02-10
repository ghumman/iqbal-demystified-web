# Application Demo
Go to web application
... [Iqbal Demystified Web Application](https://ghumman.github.io/iqbal-demystified-web/).

# To Deploy
```
yarn deploy
(or)
npm deploy
(Do not forget to create new 404.html file in branch gh-pages...checkout section "Issues hosting web app on github pages")
```

# To install and start the project 
```
npm install
npm start
```

# To submit a PR
```
When naming the branch if you are working on a new feature or addition, prefix the branch name with feature otherwise if it is fixing a bug call it bug-fix. If you are working on existing issues, please include the issue name in your branch, otherwise create an issue first and then include that issue name in your branch name. Also adding a short description for that branch will be great. Following are the examples of branch names. ID-1/ID-2 in following examples are issues' names. Also ID stands for Iqbal Demystified. 

feature/ID-1-fix-structure-of-project
bug-fix/ID-2-change-password-not-working
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

### Solution of Hard Refresh for github pages web application
Created a file 404.html inside branch `gh-pages` with following content. 
```
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Single Page Apps for GitHub Pages</title>
    <script type="text/javascript">
      // Single Page Apps for GitHub Pages
      // https://github.com/rafrex/spa-github-pages
      // Copyright (c) 2016 Rafael Pedicini, licensed under the MIT License
      // ----------------------------------------------------------------------
      // This script takes the current url and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new url with only a query string and hash fragment,
      // e.g. http://www.foo.tld/one/two?a=b&c=d#qwe, becomes
      // http://www.foo.tld/?p=/one/two&q=a=b~and~c=d#qwe
      // Note: this 404.html file must be at least 512 bytes for it to work
      // with Internet Explorer (it is currently > 512 bytes)
      // If you're creating a Project Pages site and NOT using a custom domain,
      // then set segmentCount to 1 (enterprise users may need to set it to > 1).
      // This way the code will only replace the route part of the path, and not
      // the real directory in which the app resides, for example:
      // https://username.github.io/repo-name/one/two?a=b&c=d#qwe becomes
      // https://username.github.io/repo-name/?p=/one/two&q=a=b~and~c=d#qwe
      // Otherwise, leave segmentCount as 0.
      var segmentCount = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + segmentCount).join('/') + '/?p=/' +
        l.pathname.slice(1).split('/').slice(segmentCount).join('/').replace(/&/g, '~and~') +
        (l.search ? '&q=' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

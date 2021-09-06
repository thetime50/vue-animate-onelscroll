
## webpack.json
```json
{

  "scripts": {
    "clean": "rimraf lib",
    "build": "npm run clean && rollup --config rollup.config.js",
    "test": "npm run build && jest",
    "deploy": "npm run test && npm version patch && npm publish",
    "prepublishOnly": "git push --follow-tags"
  },

}
```
### deploy

**npm version patch**  
package.json 中的版本号2.0.0-0变为 2.0.0;  
再次执行npm version patch  
package.json 中的版本号2.0.0变为 2.0.1;  

**npm publish**


```
403 Forbidden - PUT http://registry.npmjs.org/vue-animate-onelscroll - Forbidden
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy.
```
邮箱验证没通过

### prepublishOnly
tag 分为 annotated 和 lightweight 两种类型

git push --follow-tags
此命令只会 push annotated tag

git tag 默认打的是 lightweight 类型的，如果需要打 annotated 使用：

git tag -a


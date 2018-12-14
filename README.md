# webpack_template
常用 webpack 配置模板。基于最新的 webpack4, babel7。

# babel 业务配置

此配置适合业务，不适合打代码库。业务配置求最小体积。最小化的处理 babel 的 polyfill，减少 helper 的样板代码。

1. 把 env preset 的 useBuiltIns 设置为 usage，来自动在代码中插入需要的 polyfill。
2. 通过 transfrom-runtime 和 runtime 来处理 helper 函数，避免每个页面都重复配置。

最终配置如下：
```json
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "targets": {
                    "browsers": ["> 0.25%", "not dead", "ie 9", "ios 8", "android 4.4"]
                },
                "modules": "commonjs"
            }
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "corejs": false,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}

```

## babel 库配置




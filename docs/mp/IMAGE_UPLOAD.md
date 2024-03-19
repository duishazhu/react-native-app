### 小程序图片上传到 CDN

由于小程序包体积大小限制，可以将 App 内用到的图片素材上传到 CDN。目前标品提供了`upload-image.sh`脚本方便此操作，具体用法可以通过执行`sh scripts/upload-image.sh`命令。不过执行该命令的前提是，在根目录下有`oss-conf.json`文件。并确保全局安装了 `@terminus/termix`, 最低版本 v1.0.12;

### Termix 使用说明

#### 图片上传并输出路径映射

使用帮助:

```bash
  termix help upload
```

使用样例:

将`/Users/app/tmall-rn`路径下的 `images` 目录里面的所有图片根据 `oss-conf.json` 里的配置上传到阿里云 OSS 里，上传的路径前缀为 `images`, 然后将上传结果输出到 `sprites.json` 文件:

```bash
  termix upload -c oss-conf.json -p images -d /Users/app/tmall-rn -o sprites.json images
```

待上传的可以是一个文件夹，也可以是一个图片文件；可以用 `--override` 启用图片覆盖上传，默认增量上传：如果之前上传过，存在 `sprites.json` 文件，则只上传不在此文件中的图片；加上`--verbose` 参数可以查看图片上传的详细输出信息；

说明：

1. 通过`-c`或`--config`指定 oss 配置文件路径，该参数不可省略；
1. `oss-conf.json`的配置项只填 bucket、region、accessKeyId、endpoint、accessKeySecret 即可，添加其他额外的配置项可能导致出错；
1. 通过`-p`或者`--prefix`参数指定图片上传后生成的路径前缀，比如如果希望生成的路径为`//xx.aliyuncs.com/_sprites/a.png`, 则将`prefix`指定为`_sprites`, 默认为`_sprites`;
1. 通过`-d`或者 `--work-dir`指定当前工作目录，该参数可能会影响配置文件路径、输出结果路径以及要上传的图片路径, 如果这三个路径传入的是绝对路径则不变化，否则会将以上路径与当前工作目录一起拼接成绝对路径，该参数的默认值为`process.cwd()`；
1. 通过`-o`或者`--output`指定输出结果的路径，默认值为`sprites.json`;
1. 通过`-i`或者`--ignore`指定需要忽略的匹配模式;
1. 通过`--key-prefix`参数指定输出结果的 key 前缀，当指定上传路径为`*/src/images`下的所有图片时，生成的结果形如{"images/busy.png": "//xx.aliyuncs.com/\_sprites/busy.png"}, 对于装修图片可以指定上传路径为`*/src/design/images`加上`--key-prefix=design`参数使得生成的结果里面 key 前缀为`design/images/abc.png`而不是`images/abc.png`；
1. 通过`--randomize`参数将上传图片路径加上随机字符串，防止之前上传过的同名文件被覆盖，慎用此参数，可能导致大量的图片被上传上去而不被使用，造成存储浪费，默认`false`；
1. `--override`是否全量上传，默认`false`为增量上传模式，增量上传时会检查输出结果里面是否已经有该图片，有则忽略。启用增量上传时无论是否之前上传过都重新上传一遍，如果此时`--randomize`为`false`则生成路径与之前一致，直接覆盖掉；
1. 加上`--verbose`参数会输出图片上传详情；

# atcoder-template

## 目次

-   [前提](#pre-requirement)
-   [環境構築](#setup-env)
-   [ログイン](#login)
-   [問題のダウンロード](#download-tasks)
-   [使い方(TypeScript)](#how-to-use-typescript)
-   [使い方(Python)](#how-to-use-python)
-   [使い方(Go)](#how-to-use-go)

<h2 id="pre-requirement">前提</h2>

-   `Node.js`, `Python3`, `Go` のいずれかの実行環境がある
-   `direnv`, `gnu-time` がインストールされている

```
brew install direnv gnu-time
```

<h2 id="setup-env">環境構築</h2>

```shell
(~) $ python3 -m venv .venv
(~) $ yarn install
(~) $ direnv allow
(~) $ pip3 install -r requirements.txt
(~) $ acc config oj-path $(which oj) # 基本的には oj コマンドのパスは自動で検出されますが、必要に応じて手動で設定してください
```

<h2 id="login">ログイン</h2>

```shell
(~) $ acc login
(~) $ oj login https://atcoder.jp
```

<h2 id="download-tasks">問題のダウンロード</h2>

```shell
(~) $ acc new abc001
(~) $ cd abc001/
(~/abc001) $ acc tasks # 問題の一覧を表示
(~/abc001) $ acc add # 問題を追加でダウンロード
(~/abc001) $ cd a/
```

<h2 id="how-to-use-typescript">使い方(TypeScript)</h2>

```shell
(~/abc001/a) $ code (vim/nvim) main.ts
(~/abc001/a) $ oj -t "ts-node main.ts" -d ./tests
(~/abc001/a) $ acc submit main.ts -- --language 5058
```

<h2 id="how-to-use-python">使い方(Python)</h2>

```shell
(~/abc001/a) $ code (vim/nvim) main.py
(~/abc001/a) $ oj -t "python3 main.py" -d ./tests
(~/abc001/a) $ acc submit main.py -- --language 5055
```

<h2 id="how-to-use-go">使い方(Go)</h2>

```shell
(~/abc001/a) $ code (vim/nvim) main.go
(~/abc001/a) $ oj -t "go run main.go" -d ./tests
(~/abc001/a) $ acc submit main.go -- --language 5002
```

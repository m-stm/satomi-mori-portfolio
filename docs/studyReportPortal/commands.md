# コマンド集

## 1. 開発環境 (Sail / Docker)

日常的に使う環境操作コマンド

- **起動（バックグラウンド）**
    ```
    ./vendor/bin/sail up -d
    ```
- **停止**
    ```
    ./vendor/bin/sail stop
    ```
- **完全に終了（コンテナ削除）**
    ```
    ./vendor/bin/sail down
    ```
- **フロントエンドと合わせて起動**
    ```
    ./vendor/bin/sail up -d && ./vendor/bin/sail npm run dev
    ```

## 2. データベース操作

構築のやり直しや初期化

- **DBのリセット（全削除・再構築・シード実行）**
    ```
    ./vendor/bin/sail php artisan migrate:fresh --seed
    ```

## 3. Git 操作

- **直前のコミットメッセージを修正**
    ```
    git commit --amend -m "新しいコミットメッセージ"
    ```
- **不要になったローカルブランチを削除**

    ```
    git branch -d ブランチ名"
    ```

    - ※マージされていないブランチを強制削除する場合は `-D`

- **リモートで削除されたブランチをローカルにも反映**
    ```
    git branch -d ブランチ名"
    ```

## 4. ルーティング修正時の反映コマンド

`web.php` や `api.php` を修正した際に使用

- キャッシュを一度消して、現在のファイル内容で作り直す
    ```
    ./vendor/bin/sail php artisan route:cache
    ```
- 現在のルート一覧を確認
    ```
    ./vendor/bin/sail php artisan route:list
    ```

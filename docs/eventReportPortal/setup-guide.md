## 環境構築手引き

**前提条件**

以下をローカルPCに準備しておくこと

- Docker Desktop
- Ubuntu
- vscode（テキストエディタ）
- GitHub個人アカウントの作成（WSL登録）

**1. プロジェクトをクローンする**

```
git clone [リポジトリURL]
cd [プロジェクト名]
```

**2. 設定ファイルの作成と個別調整**

①`.env.example` をコピーして `.env` を作成

```
cp .env.example .env
```

②ポート番号の重複時は修正

- `APP_PORT=80` →例：`8080`(※変更した場合は `APP_URL=http://localhost:8080`も修正)
- `FORWARD_DB_PORT=3306` →例：`3307`
- `FORWARD_REDIS_PORT=6379` →例：`6380`
- `FORWARD_MAILPIT_PORT=1025` →例：`1026`
- `FORWARD_MAILPIT_DASHBOARD_PORT=8025` →例：`8026`
- `VITE_PORT=5173` →例：`5174`
- `FORWARD_MEILISEARCH_PORT=7700` →例：`7701`

③開発環境の場合は、以下はチーム共通のものを使用する（別途連携）

- APP_KEY (データの互換性担保の為、**key:generate**は使用しない)
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

**3. コンテナの起動と初期化**

```
# ライブラリ取得（コンテナを立てる前準備）
docker run --rm -u "$(id -u):$(id -g)" -v "$(pwd):/var/www/html" -w /var/www/html laravelsail/php84-composer:latest composer install

# 起動
./vendor/bin/sail up -d
```

**4. アプリの初期化**

```
# 独自の鍵を使用する場合のみ使用（開発環境では使用しない）
./vendor/bin/sail artisan key:generate

# DB作成とテストデータの投入
./vendor/bin/sail artisan migrate --seed

# フロントエンドのビルド
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

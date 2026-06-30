# ファイル統合ツール『OrderlyMerge』

## 開発のきっかけ

### ■ 当時の状況と課題

- **共同編集の制限**
  - 共有ファイルサーバー（Backlog）の仕様上、複数人によるファイルの同時共同編集が不可能だった。
  - 対策として、ファイルを細かく分割して各メンバーに割り振る必要があった。

### ■ 発生していた問題点

- **統合作業の発生**
  - 分割したことで、最終的に完成したシートを1つに統合する作業が不可避となった。
- **過不足チェックの形骸化・複雑化**
  - シート数が多くなるにつれ、何が足りていないのか（過不足）の把握が困難になった。
- **確認コストの増大**
  - 正しい順番通りに並び替えができているか、目視で確認する作業に多大な時間を取られていた。

### ■ 自動化へ至った考え（マクロ作成の理由）

- **ロジックのシンプルさ**
  - 行いたいこと自体はいたってシンプルな作業（ファイルの結合と並び替え）だった。
- **リスクと負荷の低減**
  - マクロを組んでシステムに規則的に行わせることで、ヒューマンエラーを削減できると考えた。
  - 定型作業を自動化することで、作業負荷を大幅に減らせると判断し、作成に至った。

## ツール名の由来

複数の個別ファイルを統合するだけでなく、並び替えも任意で行い、「**順番通りの統合作業を行うツール**」という意味で命名しました。

## ツールの機能

## ツール化する上で工夫した点

## ツール活用効果

## ソースコード解説

<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">①統合対象ファイルの格納先を選択</span></summary>
  <br>

```
' フォルダ選択
Sub SelectFolderToD2()
    Dim mainSheet As Worksheet
    Dim defaultPath As String
    Dim fileDialogObject As FileDialog
    Dim selectedFolder As String

    ' 操作画面である「Main」シートを指定
    Set mainSheet = ThisWorkbook.Sheets("Main")

    ' 現在D2セルにパスが入っていればそれを初期位置にする
    ' 空っぽの場合は、ユーザーの「デスクトップ」を初期位置にする
    defaultPath = mainSheet.Range("D2").Value
    If defaultPath = "" Then
        defaultPath = CreateObject("WScript.Shell").SpecialFolders("Desktop")
    End If

    ' エクスプローラーからのフォルダ選択画面を設定
    Set fileDialogObject = Application.FileDialog(msoFileDialogFolderPicker)

    With fileDialogObject
        .Title = "読み込み対象のフォルダを選択してください"
        .InitialFileName = defaultPath ' 初期表示するディレクトリ

        ' ユーザーがフォルダを選んで「OK」を押した場合
        If .Show = -1 Then
            ' 選択されたパスの末尾に「\」をつけて変数に格納
            selectedFolder = .SelectedItems(1) & "\"

            ' MainシートのD2セルに出力
            mainSheet.Range("D2").Value = selectedFolder
    ' ユーザーが「OK」を押して空欄でなければD6セルに書き込む
    If inputName <> "" Then
        mainSheet.Range("D6").Value = inputName
    Else
        MsgBox "入力がキャンセルされたか、空欄です。", vbExclamation, "中断"
    End If
End Sub
```

</details>
<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">②対象ファイルを読み込む</span></summary>
  <br>

</details>
<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">③対象ファイルを読み込む</span></summary>
  <br>
手動作業
</details>
<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">④統合ファイルの格納先を指定</span></summary>
  <br>

</details>
<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">⑤統合ファイルのファイル名を指定</span></summary>
  <br>

</details>
<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">⑥ファイルをList通りに統合する</span></summary>
  <br>

</details>

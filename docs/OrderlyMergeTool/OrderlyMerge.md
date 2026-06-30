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
' 統合対象フォルダ選択
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

```
' 対象ファイル読み込み
Sub FetchSheetsSortedByName()
Dim mainSheet As Worksheet
Dim listSheet As Worksheet
Dim targetFolder As String
Dim fileName As String
Dim srcWorkbook As Workbook
Dim srcSheet As Worksheet
Dim nextRow As Long
Dim lastRow As Long

    ' 各シートの定義
    Set mainSheet = ThisWorkbook.Sheets("Main")
    Set listSheet = ThisWorkbook.Sheets("List")

    ' MainシートのD2セルからフォルダパスを取得
    targetFolder = mainSheet.Range("D2").Value

    ' パスが空欄の場合のエラーチェック
    If targetFolder = "" Then
        MsgBox "MainシートのD2セルにフォルダパスを入力、または選択してください。", vbCritical, "エラー"
        Exit Sub
    End If

    ' 末尾の「\」の補正
    If Right(targetFolder, 1) <> "\" Then
        targetFolder = targetFolder & "\"
        mainSheet.Range("D2").Value = targetFolder
    End If

    ' 実行前の最終確認
    Dim confirm As VbMsgBoxResult
    confirm = MsgBox("Listシートを初期化し、新しくシート名一覧を取得します。よろしいですか？", vbYesNo + vbQuestion, "実行確認")
    If confirm = vbNo Then Exit Sub

    ' --- 処理スタート ---
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False

    ' ==========================================================
    ' Listシートの1行目以外（2行目~）最終行目まで）を完全に初期化
    ' ==========================================================
    lastRow = listSheet.Cells(listSheet.Rows.Count, "A").End(xlUp).Row
    If lastRow >= 2 Then
        listSheet.Rows("2:" & lastRow).Clear
    End If
    ' ==========================================================

    ' --- VBA標準の配列を使ってファイル名を取り込む ---
    Dim fileList() As String
    Dim fileCount As Long
    fileCount = 0

    fileName = Dir(targetFolder & "*.xls*")
    Do While fileName <> ""
        ' 自分自身のマクロブックは除外
        If fileName <> ThisWorkbook.Name Then
            fileCount = fileCount + 1
            ReDim Preserve fileList(1 To fileCount)
            fileList(fileCount) = fileName
        End If
        fileName = Dir()
    Loop

    ' ファイルが1つも見つからなかった場合は終了
    If fileCount = 0 Then
        Application.ScreenUpdating = True
        Application.DisplayAlerts = True
        MsgBox "対象フォルダ内にExcelファイルが見つかりませんでした。", vbExclamation, "終了"
        Exit Sub
    End If

    ' --- 配列の中身をファイル名順（昇順）に並び替え ---
    Dim i As Long, j As Long
    Dim temp As String
    For i = 1 To fileCount - 1
        For j = i + 1 To fileCount
            If StrComp(fileList(i), fileList(j), vbTextCompare) > 0 Then
                temp = fileList(i)
                fileList(i) = fileList(j)
                fileList(j) = temp
            End If
        Next j
    Next i

    ' --- 並び替えた配列の順番通りにファイルを処理 ---
    nextRow = 2
    For i = 1 To fileCount
        fileName = fileList(i)

        On Error Resume Next
        Set srcWorkbook = Workbooks.Open(fileName:=targetFolder & fileName, ReadOnly:=True)
        On Error GoTo 0

        If Not srcWorkbook Is Nothing Then
            ' 開いたファイルの全シートをループしてListシートへ書き出し
            For Each srcSheet In srcWorkbook.Worksheets
                listSheet.Cells(nextRow, 1).Value = fileName          ' A列：ファイル名
                listSheet.Cells(nextRow, 2).Value = srcSheet.Name     ' B列：現在のシート名
                listSheet.Cells(nextRow, 3).Value = srcSheet.Name     ' C列：変更後のシート名（初期値）

                nextRow = nextRow + 1
            Next srcSheet

            srcWorkbook.Close SaveChanges:=False
            Set srcWorkbook = Nothing
            Set srcSheet = Nothing
        End If
    Next i

    ' 停止していた機能を再開
    Application.ScreenUpdating = True
    Application.DisplayAlerts = True

    MsgBox "「List」シートの2行目以降を初期化し、ファイル名順に最新の一覧を取得しました！", vbInformation, "完了"

End Sub
```

</details>

<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">③Listシート並び替えとリネーム</span></summary>
  <br>
手動作業
</details>

<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">④統合ファイルの格納先を指定</span></summary>
  <br>

```
' 統合ファイルの格納先を指定
Sub SelectOutputFolderToD5()
Dim mainSheet As Worksheet
Dim defaultPath As String
Dim fileDialogObject As FileDialog

    Set mainSheet = ThisWorkbook.Sheets("Main")

    ' 現在D5セルにパスがあればそれを初期位置に、なければD2（読み込み元）を参考にする
    defaultPath = mainSheet.Range("D5").Value
    If defaultPath = "" Then defaultPath = mainSheet.Range("D2").Value
    If defaultPath = "" Then defaultPath = CreateObject("WScript.Shell").SpecialFolders("Desktop")

    Set fileDialogObject = Application.FileDialog(msoFileDialogFolderPicker)

    With fileDialogObject
        .Title = "統合ファイルの格納先（保存先）フォルダを選択してください"
        .InitialFileName = defaultPath

        If .Show = -1 Then
            mainSheet.Range("D5").Value = .SelectedItems(1) & "\"
            MsgBox "格納先フォルダを設定しました！", vbInformation, "設定完了"
        Else
            MsgBox "キャンセルされました。", vbExclamation, "中断"
        End If
    End With

End Sub
```

</details>

<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">⑤統合ファイルのファイル名を指定</span></summary>
  <br>

```
Sub InputNewFileNameToD4()
Dim mainSheet As Worksheet
Dim inputName As String
Dim defaultName As String

    Set mainSheet = ThisWorkbook.Sheets("Main")

    ' 本日の日付（yyyymmdd）を組み合わせたデフォルト値を作る
    defaultName = "統合ファイル_" & Format(Date, "yyyymmdd")

    ' インプットボックスを表示（デフォルト値をセットしておく）
    inputName = InputBox("作成する統合ファイルのファイル名を入力してください。" & vbCrLf & _
                         "（※拡張子 .xlsx は不要です）", "ファイル名の指定", defaultName)

    ' ユーザーが「OK」を押して空欄でなければD4セルに書き込む
    If inputName <> "" Then
        mainSheet.Range("D6").Value = inputName
    Else
        MsgBox "入力がキャンセルされたか、空欄です。", vbExclamation, "中断"
    End If

End Sub
```

</details>

<details>
  <summary><span style="font-size: 1.17em; font-weight: bold;">⑥ファイルをList通りに統合する</span></summary>
  <br>

```
Sub MergeSheetsFromList_Final()
Dim mainSheet As Worksheet
Dim listSheet As Worksheet
Dim inputFolder As String
Dim outputFolder As String
Dim newFileName As String
Dim newWorkbook As Workbook
Dim srcWorkbook As Workbook
Dim srcSheet As Worksheet
Dim lastRow As Long
Dim i As Long
Dim currentFile As String
Dim currentSheet As String
Dim newSheetName As String
Dim copiedSheet As Worksheet
Dim savePath As String

    Set mainSheet = ThisWorkbook.Sheets("Main")
    Set listSheet = ThisWorkbook.Sheets("List")

    ' 画面（Mainシート）から各設定を吸い上げる
    inputFolder = mainSheet.Range("D2").Value
    outputFolder = mainSheet.Range("D5").Value
    newFileName = mainSheet.Range("D6").Value

    ' 入力チェック
    If inputFolder = "" Then
        MsgBox "読み込み元フォルダ（D2セル）が指定されていません。", vbCritical, "エラー"
        Exit Sub
    End If
    If outputFolder = "" Then
        MsgBox "格納先フォルダ（D5セル）が指定されていません。", vbCritical, "エラー"
        Exit Sub
    End If
    If newFileName = "" Then
        MsgBox "統合ファイル名（D6セル）が指定されていません。", vbCritical, "エラー"
        Exit Sub
    End If

    ' Listシートのデータチェック
    lastRow = listSheet.Cells(listSheet.Rows.Count, "A").End(xlUp).Row
    If lastRow < 2 Then
        MsgBox "Listシートにデータがありません。先にSTEP 1を実行してください。", vbCritical, "エラー"
        Exit Sub
    End If

    ' 実行の最終確認
    Dim confirm As VbMsgBoxResult
    confirm = MsgBox("設定された格納先に、Listの順番通りにファイルを統合します。" & vbCrLf & _
                     "ファイル名: " & newFileName & ".xlsx" & vbCrLf & vbCrLf & _
                     "よろしいですか？", vbYesNo + vbQuestion, "実行確認")
    If confirm = vbNo Then Exit Sub

    ' --- 統合処理スタート ---
    Application.ScreenUpdating = False
    Application.DisplayAlerts = False

    ' 新しい空のワークブックを作成
    Set newWorkbook = Workbooks.Add

    ' Listシートの上から順番に処理
    For i = 2 To lastRow
        currentFile = listSheet.Cells(i, 1).Value
        currentSheet = listSheet.Cells(i, 2).Value
        newSheetName = listSheet.Cells(i, 3).Value

        If currentFile <> "" And currentSheet <> "" Then
            On Error Resume Next
            ' 読み込みは「inputFolder」から
            Set srcWorkbook = Workbooks.Open(fileName:=inputFolder & currentFile, ReadOnly:=True)
            On Error GoTo 0

            If Not srcWorkbook Is Nothing Then
                On Error Resume Next
                Set srcSheet = srcWorkbook.Worksheets(currentSheet)
                On Error GoTo 0

                If Not srcSheet Is Nothing Then
                    srcSheet.Copy After:=newWorkbook.Sheets(newWorkbook.Sheets.Count)
                    Set copiedSheet = newWorkbook.Sheets(newWorkbook.Sheets.Count)

                    If newSheetName <> "" Then
                        copiedSheet.Name = Left(newSheetName, 31)
                    End If
                End If
                srcWorkbook.Close SaveChanges:=False
                Set srcWorkbook = Nothing
                Set srcSheet = Nothing
            End If
        End If
    Next i

    ' 初期シート（Sheet1など）の削除
    Dim ws As Worksheet
    On Error Resume Next
    For Each ws In newWorkbook.Worksheets
        If newWorkbook.Worksheets.Count > 1 And (ws.Name = "Sheet1" Or ws.Name = "シート1") Then
            ws.Delete
        End If
    Next ws
    On Error GoTo 0

    ' 保存は「outputFolder」へ
    savePath = outputFolder & newFileName & ".xlsx"

    newWorkbook.SaveAs fileName:=savePath, FileFormat:=xlOpenXMLWorkbook
    newWorkbook.Close SaveChanges:=False

    Application.ScreenUpdating = True
    Application.DisplayAlerts = True

    MsgBox "ファイルの統合が完了しました！" & vbCrLf & vbCrLf & _
           "格納先：" & savePath, vbInformation, "完了"

End Sub
```

</details>

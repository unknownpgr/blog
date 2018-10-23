# Github blog
Trying to make custom static blog engine-not jekyll  
Site(Blog) : [https://unknownpgr.github.io/blog/](https://unknownpgr.github.io/blog/)
Site(Editor) : [https://unknownpgr.github.io/blog/editor/editor.html](https://unknownpgr.github.io/blog/editor/editor.html)

## 개발 방향
- md파일들은 따로 모아둔다.  
- 헤더, 푸터 등 역시 따로 구현한다.  
- 블로그에 표시되는 파일은 전부 같은 파일인데, 오직 가리키는 포스트의 주소만 다르다. query로 javascript에서 파싱하면 될 것 같다. 나머지는 전부 javascript로 구현하자.  
- 이렇게 하면 로컬에서 테스트하기가 편리하다. Bracket 하나만 가지고도 테스트가 가능하므로.  
- 한 개의 포스트는 여러 개의 태그를 가질 수 있다.

- - - 

## 웹페이지 구현

### 메인 페이지
- 표시할 내용 : 자기소개, 공지사항, 최근 글 등.

### 포스트 카테고리
- 카티고리 목록은 json파일로 구현, jquery로 로드해서 사용한다.
- 로컬에서 자동으로 정리하는 프로그램을 작성. 
- 사이드바로 구현

### 포스트 목록
- 아래쪽에 그냥 퓨어하게 구현.

## 블로그 관리자 구현

### 관리자
- OS에 종속적이지 않기를 바라므로 nodejs로 작성함. nodejs로 작성하면, 나중에 브라우저로 접근가능하도록 만들기 편하다는 장점도 있다.
- 필요한 정보 : 태그 목록, 글 목록. 태그에 따른 글 목록을 복수 생성하는 것이 가장 좋은 것 같다. + 전체 글 목록. 용량이 크진 않을 것 같다.
- 블로그에 글을 작성하면, 정보가 담긴 json파일을 업데이트함.
- 블로그의 포스팅 하나는 한 개의 폴더로 이뤄짐. 이미지나 리소스(파일)은 img,res폴더를 만들어 관리함.(상대 경로 참조 가능.)
- 각 포스트는 info.json파일이 있어서, 정보를 담도록 하자.
- 블로그 관리자는, 각 폴더를 읽어 게시글의 제목과 태그 등등을 저장하여 json파일로 만든다. 생각해봤는데, 전수 검사하는 것 말고는 딱히 방법이 없는 것 같다.


### info.json File
- 게시글의 제목 - 포스트 제일 위에 표시되거나 리스트에 보이는 제목
- 게시글의 태그 - 태그or카테고리

### list.json
- ID에 따른 제목의 배열(전체글보기에 이용)
- 태그에 따른 ID들의 배열

## 편집기 구현

### 편집기
- 클라이언트단에서 NodeJS를 이용 LocalHost 서버를 열어, 웹브라우저에서 작업가능하게 만듬.
- 한 쪽에서 마크다운을 이용하여 작성하면 다른 쪽에서 자동 렌더링.
- 만약 시간이 많이 걸린다면, 탭을 이용하여 구현함.
- 이미지는 드래그 앤 드롭이나 input등을 이용하여 구현
- 서버 측에서 미리 태그를 읽어 와 가능한 태그들을 보여 줌.
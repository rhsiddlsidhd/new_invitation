# PR 작성 및 코드리뷰 워크플로우

## Claude Code 사용 가이드

### 1. 커밋 생성
```bash
# Claude에게 요청
"현재 변경사항을 분석하고 적절한 커밋 메시지로 커밋해줘"
```

**Claude가 수행하는 작업:**
- `git status`로 변경 파일 확인
- `git diff`로 변경 내용 분석
- `git log`로 기존 커밋 스타일 파악
- 적절한 커밋 메시지 생성
- `git commit -m "message"`로 커밋

### 2. PR 생성
```bash
# Claude에게 요청
"dev 브랜치에서 master로 PR을 생성해줘.
제목: refactor: reorganize to domain-driven architecture"
```

**Claude가 수행하는 작업:**
- `git log master...dev`로 전체 변경사항 확인
- PR 본문 작성 (Summary, Test plan)
- `gh pr create`로 PR 생성
- PR URL 반환

### 3. 코드리뷰
```bash
# Claude에게 요청 (방법 1: 자동 분석)
"이번 PR의 코드 품질을 분석하고 개선점을 제안해줘"

# Claude에게 요청 (방법 2: 특정 파일)
"src/domains/auth/ 디렉토리의 코드를 리뷰해줘"

# Claude에게 요청 (방법 3: PR 코멘트 확인)
"PR #123의 리뷰 코멘트를 확인하고 수정사항을 반영해줘"
```

### 4. PR 수정 및 업데이트
```bash
# Claude에게 요청
"리뷰 코멘트에 따라 코드를 수정하고 커밋해줘"
```

## GitHub CLI 명령어 (수동 사용)

### PR 생성
```bash
gh pr create --title "제목" --body "내용"
```

### PR 목록 확인
```bash
gh pr list
```

### PR 상세 확인
```bash
gh pr view 123
```

### PR 코멘트 확인
```bash
gh pr view 123 --comments
```

### PR 체크아웃
```bash
gh pr checkout 123
```

### PR 머지
```bash
gh pr merge 123
```

## 실전 팁

### 1. 브랜치 전략
```bash
# 기능 브랜치 생성
git checkout -b feature/new-feature

# 작업 후 커밋
"변경사항을 커밋해줘"

# PR 생성
"feature/new-feature 브랜치에서 dev로 PR을 생성해줘"
```

### 2. 컨벤션 자동 적용
```bash
# Claude가 프로젝트의 커밋 컨벤션을 자동으로 파악
"최근 커밋 스타일을 참고해서 커밋해줘"
```

### 3. 상세한 PR 작성
```bash
"다음 내용을 포함해서 PR을 작성해줘:
- 변경사항 요약
- 스크린샷 (필요시)
- 테스트 방법
- 체크리스트"
```

### 4. 자동 리뷰 요청
```bash
# PR 생성 후 특정 리뷰어 지정
gh pr create --reviewer username1,username2
```

## 현재 프로젝트 상황

**작업 내용:**
- `src/actions/` → `src/domains/*/actions/`로 재구성
- 도메인별 구조 개선 (auth, guestbook, invitation, user)
- 공통 유틸리티를 `src/shared/`로 이동
- 사용하지 않는 hooks 및 store 정리

**다음 단계:**
1. 변경사항 커밋
2. dev → master PR 생성
3. 코드 리뷰 받기
4. 리뷰 반영 후 머지

/* =========================================================================
   포트폴리오 콘텐츠 데이터
   -------------------------------------------------------------------------
   ★ 여기에 유튜브 / 인스타그램 링크를 채워 넣으면 됩니다.

   - url 에 링크만 붙여넣으면 유튜브 썸네일은 자동으로 만들어집니다.
   - url 을 "" (빈칸) 으로 두면 시안처럼 빈 카드로 보입니다.
   - title / tags / date 는 안 써도 됩니다. (쓰면 카드 아래에 표시)
   - 인스타그램은 썸네일을 자동으로 못 가져와서, thumb 에 이미지 경로를
     적어주세요. 예) thumb: "assets/img/ig-1.jpg"
   - 카드를 더 늘리고 싶으면 { } 블록을 복사해서 밑에 붙여넣으면 됩니다.

   ※ 브라우저 주소 끝에 #edit 을 붙이면 화면에서 바로 입력할 수도 있습니다.
      (자세한 건 README.md 참고)
   ========================================================================= */

const PORTFOLIO_DATA = {

  /* ── LONG-FORM : 대표 작업 6칸 ─────────────────────────────── */
  longform_featured: [
    { url: "https://www.youtube.com/watch?v=ZZxYgiy1azY", views: "508", title: "8년만에 다시 찾은 제주도 우정여행 근데 사고로 렉카 40만원 삥 뜯김 ㅋ 하지만 즐거웠다 원래 인생공부는 비싼거라고 | 그리고 서귀포 숙소추천 돈내코힐리조트", tags: [], date: "2025.01.23", thumb: "" },
    { url: "https://www.youtube.com/watch?v=xLjLpAQMLSo", views: "570", title: "일본 오타쿠 쇼핑 하울 ദ്ദി ˉ͈̀꒳ˉ͈́ )✧ 거기에 일본 찐 꿀템 비추템 ~ | 산리오 리락쿠마 치이카와 먼작귀 다마고치 몬치치 히퍼", tags: [], date: "2025.12.31", thumb: "" },
    { url: "https://www.youtube.com/watch?v=p5NWl37IA0k", views: "1만", title: "1300세대가 넘는데 전세가 씨가 말랐음 _ 관리 잘된 정관신도시 이지더원3차 26평 고층 전세", tags: [], date: "2026.03.28", thumb: "" },
    { url: "https://www.youtube.com/watch?v=0E1bimbSdWM", views: "5.1천", title: "부산아파트, 다 하이엔드나 고급들만 즐비하는 건 아니니깐!! 금액대비 수익이 괜찮고 접근할수있는 분양권 뭐가 있가있을까? [feat. 울산 경남]", tags: [], date: "2026.01.30", thumb: "" },
    { url: "https://www.youtube.com/watch?v=JwIrAgrqpfE", views: "1.2천", title: "진짜 가성비 잡았고 분위기는 한폭의 수채화같은 스시집 | 신장개업 _ 스시미르네 경주점", tags: [], date: "2024.09.06", thumb: "" },
    { url: "https://www.youtube.com/watch?v=KFM3Ugv4fps", views: "458", title: "부산의밤 _ 나는 여기가 너무 좋다", tags: [], date: "2024.12.17", thumb: "" }
  ],

  /* ── LONG-FORM : Youtube 채널별 작업 ───────────────────────── */
  channels: [
    {
      name: "부식이TV",
      desc: "아파트 재개발 오피스텔 부동산 현장 임장",
      logo: "assets/img/ch-busik.jpg",              // 채널 프로필 이미지
      link: "https://www.youtube.com/@busik_iTV",   // 채널 주소
      items: [
      { url: "https://www.youtube.com/watch?v=w3aK3cYV82k", views: "5.2천", title: "프라이빗하게 고급스럽고 호화스러운 해운대 고급빌라 _ 클리프턴해운대", tags: [], date: "2026.04.10", thumb: "" },
      { url: "https://www.youtube.com/watch?v=_9JBEmryHb0", views: "1.5천", title: "와... 이건 진짜 로망 그자체 단독주택인데 이렇게 활용한다면 너무 좋다", tags: [], date: "2026.07.11", thumb: "" },
      { url: "https://www.youtube.com/watch?v=Di2YYDHm3HU", views: "8.7천", title: "에코델타시티디에트르더퍼스트 84C 탑복층 _ 구조 엄청 좋다!! 하지만 복층이 분양가 2억의 가치를 할까?", tags: [], date: "2026.04.25", thumb: "" },
      { url: "https://www.youtube.com/watch?v=mSTz5vO1lcE", views: "9.4천", title: "새아파트에 8000만원 태우면 생기는 엄청난 변화 _ 신문더샵그리니티 ㅣ 디자인헤이", tags: [], date: "2026.07.16", thumb: "" },
      { url: "https://www.youtube.com/watch?v=Yz9EtGRlFO0", views: "2.7천", title: "전월세 매물이 씨가 마른 동네!!!! 정관 계룡리슈빌 39평 복층인데 셀프인테리어로 이게 구현이 가능하다고???", tags: [], date: "2026.07.03", thumb: "" },
      { url: "https://www.youtube.com/watch?v=Q64QRpY9HTE", views: "1.1만", title: "사직자이 _ 풀테리어를 했다는데... 어떨까? 그리고 사직동에 찐부자들이 사는 아파트라고 소문 났던데....", tags: [], date: "2026.05.21", thumb: "" },
      { url: "https://www.youtube.com/watch?v=HGDREsGb60I", views: "1.3만", title: "그때는 이게 되겠나? 했는데 지금으ㄴ.... 진짜 부잣집이다 _ 해운대상지카일룸", tags: [], date: "2026.04.08", thumb: "" },
      { url: "https://www.youtube.com/watch?v=6HtZm_N9vwE", views: "1.4천", title: "오사카 단독주택 _ 다들 한번씩 꿈꿔봤잖아요!! 단독주택,  이민!!", tags: [], date: "2026.03.21", thumb: "" },
      { url: "https://www.youtube.com/watch?v=VU_YPjihdKI", views: "4.5천", title: "어지간한 60평대, 부럽지않은 8억대 53평 월영마린애시앙!!!", tags: [], date: "2026.03.10", thumb: "" },
      { url: "https://www.youtube.com/watch?v=yg1U54qefk4", views: "1.7만", title: "부산가성비아파트 _ 4억대부터 실거주하면서 오를 부산아파트 한번에 보기", tags: [], date: "2026.02.08", thumb: "" },
      { url: "https://www.youtube.com/watch?v=m22EiO8RbuI", views: "700", title: "대출이자가 2%라는 도쿄에서 빌딩을 살려면.... ㅣ 실제 비용 및 수익률 모두 공개", tags: [], date: "2026.01.09", thumb: "" },
      { url: "https://www.youtube.com/watch?v=sK236ar7BSQ", views: "5.6천", title: "해링턴플레이스 명륜역 _ 입지 참 좋습니다!! 근데 구조는 더 좋네", tags: [], date: "2025.11.06", thumb: "" },
      { url: "https://www.youtube.com/watch?v=0gXN0thh2wA", views: "5.4천", title: "와... 진짜 이게 되네!!! 47평!! 이게 셀프인테리어 라구요 | feat. 두열매", tags: [], date: "2025.11.05", thumb: "" }
      ]
    },
    {
      name: "자영업자의길",
      desc: "자영업 창업 성공과 실패 인터뷰",
      logo: "assets/img/ch-venture.jpg",
      link: "https://www.youtube.com/@venture_gil",
      items: [
      { url: "https://www.youtube.com/watch?v=IXsPYCp9v7c", views: "1.5천", title: "창업 3년차, 제발 한팀이라도 오길 바랬는데 어느덧 매장 3개가 되었어요 _ 악덕사장", tags: [], date: "2024.04.12", thumb: "" },
      { url: "https://www.youtube.com/watch?v=065ZEx1ulCE", views: "539", title: "인생 바닥에서 여기까지 7년 걸렸어요 _ 태라온하우스", tags: [], date: "2024.03.21", thumb: "" },
      { url: "https://www.youtube.com/watch?v=dk62bvSeBoQ", views: "1.1천", title: "목숨걸고 일하면 얼마나 벌수있을까?", tags: [], date: "2024.03.28", thumb: "" },
      { url: "https://www.youtube.com/watch?v=HRVGpGliTKk", views: "1.1천", title: "성악가출신 이삿짐업체대표가 말하는 편견을 이겨낸 이사의 길", tags: [], date: "2024.02.03", thumb: "" }
      ]
    },
    {
      name: "신장개업",
      desc: "신상 오픈 가게만 찾아가는 탐방기",
      logo: "assets/img/ch-newopen.jpg",
      link: "https://www.youtube.com/@newopencongratulation",
      items: [
      { url: "https://www.youtube.com/watch?v=bQmmoKtCiMs", views: "1천", title: "서면가면 무조건 한번 먹어보세요 _ 부식이 20년단골집 묵은지돼지김치찌개", tags: [], date: "2025.05.19", thumb: "" },
      { url: "https://www.youtube.com/watch?v=IW0vCDgmJzc", views: "713", title: "이제 맛으로 불이 납니다!!! 가성비로 즐기는 일본감성 야끼니꾸 _ 모토이시서면", tags: [], date: "2025.02.12", thumb: "" },
      { url: "https://www.youtube.com/watch?v=mlE2FM6Z2oc", views: "937", title: "고정점 광안 _ 단일메뉴에 분위기 인테리어까지 광안리살면 좋겠다", tags: [], date: "2025.01.09", thumb: "" },
      { url: "https://www.youtube.com/watch?v=KFM3Ugv4fps", views: "458", title: "부산의밤 _ 나는 여기가 너무 좋다", tags: [], date: "2024.12.17", thumb: "" },
      { url: "https://www.youtube.com/watch?v=9fMUP_C6E-U", views: "2.8천", title: "대연동 사는 사람들 좋겠다 이렇게 맛있는 곳이 있어서 | 주의 : ㅈ나 맛있음", tags: [], date: "2024.09.13", thumb: "" },
      { url: "https://www.youtube.com/watch?v=JwIrAgrqpfE", views: "1.2천", title: "진짜 가성비 잡았고 분위기는 한폭의 수채화같은 스시집 | 신장개업 _ 스시미르네 경주점", tags: [], date: "2024.09.06", thumb: "" },
      { url: "https://www.youtube.com/watch?v=aDQfjh_zCwY", views: "2.6천", title: "여기는 무조건 네발로 기어나옵니다 : 근데 민물장어가 가격도 쌈 | 대한풍천장어", tags: [], date: "2024.07.28", thumb: "" },
      { url: "https://www.youtube.com/watch?v=Dw8ba4U5YJs", views: "2.9천", title: "지리는 장작구이 통닭구이집 생김 _ feat 택제이 | 서군장작 용호직영점", tags: [], date: "2024.05.27", thumb: "" },
      { url: "https://www.youtube.com/watch?v=BLHD3y-9WWM", views: "3.7천", title: "부산낙곱새맛집 은 여깁니다 _ 이낙에산다 부산역점", tags: [], date: "2024.05.04", thumb: "" },
      { url: "https://www.youtube.com/watch?v=cH3GamtX4ac", views: "532", title: "동래에서 이런 인테리어와 이런 음식은 없었습니다 _ 종착역 동래점 | 신장개업", tags: [], date: "2024.04.19", thumb: "" },
      { url: "https://www.youtube.com/watch?v=d-18BB-oupg", views: "738", title: "산적화로구이 _ 광안리해변이 보이는 곳에서 이가격이라니 미친거 같아요", tags: [], date: "2024.04.15", thumb: "" },
      { url: "https://www.youtube.com/watch?v=G4injAWXbmY", views: "2.9천", title: "진짜 김해사시는 분들은 좋겠다 _ 술자리도 좋고 해장하기에 좋은 임금님 수라상이 있어서 [이도탕반]", tags: [], date: "2024.03.19", thumb: "" },
      { url: "https://www.youtube.com/watch?v=v7d8oMvfOG8", views: "2.5천", title: "부산 아니 전국1등 갈매기살 _ ㅈㄴ 맛있음", tags: [], date: "2024.03.09", thumb: "" },
      { url: "https://www.youtube.com/watch?v=NJJlb3ssIeg", views: "632", title: "진빼이 맛집 찾았습니다 _ 북해식한우철판샤브 트로피", tags: [], date: "2024.02.29", thumb: "" },
      { url: "https://www.youtube.com/watch?v=tVBkBYEFPo8", views: "934", title: "다찌에서 즐기는 소고기와 돼지고기의 대환장파티 _ 금빛화로 해운대점", tags: [], date: "2024.01.25", thumb: "" }
      ]
    },
    {
      name: "이게마케팅",
      desc: "헬스장 온라인 광고 · 블로그 바이럴 마케팅",
      logo: "assets/img/ch-marketing.jpg",
      link: "https://www.youtube.com/@direct4272",
      items: [
      { url: "https://www.youtube.com/watch?v=xrOc0YdOKcw", views: "435", title: "헬스장 마케팅 전단지 광고 vs 온라인 블로그 마케팅 어떻게 해야할지 모르겠다고요? 헬스장 광고 하기전 꿀팁 대방출", tags: [], date: "2024.08.09", thumb: "" },
      { url: "https://www.youtube.com/watch?v=geiZQKyFtW0", views: "1.3천", title: "헬스장 마케팅 효과 볼려면", tags: [], date: "2024.08.01", thumb: "" }
      ]
    }
  ],

  /* ── LONG-FORM : Online Course ─────────────────────────────── */
  online_courses: [
    {
      name: "프드프",
      desc: "일반인 대상 AI 온라인 강의 플랫폼",
      logo: "assets/img/ch-pudufu.jpg",
      link: "https://pudufu.co.kr",
      items: [
        { url: "https://pudufu.co.kr/home/pdf_detail_page/652", role: "일부 회차 편집", title: "단 하루만에, 왕초보 AI 툴 10개 정복기", tags: [], date: "", thumb: "assets/img/course-pudufu-1.jpg" },
        { url: "https://pudufu.co.kr/home/pdf_detail_page/655", role: "일부 회차 편집", title: "연애유지와 재회의 원리 (완전판)", tags: [], date: "", thumb: "assets/img/course-pudufu-2.jpg" }
      ]
    },
    {
      name: "이상한마케팅 아카데미",
      desc: "사업자를 위한 마케팅 온라인 강의",
      logo: "assets/img/ch-isang.jpg",
      link: "https://lms.isanghanacademy.co.kr/",
      items: [
        { url: "https://lms.isanghanacademy.co.kr/course/25", role: "일부 회차 편집", title: "2027 초자립 사업자 마케팅 All in One", tags: [], date: "", thumb: "assets/img/course-isang-1.jpg" },
        { url: "https://lms.isanghanacademy.co.kr/course/7", role: "일부 회차 편집", title: "병원 마케팅 All-in-One 강의", tags: [], date: "", thumb: "assets/img/course-isang-2.jpg" }
      ]
    }
  ],

  /* ── SHORT-FORM : 릴스 / 쇼츠 (세로 영상) ──────────────────── */
  shortform: [
    { url: "https://www.instagram.com/reel/DYmIRpJPVFP/", title: "여름 산책 위험 습관 3가지", views: "", thumb: "assets/img/sf-1.jpg" },
    { url: "https://www.instagram.com/reel/DbXsEdLsOQ2/", title: "예방접종 한 번에 다 맞히면 안 되는 이유", views: "1.9천", thumb: "assets/img/sf-2.jpg" },
    { url: "https://www.instagram.com/reel/DbAcEe7MVTW/", title: "강아지 발바닥 꼬순내 방치하면 안 되는 이유", views: "", thumb: "assets/img/sf-3.jpg" },
    { url: "https://www.instagram.com/reel/DZ4fEZTNVpI/", title: "강아지 간식 켁켁, 골든타임 3분 대처법", views: "", thumb: "assets/img/sf-4.jpg" },
    { url: "https://www.instagram.com/reel/DYg0K19JgY7/", title: "수의사가 권장하는 산책법 '스니파리'", views: "", thumb: "assets/img/sf-5.jpg" },
    { url: "https://www.instagram.com/reel/DWGT6F4jJeK/", title: "반려견 상식 수의학적 팩트 체크", views: "", thumb: "assets/img/sf-6.jpg" },
    { url: "https://www.instagram.com/reel/DaZUoqNvPxE/", title: "치아 수명을 갉아먹는 습관", views: "", thumb: "assets/img/sf-7.jpg" },
    { url: "https://www.instagram.com/reel/Da1efnVBHrT/", title: "올바른 백태 관리법", views: "", thumb: "assets/img/sf-8.jpg" },
    { url: "https://www.instagram.com/reel/DZLr5NxzY84/", title: "물리치료사가 몸값 높이는 현실적인 방법", views: "", thumb: "assets/img/sf-9.jpg" },
    { url: "https://www.instagram.com/reel/DY3IF4Hz82Z/", title: "필라테스 강사 몇 살까지 가능할까", views: "", thumb: "assets/img/sf-10.jpg" },
    { url: "https://www.instagram.com/reel/DYREUH-RxXi/", title: "필라테스 자격증, 왕초보도 가능합니다", views: "", thumb: "assets/img/sf-11.jpg" },
    { url: "https://www.instagram.com/reel/DYDxf-qz14N/", title: "무용·체육 전공자의 졸업 후 현실", views: "", thumb: "assets/img/sf-12.jpg" },
    { url: "https://www.instagram.com/reel/DXGZIA4gnvi/", title: "필라테스 강사 자격증, 생각보다 괜찮습니다", views: "", thumb: "assets/img/sf-13.jpg" },
    { url: "https://www.instagram.com/reel/DUNfJdfEw0j/", title: "근력 상위 1% 도전", views: "", thumb: "assets/img/sf-14.jpg" },
    { url: "https://www.instagram.com/reel/DWMEainEyMI/", title: "다이어트 캠프 진행중", views: "", thumb: "assets/img/sf-15.jpg" },
    { url: "https://www.youtube.com/shorts/ORNrWDvh8sw", title: "물리치료사 창업? 가능한 현실적인 방법", views: "1.5천", thumb: "" }
  ],

  /* ── SELF-INITIATED : 직접 운영하는 유튜브 ─────────────────── */
  self_youtube: {
    handle: "ohmy옴마",
    desc: "다이어리 문구 일상 기록 브이로그",
    logo: "assets/img/ch-ohmy.jpg",
    link: "https://www.youtube.com/@ohmy",
    stats: [
      { label: "구독자", value: "2.1천" },
      { label: "누적조회수", value: "40만" },
      { label: "영상수", value: "50+" }
    ],
    note: "콘텐츠 아이디어를 직접 기획하고,\n촬영, 편집하고, 디자인, 업로드와\n채널 운영까지 모든 과정을\n경험했습니다",

    /* 세로 영상(쇼츠) — 가로 영상 줄 아래에 표시됩니다 */
    reels: [
      { url: "https://www.youtube.com/shorts/uROvKLECxpQ", title: "지수 x 헬로키티 인형 키링 랜덤깡", views: "2.5천", thumb: "" },
      { url: "https://www.youtube.com/shorts/bYIxPfFLkmw", title: "치이카와 먼작귀 랜덤깡", views: "91", thumb: "" },
      { url: "https://www.youtube.com/shorts/RyNT-j5UPiw", title: "먼작귀 모니터 피규어 랜덤깡", views: "2.3천", thumb: "" },
      { url: "https://www.youtube.com/shorts/9OIgOrDiSk8", title: "다이소 신상 퀄팅·패턴 북커버", views: "4.9만", thumb: "" },
      { url: "https://www.youtube.com/shorts/2uhPMOonyTs", title: "다이소 x 루카랩 신상 다이어리", views: "8.3천", thumb: "" }
    ],

    items: [
      { url: "https://www.youtube.com/watch?v=yG31z6P68vk", views: "1.7천", title: "1년동안 썼던 8권의 다이어리 | 2025 기록회고", tags: ["다이어리", "기록"], date: "", thumb: "" },
      { url: "https://www.youtube.com/watch?v=YvSZam7wCpo", views: "617", title: "2026 메인 다이어리 셋업", tags: ["다이어리셋업"], date: "", thumb: "" },
      { url: "https://www.youtube.com/watch?v=0vrjHbXiQgA", views: "1.5천", title: "2026년에 쓸 다이어리 10권 소개", tags: ["다이어리추천"], date: "", thumb: "" },
      { url: "https://www.youtube.com/watch?v=xLjLpAQMLSo", views: "570", title: "일본 오타쿠 쇼핑 하울", tags: ["하울", "일본여행"], date: "", thumb: "" },
      { url: "https://www.youtube.com/watch?v=vMtGj5Chz6c", views: "6.4천", title: "다이소 다이어리 리폼 | 2026 다이어리 준비", tags: ["다이소", "리폼"], date: "", thumb: "" }
    ]
  },

  /* ── SELF-INITIATED : 옴마 인스타그램 ──────────────────────── */
  self_instagram_ohmy: {
    handle: "omma._.ohmy",
    desc: "같은 듯 다른 일상을 특별하게 · 다이어리 다꾸 기록",
    logo: "assets/img/ch-ommaig.jpg",
    link: "https://www.instagram.com/omma._.ohmy/",
    stats: [
      { label: "팔로우", value: "1,685" },
      { label: "게시물", value: "87" }
    ],
    items: [
      { url: "https://www.instagram.com/reel/DcTYWdTTdNI/", title: "발바닥 받쳐주는 양말", views: "1.4천", thumb: "assets/img/ig-ohmy-1.jpg" },
      { url: "https://www.instagram.com/reel/Db7LBgBTUA6/", title: "약속 없는 날 뭐할까", views: "", thumb: "assets/img/ig-ohmy-2.jpg" },
      { url: "https://www.instagram.com/reel/Dbngg-Xzh2i/", title: "새 옷 입고 혼자 놀기", views: "", thumb: "assets/img/ig-ohmy-3.jpg" },
      { url: "", title: "", thumb: "" },
      { url: "", title: "", thumb: "" },
      { url: "", title: "", thumb: "" }
    ]
  },

  /* ── SELF-INITIATED : 직접 운영하는 인스타그램 ─────────────── */
  self_instagram: {
    handle: "dan_jiairy",
    desc: "혼자 떠나는 여행 정보 브이로그",
    logo: "assets/img/ch-dan.jpg",
    link: "https://www.instagram.com/dan_jiairy/",
    stats: [
      { label: "팔로우", value: "234" },
      { label: "최대조회수", value: "184만" }
    ],
    items: [
      { url: "https://www.instagram.com/reel/DJlTYl1TzZW/", title: "타투 절대 하지 마세요", views: "184만", thumb: "assets/img/ig-1.jpg" },
      { url: "https://www.instagram.com/reel/DJYcv7wTGGY/", title: "'좋아'를 거꾸로 읽어봅시다", views: "19.2만", thumb: "assets/img/ig-2.jpg" },
      { url: "https://www.instagram.com/reel/DJ1mNIXTxd9/", title: "왕복 7만원 일본 항공권 특가", views: "6.1천", thumb: "assets/img/ig-3.jpg" },
      { url: "https://www.instagram.com/reel/DJskygyzAiN/", title: "혼자 해봐야 하는 것 50가지", views: "4.2천", thumb: "assets/img/ig-4.jpg" },
      { url: "https://www.instagram.com/reel/DNchtDoTxQQ/", title: "20대 되기 전 꼭 해야 할 것", views: "2.5천", thumb: "assets/img/ig-5.jpg" },
      { url: "https://www.instagram.com/reel/DNdCizJzygW/", title: "자존감 채우는 방법", views: "2.2천", thumb: "assets/img/ig-6.jpg" }
    ]
  },

  /* ── BRAND PROJECT ─────────────────────────────────────────── */
  brand: [
    { label: "01 BRAND", sub: "BX / BI", url: "", thumb: "assets/img/brand-1.jpg" },
    { label: "02 WEBSITE", sub: "UI / UX", url: "https://hiddenday-web.vercel.app", thumb: "assets/img/brand-2.jpg" },
    { label: "03 WEBSITE", sub: "UI / UX", url: "https://yoonnnnnnnnnnnnnnnnn.github.io/hiddenday/", thumb: "assets/img/brand-3.jpg" }
  ]
};

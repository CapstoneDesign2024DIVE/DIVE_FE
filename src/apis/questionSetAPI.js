import { useQuery } from "@tanstack/react-query";
import api from "@utils/axios";

const mockQuestionSets = [
  {
    id: 1,
    imageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
    username: "dev_hong",
    nickname: "프론트엔드 홍",
    refCount: 42,
    title: "프론트엔드 기술 면접 필수 질문",
    description:
      "React, JavaScript, TypeScript 등 프론트엔드 개발자가 알아야 할 핵심 질문들을 정리했습니다.",
    category: "Frontend",
    questions: [
      { id: 1, contents: "React의 생명주기에 대해 설명해주세요." },
      { id: 2, contents: "클로저란 무엇인가요?" },
    ],
    open: true,
    createdAt: "2024-03-15T09:00:00Z",
  },
  {
    id: 2,
    imageUrl: "https://randomuser.me/api/portraits/women/1.jpg",
    username: "backend_kim",
    nickname: "백엔드 김",
    refCount: 35,
    title: "Java Spring 면접 대비 질문",
    description:
      "Spring Framework, JPA, 디자인 패턴 등 백엔드 개발자 면접 필수 질문 모음입니다.",
    category: "Backend",
    questions: [
      { id: 3, contents: "스프링의 IoC란 무엇인가요?" },
      { id: 4, contents: "JPA N+1 문제란 무엇인가요?" },
    ],
    open: true,
    createdAt: "2024-03-14T15:30:00Z",
  },
  {
    id: 3,
    imageUrl: "https://randomuser.me/api/portraits/men/2.jpg",
    username: "devops_lee",
    nickname: "데브옵스 이",
    refCount: 28,
    title: "DevOps 엔지니어 면접 질문",
    description:
      "Docker, Kubernetes, CI/CD 등 데브옵스 엔지니어 면접에서 자주 나오는 질문들입니다.",
    category: "DevOps",
    questions: [
      { id: 5, contents: "컨테이너와 가상머신의 차이점은?" },
      { id: 6, contents: "무중단 배포란 무엇인가요?" },
    ],
    open: true,
    createdAt: "2024-03-13T11:20:00Z",
  },
  {
    id: 4,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "testuser",
    nickname: "testuser",
    refCount: 15,
    title: "나만의 리액트 면접 질문",
    description:
      "리액트 개발자 면접을 위해 제가 직접 정리한 질문들입니다. 실제 면접에서 받았던 질문들 위주로 구성했어요.",
    category: "Frontend",
    questions: [
      { id: 7, contents: "리액트의 상태관리 방법들에 대해 설명해주세요." },
      { id: 8, contents: "리액트의 렌더링 최적화 방법은?" },
    ],
    open: false,
    createdAt: "2024-03-12T16:45:00Z",
  },
  {
    id: 5,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "testuser",
    nickname: "testuser",
    refCount: 8,
    title: "CS 기본 면접 질문 모음",
    description:
      "운영체제, 네트워크, 자료구조 등 전산학 기본 지식 면접 질문을 정리했습니다.",
    category: "CS",
    questions: [
      { id: 9, contents: "프로세스와 스레드의 차이는?" },
      { id: 10, contents: "TCP와 UDP의 차이점은?" },
    ],
    open: true,
    createdAt: "2024-03-11T13:15:00Z",
  },
  {
    id: 6,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "testuser",
    nickname: "testuser",
    refCount: 12,
    title: "자바스크립트 심화 질문",
    description:
      "자바스크립트의 심화 개념들을 다루는 면접 질문들입니다. 프로토타입, 이벤트 루프 등을 포함합니다.",
    category: "Frontend",
    questions: [
      { id: 11, contents: "이벤트 루프란 무엇인가요?" },
      { id: 12, contents: "프로토타입 체이닝이란?" },
    ],
    open: true,
    createdAt: "2024-03-10T09:30:00Z",
  },
  {
    id: 7,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "testuser",
    nickname: "testuser",
    refCount: 5,
    title: "iOS 개발자 면접 준비",
    description:
      "iOS 개발자 면접을 위한 Swift, UIKit, SwiftUI 관련 주요 질문들을 정리했습니다.",
    category: "iOS",
    questions: [
      {
        id: 13,
        contents:
          "Swift의 ARC(Automatic Reference Counting)에 대해 설명해주세요.",
      },
      { id: 14, contents: "UIKit과 SwiftUI의 차이점은 무엇인가요?" },
    ],
    open: false,
    createdAt: "2024-03-09T14:20:00Z",
  },
  {
    id: 8,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "testuser",
    nickname: "testuser",
    refCount: 18,
    title: "백엔드 시스템 설계 질문",
    description:
      "대규모 시스템 설계와 관련된 백엔드 아키텍처 면접 질문들입니다.",
    category: "Backend",
    questions: [
      { id: 15, contents: "마이크로서비스 아키텍처의 장단점은 무엇인가요?" },
      { id: 16, contents: "데이터베이스 샤딩(Sharding)에 대해 설명해주세요." },
      { id: 17, contents: "캐시 전략들에 대해 설명해주세요." },
    ],
    open: true,
    createdAt: "2024-03-08T11:30:00Z",
  },
  {
    id: 9,
    imageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
    username: "testuser",
    nickname: "testuser",
    refCount: 7,
    title: "안드로이드 코틀린 면접 질문",
    description:
      "안드로이드 개발자를 위한 Kotlin과 Android Framework 관련 면접 질문입니다.",
    category: "Android",
    questions: [
      { id: 18, contents: "코틀린의 코루틴(Coroutine)에 대해 설명해주세요." },
      { id: 19, contents: "Android Jetpack Compose의 장점은 무엇인가요?" },
      { id: 20, contents: "안드로이드의 생명주기에 대해 설명해주세요." },
      { id: 21, contents: "코틀린의 코루틴(Coroutine)에 대해 설명해주세요." },
      { id: 22, contents: "Android Jetpack Compose의 장점은 무엇인가요?" },
      { id: 23, contents: "안드로이드의 생명주기에 대해 설명해주세요." },
      { id: 24, contents: "코틀린의 코루틴(Coroutine)에 대해 설명해주세요." },
      { id: 25, contents: "Android Jetpack Compose의 장점은 무엇인가요?" },
      { id: 26, contents: "안드로이드의 생명주기에 대해 설명해주세요." },
      { id: 27, contents: "코틀린의 코루틴(Coroutine)에 대해 설명해주세요." },
      { id: 28, contents: "Android Jetpack Compose의 장점은 무엇인가요?" },
      { id: 29, contents: "안드로이드의 생명주기에 대해 설명해주세요." },
      { id: 30, contents: "코틀린의 코루틴(Coroutine)에 대해 설명해주세요." },
      { id: 31, contents: "Android Jetpack Compose의 장점은 무엇인가요?" },
      { id: 32, contents: "안드로이드의 생명주기에 대해 설명해주세요." },
    ],
    open: false,
    createdAt: "2024-03-07T16:45:00Z",
  },
];

export const useGetQuestionSets = (sortOrder) => {
  return useQuery({
    queryKey: ["questionSets", sortOrder],
    queryFn: async () => {
      return mockQuestionSets;
      // const response = await api.get("/questionSet/all", {
      //   params: { sort: sortOrder },
      // });
      // return response.data;
    },
    select: (data) => {
      const sortedData = [...data].sort((a, b) => {
        switch (sortOrder) {
          case 0: // 최신순
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 1: // 생성순
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 2: // 인기순
            return b.refCount - a.refCount;
          default:
            return 0;
        }
      });
      return sortedData;
    },
  });
};

export const useGetMyQuestionSets = () => {
  return useQuery({
    queryKey: ["myQuestionSets"],
    queryFn: async () => {
      return mockQuestionSets.filter((set) => set.username === "testuser");
      // const response = await api.get("/questionSet/mySets");
      // return response.data;
    },
  });
};

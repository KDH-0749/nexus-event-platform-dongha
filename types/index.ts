// types/index.ts

// 발표 분야 (마케팅, 재무, 전략, AI/IT)
export type TrackCategory = 'marketing' | 'finance' | 'strategy' | 'ai_it';

// 본선 참가팀 정보 인터페이스
export interface Team {
  id: string;
  name: string;             // 팀명
  leaderName: string;       // 대표자/팀장 이름
  track: TrackCategory;     // 발표 분야
  presentationOrder: number; // 발표 순서
  isActive: boolean;        // 평가 대상 활성/비활성 여부
  createdAt: string;        // 등록일
}

// 대시보드 요약 통계 데이터
export interface EventStats {
  totalTeams: number;      // 전체 팀 수
  activeTeams: number;     // 활성화된 팀 수
  currentPhase: string;    // 현재 진행 단계
}
// features/dashboard/data/mockTeams.ts
import { Team } from '@/types';

export const initialMockTeams: Team[] = [
  {
    id: 'team-1',
    name: '넥서스 이노베이션',
    leaderName: '김동하',
    track: 'ai_it',
    presentationOrder: 1,
    isActive: true,
    createdAt: '2026-10-12',
  },
  {
    id: 'team-2',
    name: '배재 알파고',
    leaderName: '이민수',
    track: 'strategy',
    presentationOrder: 2,
    isActive: true,
    createdAt: '2026-10-12',
  },
  {
    id: 'team-3',
    name: '경영 솔루션스',
    leaderName: '박서연',
    track: 'marketing',
    presentationOrder: 3,
    isActive: false, // 현재 비활성화(평가 제외) 상태 예시
    createdAt: '2026-10-12',
  },
];
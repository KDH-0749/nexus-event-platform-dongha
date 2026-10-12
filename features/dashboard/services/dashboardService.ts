// features/dashboard/services/dashboardService.ts
import { Team } from '@/types';
import { initialMockTeams } from '../data/mockTeams';

// 메모리에 임시로 보관할 팀 데이터 배열
let teamsStorage: Team[] = [...initialMockTeams];

export const dashboardService = {
  // 팀 목록 가져오기
  getTeams: async (): Promise<Team[]> => {
    return [...teamsStorage];
  },

  // 신규 팀 등록하기
  addTeam: async (newTeam: Omit<Team, 'id' | 'createdAt'>): Promise<Team> => {
    const createdTeam: Team = {
      ...newTeam,
      id: `team-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    teamsStorage.push(createdTeam);
    return createdTeam;
  },

  // 팀 정보 수정하기
  updateTeam: async (id: string, updatedData: Partial<Omit<Team, 'id' | 'createdAt'>>): Promise<Team | null> => {
    const index = teamsStorage.findIndex((t) => t.id === id);
    if (index !== -1) {
      teamsStorage[index] = { ...teamsStorage[index], ...updatedData };
      return { ...teamsStorage[index] };
    }
    return null;
  },

  // 평가 대상 활성/비활성 토글
  toggleTeamActive: async (id: string): Promise<Team | null> => {
    const team = teamsStorage.find((t) => t.id === id);
    if (team) {
      team.isActive = !team.isActive;
      return { ...team };
    }
    return null;
  },
};
// app/admin/dashboard/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { Team } from '@/types';
import { dashboardService } from '@/features/dashboard/services/dashboardService';
import TeamModal from '@/features/dashboard/components/TeamModal';

export default function AdminDashboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTeam, setEditingTeam] = useState<Team | null>(null);

  // 데이터 불러오기
  const loadTeams = async () => {
    setIsLoading(true);
    const data = await dashboardService.getTeams();
    // 발표 순서대로 정렬
    setTeams(data.sort((a, b) => a.presentationOrder - b.presentationOrder));
    setIsLoading(false);
  };

  useEffect(() => {
    loadTeams();
  }, []);

  // 활성화 토글 함수
  const handleToggleActive = async (id: string) => {
    await dashboardService.toggleTeamActive(id);
    await loadTeams();
  };

  // 팀 저장 (신규 등록 또는 수정)
  const handleSaveTeam = async (teamData: { name: string; leaderName: string; track: any; presentationOrder: number }) => {
    if (editingTeam) {
      await dashboardService.updateTeam(editingTeam.id, teamData);
    } else {
      await dashboardService.addTeam({ ...teamData, isActive: true });
    }
    setEditingTeam(null);
    await loadTeams();
  };

  // 통계 산출
  const totalTeams = teams.length;
  const activeTeams = teams.filter((t) => t.isActive).length;

  const trackLabel = (track: string) => {
    switch (track) {
      case 'ai_it': return 'AI / IT';
      case 'marketing': return '마케팅';
      case 'strategy': return '전략/기획';
      case 'finance': return '재무/회계';
      default: return track;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* 헤더 */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">NEXUS 학술제 행사/팀 관리 대시보드</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">본선 참가팀 등록, 발표 순서 관리 및 평가 대상 활성화 제어</p>
          </div>
          <button
            onClick={() => { setEditingTeam(null); setIsModalOpen(true); }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition"
          >
            + 새 팀 등록
          </button>
        </div>

        {/* 요약 통계 카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase">전체 참가팀</p>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalTeams} 개 팀</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border shadow-sm">
            <p className="text-xs font-semibold text-green-600 uppercase">평가 활성 팀 (심사 대상)</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeTeams} 개 팀</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border shadow-sm">
            <p className="text-xs font-semibold text-gray-500 uppercase">진행 상태</p>
            <p className="text-2xl font-bold text-blue-600 mt-1">본선 발표 준비</p>
          </div>
        </div>

        {/* 팀 목록 테이블 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b dark:border-gray-700">
            <h2 className="font-bold text-gray-800 dark:text-white">본선 참가팀 목록</h2>
          </div>

          {isLoading ? (
            <div className="p-8 text-center text-gray-500">데이터를 불러오는 중입니다...</div>
          ) : teams.length === 0 ? (
            <div className="p-8 text-center text-gray-500">등록된 팀이 없습니다. 상단에서 새 팀을 등록해보세요.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                  <tr>
                    <th className="p-3 font-semibold">발표 순서</th>
                    <th className="p-3 font-semibold">팀명</th>
                    <th className="p-3 font-semibold">대표자</th>
                    <th className="p-3 font-semibold">분야</th>
                    <th className="p-3 font-semibold">평가 대상 상태</th>
                    <th className="p-3 font-semibold text-right">작업</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-700">
                  {teams.map((team) => (
                    <tr key={team.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                      <td className="p-3 font-bold text-blue-600">#{team.presentationOrder}</td>
                      <td className="p-3 font-medium text-gray-900 dark:text-white">{team.name}</td>
                      <td className="p-3 text-gray-600 dark:text-gray-300">{team.leaderName}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-700 dark:text-gray-300">
                          {trackLabel(team.track)}
                        </span>
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => handleToggleActive(team.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                            team.isActive
                              ? 'bg-green-100 text-green-800 hover:bg-green-200'
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          }`}
                        >
                          {team.isActive ? '● 평가 활성화' : '○ 비활성화'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => { setEditingTeam(team); setIsModalOpen(true); }}
                          className="text-xs text-blue-600 hover:underline font-medium"
                        >
                          수정
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <TeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTeam}
        initialData={editingTeam}
      />
    </div>
  );
}
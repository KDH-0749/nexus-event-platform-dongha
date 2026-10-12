// features/dashboard/components/TeamModal.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Team, TrackCategory } from '@/types';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (teamData: { name: string; leaderName: string; track: TrackCategory; presentationOrder: number }) => void;
  initialData?: Team | null;
}

export default function TeamModal({ isOpen, onClose, onSave, initialData }: TeamModalProps) {
  const [name, setName] = useState('');
  const [leaderName, setLeaderName] = useState('');
  const [track, setTrack] = useState<TrackCategory>('ai_it');
  const [presentationOrder, setPresentationOrder] = useState(1);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setLeaderName(initialData.leaderName);
      setTrack(initialData.track);
      setPresentationOrder(initialData.presentationOrder);
    } else {
      setName('');
      setLeaderName('');
      setTrack('ai_it');
      setPresentationOrder(1);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !leaderName.trim()) {
      alert('팀명과 대표자 이름을 입력해 주세요.');
      return;
    }
    onSave({ name, leaderName, track, presentationOrder: Number(presentationOrder) });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md shadow-xl border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          {initialData ? '팀 정보 수정' : '본선 참가팀 등록'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">팀명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="예: 넥서스 이노베이션"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">대표자 / 팀장 이름</label>
            <input
              type="text"
              value={leaderName}
              onChange={(e) => setLeaderName(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              placeholder="예: 김동하"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">발표 분야 (Track)</label>
            <select
              value={track}
              onChange={(e) => setTrack(e.target.value as TrackCategory)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            >
              <option value="ai_it">AI / IT</option>
              <option value="marketing">마케팅</option>
              <option value="strategy">전략/기획</option>
              <option value="finance">재무/회계</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">발표 순서</label>
            <input
              type="number"
              min={1}
              value={presentationOrder}
              onChange={(e) => setPresentationOrder(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
            >
              {initialData ? '수정 저장' : '등록'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
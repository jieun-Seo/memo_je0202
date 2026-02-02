import { useState, useEffect } from "react";
import MemoForm from "./components/MemoForm";
import MemoList from "./components/MemoList";
import type { Memo } from "./types";
import "./styles/App.css";


const STORAGE_KEY = import.meta.env.VITE_MEMO_STORAGE_KEY;

function App() {

    const [memos, setMemos] = useState<Memo[]>(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);

        if (savedData) {
            try {
                return JSON.parse(savedData);
            } catch (error) {
                console.error(
                    "저장된 데이터를 불러오는데 실패했습니다:",
                    error,
                );
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
    }, [memos]); 

    const handleAddMemo = (content: string) => {
        const newMemo: Memo = {
            id: Date.now(),
            content: content,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        setMemos([newMemo, ...memos]);
    };

    const handleUpdateMemo = (id: number, content: string) => {
        setMemos(
            memos.map((memo) =>
                memo.id === id
                    ? {
                          ...memo,
                          content: content,
                          updatedAt: new Date().toISOString(),
                      }
                    : memo,
            ),
        );
    };

    const handleDeleteMemo = (id: number) => {
        setMemos(memos.filter((memo) => memo.id !== id));
    };

     /**
   * 전체 메모 삭제 함수
   */
  const handleClearAll = () => {
    if (memos.length === 0) {
      alert('삭제할 메모가 없습니다.');
      return;
    }
    
    if (window.confirm(`정말 ${memos.length}개의 메모를 모두 삭제하시겠습니까?`)) {
      setMemos([]);
    }
  };

    return (
        <div className="app">
            <h1 className="app-title">📝 {import.meta.env.VITE_APP_TITLE}</h1>

            <MemoForm onAddMemo={handleAddMemo} />

            {/* 전체 삭제 버튼 추가 */}
                {memos.length > 0 && (
                    <button 
                    className="clear-all-button"
                    onClick={handleClearAll}
                    >
                    🗑️ 전체 삭제
                    </button>
                )}
            <MemoList
                memos={memos}
                onUpdateMemo={handleUpdateMemo}
                onDeleteMemo={handleDeleteMemo}
            />

            <p className="memo-count">총 {memos.length}개의 메모</p>
        </div>
    );
}

export default App;
